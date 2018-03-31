import { InitAction, InitCompleteAction } from './schema-actions';
import { ResetAction, SetCustomErrorsAction, SubmitAction, ClearCustomErrorsAction } from './form-actions';

export const FORM_CHANGED = '@@angular-redux/form/FORM_CHANGED';

export interface FormChangeAction {
  type: '@@angular-redux/form/FORM_CHANGED';
  payload: {
    path: string[];
    form: string;
    value: any;
  };
}

export type Actions =
  | InitAction
  | InitCompleteAction
  | SubmitAction
  | ResetAction
  | SetCustomErrorsAction
  | ClearCustomErrorsAction
  | FormChangeAction;
