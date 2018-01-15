import { Component } from '@angular/core';

import * as schema from './schema.json';

@Component({
  selector: 'de-re-crud-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  schema = schema;
  struct = 'struct';
  block = 'default';
}
