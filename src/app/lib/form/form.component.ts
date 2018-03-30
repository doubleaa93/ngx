import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { v4 as uuid } from 'uuid';
import { IAppState } from '../redux/state';
import { init } from '../redux/actions/schema-actions';
import { DeReCrudOptions } from '../models/options';
import { IField, IBlock } from '../models/schema';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private blocksSubscription: Subscription;

  readonly formId: string = uuid();

  @Input() options: DeReCrudOptions;
  blocks$: Observable<IBlock[]>;
  fields$: Observable<IField[]>;

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.fields$ = this.ngRedux
      .select('blocks')
      .map(
        blocks => blocks[`${this.options.struct}-${this.options.block}`].fields
      );

    this.ngRedux.dispatch(init(this.formId, this.options));
  }
}
