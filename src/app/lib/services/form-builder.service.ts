import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IField } from '../schema';

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

  private getValidators(field: IField): Function[] {
    const validators: Function[] = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    return validators;
  }
}
