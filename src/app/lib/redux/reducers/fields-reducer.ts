import { Actions } from '../actions';
import { SchemaActions } from '../actions/schema-actions';
import { IField } from '../../schema';

export interface State {
  [key: string]: IField;
}

export function fieldsReducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case SchemaActions.INIT_COMPLETE:
      return action.payload.fields.reduce<State>((acc, current) => {
        acc[current.id] = current;
        return acc;
      }, {});
    default:
      return state;
  }
}
