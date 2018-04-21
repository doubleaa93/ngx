import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DeReCrudOptions } from '../models/options';
import { IStruct, IField, IBlock } from '../models/schema';
import { FormSubmissionErrors } from '../models/form-submission';
import { FormBuilderService } from './form-builder.service';
import { Map } from '../models/map';

export interface FormState {
  id: number;
  parentId: number | null;
  options: DeReCrudOptions;
  form: FormGroup;
  structs: Map<IStruct>;
  fields: Map<IField>;
  blocks: Map<IBlock>;
  submissionErrors: FormSubmissionErrors;
  onSubmissionErrorsChange: Observable<FormSubmissionErrors>;
  navigationStack: number[];
  onNavigationChange: Observable<number>;
}

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

  static parseSchema(options: DeReCrudOptions) {
    const structs: IStruct[] = [];
    const fields: IField[] = [];
    const blocks: IBlock[] = [];

    for (const structSchema of options.schema) {
      const struct = {
        ...structSchema,
        fields: [],
        blocks: []
      };

      for (const fieldSchema of structSchema.fields) {
        const field = {
          ...fieldSchema,
          placeholder: fieldSchema.placeholder || fieldSchema.label,
          struct: structSchema.name
        };

        fields.push(field);
        struct.fields.push(field.name);
      }

      for (const blockSchema of structSchema.blocks) {
        const block = {
          ...blockSchema,
          fields: [],
          struct: structSchema.name
        };

        for (let fieldReference of blockSchema.fields) {
          fieldReference =  fieldReference.field ? fieldReference : { field: fieldReference };

          let condition;

          if (fieldReference.condition) {
            const returnValue = fieldReference.condition[0] === '{'
              ? fieldReference
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

  create(options: DeReCrudOptions, value: object, parentId: number = null): FormState {
    let id: number;

    while (true) {
      id = FormStateService.generateId();

      if (this._cache[id]) {
        continue;
      }

      break;
    }

    let structs;
    let fields;
    let blocks;

    if (!parentId) {
      const schema = FormStateService.parseSchema(options);
      structs = this.arrayToMap(struct => struct.name, schema.structs);
      fields = this.arrayToMap(
        field => `${field.struct}-${field.name}`,
        schema.fields
      );

      blocks = this.arrayToMap(
        block => `${block.struct}-${block.name}`,
        schema.blocks
      );
    } else {
      const parent = this._cache[parentId];

      structs = parent.structs;
      fields = parent.fields;
      blocks = parent.blocks;
    }

    const form = this.formBuilder.group(options.struct, options.block, blocks, fields, value);
    form.patchValue(value || {});

    const state = {
      id,
      parentId,
      options,
      form,
      structs,
      fields,
      blocks,
      submissionErrors: {},
      onSubmissionErrorsChange: new Subject<FormSubmissionErrors>(),
      navigationStack: [],
      onNavigationChange: new Subject<number>()
    };

    this._cache[id] = state;

    return state;
  }

  update(id: number, value: object) {
    if (!this._cache[id]) {
      return;
    }

    const { form } = this._cache[id];

    form.patchValue(value);
  }

  remove(id: number) {
    delete this._cache[id];
  }

  clearErrors(id: number) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].submissionErrors = {};
    this.pushSubmissionErrorsChange(id);
  }

  setErrors(id: number, errors: FormSubmissionErrors) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].submissionErrors = errors;
    this.pushSubmissionErrorsChange(id);
  }

  pushNavigation(id: number, childId: number) {
    if (!this._cache[id] || !this._cache[childId]) {
      return;
    }

    let parentId = id;

    while (this._cache[parentId].parentId) {
      parentId = this._cache[parentId].parentId;
    }

    const state = this._cache[parentId];
    state.navigationStack.push(childId);

    this.pushNavigationChange(parentId, childId);
  }

  popNavigation(id: number) {
    if (!this._cache[id]) {
      return;
    }

    const state = this._cache[id];
    state.navigationStack.pop();

    this.pushNavigationChange(id);
  }

  private pushNavigationChange(id: number, childId?: number) {
    const state = this._cache[id];
    (<Subject<number>>state.onNavigationChange).next(childId);
  }

  private pushSubmissionErrorsChange(id: number) {
    const state = this._cache[id];
    (<Subject<FormSubmissionErrors>>state.onSubmissionErrorsChange).next(state.submissionErrors);
  }

  private arrayToMap<T>(getKey: GetKeyFunction<T>, array: T[]) {
    return array.reduce<Map<T>>((acc, current) => {
      acc[getKey(current)] = current;
      return acc;
    }, {});
  }
}
