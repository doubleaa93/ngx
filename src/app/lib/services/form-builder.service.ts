import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IField, ITextField } from '../schema';
import { whitespaceValidator } from '../validators/whitespace-validator';

@Injectable()
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  group(struct: string, fields: IField[]): FormGroup {
    const form = {};

    for (const field of fields) {
      const validators = this.getValidators(field);

      form[field.name] = [field.initialValue, validators];
    }

    return this.fb.group(form);
  }

  private getValidators(field: IField) {
    return (control: AbstractControl) => {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required, whitespaceValidator);
      }

      if ((<ITextField>field).minLength) {
        validators.push(Validators.minLength((<ITextField>field).minLength));
      }

      if ((<ITextField>field).maxLength) {
        validators.push(Validators.maxLength((<ITextField>field).maxLength));
      }

      if (!validators.length) {
        return null;
      }

      return Validators.compose(validators)(control);
    };
  }
}
