import Options from '../options';

export interface IAppState {
  instances: {[id: string]: IFormState}
}

export interface IFormState {
  id: string;
  options: Options;
  parentId: string;
}
