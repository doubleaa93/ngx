import { IBlock } from '../../models/schema';
import { Actions } from '../actions';
import { SchemaActions } from '../actions/schema-actions';

export interface State {
  [key: string]: IBlock;
}

export function blocksReducer(state: State = {}, action: Actions) {
  switch (action.type) {
    case SchemaActions.INIT_COMPLETE:
      return action.payload.blocks.reduce<State>((acc, current) => {
        acc[current.id] = current;
        return acc;
      }, {});
    default:
      return state;
  }
}
