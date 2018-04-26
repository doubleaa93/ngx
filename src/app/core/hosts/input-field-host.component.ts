import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import {
  IField,
  IListField,
  ILinkedStructField,
  ILinkedStructFieldReference,
  IFieldReference
} from '../models/schema';
import {
  ControlRenderer,
  IControl,
  ISelectControl,
  ICollectionControl
} from '../renderers/control.renderer';
import { ComponentHostDirective } from './component-host.directive';
import { FormStateService, FormState } from '../services/form-state.service';
import { FormGroup } from '@angular/forms';
import { CollectionFieldHostComponent } from './collection-field-host.component';

@Component({
  selector: 'de-re-crud-input-field-host',
  template: `
    <ng-template deReCrudComponentHost></ng-template>`
})
export class InputFieldHostComponent implements OnInit, OnChanges, OnDestroy {
  private _componentRefs: ComponentRef<any>[] = [];
  private _submissionErrorsChangeSubscription: Subscription;
  private _formChangeSubscription: Subscription;
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
  ) {
  }

  ngOnInit() {
    this.state = this.stateService.get(this.formId);

    const fieldReference = this.state.blocks[`${this.struct}-${this.block}`].fields.find(
      x => x.field === this.field.name
    );

    this.fieldReference = fieldReference;

    this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(
      () => {
        this.updateInputs();
      }
    );

    this._formChangeSubscription = this.form.valueChanges.subscribe(
      () => {
        if (!this.shouldRender()) {
          this.destroyRefs();
        } else if (!this._componentRefs.length) {
          this.render();
        } else {
          this.updateInputs();
        }
      }
    );

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
    if (this._submissionErrorsChangeSubscription) {
      this._submissionErrorsChangeSubscription.unsubscribe();
    }

    if (this._formChangeSubscription) {
      this._formChangeSubscription.unsubscribe();
    }

    this.destroyRefs();
  }

  destroyRefs() {
    if (this._componentRefs.length) {
      this._componentRefs.forEach(x => x.destroy());
    }
  }

  shouldRender() {
    return this.fieldReference.condition(this.form.value, this.state.form.root.value);
  }

  render() {
    this.destroyRefs();

    if (!this.shouldRender()) {
      return;
    }

    let controlComponent: any;

    const providerOptions = this.providerService.get(
      this.state.options.provider
    );

    switch (this.field.type) {
      case 'text':
      case 'integer':
      case 'date':
        controlComponent = providerOptions.inputComponent;
        break;
      case 'boolean':
        controlComponent = providerOptions.checkboxComponent;
        break;
      case 'list':
      case 'foreignKey':
        controlComponent = providerOptions.selectComponent;
        break;
      case 'linkedStruct':
        controlComponent = CollectionFieldHostComponent;
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

    this.updateInputs();
  }

  updateInputs() {
    if (!this._componentRefs.length) {
      return;
    }

    const formPath = this.field.name; // TODO: Support nested fields and arrays

    const control: IControl = {
      formPath,
      field: this.field,
      formId: this.formId,
      value: this.form.get(this.field.name),
      submissionErrors:
      (this.state.submissionErrors &&
        this.state.submissionErrors[formPath]) ||
      [],
      form: this.form,
      rendererType: this.mapType(this.field.type),
      htmlId: `${this.field.name}-${Math.random()}`,
      onBlur: this.onBlur,
      onChange: this.onChange
    };

    switch (this.field.type) {
      case 'list':
      case 'foreignKey': {
        const listField = <IListField>this.field;

        const selectControl = <ISelectControl>control;

        if (this.field.type === 'foreignKey') {
          selectControl.options = () => [];
        } else {
          selectControl.options = () => listField.options;
        }
        break;
      }
      case 'linkedStruct': {
        const collectionControl = <ICollectionControl>control;

        const linkedStructField = <ILinkedStructField>this.field;
        const { reference } = linkedStructField;

        const blockFields = this.state.blocks[`${this.struct}-${this.block}`].fields;

        const { hints } = <ILinkedStructFieldReference>blockFields.find(
          x => x.field === linkedStructField.name
        );

        const referenceBlock = (hints && hints.block) || reference.block;

        const fieldReferences = <ILinkedStructFieldReference[]>this.state
          .blocks[`${reference.struct}-${referenceBlock}`].fields;

        const nestedfields = [];

        for (const fieldReference of fieldReferences) {
          const field = this.state.fields[`${reference.struct}-${fieldReference.field}`];
          nestedfields.push(field);
        }

        const nestedForms = [];

        for (const form of collectionControl.value.controls) {
          nestedForms.push(<FormGroup>form);
        }

        collectionControl.stamp = {
          text: control.field.label,
          headerSize: this.state.options.headerSize
        };

        collectionControl.canAdd = !linkedStructField.maxInstances || nestedForms.length < linkedStructField.maxInstances;
        collectionControl.nestedForms = nestedForms;
        collectionControl.nestedfields = nestedfields;
        collectionControl.layout = (hints && hints.layout) || 'inline';
        break;
      }
    }

    for (const componentRef of this._componentRefs) {
      const componentRenderer = <ControlRenderer>componentRef.instance;

      const previousControl = componentRenderer.control;
      componentRenderer.control = control;

      const onComponentChange = (<OnChanges>componentRef.instance).ngOnChanges;
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
  }

  onBlur() {
    this.stateService.clearErrors(this.formId);
  }

  onChange() {
    this.stateService.clearErrors(this.formId);
  }

  private mapType(type: string) {
    switch (type) {
      case 'integer':
        return 'number';
      default:
        return type;
    }
  }
}
