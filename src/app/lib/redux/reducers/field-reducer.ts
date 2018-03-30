import { IField } from '../../models/schema';
import { Actions } from '../actions';

export function fieldReducer(state: IField[] = [], action: Actions) {
  switch (action.type) {
    default:
      return state;
  }
}
