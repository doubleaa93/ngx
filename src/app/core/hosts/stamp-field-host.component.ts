import {
  Component,
  ComponentRef,
  ViewChild,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ComponentFactoryResolver,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentHostDirective } from './component-host.directive';
import { IField, IFieldReference, IStampField } from '../models/schema';
import { FormState, FormStateService } from '../services/form-state.service';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { StampRenderer, IStamp } from '../renderers/stamp.renderer';

@Component({
  selector: 'de-re-crud-stamp-field-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class StampFieldHostComponent implements OnInit, OnChanges, OnDestroy {
  private _componentRef: ComponentRef<any>;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() formId: number;
  @Input() form: FormGroup;
  @Input() struct: string;
  @Input() block: string;
  @Input() field: IField;
  state: FormState;
  fieldReference: IFieldReference;

  constructor(
    private stateService: FormStateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this.state = this.stateService.get(this.formId);

    const fieldReference = this.state.blocks[
      `${this.struct}-${this.block}`
    ].fields.find(x => x.field === this.field.name);

    this.fieldReference = fieldReference;

    this.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formId && !changes.formId.isFirstChange()) {
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

  shouldRender() {
    return this.fieldReference.condition(
      this.form.value,
      this.state.form.root.value
    );
  }

  render() {
    if (this._componentRef) {
      this._componentRef.destroy();
    }

    if (!this.shouldRender()) {
      return;
    }

    let controlComponent: any;

    const providerOptions = this.providerService.get(
      this.state.options.provider
    );

    switch (this.field.type) {
      case 'stamp':
        controlComponent = providerOptions.stampComponent;
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

    const componentRenderer = <StampRenderer>this._componentRef.instance;
    const stampField = <IStampField>this.field;

    const stamp: IStamp = {
      text: stampField.label,
      headerSize: this.state.options.headerSize
    };

    if (stampField.hints) {
      if (stampField.hints.headerSize) {
        stamp.headerSize = stampField.hints.headerSize;
      }

      if (stampField.hints.displayClassNames) {
        stamp.classes = stampField.hints.displayClassNames;
      }
    }

    const previousStamp = componentRenderer.stamp;
    componentRenderer.stamp = stamp;

    const onComponentChange = (<OnChanges>this._componentRef.instance)
      .ngOnChanges;

    if (onComponentChange) {
      const change: SimpleChange = {
        previousValue: previousStamp,
        currentValue: stamp,
        firstChange: typeof previousStamp === 'undefined',
        isFirstChange: () => change.firstChange
      };

      onComponentChange.call(componentRenderer, { control: change });
    }
  }
}
