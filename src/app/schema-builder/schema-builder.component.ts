import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Options from '../options';

import * as schema from '../schema.json';

@Component({
  selector: 'de-re-crud-schema-builder',
  templateUrl: './schema-builder.component.html',
  styleUrls: ['./schema-builder.component.css']
})
export class SchemaBuilderComponent implements OnInit {
  @Output() valueChange = new EventEmitter<any>();

  value: any[] = [];
  schema: any = schema;
  options: Options = new Options();

  ngOnInit(): void {
    this.options.inlineCollections = false;
    this.options.references = {
      fields: (value) => {
        return [{name: 'field', value: 'test'}];
      }
    };
  }

  onImportFile($event: any): void {
    const file: File = $event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = () => {
      try {
        const json = JSON.parse(reader.result);

        // TODO: Validate json against schema
        this.value = json;
      } catch (e) {
      }
    };

    reader.readAsText(file);
  }
}
