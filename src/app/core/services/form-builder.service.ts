import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import {
  IField,
  ITextField,
  ILinkedStructField,
  IBlock,
  IForeignKeyField,
  IIntegerField,
  IFieldReference
} from '../models/schema';
import { whitespaceValidator } from '../validators/whitespace-validator';
import { Map } from '../models/map';

@Injectable()
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  group(
    struct: string,
    blockName: string,
    blocks: Map<IBlock>,
    fields: Map<IField>,
    value = {}
  ): FormGroup {
    const group = {};

    const block = blocks[`${struct}-${blockName}`];

    for (const fieldReference of block.fields) {
      const field = fields[`${struct}-${fieldReference.field}`];

      if (field.type === 'linkedStruct') {
        const linkedStructField = <ILinkedStructField>field;
        const { reference } = linkedStructField;
        group[field.name] = this.array(
          reference.struct,
          reference.block,
          blocks,
          fields,
          value[field.name]
        );
        continue;
      }

      if (field.type === 'foreignKey') {
        const foreignKeyField = <IForeignKeyField>field;
        const { reference } = foreignKeyField;
        group[field.name] = this.group(
          reference.struct,
          reference.block,
          blocks,
          fields,
          value[field.name]
        );
        continue;
      }

      const validators = this.getValidators(fieldReference, field);
      const initialValue = value[field.name] || field.initialValue;

      group[field.name] = [initialValue, validators];
    }

    return this.fb.group(group);
  }

  array(
    struct: string,
    blockName: string,
    blocks: Map<IBlock>,
    fields: Map<IField>,
    value = []
  ): FormArray {
    const array = [];

    if (value && value.length) {
      value.forEach((item) => {
        const group = this.group(struct, blockName, blocks, fields, item);

        array.push(group);
      });
    }

    return this.fb.array(array);
  }

  getRootControl(control: AbstractControl) {
    if (control.parent && !(control.parent instanceof FormGroup)) {
      return this.getRootControl(control.parent);
    }

    return control.parent || control;
  }

  private getValidators(fieldReference: IFieldReference, field: IField) {
    return (control: AbstractControl) => {
      const validators = [];
      const rootControl = this.getRootControl(control);

      if (
        rootControl instanceof FormGroup &&
        !fieldReference.condition(rootControl.value)
      ) {
        return null;
      }

      if (field.required) {
        validators.push(Validators.required, whitespaceValidator);
      }

      if ((<ITextField>field).minLength) {
        validators.push(Validators.minLength((<ITextField>field).minLength));
      }

      if ((<ITextField>field).maxLength) {
        validators.push(Validators.maxLength((<ITextField>field).maxLength));
      }

      if ((<IIntegerField>field).min) {
        validators.push(Validators.min((<IIntegerField>field).min));
      }

      if ((<IIntegerField>field).max) {
        validators.push(Validators.max((<IIntegerField>field).max));
      }

      if (!validators.length) {
        return null;
      }

      return Validators.compose(validators)(control);
    };
  }
}
