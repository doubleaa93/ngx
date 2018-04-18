import { Component, OnInit, Input } from '@angular/core';
import { ITable } from '../../../lib/renderers/table';

@Component({
  selector: 'de-re-crud-bootstrap3-table-renderer',
  templateUrl: './table-renderer.component.html'
})
export class Bootstrap3TableRendererComponent {
  @Input() table: ITable;
}
