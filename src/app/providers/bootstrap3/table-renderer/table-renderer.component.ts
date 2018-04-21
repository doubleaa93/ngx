import { Component, Input } from '@angular/core';
import { CollectionControlRenderer } from '../../../lib/renderers/control.renderer';
import { IField } from '../../../lib/schema';
import { IControl } from '../../../lib/renderers/control';

@Component({
  selector: 'de-re-crud-bootstrap3-table-renderer',
  templateUrl: './table-renderer.component.html'
})
export class Bootstrap3TableRendererComponent implements CollectionControlRenderer {
  @Input() control: IControl;
  @Input() fields: IField[];
  layout: 'inline' | 'table';
}
