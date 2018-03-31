import { FormGroup } from '@angular/forms';

export interface IControl {
  form: FormGroup;
  type: string;
  htmlId: string;
  key: string;
  cssNames?: string;
  label: string;
  labelCssNames?: string;
  value?: any;
}

interface ISelectControlOption {
  label: string;
  value: any;
}

export interface ISelectControl extends IControl {
  options: ISelectControlOption[];
}
