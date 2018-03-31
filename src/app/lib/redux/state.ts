import { State as OptionsState } from './reducers/options-reducer';
import { State as StructsState } from './reducers/structs-reducer';
import { State as FieldsState } from './reducers/fields-reducer';
import { State as BlocksState } from './reducers/blocks-reducer';
import { State as FormsState } from './reducers/forms-reducer';
import { IStruct, IField, IBlock } from '../schema';

export interface IAppState {
  options: OptionsState;
  structs: StructsState;
  fields: FieldsState;
  blocks: BlocksState;
  forms: FormsState;
}
