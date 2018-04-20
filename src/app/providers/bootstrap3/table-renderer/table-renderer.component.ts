import { Component, OnInit, Input } from '@angular/core';
import { ITable } from '../../../lib/renderers/table';
import { TableRenderer } from '../../../lib/renderers/table.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-table-renderer',
  templateUrl: './table-renderer.component.html'
})
export class Bootstrap3TableRendererComponent implements TableRenderer {
  @Input() table: ITable;
}
