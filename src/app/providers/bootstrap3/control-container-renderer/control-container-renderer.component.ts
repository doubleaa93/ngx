import { Component, Input } from '@angular/core';
import { ControlRenderer, IControl } from '../../../core/renderers/control.renderer';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';

@Component({
  selector: 'de-re-crud-bootstrap3-control-container-renderer',
  templateUrl: './control-container-renderer.component.html'
})
export class Bootstrap3ControlContainerRendererComponent implements ControlRenderer {
  @Input() control: IControl;

  getClasses() {
    const hasError = ValidationErrorHelper.hasError(this.control);

    return {
      'has-error': hasError,
      'has-feedback': hasError
    };
  }
}
