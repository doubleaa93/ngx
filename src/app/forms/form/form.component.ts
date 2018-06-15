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
import { AbstractControl } from '@angular/forms';
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

  @Input() options: DeReCrudOptions;
  @Input() value: object;
  @Input() errors: FormSubmissionErrors;
  @Output() valueChange = new EventEmitter<FormChange>();
  @Output() submit = new EventEmitter<FormSubmission>();
  @Output() cancel = new EventEmitter<any>();

  fields: IField[];
  state: FormState;
  submitting: boolean;

  constructor(private stateService: FormStateService) {}

  get cancelVisible() {
    return !!this.state.navigationStack.length || this._cancelVisible;
  }

  @Input()
  set cancelVisible(value: boolean) {
    this._cancelVisible = value;
  }

  get submitEnabled() {
    return !this.submitting && this.form.valid;
  }

  get cancelEnabled() {
    return !this.submitting;
  }

  get struct() {
    const { navigationStack } = this.state;
    const navigationStackCount = navigationStack.length;

    return navigationStackCount
      ? navigationStack[navigationStackCount - 1].struct
      : this.state.options.struct;
  }

  get block() {
    const { navigationStack } = this.state;
    const navigationStackCount = navigationStack.length;

    return navigationStackCount
      ? navigationStack[navigationStackCount - 1].block
      : this.state.options.block;
  }

  get form() {
    const { navigationStack } = this.state;
    const navigationStackCount = navigationStack.length;

    return navigationStackCount
      ? this.state.form.get(navigationStack[navigationStackCount - 1].path)
      : this.state.form;
  }

  get parentPath() {
    const { navigationStack } = this.state;
    const navigationStackCount = navigationStack.length;

    return navigationStackCount
      ? navigationStack[navigationStackCount - 1].parentPath
      : null;
  }

  get parentForm(): (AbstractControl | null) {
    const { navigationStack } = this.state;
    const navigationStackCount = navigationStack.length;

    return navigationStackCount
      ? this.state.form.get(navigationStack[navigationStackCount - 1].parentPath)
      : null;
  }

  ngOnInit() {
    this.state = this.stateService.create(this.options, this.value, this.errors);
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

    if (changes.errors && !changes.errors.firstChange) {
      this.stateService.setErrors(this.state.id, changes.errors.currentValue);
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
    const { options, navigationStack } = this.state;

    let struct;
    let block;

    const child = navigationStack[navigationStack.length - 1];
    if (child) {
      ({ struct, block } = child);
    } else {
      ({ struct, block } = options);
    }

    const blockFields = this.getBlockFields(struct, block);

    this.fields = blockFields;
  }

  getBlockFields(struct: string, blockName: string) {
    const { blocks, fields } = this.state;
    if (!blocks || !fields) {
       // TODO: Log error
      return [];
    }


    const block = blocks[`${struct}-${blockName}`];

    if (!block) {
      // TODO: Log error
      return [];
    }

    const references = block.fields;

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

    if (this.state.navigationStack.length) {
      this.stateService.popNavigation(this.state.id);
      return;
    }

    this.cancel.emit();
    this.state.form.reset();
  }

  onSubmit(e) {
    e.stopPropagation();
    e.preventDefault();

    if (!this.submitEnabled) {
      return;
    }

    if (this.state.navigationStack.length) {
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
