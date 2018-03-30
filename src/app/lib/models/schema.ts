export interface IStruct {
  name: string;
  label: string;
  fields: string[];
}

export interface IField {
  struct: string;
  keyField: boolean;
  name: string;
  label: string;
  type: any;
  required: boolean;
  value: any;
}

export interface ITextField extends IField {
  struct: string;
  type: 'text';
  value: string;
}

export interface IBlock {
  name: string;
  fields: string[];
}
