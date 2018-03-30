import { IStruct, IField, IBlock } from '../models/schema';

export interface IAppState {
  structs: IStruct[];
  fields: IField[];
  blocks: IBlock[];
}
