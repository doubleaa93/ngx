import { Component, Input } from '@angular/core';

@Component({
  selector: 'de-re-crud-schema-previewer',
  templateUrl: './schema-previewer.component.html',
  styleUrls: ['./schema-previewer.component.css']
})
export class SchemaPreviewerComponent {
  @Input() value: any;

  type: 'json' | 'html' = 'json';
  struct: Object;
}
