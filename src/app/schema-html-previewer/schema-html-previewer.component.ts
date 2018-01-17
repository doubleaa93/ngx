import { Component, Input } from '@angular/core';

@Component({
  selector: 'de-re-crud-schema-html-previewer',
  templateUrl: './schema-html-previewer.component.html',
  styleUrls: ['./schema-html-previewer.component.css'],
})
export class SchemaHtmlPreviewerComponent {
  schema: any[];
  block: string;
  struct: string;

  get structs() {
    if (!this.schema) {
      return null;
    }

    return this.schema;
  }

  get blocks() {
    if (!this.struct) {
      return null;
    }

    const struct = this.structs.find(item => item.name === this.struct);
    if (!struct) {
      return null;
    }

    return struct.blocks;
  }

  @Input()
  set value(value: any[]) {
    this.schema = value;
  }
}
