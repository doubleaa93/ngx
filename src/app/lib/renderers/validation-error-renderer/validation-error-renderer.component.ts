import { Component, Input } from '@angular/core';
import { ControlRenderer } from '../control.renderer';
import { IControl } from '../../models/control';

const errorPriority = [
  'required'
];

@Component({
  selector: 'de-re-crud-validation-error-renderer',
  templateUrl: './validation-error-renderer.component.html',
  styleUrls: ['./validation-error-renderer.component.css']
})
export class ValidationErrorRendererComponent implements ControlRenderer {
  @Input() control: IControl;

  error(fieldName: string) {
    const formControl = this.control.form.get(fieldName);

    if (!formControl.errors || !formControl.touched) {
      return null;
    }

    for (const errorType of errorPriority) {
      if (formControl.hasError(errorType)) {
        return errorType;
      }
    }

    return Object.keys(formControl.errors)[0];
  }
}
