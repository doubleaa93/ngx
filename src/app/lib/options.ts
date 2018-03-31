export interface DeReCrudOptions extends DeReCrudStyleOptions {
  provider: 'bootstrap3';
  schema: any;
  struct: string;
  block: any;
  value?: any;
}

export interface DeReCrudStyleOptions {
  extraButtonClasses?: string[];
}
