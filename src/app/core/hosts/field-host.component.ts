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
import {
  IField,
  IReferenceField,
  IListField,
  ILinkedStructField,
  ILinkedStructFieldReference,
  IFieldReference
} from '../models/schema';
import {
  ControlRenderer,
  CollectionControlRenderer,
  IControl,
  ISelectControl,
  ICollectionControl
} from '../renderers/control.renderer';
import { ComponentHostDirective } from './component-host.directive';
import { FormStateService, FormState } from '../services/form-state.service';
import { FormArray } from '@angular/forms';
import { CollectionFieldHostComponent } from './collection-field-host.component';

@Component({
  selector: 'de-re-crud-field-host',
  template: `<ng-template deReCrudComponentHost></ng-template>`
})
export class FieldHostComponent implements OnInit, OnChanges, OnDestroy {
  private _componentRefs: ComponentRef<any>[] = [];
  private _submissionErrorsChangeSubscription: Subscription;
  private _formChangeSubscription: Subscription;
  @ViewChild(ComponentHostDirective) componentHost: ComponentHostDirective;
  @Input() formId: number;
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

    let { struct, block } = this.state.options;

    if (this.struct) {
      struct = this.struct;
    }

    if (this.block) {
      block = this.block;
    }

    const fieldReference = this.state.blocks[`${struct}-${block}`].fields.find(
      x => x.field === this.field.name
    );

    this.fieldReference = fieldReference;

    this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(
      () => {
        this.updateInputs();
      }
    );

    this._formChangeSubscription = this.state.form.valueChanges.subscribe(
      () => {
        if (!this.shouldRender()) {
          this.destroyRefs();
        } else if (!this._componentRefs.length) {
          this.render();
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
    return this.fieldReference.condition(this.state.form.value, this.state.form.root.value);
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

    let { struct, block } = this.state.options;

    if (this.struct) {
      struct = this.struct;
    }

    if (this.block) {
      block = this.block;
    }

    for (const componentRef of this._componentRefs) {
      const componentRenderer = <ControlRenderer>componentRef.instance;
      const control: IControl = {
        formPath,
        field: this.field,
        formId: this.formId,
        value: this.state.form[this.field.name],
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

          const blockFields = this.state.blocks[`${struct}-${block}`].fields;

          const { hints } = <ILinkedStructFieldReference>blockFields.find(
            x => x.field === linkedStructField.name
          );

          const referenceBlock = (hints && hints.block) || reference.block;

          const fieldReferences = <ILinkedStructFieldReference[]>this.state
            .blocks[`${reference.struct}-${referenceBlock}`].fields;

          const fields = [];

          for (const fieldReference of fieldReferences) {
            const field = this.state.fields[`${reference.struct}-${fieldReference.field}`];
            fields.push(field);
          }

          collectionControl.fields = fields;
          collectionControl.layout = (hints && hints.layout) || 'inline';
          break;
        }
      }

      console.log(control);
      componentRenderer.control = control;
    }
  }

  onBlur = () => {
    this.stateService.clearErrors(this.formId);
  }

  onChange = () => {
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
