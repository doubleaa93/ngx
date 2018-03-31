import { DeReCrudOptions } from '../../options';
import { IStruct, IField, IBlock } from '../../schema';

export enum SchemaActions {
  INIT = 0,
  INIT_COMPLETE = 1
}

export interface InitAction {
  type: SchemaActions.INIT;
  payload: { formId: string; options: DeReCrudOptions };
}

export interface InitCompleteAction {
  type: SchemaActions.INIT_COMPLETE;
  payload: {
    formId: string;
    options: DeReCrudOptions;
    structs: IStruct[];
    fields: IField[];
    blocks: IBlock[];
  };
}

export const init = (formId: string, options: DeReCrudOptions): InitAction => ({
  type: SchemaActions.INIT,
  payload: { formId, options }
});
