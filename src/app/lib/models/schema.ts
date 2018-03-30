export interface IStruct {
  name: string;
  label: string;
  fields: string[];
  blocks: string[];
}

export interface IField {
  id: string;
  struct: string;
  keyField: boolean;
  name: string;
  label: string;
  type: any;
  required: boolean;
  value?: any;
}

export interface ITextField extends IField {
  struct: string;
  type: 'text';
  value: string;
}

export interface IBlock {
  id: string;
  name: string;
  fields: string[];
}
