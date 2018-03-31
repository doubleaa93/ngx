import { Component, Input } from '@angular/core';
import { IControl } from '../../models/control';
import { ControlRenderer } from '../control.renderer';

@Component({
  selector: 'de-re-crud-label-renderer',
  templateUrl: './label-renderer.component.html'
})
export class LabelRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
