import { Component, Input } from '@angular/core';
import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html'
})
export class Bootstrap3CheckboxRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
