import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { IField } from '../schema';
import { ControlRenderer } from '../renderers/control.renderer';
import { ComponentHostDirective } from './component-host.directive';
import { FormStateService, FormState } from '../services/form-state.service';

@Component({
  selector: 'de-re-crud-field-host',
  template: `
    <ng-template deReCrudComponentHost></ng-template>`
})
export class FieldHostComponent implements OnInit, OnDestroy {
  private _componentRefs: ComponentRef<any>[] = [];
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() formId: number;
  @Input() field: IField;
  state: FormState;

  constructor(
    private stateService: FormStateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this.state = this.stateService.get(this.formId);
    this.renderControl();
  }

  ngOnDestroy() {
    this._componentRefs.forEach(x => x.destroy());
  }

  renderControl() {
    let controlComponent: any;

    const providerOptions = this.providerService.get(this.state.options.provider);

    switch (this.field.type) {
      case 'text':
        controlComponent = providerOptions.inputComponent;
        break;
      default:
        console.error(
          `${this.field.type} control is not supported.`,
          JSON.stringify(this.field)
        );
        return;
    }

    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      providerOptions.containerComponent
    );

    const controlComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      controlComponent
    );

    const controlComponentRef = viewContainerRef.createComponent(
      controlComponentFactory
    );

    const containerComponentRef = viewContainerRef.createComponent(
      containerComponentFactory,
      0,
      undefined,
      [[controlComponentRef.location.nativeElement]]
    );

    this._componentRefs.push(controlComponentRef, containerComponentRef);

    this.updateControlInputs();
  }

  updateControlInputs() {
    if (!this._componentRefs.length) {
      return;
    }

    const formErrors = this.state.errors[this.formId];
    const formPath = this.field.name; // TODO: Support nested fields and arrays
    const errors = (formErrors && formErrors[formPath]) || [];

    for (const componentRef of this._componentRefs) {
      const componentRenderer = <ControlRenderer>componentRef.instance;
      componentRenderer.control = {
        errors,
        formPath,
        form: this.state.form,
        type: this.field.type,
        htmlId: `${this.field.name}-${Math.random()}`,
        key: this.field.name,
        label: this.field.label,
        onBlur: this.onBlur,
        onChange: this.onChange
      };
    }
  }

  onBlur = () => {
    this.stateService.clearErrors(this.formId);
  }

  onChange = () => {
    this.stateService.clearErrors(this.formId);
  }
}
