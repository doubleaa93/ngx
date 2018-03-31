import { Component, Input } from '@angular/core';
import { IControl } from '../../../lib/renderers/control';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-input-renderer',
  templateUrl: './input-renderer.component.html'
})
export class Bootstrap3InputRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
