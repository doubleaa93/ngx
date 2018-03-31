import { Component, Input } from '@angular/core';
import { ISelectControl } from '../../../lib/renderers/control';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-select-renderer',
  templateUrl: './select-renderer.component.html'
})
export class Bootstrap3SelectRendererComponent implements ControlRenderer {
  @Input() control: ISelectControl;
}
