import { CollectionControlRenderer, ICollectionControl } from '../../../core/renderers/control.renderer';
import { IField } from '../../../core/models/schema';
export declare class Bootstrap3TableRendererComponent implements CollectionControlRenderer {
    control: ICollectionControl;
    getValue(field: IField, value: any): any;
}
