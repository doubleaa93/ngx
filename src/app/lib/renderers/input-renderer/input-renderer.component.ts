import { Component, Input } from '@angular/core';
import { IControl } from '../../models/control';
import { ControlRenderer } from '../control.renderer';

@Component({
  selector: 'de-re-crud-input-renderer',
  templateUrl: './input-renderer.component.html'
})
export class InputRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
