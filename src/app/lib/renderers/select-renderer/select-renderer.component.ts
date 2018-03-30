import { Component, Input } from '@angular/core';
import { SelectControl } from '../../models/control';

@Component({
  selector: 'de-re-crud-select-renderer',
  templateUrl: './select-renderer.component.html',
  styleUrls: ['./select-renderer.component.css']
})
export class SelectRendererComponent {
  @Input() control: SelectControl;
}
