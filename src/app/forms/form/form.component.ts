import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import 'rxjs/add/operator/do';
import { FormState, FormStateService } from '../../core/services/form-state.service';
import { Subscription } from 'rxjs/Subscription';
import { DeReCrudOptions } from '../../core/models/options';
import { IField } from '../../core/models/schema';
import { FormSubmission } from '../../core/models/form-submission';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  private _navigationChangeSubscription: Subscription;
  private _cancelVisible: boolean;
  @Input() options: DeReCrudOptions;
  @Input() value: object;
  @Output() submit = new EventEmitter<FormSubmission>();
  @Output() cancel = new EventEmitter<any>();
  navigationId: number;
  fields: IField[];
  state: FormState;
  submitting: boolean;

  constructor(private stateService: FormStateService, private changeDetectorRef: ChangeDetectorRef ) {}

  get cancelVisible() {
    return this.navigationId !== this.state.id || this._cancelVisible;
  }

  @Input()
  set cancelVisible(value: boolean) {
    this._cancelVisible = value;
  }

  get submitEnabled() {
    return !this.submitting && this.state.form.valid;
  }

  get cancelEnabled() {
    return !this.submitting;
  }

  ngOnInit() {
    this.state = this.stateService.create(this.options, this.value);
    this.update();

    this._navigationChangeSubscription = this.state.onNavigationChange.subscribe(() => {
      this.update();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && !changes.value.firstChange) {
      this.stateService.update(this.state.id, changes.value.currentValue);
    }
  }

  ngOnDestroy() {
    this._navigationChangeSubscription.unsubscribe();
    this.stateService.remove(this.state.id);
  }

  update() {
    const { navigationStack } = this.state;

    let state = this.state;

    if (navigationStack.length) {
      state = this.stateService.get(navigationStack[navigationStack.length - 1]);
    }

    const { blocks, fields, options } = state;
    const fieldReferences = blocks[`${options.struct}-${options.block}`].fields;
    const blockFields = fieldReferences.map(
      fieldReference => fields[`${options.struct}-${fieldReference.field}`]
    );

    this.navigationId = state.id;
    this.fields = blockFields;
  }

  onCancel(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.cancelEnabled) {
      return;
    }

    if (this.navigationId !== this.state.id) {
      this.stateService.popNavigation(this.state.id);
      return;
    }

    this.cancel.emit();
    this.state.form.reset();
  }

  onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.state.form.valid || !this.submitEnabled) {
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
