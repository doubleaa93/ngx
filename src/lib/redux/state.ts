import { IStruct, IField, IBlock } from '../models/schema';
import { State as OptionsState } from './reducers/options-reducer';
import { State as StructsState } from './reducers/structs-reducer';
import { State as FieldsState } from './reducers/fields-reducer';
import { State as BlocksState } from './reducers/blocks-reducer';

export interface IAppState {
  options: OptionsState;
  structs: StructsState;
  fields: FieldsState;
  blocks: BlocksState;
}
