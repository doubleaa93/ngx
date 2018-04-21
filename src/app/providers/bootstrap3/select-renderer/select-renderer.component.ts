import { Component, Input } from '@angular/core';
import { ControlRenderer, ISelectControl } from '../../../core/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-select-renderer',
  templateUrl: './select-renderer.component.html'
})
export class Bootstrap3SelectRendererComponent implements ControlRenderer {
  @Input() control: ISelectControl;
}
