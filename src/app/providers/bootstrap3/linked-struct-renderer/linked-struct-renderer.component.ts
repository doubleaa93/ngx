import { Component, Input, OnInit } from '@angular/core';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';
import { ITable } from '../../../lib/renderers/table';
import { ILinkedStructControl } from '../../../lib/renderers/control';

@Component({
  selector: 'de-re-crud-bootstrap3-linked-struct-renderer',
  templateUrl: './linked-struct-renderer.component.html',
  styleUrls: ['./linked-struct-renderer.component.css']
})
export class Bootstrap3LinkedStructRendererComponent implements ControlRenderer, OnInit {
  @Input() control: ILinkedStructControl;
  table: ITable;

  ngOnInit() {
    const { form, formId, field } = this.control;

    this.table = {
      form,
      formId,
      field
    };
  }
}
