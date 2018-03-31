import { Component, Input } from '@angular/core';
import { ISelectControl } from '../../models/control';
import { ControlRenderer } from '../control.renderer';

@Component({
  selector: 'de-re-crud-select-renderer',
  templateUrl: './select-renderer.component.html',
  styleUrls: ['./select-renderer.component.css']
})
export class SelectRendererComponent implements ControlRenderer {
  @Input() control: ISelectControl;
}
