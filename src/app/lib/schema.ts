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
  description?: string;
  initialValue?: any;
  minLength?: number;
  maxLength?: number;
}

export interface ITextField extends IField {
  type: 'text';
  initialValue?: string;
}

export interface IListField extends IField {
  type: 'list';
  options: IOption[];
}

export interface IOption {
  label: string;
  value: any;
}

export interface IReferenceField extends IField {
  reference: {
    name: string;
    labelField: string;
    block: string;
  };
}

export interface ILinkedStructField extends IReferenceField {
  type: 'linkedStruct';
  initialValue?: any[];
}

export interface IForeignKeyField extends IReferenceField {
  type: 'foreignKey';
  initialValue?: object;
}

export interface IBlock {
  name: string;
  struct: string;
  fields: { field: string; condition?: string }[];
}
