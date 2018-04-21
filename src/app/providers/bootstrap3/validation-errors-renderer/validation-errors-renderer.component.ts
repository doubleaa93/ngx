import { Component, Input } from '@angular/core';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';
import { IControl } from '../../../lib/renderers/control';
import { ValidationErrorHelper } from '../../../lib/validation-error-helper';

@Component({
  selector: 'de-re-crud-bootstrap3-validation-errors-renderer',
  templateUrl: './validation-errors-renderer.component.html'
})
export class Bootstrap3ValidationErrorsRendererComponent implements ControlRenderer {
  @Input()
  control: IControl;

  hasError() {
    return ValidationErrorHelper.hasError(this.control);
  }

  getErrors() {
    return ValidationErrorHelper.getErrors(this.control);
  }
}
