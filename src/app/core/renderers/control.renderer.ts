import { FormGroup } from '@angular/forms';
import { IField, IOption } from '../models/schema';

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
  options: IOption[];
}

export interface ILinkedStructControl extends IControl {
  onAddOrEdit: (e: any, index?: number) => void;
}

export interface ControlRenderer {
  control: IControl;
}

export interface CollectionControlRenderer extends ControlRenderer {
  fields: IField[];

}

export interface LinkedStructControlRenderer extends CollectionControlRenderer {
  layout: 'inline' | 'table';
}
