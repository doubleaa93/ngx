import { Component, Input } from '@angular/core';
import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';

@Component({
  selector: 'de-re-crud-bootstrap3-help-renderer',
  templateUrl: './help-renderer.component.html'
})
export class Bootstrap3HelpRendererComponent implements ControlRenderer {
  @Input()
  control: IControl;

  hasError() {
    return ValidationErrorHelper.hasError(this.control);
  }
}
