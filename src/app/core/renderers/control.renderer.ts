import { FormGroup } from '@angular/forms';
import { IField, IOption, IReferenceField } from '../models/schema';

export interface IControl {
  form: FormGroup;
  formId: number;
  formPath: string;
  value: any;
  htmlId: string;
  rendererType: string;
  field: IField;
  submissionErrors: string[];
  onBlur: (e: any) => void;
  onChange: (e: any) => void;
}

export interface ISelectControl extends IControl {
  options: ((rootValue: any) => IOption[]);
}

export interface ICollectionControl extends IControl {
  field: IReferenceField;
  fields: IField[];
  layout: 'inline' | 'table';
  onAdd: (e) => void;
}

export interface ControlRenderer {
  control: IControl;
}

export interface CollectionControlRenderer {
  control: ICollectionControl;
}
