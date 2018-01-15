import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, FormArray, Validators } from '@angular/forms';

@Injectable()
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) { }

  createFormGroup(struct: any, blockName: string, value: Object = {}, parentField?: any): FormGroup {
    const formGroup = {};

    const block = struct.blocks[blockName];

    if (block) {
      block.fields.forEach(field => {
        if (field.type === 'linkedStruct') {
          formGroup[field.name] = this.createFormArray(field.reference, field.reference.reference.block, value[field.name], field);
          return;
        }

        if (field.type === 'foreignKey') {
          formGroup[field.name] = this.createFormGroup(field.reference, field.reference.reference.block, value[field.name], field);
          return;
        }

        let referenceValue;
        if (struct.reference) {
          if (!(value instanceof Object) && struct.reference.labelField === field.name) {
            referenceValue = value;
          } else {
            referenceValue = value[field.name];
          }
        }

        const initialValue = referenceValue || value[field.name] || field.initialValue;
        const validators = this.getValidators(field, parentField);

        formGroup[field.name] = [initialValue, validators];
      });
    }

    return this.formBuilder.group(formGroup);
  }

  createFormArray(struct: any, blockName: string, value: any[] = [], parentField?: any): FormArray {
    const formArray = [];

    if (value && value.length) {
      value.forEach(item => {
        const formGroup = this.createFormGroup(struct, blockName, item);
        formArray.push(formGroup);
      });
    }

    return this.formBuilder.array(formArray, parentField ? this.getValidators(parentField) : null);
  }

  getRootValue(control: AbstractControl) {
    if (control.parent && control.parent instanceof FormGroup) {
      return this.getRootValue(control.parent);
    }

    return control.value;
  }

  getValidators(field: any, parentField?: any) {
    return (control: AbstractControl) => {
      const validators = [];
      const rootValue = this.getRootValue(control);

      if (!field.condition(rootValue)) {
        return null;
      }

      if (parentField && !parentField.condition(rootValue)) {
        return null;
      }

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.minlength) {
        validators.push(Validators.minLength(field.minLength));
      }

      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }

      if (field.min) {
        validators.push(Validators.min(field.min));
      }

      if (field.max) {
        validators.push(Validators.min(field.max));
      }

      if (!validators.length) {
        return null;
      }

      return Validators.compose(validators)(control);
    };
  }
}
