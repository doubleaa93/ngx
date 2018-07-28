import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';
export declare class Bootstrap3ControlContainerRendererComponent implements ControlRenderer {
    control: IControl;
    getClasses(): {
        'has-error': boolean;
        'has-feedback': boolean;
    };
}
