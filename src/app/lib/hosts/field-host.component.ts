import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { NgRedux } from '@angular-redux/store';
import { v4 as uuid } from 'uuid';
import { IAppState } from '../redux/state';
import { IField } from '../models/schema';
import { IControl } from '../models/control';
import { ControlRenderer } from '../renderers/control.renderer';
import { InputRendererComponent } from '../renderers/input-renderer/input-renderer.component';
import { ControlContainerRendererComponent } from '../renderers/control-container-renderer/control-container-renderer.component';
import { ComponentHostDirective } from './component-host.directive';
import { DeReCrudOptions } from '../models/options';

@Component({
  selector: 'de-re-crud-field-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class FieldHostComponent implements OnInit, OnDestroy {
  private fieldSubscription: Subscription;
  private componentRefs: ComponentRef<any>[] = [];
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() options: DeReCrudOptions;
  @Input() form: FormGroup;
  @Input() field: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.fieldSubscription = this.ngRedux
      .select('fields')
      .map(fields => fields[`${this.options.struct}-${this.field}`])
      .do((field) => {
        this.renderControl(field);
      })
      .subscribe();
  }

  ngOnDestroy() {
    if (this.fieldSubscription) {
      this.fieldSubscription.unsubscribe();
    }

    this.componentRefs.forEach(x => x.destroy());
  }

  renderControl(field: IField) {
    let controlComponent: any;

    switch (field.type) {
      case 'text':
        controlComponent = InputRendererComponent;
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

    const containerComponent = this.options.containerComponent || ControlContainerRendererComponent;
    const containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      containerComponent
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

    this.componentRefs.push(controlComponentRef, containerComponentRef);
  }
}
