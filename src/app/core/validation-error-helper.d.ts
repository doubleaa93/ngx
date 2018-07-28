import { IControl } from './renderers/control.renderer';
export declare class ValidationErrorHelper {
    private static _errorSort;
    private static getFormControlIfErrorFound;
    static hasError(control: IControl): boolean;
    static getErrors(control: IControl): string[];
    static getErrorMessage(error: {
        key: string;
        metadata: any;
    }): string;
}
