import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeReCrudOptions } from './core/models/options';
import * as schema from './schema.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeReCRUD Schema Builder';
  options: DeReCrudOptions = {
    schema,
    provider: 'bootstrap3',
    struct: 'struct',
    block: 'default'
  };

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }
}
