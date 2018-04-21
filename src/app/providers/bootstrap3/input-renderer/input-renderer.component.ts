import { Component, Input } from '@angular/core';
import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-input-renderer',
  templateUrl: './input-renderer.component.html'
})
export class Bootstrap3InputRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
