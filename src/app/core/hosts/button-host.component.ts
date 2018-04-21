import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { ButtonRenderer } from '../renderers/button.renderer';
import { ComponentHostDirective } from './component-host.directive';
import { FormState, FormStateService } from '../services/form-state.service';

@Component({
  selector: 'de-re-crud-button-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class ButtonHostComponent implements OnInit, OnChanges, OnDestroy {
  private _componentRef: ComponentRef<any>;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() formId: number;
  @Input() type: 'button' | 'submit' | 'cancel';
  @Input() extraClasses: string | string[];
  @Input() text: string;
  @Input() disabled: boolean;
  @Output() click = new EventEmitter<any>();
  state: FormState;

  constructor(
    private stateService: FormStateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this.state = this.stateService.get(this.formId);
    this.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formId) {
      this.ngOnDestroy();
      this.ngOnInit();
      return;
    }

    this.updateInputs();
  }

  ngOnDestroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }

  render() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }

    const providerOptions = this.providerService.get(
      this.state.options.provider
    );

    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      providerOptions.buttonComponent
    );

    this._componentRef = viewContainerRef.createComponent(componentFactory);

    this.updateInputs();
  }

  updateInputs() {
    if (!this._componentRef) {
      return;
    }

    const {
      options: { struct, submitButtonStyle, cancelButtonStyle },
      structs
    } = this.state;

    const isSubmit = this.type === 'submit';

    let style = null;

    switch (this.type) {
      case 'submit':
        style = submitButtonStyle;
        break;
      case 'cancel':
        style = cancelButtonStyle;
        break;
    }

    let text = (style && style.text) || this.text;

    if (
      isSubmit &&
      submitButtonStyle &&
      submitButtonStyle.appendSchemaLabel
    ) {
      text = `${text} ${structs[struct].label}`;
    }

    const extraClasses = [];

    if (this.state.options.extraButtonClasses) {
      extraClasses.push(...this.state.options.extraButtonClasses);
    }

    if (this.extraClasses) {
      if (typeof this.extraClasses === 'string') {
        extraClasses.push(...this.extraClasses.split(' '));
      } else {
        extraClasses.push(...this.extraClasses);
      }
    }

    const componentRenderer = <ButtonRenderer>this._componentRef.instance;
    componentRenderer.button = {
      text,
      extraClasses,
      type: isSubmit ? 'submit' : 'button',
      disabled: this.disabled,
      onClick: this.onClick,
      class: (style && style.class) || undefined
    };
  }

  onClick = (e) => {
    this.click.emit(e);
  }
}
