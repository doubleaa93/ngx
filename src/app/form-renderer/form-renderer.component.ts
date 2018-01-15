import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { FormBuilderService } from '../form-builder.service';
import Options from '../options';

@Component({
  selector: 'de-re-crud-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent {
  @Input() form: FormGroup;
  @Input() struct: any;
  @Input() block: string;

  @Input() options: Options;
  @Input() submitButtonText = 'Submit';
  @Input() value: Object;
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilderService) {
  }

  onAddItem(args: { form: FormGroup, field: any }): void {
    const form = args.form || this.form;
    const value = form.get(args.field.name) as FormArray;
    value.push(this.formBuilder.createFormGroup(args.field.reference, args.field.reference.reference.block));
  }

  onRemoveItem(args: { form: FormGroup, field: any, index: number }): void {
    const form = args.form || this.form;
    const value = form.get(args.field.name) as FormArray;
    value.removeAt(args.index);
  }

  onSubmit(): void {
    this.formSubmit.emit(this.form);
  }
}
