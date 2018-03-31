import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ButtonRenderer } from '../../../lib/renderers/button.renderer';
import { IControl } from '../../../lib/renderers/control';
import { IButton } from '../../../lib/renderers/button';

@Component({
  selector: 'de-re-crud-bootstrap3-button-renderer',
  templateUrl: './button-renderer.component.html'
})
export class Bootstrap3ButtonRendererComponent implements OnInit, OnChanges, ButtonRenderer {
  @Input() button: IButton;
  classes: string[];

  ngOnInit() {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['button']) {
      if (changes['button'].currentValue.type !== changes['button'].previousValue.type) {
        this.updateClasses();
      }
    }
  }

  updateClasses() {
    switch (this.button.type) {
      case 'submit':
        this.classes = ['btn-primary'];
        break;
      default:
        this.classes = ['btn-default'];
        break;
    }
  }
}
