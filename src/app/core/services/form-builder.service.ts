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

@Injectable()
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  group(
    struct: string,
    blockName: string,
    blocks: Map<string, IBlock>,
    fields: Map<string, IField>,
    value = {}
  ): FormGroup {
    const group = {};
    const block = blocks[`${struct}-${blockName}`];

    for (const fieldReference of block.fields) {
      const field = fields[`${struct}-${fieldReference.field}`];

      if (field.type === 'stamp') {
        continue;
      }

      if (field.type === 'linkedStruct') {
        const linkedStructField = <ILinkedStructField>field;
        const { reference } = linkedStructField;

        const array = this.array(
          reference.struct,
          reference.block,
          blocks,
          fields,
          value[field.name]
        );

        if (!array.value.length && linkedStructField.minInstances > 0) {
          // tslint:disable-next-line:no-increment-decrement
          for (let i = 0; i < linkedStructField.minInstances; i++) {
            array.push(this.group(reference.struct, reference.block, blocks, fields));
          }
        }

        group[field.name] = array;

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

    const formGroup = this.fb.group(group);
    if (!formGroup.value) {
      formGroup.patchValue({});
    }

    return formGroup;
  }

  array(
    struct: string,
    blockName: string,
    blocks: Map<string, IBlock>,
    fields: Map<string, IField>,
    value = []
  ): FormArray {
    const array = [];

    if (value && value.length) {
      value.forEach((item) => {
        const group = this.group(struct, blockName, blocks, fields, item);

        array.push(group);
      });
    }

    const formArray = this.fb.array(array);
    if (!formArray.value) {
      formArray.setValue([]);
    }

    return formArray;
  }



  private getValidators(fieldReference: IFieldReference, field: IField) {
    return (control: AbstractControl) => {
      const validators = [];

      const root = control.root;
      const parent = control.parent;

      if (
        parent instanceof FormGroup &&
        !fieldReference.condition(parent.value, root.value)
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
