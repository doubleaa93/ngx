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
import { IField, IFieldReference, ILabelField } from '../models/schema';
import { FormState, FormStateService } from '../services/form-state.service';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { HeadingRenderer, IHeading } from '../renderers/heading.renderer';

@Component({
  selector: 'de-re-crud-heading-field-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class HeadingFieldHostComponent implements OnInit, OnChanges, OnDestroy {
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
      case 'label':
        controlComponent = providerOptions.headingComponent;
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

    const componentRenderer = <HeadingRenderer>this._componentRef.instance;
    const labelField = <ILabelField>this.field;

    const heading: IHeading = {
      text: labelField.label
    };

    const previousHeading = componentRenderer.heading;
    componentRenderer.heading = heading;

    const onComponentChange = (<OnChanges>this._componentRef.instance)
      .ngOnChanges;

    if (onComponentChange) {
      const change: SimpleChange = {
        previousValue: previousHeading,
        currentValue: heading,
        firstChange: typeof previousHeading === 'undefined',
        isFirstChange: () => change.firstChange
      };

      onComponentChange.call(componentRenderer, { control: change });
    }
  }
}
