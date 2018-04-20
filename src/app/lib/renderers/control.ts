import { FormGroup } from '@angular/forms';
import { IOption, IField } from '../schema';

export interface IControl {
  form: FormGroup;
  formId: number;
  formPath: string;
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
  onOpenEditor: (e: any, index?: number) => void;
}
