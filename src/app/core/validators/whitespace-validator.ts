import { AbstractControl } from '@angular/forms';

export const whitespaceValidator = (control: AbstractControl) => {
  const isWhiteSpace = (control.value || '').trim().length === 0;

  return !isWhiteSpace ? null : { required: true };
};
