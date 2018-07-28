/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormStateService } from '../services/form-state.service';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { ComponentHostDirective } from './component-host.directive';
var CollectionFieldHostComponent = /** @class */ (function () {
    function CollectionFieldHostComponent(stateService, componentFactoryResolver, providerService) {
        var _this = this;
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.onAdd = function (e) {
            e.stopPropagation();
            e.preventDefault();
            /** @type {?} */
            var reference = (/** @type {?} */ (_this.control.field)).reference;
            /** @type {?} */
            var form = _this.stateService.createForm(_this.control.formId, reference.struct, reference.block);
            _this.control.value.push(form);
            /** @type {?} */
            var index = _this.control.value.controls.indexOf(form);
            /** @type {?} */
            var childPath = _this.control.formPath + "." + index;
            if (_this.control.layout === 'table') {
                _this.stateService.pushNavigation(_this.control.formId, reference.struct, reference.block, childPath, _this.control.formPath);
            }
            _this.control.onChange(null);
        };
    }
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.state = this.stateService.get(this.control.formId);
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["control"] && !changes["control"].firstChange) {
            this.updateInputs();
        }
    };
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        var controlComponent;
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.control.layout) {
            case 'inline':
                controlComponent = providerOptions.inlineComponent;
                break;
            case 'table':
                controlComponent = providerOptions.tableComponent;
                break;
            default:
                console.error(this.control.layout + " layout is not supported.", JSON.stringify(this.control.field));
                return;
        }
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        if (!this._componentRef) {
            return;
        }
        /** @type {?} */
        var componentRenderer = /** @type {?} */ (this._componentRef.instance);
        /** @type {?} */
        var control = tslib_1.__assign({}, this.control, { onAdd: this.onAdd });
        /** @type {?} */
        var previousControl = componentRenderer.control;
        componentRenderer.control = control;
        /** @type {?} */
        var onComponentChange = (/** @type {?} */ (this._componentRef.instance)).ngOnChanges;
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
    CollectionFieldHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-collection-field-host',
                    template: "<ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    CollectionFieldHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
    CollectionFieldHostComponent.propDecorators = {
        componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
        control: [{ type: Input }]
    };
    return CollectionFieldHostComponent;
}());
export { CollectionFieldHostComponent };
function CollectionFieldHostComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CollectionFieldHostComponent.prototype._componentRef;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.componentHost;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.control;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.state;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.onAdd;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.stateService;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    CollectionFieldHostComponent.prototype.providerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9ob3N0cy9jb2xsZWN0aW9uLWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsd0JBQXdCLEVBSXhCLFNBQVMsRUFHVixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNwRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFZbEUsc0NBQ1UsY0FDQSwwQkFDQTtRQUhWLGlCQUlJO1FBSE0saUJBQVksR0FBWixZQUFZO1FBQ1osNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixvQkFBZSxHQUFmLGVBQWU7cUJBeUZqQixVQUFDLENBQUM7WUFDUixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDOztZQUVuQixJQUFNLFNBQVMsR0FBRyxtQkFBa0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxTQUFTLENBQUM7O1lBRWxFLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xHLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFFOUIsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxD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QUFLLElBQ2pCOztRQUVGLElBQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUNsRCxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztRQUVwQyxJQUFNLGlCQUFpQixHQUFHLG1CQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDLENBQUMsV0FBVyxDQUFDO1FBRS9FLElBQUksaUJBQWlCLEVBQUU7O1lBQ3JCLElBQU0sUUFBTSxHQUFpQjtnQkFDM0IsYUFBYSxFQUFFLGVBQWU7Z0JBQzlCLFlBQVksRUFBRSxPQUFPO2dCQUNyQixXQUFXLEVBQUUsT0FBTyxlQUFlLEtBQUssV0FBVztnQkFDbkQsYUFBYSxFQUFFLGNBQU0sT0FBQSxRQUFNLENBQUMsV0FBVyxFQUFsQixDQUFrQjthQUN4QyxDQUFDO1lBRUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQU0sRUFBRSxDQUFDLENBQUM7U0FDaEU7S0FDRjs7Z0JBcEdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0NBQWtDO29CQUM1QyxRQUFRLEVBQUUsbURBQW1EO2lCQUM5RDs7OztnQkFQUSxnQkFBZ0I7Z0JBWHZCLHdCQUF3QjtnQkFZakIsdUJBQXVCOzs7Z0NBUzdCLFNBQVMsU0FBQyxzQkFBc0I7MEJBQ2hDLEtBQUs7O3VDQTFCUjs7U0F1QmEsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciwgSUNvbGxlY3Rpb25Db250cm9sIH0gZnJvbSAnLi4vcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBJUmVmZXJlbmNlRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtY29sbGVjdGlvbi1maWVsZC1ob3N0JyxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBkZVJlQ3J1ZENvbXBvbmVudEhvc3Q+PC9uZy10ZW1wbGF0ZT5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdGF0ZVNlcnZpY2U6IEZvcm1TdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBwcm92aWRlclNlcnZpY2U6IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5jb250cm9sLmZvcm1JZCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuY29udHJvbCAmJiAhY2hhbmdlcy5jb250cm9sLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5jb250cm9sLmxheW91dCkge1xyXG4gICAgICBjYXNlICdpbmxpbmUnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuaW5saW5lQ29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0YWJsZSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy50YWJsZUNvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgYCR7dGhpcy5jb250cm9sLmxheW91dH0gbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQuYCxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuY29udHJvbC5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8Q29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlcj50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcblxyXG4gICAgY29uc3QgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sID0ge1xyXG4gICAgICAuLi50aGlzLmNvbnRyb2wsXHJcbiAgICAgIG9uQWRkOiB0aGlzLm9uQWRkXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzQ29udHJvbCA9IGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2w7XHJcbiAgICBjb21wb25lbnRSZW5kZXJlci5jb250cm9sID0gY29udHJvbDtcclxuXHJcbiAgICBjb25zdCBvbkNvbXBvbmVudENoYW5nZSA9ICg8T25DaGFuZ2VzPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZSkubmdPbkNoYW5nZXM7XHJcblxyXG4gICAgaWYgKG9uQ29tcG9uZW50Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0ge1xyXG4gICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzQ29udHJvbCxcclxuICAgICAgICBjdXJyZW50VmFsdWU6IGNvbnRyb2wsXHJcbiAgICAgICAgZmlyc3RDaGFuZ2U6IHR5cGVvZiBwcmV2aW91c0NvbnRyb2wgPT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgb25Db21wb25lbnRDaGFuZ2UuY2FsbChjb21wb25lbnRSZW5kZXJlciwgeyBjb250cm9sOiBjaGFuZ2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkZCA9IChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHJlZmVyZW5jZSA9ICg8SVJlZmVyZW5jZUZpZWxkPnRoaXMuY29udHJvbC5maWVsZCkucmVmZXJlbmNlO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLnN0YXRlU2VydmljZS5jcmVhdGVGb3JtKHRoaXMuY29udHJvbC5mb3JtSWQsIHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jayk7XHJcbiAgICB0aGlzLmNvbnRyb2wudmFsdWUucHVzaChmb3JtKTtcclxuXHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29udHJvbC52YWx1ZS5jb250cm9scy5pbmRleE9mKGZvcm0pO1xyXG4gICAgY29uc3QgY2hpbGRQYXRoID0gYCR7dGhpcy5jb250cm9sLmZvcm1QYXRofS4ke2luZGV4fWA7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udHJvbC5sYXlvdXQgPT09ICd0YWJsZScpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UucHVzaE5hdmlnYXRpb24odGhpcy5jb250cm9sLmZvcm1JZCwgcmVmZXJlbmNlLnN0cnVjdCwgcmVmZXJlbmNlLmJsb2NrLCBjaGlsZFBhdGgsIHRoaXMuY29udHJvbC5mb3JtUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb250cm9sLm9uQ2hhbmdlKG51bGwpO1xyXG4gIH1cclxufVxyXG4iXX0=