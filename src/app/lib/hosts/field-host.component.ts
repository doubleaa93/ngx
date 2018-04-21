import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { IField, IReferenceField, IListField, ILinkedStructField, ILinkedStructFieldReference } from '../schema';
import { ControlRenderer, CollectionControlRenderer } from '../renderers/control.renderer';
import { ComponentHostDirective } from './component-host.directive';
import { FormStateService, FormState } from '../services/form-state.service';
import { IControl, ILinkedStructControl, ISelectControl } from '../renderers/control';

@Component({
  selector: 'de-re-crud-field-host',
  template: `
    <ng-template deReCrudComponentHost></ng-template>`
})
export class FieldHostComponent implements OnInit, OnChanges, OnDestroy {
  private _componentRefs: ComponentRef<any>[] = [];
  private _submissionErrorsChangeSubscription: Subscription;
  private _formChangeSubscription: Subscription;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() formId: number;
  @Input() block: string;
  @Input() field: IField;
  state: FormState;

  constructor(
    private stateService: FormStateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private providerService: DeReCrudProviderService
  ) {}

  ngOnInit() {
    this.state = this.stateService.get(this.formId);

    this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(
      () => {
        this.updateInputs();
      }
    );

    this._formChangeSubscription = this.state.form.valueChanges.subscribe(
      () => {
        this.render();
      }
    );

    this.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateInputs();
  }

  ngOnDestroy() {
    this._submissionErrorsChangeSubscription.unsubscribe();
    this._formChangeSubscription.unsubscribe();
    this._componentRefs.forEach(x => x.destroy());
  }

  render() {
    if (this._componentRefs.length) {
      this._componentRefs.forEach(x => x.destroy());
    }

    const { struct, block } = this.state.options;
    const fieldReference = this.state.blocks[`${struct}-${block}`].fields.find(x => x.field === this.field.name);

    if (!fieldReference.condition(this.state.form.value)) {
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
        controlComponent = providerOptions.selectComponent;
        break;
      case 'linkedStruct':
        controlComponent = providerOptions.linkedStructComponent;
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

    for (const componentRef of this._componentRefs) {
      const componentRenderer = <ControlRenderer>componentRef.instance;
      const control: IControl = {
        formPath,
        field: this.field,
        formId: this.formId,
        submissionErrors:
          (this.state.submissionErrors &&
            this.state.submissionErrors[formPath]) ||
          [],
        form: this.state.form,
        rendererType: this.mapType(this.field.type),
        htmlId: `${this.field.name}-${Math.random()}`,
        onBlur: this.onBlur,
        onChange: this.onChange
      };

      if (this.field.type === 'list') {
        const listField = <IListField>this.field;

        const selectControl = <ISelectControl>control;
        selectControl.options = listField.options;
      }

      if (this.field.type === 'linkedStruct') {
        const linkedStructControl = <ILinkedStructControl>control;
        linkedStructControl.onOpenEditor = this.onOpenEditor;

        const linkedStructField = <ILinkedStructField>this.field;
        const { reference } = linkedStructField;
        const blockFields = this.state.blocks[`${this.state.options.struct}-${this.state.options.block}`].fields;
        const { hints } = <ILinkedStructFieldReference>blockFields.find(x => x.field === linkedStructField.name);
        const block = hints && hints.block || reference.block;

        const fieldReferences = <ILinkedStructFieldReference[]>this.state.blocks[`${reference.struct}-${block}`].fields;
        const fields = [];

        for (const fieldReference of fieldReferences) {
          const field = this.state.fields[`${reference.struct}-${fieldReference.field}`];
          fields.push(field);
        }

        const collectonControlRenderer = <CollectionControlRenderer>componentRenderer;
        collectonControlRenderer.fields = fields;
        collectonControlRenderer.layout = hints && hints.layout || 'inline';
      }

      componentRenderer.control = control;
    }
  }

  onBlur = () => {
    this.stateService.clearErrors(this.formId);
  }

  onChange = () => {
    this.stateService.clearErrors(this.formId);
  }

  onOpenEditor = (e, index: number = null) => {
    const { form } = this.state;
    const { name, struct } = this.field;

    const array = form[name];
    const value = !array ? {} : array[index];

    const options = { ...this.state.options };
    const reference = (<IReferenceField>this.field).reference;

    options.struct = reference.struct;
    options.block = reference.block;

    options.submitButtonStyle = {
      ...options.submitButtonStyle,
      text: !value ? 'Add' : 'Update'
    };

    options.cancelButtonStyle = {
      ...options.cancelButtonStyle,
      text: 'Cancel'
    };

    const state = this.stateService.create(options, value, this.formId);

    this.stateService.pushNavigation(this.formId, state.id);
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
