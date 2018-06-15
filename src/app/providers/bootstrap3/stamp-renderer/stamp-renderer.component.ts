import { Component, Input } from '@angular/core';
import { StampRenderer, IStamp } from '../../../core/renderers/stamp.renderer';

@Component({
  selector: 'de-re-crud-stamp-renderer',
  templateUrl: './stamp-renderer.component.html'
})
export class Bootstrap3StampRendererComponent implements StampRenderer {
  @Input() stamp: IStamp;
}
