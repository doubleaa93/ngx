import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import 'rxjs/add/operator/do';
import { DeReCrudOptions } from '../options';
import { FormSubmission } from '../form-submission';
import { FormState, FormStateService } from '../services/form-state.service';

@Component({
  selector: 'de-re-crud-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() options: DeReCrudOptions;
  @Input() cancelVisible: boolean;
  @Input() value: object;
  @Output() submit = new EventEmitter<FormSubmission>();
  @Output() cancel = new EventEmitter<any>();
  state: FormState;
  submitting: boolean;

  constructor(private stateService: FormStateService) {}

  get submitEnabled() {
    return !this.submitting && this.state.form.valid;
  }

  ngOnInit() {
    this.state = this.stateService.create(this.options, this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && !changes.value.firstChange) {
      this.stateService.update(this.state.id, changes.value.currentValue);
    }
  }

  ngOnDestroy() {
    this.stateService.remove(this.state.id);
  }

  onCancel() {
    this.cancel.emit();
    this.state.form.reset();
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.state.form.valid) {
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
