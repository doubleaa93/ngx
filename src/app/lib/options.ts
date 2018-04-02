export interface DeReCrudOptions extends DeReCrudStyleOptions {
  provider: 'bootstrap3';
  schema: any;
  struct: string;
  block: string;
}

export interface DeReCrudStyleOptions {
  submitButtonStyle?: {
    class?: string;
    text?: string;
    appendSchemaLabel?: boolean;
  };

  cancelButtonStyle?: {
    class?: string;
    text?: string;
  };

  extraButtonClasses?: string[];
}
