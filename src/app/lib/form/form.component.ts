import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { v4 as uuid } from 'uuid';
import { FormBuilderService } from '../services/form-builder.service';
import { IAppState } from '../redux/state';
import { init } from '../redux/actions/schema-actions';
import { DeReCrudOptions } from '../options';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  private fieldsSubscription: Subscription;

  readonly formId: string = uuid();
  @Input() options: DeReCrudOptions;
  @Input() cancelVisible: boolean;
  @Input() initialValue: object;
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
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

    this.ngRedux.dispatch(init(this.formId, this.options, this.initialValue));
  }

  ngOnDestroy() {
    if (this.fieldsSubscription) {
      this.fieldsSubscription.unsubscribe();
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.submit.emit(this.form.value);
  }
}
