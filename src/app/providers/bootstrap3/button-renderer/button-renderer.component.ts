import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';
import { ButtonRenderer } from '../../../lib/renderers/button.renderer';
import { IButton } from '../../../lib/renderers/button';

@Component({
  selector: 'de-re-crud-bootstrap3-button-renderer',
  templateUrl: './button-renderer.component.html'
})
export class Bootstrap3ButtonRendererComponent
  implements OnInit, OnChanges, ButtonRenderer {
  @Input() button: IButton;
  _classes: string[];

  get classes() {
    let classes: string[];

    if (this._classes) {
      classes = this._classes;
    }

    if (this.button.extraClasses) {
      classes = (classes || []).concat(this.button.extraClasses);
    }

    return classes;
  }

  ngOnInit() {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['button']) {
      if (
        changes['button'].currentValue.type !==
        changes['button'].previousValue.type
      ) {
        this.updateClasses();
      }
    }
  }

  updateClasses() {
    if (this.button.class) {
      this._classes = [this.button.class];
      return;
    }

    switch (this.button.type) {
      case 'submit':
        this._classes = ['btn-primary'];
        break;
      default:
        this._classes = ['btn-default'];
        break;
    }
  }
}
