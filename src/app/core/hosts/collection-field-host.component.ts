import {
  Component,
  Input,
  OnInit,
  ComponentFactoryResolver,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  ComponentRef,
  ViewChild
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { CollectionControlRenderer, ICollectionControl } from '../renderers/control.renderer';
import { IField, IReferenceField } from '../models/schema';
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
    if (changes.control && !changes.control.isFirstChange()) {
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
    componentRenderer.control = {
      ...this.control,
      onAdd: this.onAdd
    };
  }

  onAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { form, structs, fields, blocks } = this.state;
    const { name, struct } = this.control.field;

    const array = <FormArray>form.get(name);
    const options = { ...this.state.options };
    const reference = (<IReferenceField>this.control.field).reference;

    if (this.control.layout === 'table') {
      options.struct = reference.struct;
      options.block = reference.block;

      options.submitButtonStyle = {
        ...options.submitButtonStyle,
        text: 'Add'
      };

      options.cancelButtonStyle = {
        ...options.cancelButtonStyle,
        text: 'Cancel'
      };

      const state = this.stateService.create(options, {}, this.control.formId);

      this.stateService.pushNavigation(this.control.formId, state.id);
    } else {
      const inlineForm = this.formBuilder.group(reference.struct, reference.block, blocks, fields, []);
      array.push(inlineForm);
    }
  }
}
