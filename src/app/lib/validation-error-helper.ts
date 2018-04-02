import { IControl } from './renderers/control';

export class ValidationErrorHelper {
  private static _errorSort = ['required'];

  private static getFormControlIfErrorFound(control: IControl) {
    const formControl = control.form.get(control.key);

    if (
      (!formControl.errors || !formControl.touched) &&
      !control.submissionErrors.length
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
      for (const key of Object.keys(formControl.errors)) {
        const sort = this._errorSort[key];
        const metadata = formControl.errors[key];

        if (typeof sort === 'undefined') {
          unsortedErrors.push({ key, metadata });
        } else {
          sortedErrors.push({ key, metadata, sort });
        }
      }
    }

    return sortedErrors
      .sort(x => x.sort)
      .concat(unsortedErrors)
      .map(this.getErrorMessage)
      .concat(control.submissionErrors);
  }

  static getErrorMessage(error: {  key: string, metadata: any }) {
    switch (error.key) {
      case 'required':
        return 'This field is required.';
      case 'minlength':
        return `This field must have at least ${error.metadata.requiredLength} characters.`;
      case 'maxlength':
        return `This field can not exceed ${error.metadata.requiredLength} characters.`;
      default:
        return `Validation failed with error: ${error}`;
    }
  }
}
