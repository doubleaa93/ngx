import { CustomErrors } from '../reducers/forms-reducer';

export enum FormActions {
  SET_CUSTOM_ERRORS = 100,
  CLEAR_CUSTOM_ERRORS = 101,
  SUBMIT = 102,
  RESET = 103
}

export interface SetCustomErrorsAction {
  type: FormActions.SET_CUSTOM_ERRORS;
  payload: {
    formId: string;
    errors: CustomErrors;
  };
}

export interface ClearCustomErrorsAction {
  type: FormActions.CLEAR_CUSTOM_ERRORS;
  payload: {
    formId: string;
    field: string;
  };
}

export interface SubmitAction {
  type: FormActions.SUBMIT;
  payload: string;
}

export interface ResetAction {
  type: FormActions.RESET;
  payload: string;
}

export const setCustomErrors = (
  formId: string,
  errors: CustomErrors
): SetCustomErrorsAction => ({
  type: FormActions.SET_CUSTOM_ERRORS,
  payload: {
    formId,
    errors
  }
});

export const clearCustomErrors = (
  formId: string,
  field: string
): ClearCustomErrorsAction => ({
  type: FormActions.CLEAR_CUSTOM_ERRORS,
  payload: {
    formId,
    field
  }
});

export const submit = (formId: string): SubmitAction => ({
  type: FormActions.SUBMIT,
  payload: formId
});

export const reset = (formId: string): ResetAction => ({
  type: FormActions.RESET,
  payload: formId
});
