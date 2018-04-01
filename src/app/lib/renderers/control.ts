import { FormGroup } from '@angular/forms';

export interface IControl {
  form: FormGroup;
  formPath: string;
  type: string;
  htmlId: string;
  key: string;
  label: string;
  submissionErrors: string[];
  onBlur: (e: any) => void;
  onChange: (e: any) => void;
}

export interface ISelectControlOption {
  label: string;
  value: any;
}

export interface ISelectControl extends IControl {
  options: ISelectControlOption[];
}
