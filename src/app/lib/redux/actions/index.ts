import { InitAction, InitCompleteAction } from './schema-actions';

export const FORM_CHANGED = '@@angular-redux/form/FORM_CHANGED';

export interface FormChangeAction {
  type: '@@angular-redux/form/FORM_CHANGED';
  payload: {
    path: string[];
    form: string;
    valid: boolean;
    value: any;
  };
}

export type Actions = InitAction | InitCompleteAction | FormChangeAction;
