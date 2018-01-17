import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'de-re-crud-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Schema Builder';
  value = [];

  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  onValueChange(value: Array<any>): any {
    this.value = value;
  }
}
