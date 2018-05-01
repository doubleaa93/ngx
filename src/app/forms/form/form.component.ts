import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { FormStateService } from '../../core/services/form-state.service';
import { DeReCrudOptions } from '../../core/models/options';
import { IField } from '../../core/models/schema';
import { FormSubmission, FormSubmissionErrors } from '../../core/models/form-submission';
import { FormChange } from '../../core/models/form-change';
import { FormState } from '../../core/models/form-state';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  private _navigationChangeSubscription: Subscription;
  private _formChangeSubscription: Subscription;
  private _cancelVisible: boolean;
  private _formSubmissionErrors: FormSubmissionErrors;
  
  @Input() options: DeReCrudOptions;
  @Input() value: object;
  @Output() valueChange = new EventEmitter<FormChange>();
  @Output() submit = new EventEmitter<FormSubmission>();
  @Output() cancel = new EventEmitter<any>();

  fields: IField[];
  state: FormState;
  parentPath: string;
  parentForm: FormGroup;
  navigationState: FormState;
  submitting: boolean;

  constructor(private stateService: FormStateService) {}

  get cancelVisible() {
    return this.navigationState.id !== this.state.id || this._cancelVisible;
  }

  @Input()
  set cancelVisible(value: boolean) {
    this._cancelVisible = value;
  }

  @Input()
  set serverSideErrors(value: FormSubmissionErrors)
  {
    this._formSubmissionErrors = value;

    if (this.state)
      this.update();
  }

  get submitEnabled() {
    return !this.submitting && this.navigationState.form.valid;
  }

  get cancelEnabled() {
    return !this.submitting;
  }

  ngOnInit() {
    this.state = this.stateService.create(this.options, this.value);
    if (this._formSubmissionErrors)
      this.state.submissionErrors = this._formSubmissionErrors;
    this.update();

    this._navigationChangeSubscription = this.state.onNavigationChange.subscribe(() => {
      this.update();
    });

    this._formChangeSubscription = this.state.onValueChange.subscribe((change) => {
      this.valueChange.emit(change);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && !changes.value.firstChange) {
      this.stateService.update(this.state.id, changes.value.currentValue);
    }
  }

  ngOnDestroy() {
    if (this._navigationChangeSubscription) {
      this._navigationChangeSubscription.unsubscribe();
    }

    if (this._formChangeSubscription) {
      this._formChangeSubscription.unsubscribe();
    }

    this.stateService.remove(this.state.id);
  }

  update() {
    const { navigationStack } = this.state;

    let state = this.state;

    if (navigationStack.length) {
      state = this.stateService.get(navigationStack[navigationStack.length - 1].id);
    }

    const { options } = state;
    const blockFields = this.getBlockFields(options.struct, options.block);

    this.navigationState = state;
    this.fields = blockFields;
  }

  getBlockFields(struct: string, block: string) {
    const { blocks, fields } = this.state;
    const references = blocks[`${struct}-${block}`].fields;

    const blockFields = [];

    for (const reference of references) {
      blockFields.push(fields[`${struct}-${reference.field}`]);
    }

    return blockFields;
  }

  onCancel(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.cancelEnabled) {
      return;
    }

    if (this.navigationState.id !== this.state.id) {
      this.stateService.popNavigation(this.state.id);
      return;
    }

    this.cancel.emit();
    this.state.form.reset();
  }

  onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.navigationState.form.valid || !this.submitEnabled) {
      return;
    }

    if (this.navigationState.id !== this.state.id) {
      this.stateService.completeNavigation(this.state.id);
      return;
    }

    this.submitting = true;

    this.submit.emit({
      value: this.state.form.value,
      onComplete: (errors) => {
        if (!errors) {
          this.stateService.clearErrors(this.state.id);
          this.state.form.reset();
        } else {
          this.stateService.setErrors(this.state.id, errors);
        }

        this.submitting = false;
      }
    });
  }
}
