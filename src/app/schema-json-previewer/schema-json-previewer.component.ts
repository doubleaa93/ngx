import { Component, Input } from '@angular/core';

@Component({
  selector: 'de-re-crud-schema-json-previewer',
  templateUrl: './schema-json-previewer.component.html',
  styleUrls: ['./schema-json-previewer.component.css']
})
export class SchemaJsonPreviewerComponent {
  @Input() value: any;
}
