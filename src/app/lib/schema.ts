export interface IStruct {
  name: string;
  label: string;
  fields: string[];
  blocks: string[];
}

export interface IField {
  name: string;
  struct: string;
  keyField: boolean;
  label: string;
  type: any;
  required: boolean;
  initialValue?: any;
  minLength?: number;
  maxLength?: number;
}

export interface ITextField extends IField {
  struct: string;
  type: 'text';
  initialValue?: string;
}

export interface IBlock {
  name: string;
  struct: string;
  fields: string[];
}
