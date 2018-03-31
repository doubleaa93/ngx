import { FormGroup } from '@angular/forms';

export interface IControl {
  form: FormGroup;
  type: string;
  htmlId: string;
  key: string;
  label: string;
}

interface ISelectControlOption {
  label: string;
  value: any;
}

export interface ISelectControl extends IControl {
  options: ISelectControlOption[];
}
