/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormStateService } from '../services/form-state.service';
import { ComponentHostDirective } from './component-host.directive';
import { CollectionFieldHostComponent } from './collection-field-host.component';
export class InputFieldHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this._componentRefs = [];
        this.onFocus = () => {
            this._valueOnFocus = this.form.root.get(this.formPath).value;
        };
        this.onBlur = () => {
            /** @type {?} */
            const newValue = this.form.root.get(this.formPath).value;
            if (this._valueOnFocus !== newValue) {
                this.stateService.onChange(this.formId, this.formPath, newValue, 'blur');
            }
        };
        this.onChange = (e) => {
            /** @type {?} */
            const newValue = this.form.root.get(this.formPath).value;
            this.stateService.onChange(this.formId, this.formPath, newValue, e ? 'change' : null);
        };
    }
    /**
     * @return {?}
     */
    get formPath() {
        /** @type {?} */
        let formPath = this.field.name;
        if (this.parentPath) {
            /** @type {?} */
            let parentPath = this.parentPath;
            if (this.parentForm instanceof FormArray) {
                /** @type {?} */
                const index = this.parentForm.controls.indexOf(this.form);
                parentPath += '.' + index;
            }
            formPath = `${parentPath}.${formPath}`;
        }
        return formPath;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        const fieldReference = this.state.blocks[`${this.struct}-${this.block}`].fields.find(x => x.field === this.field.name);
        this.fieldReference = fieldReference;
        this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(() => {
            this.updateInputs();
        });
        this._formChangeSubscription = this.form.valueChanges.subscribe(() => {
            if (!this.shouldRender()) {
                this.destroyRefs();
            }
            else if (!this._componentRefs.length) {
                this.render();
            }
            else {
                this.updateInputs();
            }
        });
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._submissionErrorsChangeSubscription) {
            this._submissionErrorsChangeSubscription.unsubscribe();
        }
        if (this._formChangeSubscription) {
            this._formChangeSubscription.unsubscribe();
        }
        this.destroyRefs();
    }
    /**
     * @return {?}
     */
    destroyRefs() {
        if (this._componentRefs.length) {
            this._componentRefs.forEach(x => x.destroy());
            this._componentRefs = [];
        }
    }
    /**
     * @return {?}
     */
    shouldRender() {
        return this.fieldReference && this.fieldReference.condition(this.form.value, this.state.form.root.value);
    }
    /**
     * @return {?}
     */
    render() {
        this.destroyRefs();
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        let controlComponent;
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
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
                console.error(`${this.field.type} control is not supported.`, JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.containerComponent);
        /** @type {?} */
        const controlComponentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        /** @type {?} */
        const controlComponentRef = viewContainerRef.createComponent(controlComponentFactory);
        /** @type {?} */
        const containerComponentRef = viewContainerRef.createComponent(containerComponentFactory, 0, undefined, [[controlComponentRef.location.nativeElement]]);
        this._componentRefs.push(controlComponentRef, containerComponentRef);
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    updateInputs() {
        if (this.shouldRender() && !this._componentRefs.length) {
            this.render();
            return;
        }
        if (!this._componentRefs.length) {
            return;
        }
        /** @type {?} */
        const formPath = this.formPath;
        /** @type {?} */
        const value = this.form.root.get(formPath);
        /** @type {?} */
        const control = {
            value,
            formPath,
            field: this.field,
            formId: this.formId,
            submissionErrors: (this.state.submissionErrors &&
                this.state.submissionErrors[formPath]) ||
                [],
            form: this.form,
            rendererType: this.mapType(this.field.type),
            htmlId: `${this.formId}-${formPath}`,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange
        };
        switch (this.field.type) {
            case 'list':
            case 'foreignKey': {
                /** @type {?} */
                const listField = /** @type {?} */ (this.field);
                /** @type {?} */
                const selectControl = /** @type {?} */ (control);
                if (this.field.type === 'foreignKey') {
                    selectControl.options = () => [];
                }
                else {
                    selectControl.options = () => listField.options;
                }
                break;
            }
            case 'linkedStruct': {
                /** @type {?} */
                const collectionControl = /** @type {?} */ (control);
                /** @type {?} */
                const linkedStructField = /** @type {?} */ (this.field);
                const { reference } = linkedStructField;
                /** @type {?} */
                const blockFields = this.state.blocks[`${this.struct}-${this.block}`].fields;
                const { hints } = /** @type {?} */ (blockFields.find(x => x.field === linkedStructField.name));
                /** @type {?} */
                const referenceBlock = (hints && hints.block) || reference.block;
                /** @type {?} */
                const fieldReferences = /** @type {?} */ (this.state
                    .blocks[`${reference.struct}-${referenceBlock}`].fields);
                /** @type {?} */
                const nestedFields = [];
                for (const fieldReference of fieldReferences) {
                    /** @type {?} */
                    const field = this.state.fields[`${reference.struct}-${fieldReference.field}`];
                    nestedFields.push(field);
                }
                /** @type {?} */
                const nestedValues = [];
                for (const nestedValue of collectionControl.value.controls) {
                    nestedValues.push(/** @type {?} */ (nestedValue));
                }
                collectionControl.stamp = {
                    text: control.field.label,
                    headerSize: this.state.options.headerSize
                };
                collectionControl.canAdd = !linkedStructField.maxInstances || nestedValues.length < linkedStructField.maxInstances;
                collectionControl.nestedValues = nestedValues;
                collectionControl.nestedFields = nestedFields;
                collectionControl.layout = (hints && hints.layout) || 'inline';
                break;
            }
        }
        for (const componentRef of this._componentRefs) {
            /** @type {?} */
            const componentRenderer = /** @type {?} */ (componentRef.instance);
            /** @type {?} */
            const previousControl = componentRenderer.control;
            componentRenderer.control = control;
            /** @type {?} */
            const onComponentChange = (/** @type {?} */ (componentRef.instance)).ngOnChanges;
            if (onComponentChange) {
                /** @type {?} */
                const change = {
                    previousValue: previousControl,
                    currentValue: control,
                    firstChange: typeof previousControl === 'undefined',
                    isFirstChange: () => change.firstChange
                };
                onComponentChange.call(componentRenderer, { control: change });
            }
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    mapType(type) {
        switch (type) {
            case 'integer':
                return 'number';
            default:
                return type;
        }
    }
}
InputFieldHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-input-field-host',
                template: `
    <ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
InputFieldHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
InputFieldHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    formId: [{ type: Input }],
    form: [{ type: Input }],
    struct: [{ type: Input }],
    block: [{ type: Input }],
    field: [{ type: Input }],
    parentForm: [{ type: Input }],
    parentPath: [{ type: Input }]
};
function InputFieldHostComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    InputFieldHostComponent.prototype._componentRefs;
    /** @type {?} */
    InputFieldHostComponent.prototype._submissionErrorsChangeSubscription;
    /** @type {?} */
    InputFieldHostComponent.prototype._formChangeSubscription;
    /** @type {?} */
    InputFieldHostComponent.prototype._valueOnFocus;
    /** @type {?} */
    InputFieldHostComponent.prototype.componentHost;
    /** @type {?} */
    InputFieldHostComponent.prototype.formId;
    /** @type {?} */
    InputFieldHostComponent.prototype.form;
    /** @type {?} */
    InputFieldHostComponent.prototype.struct;
    /** @type {?} */
    InputFieldHostComponent.prototype.block;
    /** @type {?} */
    InputFieldHostComponent.prototype.field;
    /** @type {?} */
    InputFieldHostComponent.prototype.parentForm;
    /** @type {?} */
    InputFieldHostComponent.prototype.parentPath;
    /** @type {?} */
    InputFieldHostComponent.prototype.state;
    /** @type {?} */
    InputFieldHostComponent.prototype.fieldReference;
    /** @type {?} */
    InputFieldHostComponent.prototype.onFocus;
    /** @type {?} */
    InputFieldHostComponent.prototype.onBlur;
    /** @type {?} */
    InputFieldHostComponent.prototype.onChange;
    /** @type {?} */
    InputFieldHostComponent.prototype.stateService;
    /** @type {?} */
    InputFieldHostComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    InputFieldHostComponent.prototype.providerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQtaG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvaG9zdHMvaW5wdXQtZmllbGQtaG9zdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsRUFDVCx3QkFBd0IsRUFLekIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFRcEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFPbEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFRakYsTUFBTTs7Ozs7O0lBZ0JKLFlBQ1UsY0FDQSwwQkFDQTtRQUZBLGlCQUFZLEdBQVosWUFBWTtRQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlOzhCQWxCcUIsRUFBRTt1QkFpUnRDLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDOUQ7c0JBRVEsR0FBRyxFQUFFOztZQUNaLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXpELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLElB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QVksQ0FBQyxRQUFRLEVBQUMsQ0FBQyxXQUFXLENBQUM7WUFDekUsSUFBSSxpQkFBaUIsRUFBRTs7Z0JBQ3JCLE1BQU0sTUFBTSxHQUFpQjtvQkFDM0IsYUFBYSxFQUFFLGVBQWU7b0JBQzlCLFlBQVksRUFBRSxPQUFPO29CQUNyQixXQUFXLEVBQUUsT0FBTyxlQUFlLEtBQUssV0FBVztvQkFDbkQsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXO2lCQUN4QyxDQUFDO2dCQUVGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7S0FDRjs7Ozs7SUFtQk8sT0FBTyxDQUFDLElBQVk7UUFDMUIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxRQUFRLENBQUM7WUFDbEI7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7U0FDZjs7OztZQTlTSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFO3NEQUMwQzthQUNyRDs7OztZQWZRLGdCQUFnQjtZQWpCdkIsd0JBQXdCO1lBT2pCLHVCQUF1Qjs7OzRCQStCN0IsU0FBUyxTQUFDLHNCQUFzQjtxQkFDaEMsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgVmlld0NoaWxkLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBJRmllbGQsXHJcbiAgSUxpc3RGaWVsZCxcclxuICBJTGlua2VkU3RydWN0RmllbGQsXHJcbiAgSUxpbmtlZFN0cnVjdEZpZWxkUmVmZXJlbmNlLFxyXG4gIElGaWVsZFJlZmVyZW5jZVxyXG59IGZyb20gJy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIENvbnRyb2xSZW5kZXJlcixcclxuICBJQ29udHJvbCxcclxuICBJU2VsZWN0Q29udHJvbCxcclxuICBJQ29sbGVjdGlvbkNvbnRyb2xcclxufSBmcm9tICcuLi9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbGxlY3Rpb24tZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1pbnB1dC1maWVsZC1ob3N0JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLXRlbXBsYXRlIGRlUmVDcnVkQ29tcG9uZW50SG9zdD48L25nLXRlbXBsYXRlPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0RmllbGRIb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmczogQ29tcG9uZW50UmVmPGFueT5bXSA9IFtdO1xyXG4gIHByaXZhdGUgX3N1Ym1pc3Npb25FcnJvcnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfdmFsdWVPbkZvY3VzOiBhbnk7XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcclxuICBASW5wdXQoKSBzdHJ1Y3Q6IHN0cmluZztcclxuICBASW5wdXQoKSBibG9jazogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBJRmllbGQ7XHJcbiAgQElucHV0KCkgcGFyZW50Rm9ybTogQWJzdHJhY3RDb250cm9sO1xyXG4gIEBJbnB1dCgpIHBhcmVudFBhdGg6IHN0cmluZztcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG4gIGZpZWxkUmVmZXJlbmNlOiBJRmllbGRSZWZlcmVuY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdGF0ZVNlcnZpY2U6IEZvcm1TdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBwcm92aWRlclNlcnZpY2U6IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBnZXQgZm9ybVBhdGgoKSB7XHJcbiAgICBsZXQgZm9ybVBhdGggPSB0aGlzLmZpZWxkLm5hbWU7XHJcblxyXG4gICAgaWYgKHRoaXMucGFyZW50UGF0aCkge1xyXG4gICAgICBsZXQgcGFyZW50UGF0aCA9IHRoaXMucGFyZW50UGF0aDtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBhcmVudEZvcm0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMucGFyZW50Rm9ybS5jb250cm9scy5pbmRleE9mKHRoaXMuZm9ybSk7XHJcbiAgICAgICAgcGFyZW50UGF0aCArPSAnLicgKyBpbmRleDtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9ybVBhdGggPSBgJHtwYXJlbnRQYXRofS4ke2Zvcm1QYXRofWA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1QYXRoO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuXHJcbiAgICBjb25zdCBmaWVsZFJlZmVyZW5jZSA9IHRoaXMuc3RhdGUuYmxvY2tzW2Ake3RoaXMuc3RydWN0fS0ke3RoaXMuYmxvY2t9YF0uZmllbGRzLmZpbmQoXHJcbiAgICAgIHggPT4geC5maWVsZCA9PT0gdGhpcy5maWVsZC5uYW1lXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZmllbGRSZWZlcmVuY2UgPSBmaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgICB0aGlzLl9zdWJtaXNzaW9uRXJyb3JzQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5vblN1Ym1pc3Npb25FcnJvcnNDaGFuZ2Uuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcclxuICAgICAgICAgIHRoaXMuZGVzdHJveVJlZnMoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9jb21wb25lbnRSZWZzLmxlbmd0aCkge1xyXG4gICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmZvcm1JZCAmJiAhY2hhbmdlcy5mb3JtSWQuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX3N1Ym1pc3Npb25FcnJvcnNDaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlc3Ryb3lSZWZzKCk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95UmVmcygpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWZzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWZzLmZvckVhY2goeCA9PiB4LmRlc3Ryb3koKSk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZnMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3VsZFJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmZpZWxkUmVmZXJlbmNlICYmIHRoaXMuZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uKHRoaXMuZm9ybS52YWx1ZSwgdGhpcy5zdGF0ZS5mb3JtLnJvb3QudmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgdGhpcy5kZXN0cm95UmVmcygpO1xyXG5cclxuICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xDb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSB0aGlzLnByb3ZpZGVyU2VydmljZS5nZXQoXHJcbiAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5wcm92aWRlclxyXG4gICAgKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZmllbGQudHlwZSkge1xyXG4gICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuaW5wdXRDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuY2hlY2tib3hDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpc3QnOlxyXG4gICAgICBjYXNlICdmb3JlaWduS2V5JzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLnNlbGVjdENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGlua2VkU3RydWN0JzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgYCR7dGhpcy5maWVsZC50eXBlfSBjb250cm9sIGlzIG5vdCBzdXBwb3J0ZWQuYCxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuZmllbGQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgcHJvdmlkZXJPcHRpb25zLmNvbnRhaW5lckNvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sQ29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xDb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcclxuICAgICAgY29udHJvbENvbXBvbmVudEZhY3RvcnlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyQ29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXHJcbiAgICAgIGNvbnRhaW5lckNvbXBvbmVudEZhY3RvcnksXHJcbiAgICAgIDAsXHJcbiAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgW1tjb250cm9sQ29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWZzLnB1c2goY29udHJvbENvbXBvbmVudFJlZiwgY29udGFpbmVyQ29tcG9uZW50UmVmKTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKHRoaXMuc2hvdWxkUmVuZGVyKCkgJiYgIXRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtUGF0aCA9IHRoaXMuZm9ybVBhdGg7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZm9ybS5yb290LmdldChmb3JtUGF0aCk7XHJcblxyXG4gICAgY29uc3QgY29udHJvbDogSUNvbnRyb2wgPSB7XHJcbiAgICAgIHZhbHVlLFxyXG4gICAgICBmb3JtUGF0aCxcclxuICAgICAgZmllbGQ6IHRoaXMuZmllbGQsXHJcbiAgICAgIGZvcm1JZDogdGhpcy5mb3JtSWQsXHJcbiAgICAgIHN1Ym1pc3Npb25FcnJvcnM6XHJcbiAgICAgICAgKHRoaXMuc3RhdGUuc3VibWlzc2lvbkVycm9ycyAmJlxyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5zdWJtaXNzaW9uRXJyb3JzW2Zvcm1QYXRoXSkgfHxcclxuICAgICAgICBbXSxcclxuICAgICAgZm9ybTogdGhpcy5mb3JtLFxyXG4gICAgICByZW5kZXJlclR5cGU6IHRoaXMubWFwVHlwZSh0aGlzLmZpZWxkLnR5cGUpLFxyXG4gICAgICBodG1sSWQ6IGAke3RoaXMuZm9ybUlkfS0ke2Zvcm1QYXRofWAsXHJcbiAgICAgIG9uRm9jdXM6IHRoaXMub25Gb2N1cyxcclxuICAgICAgb25CbHVyOiB0aGlzLm9uQmx1cixcclxuICAgICAgb25DaGFuZ2U6IHRoaXMub25DaGFuZ2VcclxuICAgIH07XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmZpZWxkLnR5cGUpIHtcclxuICAgICAgY2FzZSAnbGlzdCc6XHJcbiAgICAgIGNhc2UgJ2ZvcmVpZ25LZXknOiB7XHJcbiAgICAgICAgY29uc3QgbGlzdEZpZWxkID0gPElMaXN0RmllbGQ+dGhpcy5maWVsZDtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0Q29udHJvbCA9IDxJU2VsZWN0Q29udHJvbD5jb250cm9sO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5maWVsZC50eXBlID09PSAnZm9yZWlnbktleScpIHtcclxuICAgICAgICAgIHNlbGVjdENvbnRyb2wub3B0aW9ucyA9ICgpID0+IFtdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzZWxlY3RDb250cm9sLm9wdGlvbnMgPSAoKSA9PiBsaXN0RmllbGQub3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSAnbGlua2VkU3RydWN0Jzoge1xyXG4gICAgICAgIGNvbnN0IGNvbGxlY3Rpb25Db250cm9sID0gPElDb2xsZWN0aW9uQ29udHJvbD5jb250cm9sO1xyXG5cclxuICAgICAgICBjb25zdCBsaW5rZWRTdHJ1Y3RGaWVsZCA9IDxJTGlua2VkU3RydWN0RmllbGQ+dGhpcy5maWVsZDtcclxuICAgICAgICBjb25zdCB7IHJlZmVyZW5jZSB9ID0gbGlua2VkU3RydWN0RmllbGQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2NrRmllbGRzID0gdGhpcy5zdGF0ZS5ibG9ja3NbYCR7dGhpcy5zdHJ1Y3R9LSR7dGhpcy5ibG9ja31gXS5maWVsZHM7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgaGludHMgfSA9IDxJTGlua2VkU3RydWN0RmllbGRSZWZlcmVuY2U+YmxvY2tGaWVsZHMuZmluZChcclxuICAgICAgICAgIHggPT4geC5maWVsZCA9PT0gbGlua2VkU3RydWN0RmllbGQubmFtZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlZmVyZW5jZUJsb2NrID0gKGhpbnRzICYmIGhpbnRzLmJsb2NrKSB8fCByZWZlcmVuY2UuYmxvY2s7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlcyA9IDxJTGlua2VkU3RydWN0RmllbGRSZWZlcmVuY2VbXT50aGlzLnN0YXRlXHJcbiAgICAgICAgICAuYmxvY2tzW2Ake3JlZmVyZW5jZS5zdHJ1Y3R9LSR7cmVmZXJlbmNlQmxvY2t9YF0uZmllbGRzO1xyXG5cclxuICAgICAgICBjb25zdCBuZXN0ZWRGaWVsZHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZFJlZmVyZW5jZSBvZiBmaWVsZFJlZmVyZW5jZXMpIHtcclxuICAgICAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5zdGF0ZS5maWVsZHNbYCR7cmVmZXJlbmNlLnN0cnVjdH0tJHtmaWVsZFJlZmVyZW5jZS5maWVsZH1gXTtcclxuICAgICAgICAgIG5lc3RlZEZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5lc3RlZFZhbHVlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IG5lc3RlZFZhbHVlIG9mIGNvbGxlY3Rpb25Db250cm9sLnZhbHVlLmNvbnRyb2xzKSB7XHJcbiAgICAgICAgICBuZXN0ZWRWYWx1ZXMucHVzaCg8Rm9ybUdyb3VwPm5lc3RlZFZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLnN0YW1wID0ge1xyXG4gICAgICAgICAgdGV4dDogY29udHJvbC5maWVsZC5sYWJlbCxcclxuICAgICAgICAgIGhlYWRlclNpemU6IHRoaXMuc3RhdGUub3B0aW9ucy5oZWFkZXJTaXplXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wuY2FuQWRkID0gIWxpbmtlZFN0cnVjdEZpZWxkLm1heEluc3RhbmNlcyB8fCBuZXN0ZWRWYWx1ZXMubGVuZ3RoIDwgbGlua2VkU3RydWN0RmllbGQubWF4SW5zdGFuY2VzO1xyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLm5lc3RlZFZhbHVlcyA9IG5lc3RlZFZhbHVlcztcclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5uZXN0ZWRGaWVsZHMgPSBuZXN0ZWRGaWVsZHM7XHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wubGF5b3V0ID0gKGhpbnRzICYmIGhpbnRzLmxheW91dCkgfHwgJ2lubGluZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudFJlZiBvZiB0aGlzLl9jb21wb25lbnRSZWZzKSB7XHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPENvbnRyb2xSZW5kZXJlcj5jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcblxyXG4gICAgICBjb25zdCBwcmV2aW91c0NvbnRyb2wgPSBjb21wb25lbnRSZW5kZXJlci5jb250cm9sO1xyXG4gICAgICBjb21wb25lbnRSZW5kZXJlci5jb250cm9sID0gY29udHJvbDtcclxuXHJcbiAgICAgIGNvbnN0IG9uQ29tcG9uZW50Q2hhbmdlID0gKDxPbkNoYW5nZXM+Y29tcG9uZW50UmVmLmluc3RhbmNlKS5uZ09uQ2hhbmdlcztcclxuICAgICAgaWYgKG9uQ29tcG9uZW50Q2hhbmdlKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSB7XHJcbiAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c0NvbnRyb2wsXHJcbiAgICAgICAgICBjdXJyZW50VmFsdWU6IGNvbnRyb2wsXHJcbiAgICAgICAgICBmaXJzdENoYW5nZTogdHlwZW9mIHByZXZpb3VzQ29udHJvbCA9PT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgICBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiBjaGFuZ2UuZmlyc3RDaGFuZ2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBvbkNvbXBvbmVudENoYW5nZS5jYWxsKGNvbXBvbmVudFJlbmRlcmVyLCB7IGNvbnRyb2w6IGNoYW5nZSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Gb2N1cyA9ICgpID0+IHtcclxuICAgIHRoaXMuX3ZhbHVlT25Gb2N1cyA9IHRoaXMuZm9ybS5yb290LmdldCh0aGlzLmZvcm1QYXRoKS52YWx1ZTtcclxuICB9XHJcblxyXG4gIG9uQmx1ciA9ICgpID0+IHtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5mb3JtLnJvb3QuZ2V0KHRoaXMuZm9ybVBhdGgpLnZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLl92YWx1ZU9uRm9jdXMgIT09IG5ld1ZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLm9uQ2hhbmdlKHRoaXMuZm9ybUlkLCB0aGlzLmZvcm1QYXRoLCBuZXdWYWx1ZSwgJ2JsdXInKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlID0gKGU6IGFueSkgPT4ge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmZvcm0ucm9vdC5nZXQodGhpcy5mb3JtUGF0aCkudmFsdWU7XHJcbiAgICB0aGlzLnN0YXRlU2VydmljZS5vbkNoYW5nZSh0aGlzLmZvcm1JZCwgdGhpcy5mb3JtUGF0aCwgbmV3VmFsdWUsIGUgPyAnY2hhbmdlJyA6IG51bGwpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXBUeXBlKHR5cGU6IHN0cmluZykge1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICAgIHJldHVybiAnbnVtYmVyJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19