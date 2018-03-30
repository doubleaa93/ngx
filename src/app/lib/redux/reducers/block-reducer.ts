import { IBlock } from '../../models/schema';
import { Actions } from '../actions';

export function blockReducer(state: IBlock[] = [], action: Actions) {
  switch (action.type) {
    default:
      return state;
  }
}
