import { DeReCrudOptions } from '../../options';
import { IStruct, IField, IBlock } from '../../schema';

export enum SchemaActions {
  INIT,
  INIT_COMPLETE
}

export interface InitAction {
  type: SchemaActions.INIT;
  payload: { formId: string; options: DeReCrudOptions; value: object };
}

export interface InitCompleteAction {
  type: SchemaActions.INIT_COMPLETE;
  payload: {
    formId: string;
    options: DeReCrudOptions;
    structs: IStruct[];
    fields: IField[];
    blocks: IBlock[];
    value: object;
  };
}

export const init = (
  formId: string,
  options: DeReCrudOptions,
  value: object
): InitAction => ({
  type: SchemaActions.INIT,
  payload: { formId, options, value }
});
