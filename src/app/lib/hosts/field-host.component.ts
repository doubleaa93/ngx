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
import { IControl } from '../renderers/control';
import { ControlRenderer } from '../renderers/control.renderer';
import { DeReCrudOptions } from '../options';
import { ComponentHostDirective } from './component-host.directive';

@Component({
  selector: 'de-re-crud-field-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class FieldHostComponent implements OnInit, OnDestroy {
  private _fieldSubscription: Subscription;
  private _componentRefs: ComponentRef<any>[] = [];
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() options: DeReCrudOptions;
  @Input() form: FormGroup;
  @Input() field: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this._fieldSubscription = this.ngRedux
      .select('fields')
      .map(fields => fields[`${this.options.struct}-${this.field}`])
      .do((field) => {
        this.renderControl(field);
      })
      .subscribe();
  }

  ngOnDestroy() {
    if (this._fieldSubscription) {
      this._fieldSubscription.unsubscribe();
    }

    this._componentRefs.forEach(x => x.destroy());
  }

  renderControl(field: IField) {
    let controlComponent: any;

    const providerOptions = this.providerService.get(this.options.provider);

    switch (field.type) {
      case 'text':
        controlComponent = providerOptions.inputComponent;
        break;
      default:
        console.error(
          `${field.type} control is not supported.`,
          JSON.stringify(field)
        );
        return;
    }

    const control: IControl = {
      form: this.form,
      type: field.type,
      htmlId: `${field.name}-${uuid()}`,
      key: field.name,
      label: field.label
    };

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
    const controlComponentRenderer = <ControlRenderer>controlComponentRef.instance;
    controlComponentRenderer.control = control;

    const containerComponentRef = viewContainerRef.createComponent(
      containerComponentFactory,
      0,
      undefined,
      [[controlComponentRef.location.nativeElement]]
    );

    const containerComponentRenderer = <ControlRenderer>containerComponentRef.instance;
    containerComponentRenderer.control = control;

    this._componentRefs.push(controlComponentRef, containerComponentRef);
  }
}
