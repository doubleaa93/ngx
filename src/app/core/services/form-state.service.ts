import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { DeReCrudOptions } from '../models/options';
import { IStruct, IField, IBlock } from '../models/schema';
import { FormSubmissionErrors } from '../models/form-submission';
import { FormBuilderService } from './form-builder.service';
import { FormChange } from '../models/form-change';
import { FormState } from '../models/form-state';

export type GetKeyFunction<T> = (item: T) => string;

@Injectable()
export class FormStateService {
  // tslint:disable-next-line:no-function-constructor-with-string-args
  private static defaultConditionFunc = new Function('return true');
  private _cache: { [id: number]: FormState } = {};

  constructor(private formBuilder: FormBuilderService) {}

  static generateId() {
    return Math.random();
  }

  static assignDefaults(options: DeReCrudOptions) {
    if (!options.headerSize) {
      options.headerSize = 3;
    }
  }

  // TODO: This should expand strings into a label object; the renderers should handle which label to show based on screen size
  static parseLabel(label: string | { short: string }) {
    if (typeof label === 'string') {
      return label;
    }

    return label.short;
  }

  static parseSchema(options: DeReCrudOptions) {
    const structs: IStruct[] = [];
    const fields: IField[] = [];
    const blocks: IBlock[] = [];

    for (const structSchema of options.schema) {
      const struct = {
        ...structSchema,
        label: this.parseLabel(structSchema.label),
        collectionLabel: this.parseLabel(structSchema.label),
        fields: [],
        blocks: []
      };

      for (const fieldSchema of structSchema.fields) {
        const label = this.parseLabel(fieldSchema.label);

        const field = {
          ...fieldSchema,
          label,
          placeholder: fieldSchema.placeholder || label,
          struct: structSchema.name
        };

        if (field.reference && !field.reference.block) {
          field.reference.block = 'default';
        }

        fields.push(field);
        struct.fields.push(field.name);
      }

      for (const blockSchema of structSchema.blocks) {
        const block = {
          ...blockSchema,
          fields: [],
          struct: structSchema.name
        };

        for (const reference of blockSchema.fields) {
          if (!reference) {
            continue;
          }

          const fieldReference = reference.field
            ? reference
            : { field: reference };

          let condition;

          if (fieldReference.condition) {
            const returnValue =
              fieldReference.condition[0] === '{'
                ? fieldReference.condition
                : `return ${fieldReference.condition}`;

            // tslint:disable-next-line:no-function-constructor-with-string-args
            condition = new Function('value', 'rootValue', returnValue);
          } else {
            // tslint:disable-next-line:no-function-constructor-with-string-args
            condition = FormStateService.defaultConditionFunc;
          }

          fieldReference.condition = condition;
          block.fields.push(fieldReference);
        }

        blocks.push(block);
        struct.blocks.push(block.name);
      }

      structs.push(struct);
    }

    return {
      structs,
      fields,
      blocks
    };
  }

  get(id: number): FormState {
    return this._cache[id];
  }

  create(options: DeReCrudOptions, value: object, initialErrors?: FormSubmissionErrors): FormState {
    let id: number;

    while (true) {
      id = FormStateService.generateId();

      if (this._cache[id]) {
        continue;
      }

      break;
    }

    FormStateService.assignDefaults(options);

    const schema = FormStateService.parseSchema(options);
    const structs = this.arrayToMap(struct => struct.name, schema.structs);
    const fields = this.arrayToMap(
      field => `${field.struct}-${field.name}`,
      schema.fields
    );

    const blocks = this.arrayToMap(
      block => `${block.struct}-${block.name}`,
      schema.blocks
    );

    const form = this.formBuilder.group(
      options.struct,
      options.block,
      blocks,
      fields,
      value
    );

    const state: FormState = {
      id,
      options,
      form,
      structs,
      fields,
      blocks,
      submissionErrors: initialErrors,
      onSubmissionErrorsChange: new Subject<FormSubmissionErrors>(),
      navigationStack: [],
      onNavigationChange: new Subject<number>(),
      onValueChange: new Subject<FormChange>()
    };

    this._cache[id] = state;

    return state;
  }

  createForm(formId: number, struct: string, block: string): FormGroup {
    if (!this._cache[formId]) {
      return;
    }

    const { fields, blocks } = this._cache[formId];
    return this.formBuilder.group(struct, block, blocks, fields);
  }

  update(id: number, value: object) {
    if (!this._cache[id]) {
      return;
    }

    const { form } = this._cache[id];

    form.patchValue(value);
  }

  remove(id: number) {
    if (!this._cache[id]) {
      return;
    }

    delete this._cache[id];
  }

  clearErrors(id: number, formPath?: string) {
    if (!this._cache[id]) {
      return;
    }

    if (formPath) {
      delete this._cache[id].submissionErrors[formPath];
    } else {
      this._cache[id].submissionErrors = {};
    }

    this.pushSubmissionErrorsChange(id);
  }

  setErrors(id: number, errors: FormSubmissionErrors) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].submissionErrors = errors;
    this.pushSubmissionErrorsChange(id);
  }

  onChange(id: number, formPath: string, newValue: any, event: string) {
    if (!this._cache[id]) {
      return;
    }

    const state = this._cache[id];
    this.clearErrors(id, formPath);

    if (event && state.options.changeNotificationType !== event) {
      return;
    }

    (<Subject<FormChange>>state.onValueChange).next({
      fieldPath: formPath,
      value: newValue,
      formValue: state.form.value
    });
  }

  pushNavigation(id: number, struct: string, block: string, path: string, parentPath: string) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].navigationStack.push({
      struct,
      block,
      path,
      parentPath
    });

    this.pushNavigationChange(id);
  }

  popNavigation(id: number) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].navigationStack.pop();

    this.pushNavigationChange(id);
  }

  completeNavigation(id: number) {
    if (!this._cache[id]) {
      return;
    }

    this.popNavigation(id);
  }

  private pushNavigationChange(id: number, childId?: number) {
    const state = this._cache[id];
    (<Subject<number>>state.onNavigationChange).next(childId);
  }

  private pushSubmissionErrorsChange(id: number) {
    const state = this._cache[id];
    (<Subject<FormSubmissionErrors>>state.onSubmissionErrorsChange).next(
      state.submissionErrors
    );
  }

  private arrayToMap<T>(getKey: GetKeyFunction<T>, array: T[]) {
    return array.reduce<Map<string, T>>((acc, current) => {
      acc[getKey(current)] = current;
      return acc;
    }, new Map<string, T>());
  }
}
