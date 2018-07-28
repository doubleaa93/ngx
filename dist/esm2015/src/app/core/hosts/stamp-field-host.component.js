/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ViewChild, Input, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { FormStateService } from '../services/form-state.service';
import { ComponentHostDirective } from './component-host.directive';
export class StampFieldHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        const fieldReference = this.state.blocks[`${this.struct}-${this.block}`].fields.find(x => x.field === this.field.name);
        this.fieldReference = fieldReference;
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
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    }
    /**
     * @return {?}
     */
    shouldRender() {
        return this.fieldReference.condition(this.form.value, this.state.form.root.value);
    }
    /**
     * @return {?}
     */
    render() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        let controlComponent;
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.field.type) {
            case 'stamp':
                controlComponent = providerOptions.stampComponent;
                break;
            default:
                console.error(`${this.field.type} control is not supported.`, JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    updateInputs() {
        if (!this._componentRef) {
            return;
        }
        /** @type {?} */
        const componentRenderer = /** @type {?} */ (this._componentRef.instance);
        /** @type {?} */
        const stampField = /** @type {?} */ (this.field);
        /** @type {?} */
        const stamp = {
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
        /** @type {?} */
        const previousStamp = componentRenderer.stamp;
        componentRenderer.stamp = stamp;
        /** @type {?} */
        const onComponentChange = (/** @type {?} */ (this._componentRef.instance))
            .ngOnChanges;
        if (onComponentChange) {
            /** @type {?} */
            const change = {
                previousValue: previousStamp,
                currentValue: stamp,
                firstChange: typeof previousStamp === 'undefined',
                isFirstChange: () => change.firstChange
            };
            onComponentChange.call(componentRenderer, { control: change });
        }
    }
}
StampFieldHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-stamp-field-host',
                template: `<ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
StampFieldHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
StampFieldHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    formId: [{ type: Input }],
    form: [{ type: Input }],
    struct: [{ type: Input }],
    block: [{ type: Input }],
    field: [{ type: Input }]
};
function StampFieldHostComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    StampFieldHostComponent.prototype._componentRef;
    /** @type {?} */
    StampFieldHostComponent.prototype.componentHost;
    /** @type {?} */
    StampFieldHostComponent.prototype.formId;
    /** @type {?} */
    StampFieldHostComponent.prototype.form;
    /** @type {?} */
    StampFieldHostComponent.prototype.struct;
    /** @type {?} */
    StampFieldHostComponent.prototype.block;
    /** @type {?} */
    StampFieldHostComponent.prototype.field;
    /** @type {?} */
    StampFieldHostComponent.prototype.state;
    /** @type {?} */
    StampFieldHostComponent.prototype.fieldReference;
    /** @type {?} */
    StampFieldHostComponent.prototype.stateService;
    /** @type {?} */
    StampFieldHostComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    StampFieldHostComponent.prototype.providerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbXAtZmllbGQtaG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvaG9zdHMvc3RhbXAtZmllbGQtaG9zdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsU0FBUyxFQUNULEtBQUssRUFJTCx3QkFBd0IsRUFHekIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRXBGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBR2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTXBFLE1BQU07Ozs7OztJQVdKLFlBQ1UsY0FDQSwwQkFDQTtRQUZBLGlCQUFZLEdBQVosWUFBWTtRQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlO0tBQ3JCOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUVoRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDdEMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FDL0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBRXJDLElBQUksQ0FBQyxNQUFNLEVBQUUs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LENBQUM7YUFDcEQ7U0FDRjs7UUFFRCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7UUFDOUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7UUFFaEMsTUFBTSxpQkFBaUIsR0FBRyxtQkFBWSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQzthQUMvRCxXQUFXLENBQUM7UUFFZixJQUFJLGlCQUFpQixFQUFFOztZQUNyQixNQUFNLE1BQU0sR0FBaUI7Z0JBQzNCLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsV0FBVyxFQUFFLE9BQU8sYUFBYSxLQUFLLFdBQVc7Z0JBQ2pELGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVzthQUN4QyxDQUFDO1lBRUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDaEU7S0FDRjs7O1lBeElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUUsbURBQW1EO2FBQzlEOzs7O1lBUlEsZ0JBQWdCO1lBUHZCLHdCQUF3QjtZQUtqQix1QkFBdUI7Ozs0QkFhN0IsU0FBUyxTQUFDLHNCQUFzQjtxQkFDaEMsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSUZpZWxkLCBJRmllbGRSZWZlcmVuY2UsIElTdGFtcEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdGFtcFJlbmRlcmVyLCBJU3RhbXAgfSBmcm9tICcuLi9yZW5kZXJlcnMvc3RhbXAucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhbXBGaWVsZEhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xyXG4gIEBWaWV3Q2hpbGQoQ29tcG9uZW50SG9zdERpcmVjdGl2ZSkgY29tcG9uZW50SG9zdDogQ29tcG9uZW50SG9zdERpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBmb3JtSWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgQElucHV0KCkgc3RydWN0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmxvY2s6IHN0cmluZztcclxuICBASW5wdXQoKSBmaWVsZDogSUZpZWxkO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcbiAgZmllbGRSZWZlcmVuY2U6IElGaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVTZXJ2aWNlLmdldCh0aGlzLmZvcm1JZCk7XHJcblxyXG4gICAgY29uc3QgZmllbGRSZWZlcmVuY2UgPSB0aGlzLnN0YXRlLmJsb2Nrc1tcclxuICAgICAgYCR7dGhpcy5zdHJ1Y3R9LSR7dGhpcy5ibG9ja31gXHJcbiAgICBdLmZpZWxkcy5maW5kKHggPT4geC5maWVsZCA9PT0gdGhpcy5maWVsZC5uYW1lKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkUmVmZXJlbmNlID0gZmllbGRSZWZlcmVuY2U7XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmZvcm1JZCAmJiAhY2hhbmdlcy5mb3JtSWQuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkUmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uKFxyXG4gICAgICB0aGlzLmZvcm0udmFsdWUsXHJcbiAgICAgIHRoaXMuc3RhdGUuZm9ybS5yb290LnZhbHVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYuZGVzdHJveSgpO1xyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xDb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSB0aGlzLnByb3ZpZGVyU2VydmljZS5nZXQoXHJcbiAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5wcm92aWRlclxyXG4gICAgKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZmllbGQudHlwZSkge1xyXG4gICAgICBjYXNlICdzdGFtcCc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5zdGFtcENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgYCR7dGhpcy5maWVsZC50eXBlfSBjb250cm9sIGlzIG5vdCBzdXBwb3J0ZWQuYCxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuZmllbGQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29udHJvbENvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPFN0YW1wUmVuZGVyZXI+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgY29uc3Qgc3RhbXBGaWVsZCA9IDxJU3RhbXBGaWVsZD50aGlzLmZpZWxkO1xyXG5cclxuICAgIGNvbnN0IHN0YW1wOiBJU3RhbXAgPSB7XHJcbiAgICAgIHRleHQ6IHN0YW1wRmllbGQubGFiZWwsXHJcbiAgICAgIGhlYWRlclNpemU6IHRoaXMuc3RhdGUub3B0aW9ucy5oZWFkZXJTaXplXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChzdGFtcEZpZWxkLmhpbnRzKSB7XHJcbiAgICAgIGlmIChzdGFtcEZpZWxkLmhpbnRzLmhlYWRlclNpemUpIHtcclxuICAgICAgICBzdGFtcC5oZWFkZXJTaXplID0gc3RhbXBGaWVsZC5oaW50cy5oZWFkZXJTaXplO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc3RhbXBGaWVsZC5oaW50cy5kaXNwbGF5Q2xhc3NOYW1lcykge1xyXG4gICAgICAgIHN0YW1wLmNsYXNzZXMgPSBzdGFtcEZpZWxkLmhpbnRzLmRpc3BsYXlDbGFzc05hbWVzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJldmlvdXNTdGFtcCA9IGNvbXBvbmVudFJlbmRlcmVyLnN0YW1wO1xyXG4gICAgY29tcG9uZW50UmVuZGVyZXIuc3RhbXAgPSBzdGFtcDtcclxuXHJcbiAgICBjb25zdCBvbkNvbXBvbmVudENoYW5nZSA9ICg8T25DaGFuZ2VzPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZSlcclxuICAgICAgLm5nT25DaGFuZ2VzO1xyXG5cclxuICAgIGlmIChvbkNvbXBvbmVudENoYW5nZSkge1xyXG4gICAgICBjb25zdCBjaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IHtcclxuICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1N0YW1wLFxyXG4gICAgICAgIGN1cnJlbnRWYWx1ZTogc3RhbXAsXHJcbiAgICAgICAgZmlyc3RDaGFuZ2U6IHR5cGVvZiBwcmV2aW91c1N0YW1wID09PSAndW5kZWZpbmVkJyxcclxuICAgICAgICBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiBjaGFuZ2UuZmlyc3RDaGFuZ2VcclxuICAgICAgfTtcclxuXHJcbiAgICAgIG9uQ29tcG9uZW50Q2hhbmdlLmNhbGwoY29tcG9uZW50UmVuZGVyZXIsIHsgY29udHJvbDogY2hhbmdlIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=