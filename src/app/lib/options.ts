export interface DeReCrudOptions extends DeReCrudStyleOptions {
  provider: 'bootstrap3';
  schema: any;
  struct: string;
  block: string;
}

export interface DeReCrudStyleOptions {
  extraButtonClasses?: string[];
}
