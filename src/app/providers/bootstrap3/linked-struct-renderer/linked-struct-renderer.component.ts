import { Component, Input } from '@angular/core';
import { CollectionControlRenderer, ILinkedStructControl } from '../../../core/renderers/control.renderer';
import { IField } from '../../../core/models/schema';

@Component({
  selector: 'de-re-crud-bootstrap3-linked-struct-renderer',
  templateUrl: './linked-struct-renderer.component.html',
  styleUrls: ['./linked-struct-renderer.component.css']
})
export class Bootstrap3LinkedStructRendererComponent implements CollectionControlRenderer {
  @Input() control: ILinkedStructControl;
  @Input() fields: IField[];
  @Input() layout: 'inline' | 'table';
}
