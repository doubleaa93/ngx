import { IControl } from './renderers/control';

export class ValidationErrorHelper {
  private static _errorSort = ['required'];

  private static getFormControlIfErrorFound(control: IControl) {
    const formControl = control.form.get(control.key);

    if (
      (!formControl.errors || !formControl.touched) &&
      !control.customErrors
    ) {
      return null;
    }

    return formControl;
  }

  static hasError(control: IControl) {
    return !!this.getFormControlIfErrorFound(control);
  }

  static getErrors(control: IControl) {
    const formControl = this.getFormControlIfErrorFound(control);
    if (!formControl) {
      return null;
    }

    const sortedErrors = [];
    const unsortedErrors = [];

    if (formControl.errors) {
      for (const error of Object.keys(formControl.errors)) {
        const sort = this._errorSort[error];
        if (typeof sort === 'undefined') {
          unsortedErrors.push(error);
        } else {
          sortedErrors.push({ error, sort });
        }
      }
    }

    const errors = sortedErrors
      .sort(x => x.sort)
      .map(x => x.error)
      .concat(unsortedErrors)
      .map(this.getErrorMessage);

    if (errors.length) {
      return errors;
    }

    return control.customErrors;
  }

  static getErrorMessage(error: string) {
    switch (error) {
      case 'required':
        return 'This field is required.';
      default:
        return `Validation failed with error: ${error}`;
    }
  }
}
