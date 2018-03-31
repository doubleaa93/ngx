import { Component, OnInit, Input } from '@angular/core';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';
import { IControl } from '../../../lib/models/control';

@Component({
  selector: 'de-re-crud-bootstrap3-control-container-renderer',
  templateUrl: './control-container-renderer.component.html',
  styleUrls: ['./control-container-renderer.component.css']
})
export class ControlContainerRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
