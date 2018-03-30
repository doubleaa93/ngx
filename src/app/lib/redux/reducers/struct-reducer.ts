import { IStruct } from '../../models/schema';
import { Actions } from '../actions';
import { SchemaActions } from '../actions/schema-actions';

export function structReducer(state: IStruct[] = [], action: Actions) {
  switch (action.type) {
    default:
      return state;
  }
}
