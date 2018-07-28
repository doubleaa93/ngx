import { HeaderSize } from './schema';
export interface DeReCrudStyleOptions {
    headerSize?: HeaderSize;
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
export interface DeReCrudOptions extends DeReCrudStyleOptions {
    provider: 'bootstrap3';
    changeNotificationType?: 'change' | 'blur';
    schema: any;
    struct: string;
    block: string;
}
