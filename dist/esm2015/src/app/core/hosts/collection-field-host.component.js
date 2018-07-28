/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormStateService } from '../services/form-state.service';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { ComponentHostDirective } from './component-host.directive';
export class CollectionFieldHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.onAdd = (e) => {
            e.stopPropagation();
            e.preventDefault();
            /** @type {?} */
            const reference = (/** @type {?} */ (this.control.field)).reference;
            /** @type {?} */
            const form = this.stateService.createForm(this.control.formId, reference.struct, reference.block);
            this.control.value.push(form);
            /** @type {?} */
            const index = this.control.value.controls.indexOf(form);
            /** @type {?} */
            const childPath = `${this.control.formPath}.${index}`;
            if (this.control.layout === 'table') {
                this.stateService.pushNavigation(this.control.formId, reference.struct, reference.block, childPath, this.control.formPath);
            }
            this.control.onChange(null);
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.control.formId);
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["control"] && !changes["control"].firstChange) {
            this.updateInputs();
        }
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
    render() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        let controlComponent;
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.control.layout) {
            case 'inline':
                controlComponent = providerOptions.inlineComponent;
                break;
            case 'table':
                controlComponent = providerOptions.tableComponent;
                break;
            default:
                console.error(`${this.control.layout} layout is not supported.`, JSON.stringify(this.control.field));
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
        const control = Object.assign({}, this.control, { onAdd: this.onAdd });
        /** @type {?} */
        const previousControl = componentRenderer.control;
        componentRenderer.control = control;
        /** @type {?} */
        const onComponentChange = (/** @type {?} */ (this._componentRef.instance)).ngOnChanges;
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
CollectionFieldHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-collection-field-host',
                template: `<ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
CollectionFieldHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
CollectionFieldHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    control: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9ob3N0cy9jb2xsZWN0aW9uLWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCx3QkFBd0IsRUFJeEIsU0FBUyxFQUdWLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTXBFLE1BQU07Ozs7OztJQU1KLFlBQ1UsY0FDQSwwQkFDQTtRQUZBLGlCQUFZLEdBQVosWUFBWTtRQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlO3FCQXlGakIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNaLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O1lBRW5CLE1BQU0sU0FBUyxHQUFHLG1CQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxDQUFDLFNBQVMsQ0FBQzs7WUFFbEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUU5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUN4RCxNQUFNLFNBQVMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBRXRELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssT0FBTyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUg7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtLQXpHRzs7OztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLFdBQVcsRUFBRTtZQUNuRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjtLQUNGOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCOztRQUVELElBQUksZ0JBQWdCLENBQU07O1FBRTFCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQzVCLENBQUM7UUFFRixRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQzNCLEtBQUssUUFBUTtnQkFDWCxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDO2dCQUNuRCxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUM7Z0JBQ2xELE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsS0FBSyxDQUNYLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLDJCQUEyQixFQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQ25DLENBQUM7Z0JBQ0YsT0FBTztTQUNWOztRQUVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFFekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQzVFLGdCQUFnQixDQUNqQixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsT0FBTztTQUNSOztRQUVELE1BQU0saUJBQWlCLHFCQUE4QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQzs7UUFFakYsTUFBTSxPQUFPLHFCQUNSLElBQUksQ0FBQyxPQUFPLElBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQ2pCOztRQUVGLE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztRQUNsRCxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztRQUVwQyxNQUFNLGlCQUFpQixHQUFHLG1CQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDLENBQUMsV0FBVyxDQUFDO1FBRS9FLElBQUksaUJBQWlCLEVBQUU7O1lBQ3JCLE1BQU0sTUFBTSxHQUFpQjtnQkFDM0IsYUFBYSxFQUFFLGVBQWU7Z0JBQzlCLFlBQVksRUFBRSxPQUFPO2dCQUNyQixXQUFXLEVBQUUsT0FBTyxlQUFlLEtBQUssV0FBVztnQkFDbkQsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXO2FBQ3hDLENBQUM7WUFFRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNoRTtLQUNGOzs7WUFwR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRSxtREFBbUQ7YUFDOUQ7Ozs7WUFQUSxnQkFBZ0I7WUFYdkIsd0JBQXdCO1lBWWpCLHVCQUF1Qjs7OzRCQVM3QixTQUFTLFNBQUMsc0JBQXNCO3NCQUNoQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciwgSUNvbGxlY3Rpb25Db250cm9sIH0gZnJvbSAnLi4vcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBJUmVmZXJlbmNlRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtY29sbGVjdGlvbi1maWVsZC1ob3N0JyxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBkZVJlQ3J1ZENvbXBvbmVudEhvc3Q+PC9uZy10ZW1wbGF0ZT5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdGF0ZVNlcnZpY2U6IEZvcm1TdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBwcm92aWRlclNlcnZpY2U6IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5jb250cm9sLmZvcm1JZCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuY29udHJvbCAmJiAhY2hhbmdlcy5jb250cm9sLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5jb250cm9sLmxheW91dCkge1xyXG4gICAgICBjYXNlICdpbmxpbmUnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuaW5saW5lQ29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0YWJsZSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy50YWJsZUNvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgYCR7dGhpcy5jb250cm9sLmxheW91dH0gbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQuYCxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuY29udHJvbC5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8Q29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlcj50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcblxyXG4gICAgY29uc3QgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sID0ge1xyXG4gICAgICAuLi50aGlzLmNvbnRyb2wsXHJcbiAgICAgIG9uQWRkOiB0aGlzLm9uQWRkXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzQ29udHJvbCA9IGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2w7XHJcbiAgICBjb21wb25lbnRSZW5kZXJlci5jb250cm9sID0gY29udHJvbDtcclxuXHJcbiAgICBjb25zdCBvbkNvbXBvbmVudENoYW5nZSA9ICg8T25DaGFuZ2VzPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZSkubmdPbkNoYW5nZXM7XHJcblxyXG4gICAgaWYgKG9uQ29tcG9uZW50Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0ge1xyXG4gICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzQ29udHJvbCxcclxuICAgICAgICBjdXJyZW50VmFsdWU6IGNvbnRyb2wsXHJcbiAgICAgICAgZmlyc3RDaGFuZ2U6IHR5cGVvZiBwcmV2aW91c0NvbnRyb2wgPT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgb25Db21wb25lbnRDaGFuZ2UuY2FsbChjb21wb25lbnRSZW5kZXJlciwgeyBjb250cm9sOiBjaGFuZ2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkZCA9IChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHJlZmVyZW5jZSA9ICg8SVJlZmVyZW5jZUZpZWxkPnRoaXMuY29udHJvbC5maWVsZCkucmVmZXJlbmNlO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLnN0YXRlU2VydmljZS5jcmVhdGVGb3JtKHRoaXMuY29udHJvbC5mb3JtSWQsIHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jayk7XHJcbiAgICB0aGlzLmNvbnRyb2wudmFsdWUucHVzaChmb3JtKTtcclxuXHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29udHJvbC52YWx1ZS5jb250cm9scy5pbmRleE9mKGZvcm0pO1xyXG4gICAgY29uc3QgY2hpbGRQYXRoID0gYCR7dGhpcy5jb250cm9sLmZvcm1QYXRofS4ke2luZGV4fWA7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udHJvbC5sYXlvdXQgPT09ICd0YWJsZScpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UucHVzaE5hdmlnYXRpb24odGhpcy5jb250cm9sLmZvcm1JZCwgcmVmZXJlbmNlLnN0cnVjdCwgcmVmZXJlbmNlLmJsb2NrLCBjaGlsZFBhdGgsIHRoaXMuY29udHJvbC5mb3JtUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb250cm9sLm9uQ2hhbmdlKG51bGwpO1xyXG4gIH1cclxufVxyXG4iXX0=