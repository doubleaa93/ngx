export type HeaderSize = 1|2|3|4|5|6;

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
  help?: string;
  initialValue?: any;
}

export interface IStampField extends IField {
  type: 'stamp';
  hints?: {
    headerSize?: HeaderSize;
    displayClassNames?: string[];
  };
}

export interface ITextField extends IField {
  type: 'text';
  initialValue?: string;
  minLength?: number;
  maxLength?: number;
}

export interface IIntegerField extends IField {
  type: 'integer';
  min?: number;
  max?: number;
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
    struct: string;
    labelField: string;
    block: string;
  };
}

export interface ILinkedStructField extends IReferenceField {
  type: 'linkedStruct';
  initialValue?: any[];
  minInstances?: number;
  maxInstances?: number;
}

export interface IForeignKeyField extends IReferenceField {
  type: 'foreignKey';
  initialValue?: object;
}

export interface IBlock {
  name: string;
  struct: string;
  fields: (IFieldReference | ILinkedStructFieldReference)[];
}

export interface IFieldReference {
  field: string;
  condition: (value: any, rootValue: any) => boolean;
}

export interface ILinkedStructFieldReference extends IFieldReference {
  hints?: {
    layout?: 'inline' | 'table'
    block?: string;
  };
}
