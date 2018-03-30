import { DeReCrudOptions } from '../../models/options';
import { IStruct, IField, IBlock } from '../../models/schema';

export enum SchemaActions {
  INIT,
  INIT_COMPLETE
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
