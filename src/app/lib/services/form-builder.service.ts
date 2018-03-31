import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/state';
import { IField } from '../schema';

@Injectable()
export class FormBuilderService {
  constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>) {}

  group(formId: string, struct: string, fieldNames: string[]): FormGroup {
    const fields = this.ngRedux.getState().fields;
    const form = {};

    for (const fieldName of fieldNames) {
      const field = fields[`${struct}-${fieldName}`];
      const validators = this.getValidators(field);

      form[fieldName] = [field.initialValue, validators];
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
