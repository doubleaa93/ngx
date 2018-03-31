import { Component, Input } from '@angular/core';
import { IControl } from '../../models/control';
import { ControlRenderer } from '../control.renderer';

@Component({
  selector: 'de-re-crud-control-container-renderer',
  templateUrl: './control-container-renderer.component.html'
})
export class ControlContainerRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
