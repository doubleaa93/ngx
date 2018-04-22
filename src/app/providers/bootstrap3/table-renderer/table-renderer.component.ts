import { Component, Input } from '@angular/core';
import { CollectionControlRenderer, IControl } from '../../../core/renderers/control.renderer';
import { IField } from '../../../core/models/schema';

@Component({
  selector: 'de-re-crud-bootstrap3-table-renderer',
  templateUrl: './table-renderer.component.html'
})
export class Bootstrap3TableRendererComponent implements CollectionControlRenderer {
  @Input() control: IControl;
  @Input() fields: IField[];

  getValue(field: IField, value: any) {
    const fieldValue = value[field.name];

    if (fieldValue == null || typeof fieldValue === 'undefined') {
      return '&nbsp;';
    }

    return fieldValue;
  }
}
