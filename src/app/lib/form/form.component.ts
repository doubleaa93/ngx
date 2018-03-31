import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { v4 as uuid } from 'uuid';
import { FormBuilderService } from '../services/form-builder.service';
import { IAppState } from '../redux/state';
import { init } from '../redux/actions/schema-actions';
import { DeReCrudOptions } from '../options';
import { FormSubmission } from '../form-submission';
import {
  submit,
  reset,
  setCustomErrors
} from '../redux/actions/form-actions';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  private _formInstanceSubscription: Subscription;
  private _fieldsSubscription: Subscription;
  readonly formId: string = uuid();
  @Input() options: DeReCrudOptions;
  @Input() cancelVisible: boolean;
  @Input() initialValue: object;
  @Output() submit = new EventEmitter<FormSubmission>();
  @Output() cancel = new EventEmitter<any>();
  fields: string[];
  form: FormGroup;
  submitting: boolean;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilderService
  ) {
  }

  get submitEnabled() {
    return !this.submitting && this.form.valid;
  }

  ngOnInit() {
    this._formInstanceSubscription = this.ngRedux
      .select('forms')
      .map(forms => forms['instances'])
      .map(instances => instances[this.formId])
      .subscribe((instance) => {
        if (!instance) {
          return;
        }

        this.submitting = instance.submitting;
      });

    this._fieldsSubscription = this.ngRedux
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

        if (this.initialValue) {
          this.form.patchValue(this.initialValue);
        }
      })
      .subscribe((fields) => {
        this.fields = fields;
      });

    this.ngRedux.dispatch(init(this.formId, this.options));
  }

  ngOnDestroy() {
    if (this._formInstanceSubscription) {
      this._formInstanceSubscription.unsubscribe();
    }

    if (this._fieldsSubscription) {
      this._fieldsSubscription.unsubscribe();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.ngRedux.dispatch(reset(this.formId));
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.form.valid) {
      return;
    }

    this.ngRedux.dispatch(submit(this.formId));

    this.submit.emit({
      value: this.form.value,
      onComplete: (errors) => {
        if (!errors) {
          this.ngRedux.dispatch(reset(this.formId));
          this.form.reset();
          return;
        }

        this.ngRedux.dispatch(setCustomErrors(this.formId, errors));
      }
    });
  }
}
