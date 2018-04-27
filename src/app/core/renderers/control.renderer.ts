import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { IField, IOption, IReferenceField } from '../models/schema';
import { IStamp } from './stamp.renderer';

export interface IControl {
  form: FormGroup;
  formId: number;
  formPath: string;
  value: AbstractControl;
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
  stamp: IStamp;
  field: IReferenceField;
  nestedFields: IField[];
  nestedValues: FormGroup[];
  layout: 'inline' | 'table';
  value: FormArray;
  canAdd: boolean;
  onAdd: (e) => void;
}

export interface ControlRenderer {
  control: IControl;
}

export interface SelectControlRenderer {
  control: ISelectControl;
}

export interface CollectionControlRenderer {
  control: ICollectionControl;
}
