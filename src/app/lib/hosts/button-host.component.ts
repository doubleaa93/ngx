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
  @Input() isSubmit: boolean;
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

    const style = this.isSubmit ? submitButtonStyle : cancelButtonStyle;

    let text = (style && style.text) || this.text;

    if (
      this.isSubmit &&
      submitButtonStyle &&
      submitButtonStyle.appendSchemaLabel
    ) {
      text = `${text} ${structs[struct].label}`;
    }

    const componentRenderer = <ButtonRenderer>this._componentRef.instance;
    componentRenderer.button = {
      text,
      type: this.isSubmit ? 'submit' : 'button',
      disabled: this.disabled,
      onClick: this.onClick,
      class: (style && style.class) || undefined,
      extraClasses: this.state.options.extraButtonClasses
    };
  }

  onClick = (e) => {
    this.click.emit(e);
  }
}
