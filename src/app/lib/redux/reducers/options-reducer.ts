import { IStruct } from '../../models/schema';
import { Actions } from '../actions';
import { SchemaActions } from '../actions/schema-actions';
import { DeReCrudOptions } from '../../models/options';

export interface State {
  [formId: string]: DeReCrudOptions;
}

export function optionsReducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case SchemaActions.INIT_COMPLETE: {
      const { payload: { formId, options } } = action;
      return { ...state, [formId]: options };
    }
    default:
      return state;
  }
}
