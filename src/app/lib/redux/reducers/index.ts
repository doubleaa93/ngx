import { combineReducers } from 'redux';
import { structReducer } from './struct-reducer';
import { IAppState } from '../state';
import { fieldReducer } from './field-reducer';
import { blockReducer } from './block-reducer';

export const rootReducer = combineReducers<IAppState>({
  structs: structReducer,
  fields: fieldReducer,
  blocks: blockReducer
});
