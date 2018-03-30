import { IStruct } from '../../models/schema';
import { Actions } from '../actions';
import { SchemaActions } from '../actions/schema-actions';

export interface State {
  [key: string]: IStruct;
}

export function structsReducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case SchemaActions.INIT_COMPLETE:
      return action.payload.structs.reduce<State>((acc, current) => {
        acc[current.name] = current;
        return acc;
      }, {});
    default:
      return state;
  }
}
