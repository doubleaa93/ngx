import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeReCrudOptions } from '../options';
import { IStruct, IField, IBlock } from '../schema';
import { FormBuilderService } from './form-builder.service';

export interface FormState {
  id: number;
  options: DeReCrudOptions;
  form: FormGroup;
  structs: Map<IStruct>;
  fields: Map<IField>;
  blocks: Map<IBlock>;
  blockFields: IField[];
  errors: CustomErrors;
}

export interface CustomErrors {
  [fieldPath: string]: string[] | CustomErrors;
}

export interface Map<T> {
  [key: string]: T;
}

export type GetKeyFunction<T> = (item: T) => string;

@Injectable()
export class FormStateService {
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
        name: structSchema.name,
        label: structSchema.label,
        fields: [],
        blocks: []
      };

      for (const fieldSchema of structSchema.fields) {
        const field = {
          type: fieldSchema.type,
          keyField: fieldSchema.keyField,
          required: fieldSchema.required,
          name: fieldSchema.name,
          label: fieldSchema.label,
          placeholder: fieldSchema.placeholder || fieldSchema.label,
          struct: structSchema.name
        };

        fields.push(field);
        struct.fields.push(field.name);
      }

      for (const blockSchema of structSchema.blocks) {
        const block = {
          name: blockSchema.name,
          fields: blockSchema.fields,
          struct: structSchema.name
        };

        blocks.push(block);
        struct.blocks.push(block.name);
      }
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

  create(options: DeReCrudOptions, value: object): FormState {
    let id: number;

    while (true) {
      id = FormStateService.generateId();

      if (this._cache[id]) {
        continue;
      }

      break;
    }

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

    const fieldNames = blocks[`${options.struct}-${options.block}`].fields;
    const blockFields = fieldNames.map(
      fieldName => fields[`${options.struct}-${fieldName}`]
    );

    const form = this.formBuilder.group(options.struct, blockFields);
    if (value) {
      form.setValue(value);
    }

    const state = {
      id,
      options,
      form,
      structs,
      fields,
      blocks,
      blockFields,
      errors: {}
    };

    this._cache[id] = state;

    return state;
  }

  update(id: number, value: object) {
    if (!this._cache[id]) {
      return;
    }

    const { form } = this._cache[id];

    form.setValue(value);
  }

  remove(id: number) {
    delete this._cache[id];
  }

  clearErrors(id: number) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].errors = {};
  }

  setErrors(id: number, errors: CustomErrors) {
    if (!this._cache[id]) {
      return;
    }

    this._cache[id].errors = errors;
  }

  private arrayToMap<T>(getKey: GetKeyFunction<T>, array: T[]) {
    return array.reduce<Map<T>>((acc, current) => {
      acc[getKey(current)] = current;
      return acc;
    }, {});
  }
}
