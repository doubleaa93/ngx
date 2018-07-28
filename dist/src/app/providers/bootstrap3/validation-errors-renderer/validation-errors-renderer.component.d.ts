import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';
export declare class Bootstrap3ValidationErrorsRendererComponent implements ControlRenderer {
    control: IControl;
    hasError(): boolean;
    getErrors(): string[];
}
