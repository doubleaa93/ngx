import { Component, Input } from '@angular/core';
import { IControl } from '../../models/control';

@Component({
  selector: 'de-re-crud-label-renderer',
  templateUrl: './label-renderer.component.html',
  styleUrls: ['./label-renderer.component.css']
})
export class LabelRendererComponent {
  @Input() control: IControl;
}
