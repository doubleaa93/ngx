import { DeReCrudOptions } from '../../models/options';

export enum SchemaActions {
  INIT = 'INIT'
}

export interface InitAction {
  type: SchemaActions.INIT;
  formId: string;
  options: DeReCrudOptions;
}

export const init = (formId: string, options: DeReCrudOptions): InitAction => ({
  formId,
  options,
  type: SchemaActions.INIT
});
