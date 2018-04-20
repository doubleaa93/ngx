import { Component, Input } from '@angular/core';
import { IControl } from '../../../lib/renderers/control';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html'
})
export class Bootstrap3CheckboxRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
