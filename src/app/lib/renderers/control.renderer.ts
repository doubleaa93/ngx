import { IControl } from './control';
import { IField } from '../schema';

export interface ControlRenderer {
  control: IControl;
}

export interface CollectionControlRenderer extends ControlRenderer {
  fields: IField[];
  layout: 'inline' | 'table';
}
