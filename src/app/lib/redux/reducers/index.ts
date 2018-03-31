import { combineReducers } from 'redux';
import { IAppState } from '../state';
import { optionsReducer } from './options-reducer';
import { structsReducer } from './structs-reducer';
import { fieldsReducer } from './fields-reducer';
import { blocksReducer } from './blocks-reducer';
import { formsReducer } from './forms-reducer';

export const rootReducer = combineReducers<IAppState>({
  options: optionsReducer,
  structs: structsReducer,
  fields: fieldsReducer,
  blocks: blocksReducer,
  forms: formsReducer
});
