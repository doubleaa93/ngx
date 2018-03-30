import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { NgRedux } from '@angular-redux/store';
import { v4 as uuid } from 'uuid';
import { ControlHostDirective } from '../control-host.directive';
import { IAppState } from '../../redux/state';
import { IField } from '../../models/schema';
import { IControl } from '../../models/control';
import { ControlRenderer } from '../../renderers/control.renderer';
import { InputRendererComponent } from '../../renderers/input-renderer/input-renderer.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'de-re-crud-field-host',
  templateUrl: './field-host.component.html',
  styleUrls: ['./field-host.component.css']
})
export class FieldHostComponent implements OnInit, OnDestroy {
  private fieldSubscription: Subscription;
  @ViewChild(ControlHostDirective) controlHost: ControlHostDirective;
  @Input() form: FormGroup;
  @Input() struct: string;
  @Input() field: string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.fieldSubscription = this.ngRedux
      .select('fields')
      .map(fields => fields[`${this.struct}-${this.field}`])
      .do((field) => {
        this.refreshControl(field);
      })
      .subscribe();
  }

  ngOnDestroy() {
    if (this.fieldSubscription) {
      this.fieldSubscription.unsubscribe();
    }
  }

  refreshControl(field: IField) {
    let component: any;
    const control: IControl = {
      form: this.form,
      type: field.type,
      htmlId: `${field.name}-${uuid()}`,
      key: field.name,
      label: field.label
    };

    switch (field.type) {
      case 'text':
        component = InputRendererComponent;
        break;
      default:
        console.error(`${field.type} control is not supported.`, JSON.stringify(field));
        return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    const viewContainerRef = this.controlHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    const renderer = (<ControlRenderer>componentRef.instance);
    renderer.control = control;
  }
}
