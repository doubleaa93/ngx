import { Component, Input } from '@angular/core';
import { HeadingRenderer, IHeading } from '../../../core/renderers/heading.renderer';

@Component({
  selector: 'de-re-crud-heading-renderer',
  templateUrl: './heading-renderer.component.html'
})
export class Bootstrap3HeadingRendererComponent implements HeadingRenderer {
  @Input() heading: IHeading;
}
