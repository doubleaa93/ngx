import { Component, Input } from '@angular/core';
import { CollectionControlRenderer, ICollectionControl } from '../../../core/renderers/control.renderer';
import { IField } from '../../../core/models/schema';

@Component({
  selector: 'de-re-crud-bootstrap3-inline-renderer',
  templateUrl: './inline-renderer.component.html',
  styleUrls: ['./inline-renderer.component.css']
})
export class Bootstrap3InlineRendererComponent implements CollectionControlRenderer {
  @Input() control: ICollectionControl;
}
