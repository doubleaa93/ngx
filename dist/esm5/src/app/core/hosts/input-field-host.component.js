/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FormStateService } from '../services/form-state.service';
import { ComponentHostDirective } from './component-host.directive';
import { CollectionFieldHostComponent } from './collection-field-host.component';
var InputFieldHostComponent = /** @class */ (function () {
    function InputFieldHostComponent(stateService, componentFactoryResolver, providerService) {
        var _this = this;
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this._componentRefs = [];
        this.onFocus = function () {
            _this._valueOnFocus = _this.form.root.get(_this.formPath).value;
        };
        this.onBlur = function () {
            /** @type {?} */
            var newValue = _this.form.root.get(_this.formPath).value;
            if (_this._valueOnFocus !== newValue) {
                _this.stateService.onChange(_this.formId, _this.formPath, newValue, 'blur');
            }
        };
        this.onChange = function (e) {
            /** @type {?} */
            var newValue = _this.form.root.get(_this.formPath).value;
            _this.stateService.onChange(_this.formId, _this.formPath, newValue, e ? 'change' : null);
        };
    }
    Object.defineProperty(InputFieldHostComponent.prototype, "formPath", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formPath = this.field.name;
            if (this.parentPath) {
                /** @type {?} */
                var parentPath = this.parentPath;
                if (this.parentForm instanceof FormArray) {
                    /** @type {?} */
                    var index = this.parentForm.controls.indexOf(this.form);
                    parentPath += '.' + index;
                }
                formPath = parentPath + "." + formPath;
            }
            return formPath;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        var fieldReference = this.state.blocks[this.struct + "-" + this.block].fields.find(function (x) { return x.field === _this.field.name; });
        this.fieldReference = fieldReference;
        this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(function () {
            _this.updateInputs();
        });
        this._formChangeSubscription = this.form.valueChanges.subscribe(function () {
            if (!_this.shouldRender()) {
                _this.destroyRefs();
            }
            else if (!_this._componentRefs.length) {
                _this.render();
            }
            else {
                _this.updateInputs();
            }
        });
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InputFieldHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._submissionErrorsChangeSubscription) {
            this._submissionErrorsChangeSubscription.unsubscribe();
        }
        if (this._formChangeSubscription) {
            this._formChangeSubscription.unsubscribe();
        }
        this.destroyRefs();
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.destroyRefs = /**
     * @return {?}
     */
    function () {
        if (this._componentRefs.length) {
            this._componentRefs.forEach(function (x) { return x.destroy(); });
            this._componentRefs = [];
        }
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.shouldRender = /**
     * @return {?}
     */
    function () {
        return this.fieldReference && this.fieldReference.condition(this.form.value, this.state.form.root.value);
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        this.destroyRefs();
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        var controlComponent;
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
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
                console.error(this.field.type + " control is not supported.", JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.containerComponent);
        /** @type {?} */
        var controlComponentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        /** @type {?} */
        var controlComponentRef = viewContainerRef.createComponent(controlComponentFactory);
        /** @type {?} */
        var containerComponentRef = viewContainerRef.createComponent(containerComponentFactory, 0, undefined, [[controlComponentRef.location.nativeElement]]);
        this._componentRefs.push(controlComponentRef, containerComponentRef);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b, e_3, _c;
        if (this.shouldRender() && !this._componentRefs.length) {
            this.render();
            return;
        }
        if (!this._componentRefs.length) {
            return;
        }
        /** @type {?} */
        var formPath = this.formPath;
        /** @type {?} */
        var value = this.form.root.get(formPath);
        /** @type {?} */
        var control = {
            value: value,
            formPath: formPath,
            field: this.field,
            formId: this.formId,
            submissionErrors: (this.state.submissionErrors &&
                this.state.submissionErrors[formPath]) ||
                [],
            form: this.form,
            rendererType: this.mapType(this.field.type),
            htmlId: this.formId + "-" + formPath,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange
        };
        switch (this.field.type) {
            case 'list':
            case 'foreignKey': {
                /** @type {?} */
                var listField_1 = /** @type {?} */ (this.field);
                /** @type {?} */
                var selectControl = /** @type {?} */ (control);
                if (this.field.type === 'foreignKey') {
                    selectControl.options = function () { return []; };
                }
                else {
                    selectControl.options = function () { return listField_1.options; };
                }
                break;
            }
            case 'linkedStruct': {
                /** @type {?} */
                var collectionControl = /** @type {?} */ (control);
                /** @type {?} */
                var linkedStructField_1 = /** @type {?} */ (this.field);
                var reference = linkedStructField_1.reference;
                /** @type {?} */
                var blockFields = this.state.blocks[this.struct + "-" + this.block].fields;
                var hints = /** @type {?} */ (blockFields.find(function (x) { return x.field === linkedStructField_1.name; })).hints;
                /** @type {?} */
                var referenceBlock = (hints && hints.block) || reference.block;
                /** @type {?} */
                var fieldReferences = /** @type {?} */ (this.state
                    .blocks[reference.struct + "-" + referenceBlock].fields);
                /** @type {?} */
                var nestedFields = [];
                try {
                    for (var fieldReferences_1 = tslib_1.__values(fieldReferences), fieldReferences_1_1 = fieldReferences_1.next(); !fieldReferences_1_1.done; fieldReferences_1_1 = fieldReferences_1.next()) {
                        var fieldReference = fieldReferences_1_1.value;
                        /** @type {?} */
                        var field = this.state.fields[reference.struct + "-" + fieldReference.field];
                        nestedFields.push(field);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (fieldReferences_1_1 && !fieldReferences_1_1.done && (_a = fieldReferences_1.return)) _a.call(fieldReferences_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                /** @type {?} */
                var nestedValues = [];
                try {
                    for (var _d = tslib_1.__values(collectionControl.value.controls), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var nestedValue = _e.value;
                        nestedValues.push(/** @type {?} */ (nestedValue));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                collectionControl.stamp = {
                    text: control.field.label,
                    headerSize: this.state.options.headerSize
                };
                collectionControl.canAdd = !linkedStructField_1.maxInstances || nestedValues.length < linkedStructField_1.maxInstances;
                collectionControl.nestedValues = nestedValues;
                collectionControl.nestedFields = nestedFields;
                collectionControl.layout = (hints && hints.layout) || 'inline';
                break;
            }
        }
        var _loop_1 = function (componentRef) {
            /** @type {?} */
            var componentRenderer = /** @type {?} */ (componentRef.instance);
            /** @type {?} */
            var previousControl = componentRenderer.control;
            componentRenderer.control = control;
            /** @type {?} */
            var onComponentChange = (/** @type {?} */ (componentRef.instance)).ngOnChanges;
            if (onComponentChange) {
                /** @type {?} */
                var change_1 = {
                    previousValue: previousControl,
                    currentValue: control,
                    firstChange: typeof previousControl === 'undefined',
                    isFirstChange: function () { return change_1.firstChange; }
                };
                onComponentChange.call(componentRenderer, { control: change_1 });
            }
        };
        try {
            for (var _f = tslib_1.__values(this._componentRefs), _g = _f.next(); !_g.done; _g = _f.next()) {
                var componentRef = _g.value;
                _loop_1(componentRef);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    InputFieldHostComponent.prototype.mapType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        switch (type) {
            case 'integer':
                return 'number';
            default:
                return type;
        }
    };
    InputFieldHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-input-field-host',
                    template: "\n    <ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    InputFieldHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
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
    return InputFieldHostComponent;
}());
export { InputFieldHostComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQtaG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvaG9zdHMvaW5wdXQtZmllbGQtaG9zdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxTQUFTLEVBQ1Qsd0JBQXdCLEVBS3pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBUXBGLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBT2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztJQXdCL0UsaUNBQ1UsY0FDQSwwQkFDQTtRQUhWLGlCQUtDO1FBSlMsaUJBQVksR0FBWixZQUFZO1FBQ1osNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixvQkFBZSxHQUFmLGVBQWU7OEJBbEJxQixFQUFFO3VCQWlSdEM7WUFDUixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzlEO3NCQUVROztZQUNQLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBRXpELElBQUksS0FBSSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFB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aUJBQWlCLEVBQUU7O2dCQUNyQixJQUFNLFFBQU0sR0FBaUI7b0JBQzNCLGFBQWEsRUFBRSxlQUFlO29CQUM5QixZQUFZLEVBQUUsT0FBTztvQkFDckIsV0FBVyxFQUFFLE9BQU8sZUFBZSxLQUFLLFdBQVc7b0JBQ25ELGFBQWEsRUFBRSxjQUFNLE9BQUEsUUFBTSxDQUFDLFdBQVcsRUFBbEIsQ0FBa0I7aUJBQ3hDLENBQUM7Z0JBRUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQU0sRUFBRSxDQUFDLENBQUM7YUFDaEU7OztZQWhCSCxLQUEyQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQSxnQkFBQTtnQkFBekMsSUFBTSxZQUFZLFdBQUE7d0JBQVosWUFBWTthQWlCdEI7Ozs7Ozs7OztLQUNGOzs7OztJQW1CTyx5Q0FBTzs7OztjQUFDLElBQVk7UUFDMUIsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxRQUFRLENBQUM7WUFDbEI7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7U0FDZjs7O2dCQTlTSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtvQkFDdkMsUUFBUSxFQUFFLHlEQUMwQztpQkFDckQ7Ozs7Z0JBZlEsZ0JBQWdCO2dCQWpCdkIsd0JBQXdCO2dCQU9qQix1QkFBdUI7OztnQ0ErQjdCLFNBQVMsU0FBQyxzQkFBc0I7eUJBQ2hDLEtBQUs7dUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7O2tDQW5EUjs7U0F1Q2EsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIElGaWVsZCxcclxuICBJTGlzdEZpZWxkLFxyXG4gIElMaW5rZWRTdHJ1Y3RGaWVsZCxcclxuICBJTGlua2VkU3RydWN0RmllbGRSZWZlcmVuY2UsXHJcbiAgSUZpZWxkUmVmZXJlbmNlXHJcbn0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5LCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFJlbmRlcmVyLFxyXG4gIElDb250cm9sLFxyXG4gIElTZWxlY3RDb250cm9sLFxyXG4gIElDb2xsZWN0aW9uQ29udHJvbFxyXG59IGZyb20gJy4uL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWlucHV0LWZpZWxkLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZEhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWZzOiBDb21wb25lbnRSZWY8YW55PltdID0gW107XHJcbiAgcHJpdmF0ZSBfc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF92YWx1ZU9uRm9jdXM6IGFueTtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgZm9ybUlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xyXG4gIEBJbnB1dCgpIHN0cnVjdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJsb2NrOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZmllbGQ6IElGaWVsZDtcclxuICBASW5wdXQoKSBwYXJlbnRGb3JtOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgQElucHV0KCkgcGFyZW50UGF0aDogc3RyaW5nO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcbiAgZmllbGRSZWZlcmVuY2U6IElGaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIGdldCBmb3JtUGF0aCgpIHtcclxuICAgIGxldCBmb3JtUGF0aCA9IHRoaXMuZmllbGQubmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnRQYXRoKSB7XHJcbiAgICAgIGxldCBwYXJlbnRQYXRoID0gdGhpcy5wYXJlbnRQYXRoO1xyXG5cclxuICAgICAgaWYgKHRoaXMucGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJlbnRGb3JtLmNvbnRyb2xzLmluZGV4T2YodGhpcy5mb3JtKTtcclxuICAgICAgICBwYXJlbnRQYXRoICs9ICcuJyArIGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtUGF0aCA9IGAke3BhcmVudFBhdGh9LiR7Zm9ybVBhdGh9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybVBhdGg7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5mb3JtSWQpO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlID0gdGhpcy5zdGF0ZS5ibG9ja3NbYCR7dGhpcy5zdHJ1Y3R9LSR7dGhpcy5ibG9ja31gXS5maWVsZHMuZmluZChcclxuICAgICAgeCA9PiB4LmZpZWxkID09PSB0aGlzLmZpZWxkLm5hbWVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5maWVsZFJlZmVyZW5jZSA9IGZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICAgIHRoaXMuX3N1Ym1pc3Npb25FcnJvcnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uU3VibWlzc2lvbkVycm9yc0NoYW5nZS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xyXG4gICAgICAgICAgdGhpcy5kZXN0cm95UmVmcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zdWJtaXNzaW9uRXJyb3JzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVzdHJveVJlZnMoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3lSZWZzKCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZnMuZm9yRWFjaCh4ID0+IHguZGVzdHJveSgpKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmcyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkUmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRSZWZlcmVuY2UgJiYgdGhpcy5maWVsZFJlZmVyZW5jZS5jb25kaXRpb24odGhpcy5mb3JtLnZhbHVlLCB0aGlzLnN0YXRlLmZvcm0ucm9vdC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3lSZWZzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5maWVsZC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5pbnB1dENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5jaGVja2JveENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGlzdCc6XHJcbiAgICAgIGNhc2UgJ2ZvcmVpZ25LZXknOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuc2VsZWN0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaW5rZWRTdHJ1Y3QnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgJHt0aGlzLmZpZWxkLnR5cGV9IGNvbnRyb2wgaXMgbm90IHN1cHBvcnRlZC5gLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyQ29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBwcm92aWRlck9wdGlvbnMuY29udGFpbmVyQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xDb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbnRyb2xDb21wb25lbnRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udHJvbENvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50RmFjdG9yeVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXJDb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcclxuICAgICAgY29udGFpbmVyQ29tcG9uZW50RmFjdG9yeSxcclxuICAgICAgMCxcclxuICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICBbW2NvbnRyb2xDb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZnMucHVzaChjb250cm9sQ29tcG9uZW50UmVmLCBjb250YWluZXJDb21wb25lbnRSZWYpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAodGhpcy5zaG91bGRSZW5kZXIoKSAmJiAhdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1QYXRoID0gdGhpcy5mb3JtUGF0aDtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtLnJvb3QuZ2V0KGZvcm1QYXRoKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sOiBJQ29udHJvbCA9IHtcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIGZvcm1QYXRoLFxyXG4gICAgICBmaWVsZDogdGhpcy5maWVsZCxcclxuICAgICAgZm9ybUlkOiB0aGlzLmZvcm1JZCxcclxuICAgICAgc3VibWlzc2lvbkVycm9yczpcclxuICAgICAgICAodGhpcy5zdGF0ZS5zdWJtaXNzaW9uRXJyb3JzICYmXHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnN1Ym1pc3Npb25FcnJvcnNbZm9ybVBhdGhdKSB8fFxyXG4gICAgICAgIFtdLFxyXG4gICAgICBmb3JtOiB0aGlzLmZvcm0sXHJcbiAgICAgIHJlbmRlcmVyVHlwZTogdGhpcy5tYXBUeXBlKHRoaXMuZmllbGQudHlwZSksXHJcbiAgICAgIGh0bWxJZDogYCR7dGhpcy5mb3JtSWR9LSR7Zm9ybVBhdGh9YCxcclxuICAgICAgb25Gb2N1czogdGhpcy5vbkZvY3VzLFxyXG4gICAgICBvbkJsdXI6IHRoaXMub25CbHVyLFxyXG4gICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZVxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZmllbGQudHlwZSkge1xyXG4gICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgY2FzZSAnZm9yZWlnbktleSc6IHtcclxuICAgICAgICBjb25zdCBsaXN0RmllbGQgPSA8SUxpc3RGaWVsZD50aGlzLmZpZWxkO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RDb250cm9sID0gPElTZWxlY3RDb250cm9sPmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpZWxkLnR5cGUgPT09ICdmb3JlaWduS2V5Jykge1xyXG4gICAgICAgICAgc2VsZWN0Q29udHJvbC5vcHRpb25zID0gKCkgPT4gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGVjdENvbnRyb2wub3B0aW9ucyA9ICgpID0+IGxpc3RGaWVsZC5vcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdsaW5rZWRTdHJ1Y3QnOiB7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbkNvbnRyb2wgPSA8SUNvbGxlY3Rpb25Db250cm9sPmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmtlZFN0cnVjdEZpZWxkID0gPElMaW5rZWRTdHJ1Y3RGaWVsZD50aGlzLmZpZWxkO1xyXG4gICAgICAgIGNvbnN0IHsgcmVmZXJlbmNlIH0gPSBsaW5rZWRTdHJ1Y3RGaWVsZDtcclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tGaWVsZHMgPSB0aGlzLnN0YXRlLmJsb2Nrc1tgJHt0aGlzLnN0cnVjdH0tJHt0aGlzLmJsb2NrfWBdLmZpZWxkcztcclxuXHJcbiAgICAgICAgY29uc3QgeyBoaW50cyB9ID0gPElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZT5ibG9ja0ZpZWxkcy5maW5kKFxyXG4gICAgICAgICAgeCA9PiB4LmZpZWxkID09PSBsaW5rZWRTdHJ1Y3RGaWVsZC5uYW1lXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlQmxvY2sgPSAoaGludHMgJiYgaGludHMuYmxvY2spIHx8IHJlZmVyZW5jZS5ibG9jaztcclxuXHJcbiAgICAgICAgY29uc3QgZmllbGRSZWZlcmVuY2VzID0gPElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZVtdPnRoaXMuc3RhdGVcclxuICAgICAgICAgIC5ibG9ja3NbYCR7cmVmZXJlbmNlLnN0cnVjdH0tJHtyZWZlcmVuY2VCbG9ja31gXS5maWVsZHM7XHJcblxyXG4gICAgICAgIGNvbnN0IG5lc3RlZEZpZWxkcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkUmVmZXJlbmNlIG9mIGZpZWxkUmVmZXJlbmNlcykge1xyXG4gICAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnN0YXRlLmZpZWxkc1tgJHtyZWZlcmVuY2Uuc3RydWN0fS0ke2ZpZWxkUmVmZXJlbmNlLmZpZWxkfWBdO1xyXG4gICAgICAgICAgbmVzdGVkRmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmVzdGVkVmFsdWVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmVzdGVkVmFsdWUgb2YgY29sbGVjdGlvbkNvbnRyb2wudmFsdWUuY29udHJvbHMpIHtcclxuICAgICAgICAgIG5lc3RlZFZhbHVlcy5wdXNoKDxGb3JtR3JvdXA+bmVzdGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wuc3RhbXAgPSB7XHJcbiAgICAgICAgICB0ZXh0OiBjb250cm9sLmZpZWxkLmxhYmVsLFxyXG4gICAgICAgICAgaGVhZGVyU2l6ZTogdGhpcy5zdGF0ZS5vcHRpb25zLmhlYWRlclNpemVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5jYW5BZGQgPSAhbGlua2VkU3RydWN0RmllbGQubWF4SW5zdGFuY2VzIHx8IG5lc3RlZFZhbHVlcy5sZW5ndGggPCBsaW5rZWRTdHJ1Y3RGaWVsZC5tYXhJbnN0YW5jZXM7XHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wubmVzdGVkVmFsdWVzID0gbmVzdGVkVmFsdWVzO1xyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLm5lc3RlZEZpZWxkcyA9IG5lc3RlZEZpZWxkcztcclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5sYXlvdXQgPSAoaGludHMgJiYgaGludHMubGF5b3V0KSB8fCAnaW5saW5lJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgY29tcG9uZW50UmVmIG9mIHRoaXMuX2NvbXBvbmVudFJlZnMpIHtcclxuICAgICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8Q29udHJvbFJlbmRlcmVyPmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuXHJcbiAgICAgIGNvbnN0IHByZXZpb3VzQ29udHJvbCA9IGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2w7XHJcbiAgICAgIGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2wgPSBjb250cm9sO1xyXG5cclxuICAgICAgY29uc3Qgb25Db21wb25lbnRDaGFuZ2UgPSAoPE9uQ2hhbmdlcz5jb21wb25lbnRSZWYuaW5zdGFuY2UpLm5nT25DaGFuZ2VzO1xyXG4gICAgICBpZiAob25Db21wb25lbnRDaGFuZ2UpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IHtcclxuICAgICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzQ29udHJvbCxcclxuICAgICAgICAgIGN1cnJlbnRWYWx1ZTogY29udHJvbCxcclxuICAgICAgICAgIGZpcnN0Q2hhbmdlOiB0eXBlb2YgcHJldmlvdXNDb250cm9sID09PSAndW5kZWZpbmVkJyxcclxuICAgICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9uQ29tcG9uZW50Q2hhbmdlLmNhbGwoY29tcG9uZW50UmVuZGVyZXIsIHsgY29udHJvbDogY2hhbmdlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5fdmFsdWVPbkZvY3VzID0gdGhpcy5mb3JtLnJvb3QuZ2V0KHRoaXMuZm9ybVBhdGgpLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgb25CbHVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmZvcm0ucm9vdC5nZXQodGhpcy5mb3JtUGF0aCkudmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX3ZhbHVlT25Gb2N1cyAhPT0gbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uub25DaGFuZ2UodGhpcy5mb3JtSWQsIHRoaXMuZm9ybVBhdGgsIG5ld1ZhbHVlLCAnYmx1cicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAoZTogYW55KSA9PiB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZm9ybS5yb290LmdldCh0aGlzLmZvcm1QYXRoKS52YWx1ZTtcclxuICAgIHRoaXMuc3RhdGVTZXJ2aWNlLm9uQ2hhbmdlKHRoaXMuZm9ybUlkLCB0aGlzLmZvcm1QYXRoLCBuZXdWYWx1ZSwgZSA/ICdjaGFuZ2UnIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1hcFR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=