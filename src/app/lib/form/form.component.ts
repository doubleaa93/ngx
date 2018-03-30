import { Component, Input, OnInit } from '@angular/core';
import { DeReCrudOptions } from '../models/options';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/state';
import { init } from '../redux/actions/schema-actions';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private formId: string = uuid();

  @Input() options: DeReCrudOptions;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.ngRedux.dispatch(init(this.formId, this.options));
  }
}
