import { Component, Input } from '@angular/core';
import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';

@Component({
  selector: 'de-re-crud-bootstrap3-label-renderer',
  templateUrl: './label-renderer.component.html'
})
export class Bootstrap3LabelRendererComponent implements ControlRenderer {
  @Input() control: IControl;
}
