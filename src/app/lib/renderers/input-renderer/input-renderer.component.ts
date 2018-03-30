import { Component, Input } from '@angular/core';
import { IControl } from '../../models/control';

@Component({
  selector: 'de-re-crud-input-renderer',
  templateUrl: './input-renderer.component.html',
  styleUrls: ['./input-renderer.component.css']
})
export class InputRendererComponent {
  @Input() control: IControl;
}
