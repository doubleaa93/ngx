import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { v4 as uuid } from 'uuid';
import { IAppState } from '../redux/state';
import { init } from '../redux/actions/schema-actions';
import { DeReCrudOptions } from '../models/options';
import { IField, IBlock } from '../models/schema';
import { FormBuilderService } from '../form-builder.service';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  private fieldsSubscription: Subscription;

  readonly formId: string = uuid();

  @Input() options: DeReCrudOptions;
  fields: string[];
  form: FormGroup;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilderService
  ) {}

  ngOnInit() {
    this.fieldsSubscription = this.ngRedux
      .select('blocks')
      .map((blocks) => {
        const block = blocks[`${this.options.struct}-${this.options.block}`];

        return block && block.fields;
      })
      .do<string[]>((fields) => {
        if (!fields) {
          return;
        }

        this.form = this.fb.group(this.formId, this.options.struct, fields);
      })
      .subscribe((fields) => {
        this.fields = fields;
      });

    this.ngRedux.dispatch(init(this.formId, this.options));
  }

  ngOnDestroy() {
    if (this.fieldsSubscription) {
      this.fieldsSubscription.unsubscribe();
    }
  }
}
