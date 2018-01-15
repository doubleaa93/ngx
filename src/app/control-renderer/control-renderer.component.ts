import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import Options from '../options';
import { FormBuilderService } from '../form-builder.service';

@Component({
  selector: 'de-re-crud-control-renderer',
  templateUrl: './control-renderer.component.html',
  styleUrls: ['./control-renderer.component.css']
})
export class ControlRendererComponent {
  @Input() form: FormGroup;
  @Input() field: any;
  @Input() options: Options;
  @Output() addItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilderService) {
  }

  isSimpleField(field: any) {
    switch (field.type) {
      case 'text':
      case 'integer':
      case 'date':
        return true;
      default:
        return false;
    }
  }

  isReferenceField(field: any) {
    switch (field.type) {
      case 'foreignKey':
      case 'linkedStruct':
        return true;
      default:
        return false;
    }
  }

  getSimpleFieldType(field: any) {
    switch (field.type) {
      case 'integer':
        return 'number';
      default:
        return field.type;
    }
  }

  isFieldValid(field: any) {
    return !this.form.get(field.name).valid && this.form.get(field.name).touched;
  }

  getValidationClass(field: any) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  hasErrorType(field: any, type: string) {
    return this.form.get(field.name).hasError(type) && this.form.get(field.name).touched;
  }

  getFieldOptions(field: any): { label: string, value: any }[] {
    if (field.type !== 'list') {
      return [];
    }

    switch (field.listType) {
      case 'inMemory':
        const valueOrFunc = this.options.references[field.listReference];
        if (!valueOrFunc) {
          return [];
        }

        if (Array.isArray(valueOrFunc)) {
          return valueOrFunc;
        }

        if (typeof(valueOrFunc) === 'function') {
          return valueOrFunc(this.formBuilder.getRootValue(this.form))
            .map(option => ({ label: option[field.listLabelField], value: option }));
        }

        return [];
      default:
        return field.options;
    }
  }
}
