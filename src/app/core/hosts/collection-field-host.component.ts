import {
  Component,
  Input,
  OnInit,
  ComponentFactoryResolver,
  SimpleChanges,
  OnDestroy,
  ComponentRef,
  ViewChild,
  OnChanges,
  SimpleChange
} from '@angular/core';
import { CollectionControlRenderer, ICollectionControl } from '../renderers/control.renderer';
import { IReferenceField } from '../models/schema';
import { FormState, FormStateService } from '../services/form-state.service';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { ComponentHostDirective } from './component-host.directive';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'de-re-crud-collection-field-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class CollectionFieldHostComponent implements OnInit, OnChanges, OnDestroy, CollectionControlRenderer {
  private _componentRef: ComponentRef<any>;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() control: ICollectionControl;
  state: FormState;

  constructor(
    private stateService: FormStateService,
    private formBuilder: FormBuilderService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this.state = this.stateService.get(this.control.formId);
    this.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.control && !changes.control.firstChange) {
      this.updateInputs();
    }
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

    let controlComponent: any;

    const providerOptions = this.providerService.get(
      this.state.options.provider
    );

    switch (this.control.layout) {
      case 'inline':
        controlComponent = providerOptions.inlineComponent;
        break;
      case 'table':
        controlComponent = providerOptions.tableComponent;
        break;
      default:
        console.error(
          `${this.control.layout} layout is not supported.`,
          JSON.stringify(this.control.field)
        );
        return;
    }

    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      controlComponent
    );

    this._componentRef = viewContainerRef.createComponent(componentFactory);

    this.updateInputs();
  }

  updateInputs() {
    if (!this._componentRef) {
      return;
    }

    const componentRenderer = <CollectionControlRenderer>this._componentRef.instance;

    const control: ICollectionControl = {
      ...this.control,
      onAdd: this.onAdd
    };

    const previousControl = componentRenderer.control;
    componentRenderer.control = control;

    const onComponentChange = (<OnChanges>this._componentRef.instance).ngOnChanges;

    if (onComponentChange) {
      const change: SimpleChange = {
        previousValue: previousControl,
        currentValue: control,
        firstChange: typeof previousControl === 'undefined',
        isFirstChange: () => change.firstChange
      };

      onComponentChange.call(componentRenderer, { control: change });
    }
  }

  onAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const options = { ...this.state.options };
    const reference = (<IReferenceField>this.control.field).reference;

    options.struct = reference.struct;
    options.block = reference.block;

    if (this.control.layout === 'table') {
      options.submitButtonStyle = {
        ...options.submitButtonStyle,
        text: 'Add'
      };

      options.cancelButtonStyle = {
        ...options.cancelButtonStyle,
        text: 'Cancel'
      };

      const state = this.stateService.create(options, {}, {
        id: this.control.formId,
        path: this.control.formPath,
        form: this.control.value
      });

      this.control.value.push(state.form);
      this.stateService.pushNavigation(this.control.formId, state.id);
    } else {
      const { fields, blocks } = this.state;
      const value = this.formBuilder.group(options.struct, options.block, blocks, fields, {});
      this.control.value.push(value);
    }
  }
}
