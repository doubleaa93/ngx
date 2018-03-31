import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/do';
import { NgRedux } from '@angular-redux/store';
import { v4 as uuid } from 'uuid';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { IAppState } from '../redux/state';
import { IField } from '../schema';
import { ControlRenderer } from '../renderers/control.renderer';
import { DeReCrudOptions } from '../options';
import { ComponentHostDirective } from './component-host.directive';
import { clearCustomErrors } from '../redux/actions/form-actions';

@Component({
  selector: 'de-re-crud-field-host',
  template: `
    <ng-template deReCrudComponentHost></ng-template>`
})
export class FieldHostComponent implements OnInit, OnDestroy {
  private _customErrorsSubscription: Subscription;
  private _fieldSubscription: Subscription;
  private _componentRefs: ComponentRef<any>[] = [];
  private _field: IField;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() options: DeReCrudOptions;
  @Input() formId: string;
  @Input() form: FormGroup;
  @Input() field: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this._customErrorsSubscription = this.ngRedux
      .select('forms')
      .map(forms => forms['customErrors'])
      .map(customErrors => customErrors[this.formId])
      .subscribe(() => {
        this.updateControlInputs();
      });

    this._fieldSubscription = this.ngRedux
      .select('fields')
      .map(fields => fields[`${this.options.struct}-${this.field}`])
      .do((field) => {
        this._field = field;
        this.renderControl();
      })
      .subscribe();
  }

  ngOnDestroy() {
    if (this._fieldSubscription) {
      this._fieldSubscription.unsubscribe();
    }

    this._componentRefs.forEach(x => x.destroy());
  }

  renderControl() {
    let controlComponent: any;

    const providerOptions = this.providerService.get(this.options.provider);

    switch (this._field.type) {
      case 'text':
        controlComponent = providerOptions.inputComponent;
        break;
      default:
        console.error(
          `${this._field.type} control is not supported.`,
          JSON.stringify(this._field)
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

    const customErrors = this.ngRedux.getState().forms.customErrors[
      this.formId
    ];

    for (const componentRef of this._componentRefs) {
      const componentRenderer = <ControlRenderer>componentRef.instance;
      componentRenderer.control = {
        form: this.form,
        type: this._field.type,
        htmlId: `${this._field.name}-${uuid()}`,
        key: this._field.name,
        label: this._field.label,
        onBlur: this.onBlur,
        customErrors:
          customErrors && (customErrors[this._field.name] as string[])
      };
    }
  }

  onBlur = () => {
    this.ngRedux.dispatch(clearCustomErrors(this.formId, this.field));
  }
}
