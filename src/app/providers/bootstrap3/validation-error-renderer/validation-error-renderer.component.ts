import { Component, Input } from '@angular/core';
import { IControl } from '../../../lib/renderers/control';
import { ControlRenderer } from '../../../lib/renderers/control.renderer';
import { ValidationErrorHelper } from '../../../lib/validation-error-helper';

@Component({
  selector: 'de-re-crud-bootstrap3-validation-error-renderer',
  templateUrl: './validation-error-renderer.component.html',
  styleUrls: ['./validation-error-renderer.component.css']
})
export class Bootstrap3ValidationErrorRendererComponent implements ControlRenderer {
  @Input() control: IControl;

  getError() {
    return ValidationErrorHelper.getError(this.control);
  }
}
