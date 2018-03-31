import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  SimpleChanges
} from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { IButton } from '../renderers/button';
import { ButtonRenderer } from '../renderers/button.renderer';
import { ComponentHostDirective } from './component-host.directive';
import { DeReCrudOptions } from '../options';

@Component({
  selector: 'de-re-crud-button-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class ButtonHostComponent implements OnInit, OnChanges, OnDestroy {

  private _componentRef: ComponentRef<any>;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() options: DeReCrudOptions;
  @Input() type: 'button' | 'submit';
  @Input() text: string;
  @Input() disabled: boolean;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this.renderButton();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateButtonInputs();
  }

  ngOnDestroy() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }

  renderButton() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }

    const providerOptions = this.providerService.get(this.options.provider);

    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      providerOptions.buttonComponent
    );

    const componentRef = viewContainerRef.createComponent(
      componentFactory
    );

    this._componentRef = componentRef;
    this.updateButtonInputs();
  }

  updateButtonInputs() {
    if (!this._componentRef) {
      return;
    }

    const componentRenderer = <ButtonRenderer>this._componentRef.instance;
    componentRenderer.button = {
      type: this.type,
      text: this.text,
      disabled: this.disabled
    };
  }

}
