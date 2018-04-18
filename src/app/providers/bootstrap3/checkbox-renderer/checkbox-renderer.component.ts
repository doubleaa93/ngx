import { Component, Input } from '@angular/core';
import { IControl } from '../../../lib/renderers/control';

@Component({
  selector: 'de-re-crud-bootstrap3-checkbox-renderer',
  templateUrl: './checkbox-renderer.component.html'
})
export class Bootstrap3CheckboxRendererComponent {
  @Input() control: IControl;
}
