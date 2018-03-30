import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeReCrudOptions } from './lib/models/options';
import * as schema from './lib/schema.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeReCRUD Schema Builder';
  options: DeReCrudOptions = {
    schema,
    struct: 'struct',
    block: 'default'
  };

  constructor(private titleService: Title) {
    titleService.setTitle(this.title);
  }
}
