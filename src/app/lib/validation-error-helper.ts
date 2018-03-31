import { Injectable } from '@angular/core';
import { IControl } from './renderers/control';

export class ValidationErrorHelper {
  private static _errorPriority: string[] = ['required'];

  private static getFormControlIfErrorFound(control: IControl) {
    const formControl = control.form.get(control.key);

    if (!formControl.errors || !formControl.touched) {
      return null;
    }

    return formControl;
  }

  static hasError(control: IControl) {
    return !!this.getFormControlIfErrorFound(control);
  }

  static getError(control: IControl) {
    const formControl = this.getFormControlIfErrorFound(control);
    if (!formControl) {
      return null;
    }

    for (const errorType of ValidationErrorHelper._errorPriority) {
      if (formControl.hasError(errorType)) {
        return errorType;
      }
    }

    return Object.keys(formControl.errors)[0];
  }
}
