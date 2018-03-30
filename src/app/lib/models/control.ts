export interface Control {
  type: string;
  htmlId: string;
  key: string;
  cssNames?: string;
  label: string;
  labelCssNames?: string;
  value?: any;
}

interface SelectControlOption {
  label: string;
  value: any;
}

export interface SelectControl extends Control {
  options: SelectControlOption[];
}
