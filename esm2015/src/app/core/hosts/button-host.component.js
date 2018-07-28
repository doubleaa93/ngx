/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewChild, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { FormStateService } from '../services/form-state.service';
import { ComponentHostDirective } from './component-host.directive';
export class ButtonHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.click = new EventEmitter();
        this.onClick = (e) => {
            this.click.emit(e);
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
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
    render() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.buttonComponent);
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
        const { options: { struct, submitButtonStyle, cancelButtonStyle }, structs } = this.state;
        /** @type {?} */
        const isSubmit = this.type === 'submit';
        /** @type {?} */
        let style = null;
        switch (this.type) {
            case 'submit':
                style = submitButtonStyle;
                break;
            case 'cancel':
                style = cancelButtonStyle;
                break;
        }
        /** @type {?} */
        let text = (style && style.text) || this.text;
        if (isSubmit &&
            submitButtonStyle &&
            submitButtonStyle.appendSchemaLabel) {
            text = `${text} ${structs[struct].label}`;
        }
        /** @type {?} */
        const extraClasses = [];
        if (this.state.options.extraButtonClasses) {
            extraClasses.push(...this.state.options.extraButtonClasses);
        }
        if (this.extraClasses) {
            if (typeof this.extraClasses === 'string') {
                extraClasses.push(...this.extraClasses.split(' '));
            }
            else {
                extraClasses.push(...this.extraClasses);
            }
        }
        /** @type {?} */
        const componentRenderer = /** @type {?} */ (this._componentRef.instance);
        componentRenderer.button = {
            text,
            extraClasses,
            type: isSubmit ? 'submit' : 'button',
            disabled: this.disabled,
            onClick: this.onClick,
            class: (style && style.class) || undefined
        };
    }
}
ButtonHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-button-host',
                template: `<ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
ButtonHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
ButtonHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    formId: [{ type: Input }],
    type: [{ type: Input }],
    extraClasses: [{ type: Input }],
    text: [{ type: Input }],
    disabled: [{ type: Input }],
    click: [{ type: Output }]
};
function ButtonHostComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ButtonHostComponent.prototype._componentRef;
    /** @type {?} */
    ButtonHostComponent.prototype.componentHost;
    /** @type {?} */
    ButtonHostComponent.prototype.formId;
    /** @type {?} */
    ButtonHostComponent.prototype.type;
    /** @type {?} */
    ButtonHostComponent.prototype.extraClasses;
    /** @type {?} */
    ButtonHostComponent.prototype.text;
    /** @type {?} */
    ButtonHostComponent.prototype.disabled;
    /** @type {?} */
    ButtonHostComponent.prototype.click;
    /** @type {?} */
    ButtonHostComponent.prototype.state;
    /** @type {?} */
    ButtonHostComponent.prototype.onClick;
    /** @type {?} */
    ButtonHostComponent.prototype.stateService;
    /** @type {?} */
    ButtonHostComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    ButtonHostComponent.prototype.providerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWhvc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL2hvc3RzL2J1dHRvbi1ob3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBSUwsU0FBUyxFQUNULHdCQUF3QixFQUd4QixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTXBFLE1BQU07Ozs7OztJQVdKLFlBQ1UsY0FDQSwwQkFDQTtRQUZBLGlCQUFZLEdBQVosWUFBWTtRQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlO3FCQU5QLElBQUksWUFBWSxFQUFPO3VCQStHL0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3BCO0tBMUdHOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDUjtRQUVE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UUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVE7WUFDcEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLFNBQVM7U0FDM0MsQ0FBQztLQUNIOzs7WUF6SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLFFBQVEsRUFBRSxtREFBbUQ7YUFDOUQ7Ozs7WUFOUSxnQkFBZ0I7WUFUdkIsd0JBQXdCO1lBTWpCLHVCQUF1Qjs7OzRCQVk3QixTQUFTLFNBQUMsc0JBQXNCO3FCQUNoQyxLQUFLO21CQUNMLEtBQUs7MkJBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7b0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIFZpZXdDaGlsZCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBCdXR0b25SZW5kZXJlciB9IGZyb20gJy4uL3JlbmRlcmVycy9idXR0b24ucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1idXR0b24taG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHR5cGU6ICdidXR0b24nIHwgJ3N1Ym1pdCcgfCAnY2FuY2VsJztcclxuICBASW5wdXQoKSBleHRyYUNsYXNzZXM6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5mb3JtSWQgJiYgIWNoYW5nZXMuZm9ybUlkLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSB0aGlzLnByb3ZpZGVyU2VydmljZS5nZXQoXHJcbiAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5wcm92aWRlclxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBwcm92aWRlck9wdGlvbnMuYnV0dG9uQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICBvcHRpb25zOiB7IHN0cnVjdCwgc3VibWl0QnV0dG9uU3R5bGUsIGNhbmNlbEJ1dHRvblN0eWxlIH0sXHJcbiAgICAgIHN0cnVjdHNcclxuICAgIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGNvbnN0IGlzU3VibWl0ID0gdGhpcy50eXBlID09PSAnc3VibWl0JztcclxuXHJcbiAgICBsZXQgc3R5bGUgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XHJcbiAgICAgICAgc3R5bGUgPSBzdWJtaXRCdXR0b25TdHlsZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2FuY2VsJzpcclxuICAgICAgICBzdHlsZSA9IGNhbmNlbEJ1dHRvblN0eWxlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0ZXh0ID0gKHN0eWxlICYmIHN0eWxlLnRleHQpIHx8IHRoaXMudGV4dDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGlzU3VibWl0ICYmXHJcbiAgICAgIHN1Ym1pdEJ1dHRvblN0eWxlICYmXHJcbiAgICAgIHN1Ym1pdEJ1dHRvblN0eWxlLmFwcGVuZFNjaGVtYUxhYmVsXHJcbiAgICApIHtcclxuICAgICAgdGV4dCA9IGAke3RleHR9ICR7c3RydWN0c1tzdHJ1Y3RdLmxhYmVsfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXh0cmFDbGFzc2VzID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUub3B0aW9ucy5leHRyYUJ1dHRvbkNsYXNzZXMpIHtcclxuICAgICAgZXh0cmFDbGFzc2VzLnB1c2goLi4udGhpcy5zdGF0ZS5vcHRpb25zLmV4dHJhQnV0dG9uQ2xhc3Nlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXh0cmFDbGFzc2VzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5leHRyYUNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZXh0cmFDbGFzc2VzLnB1c2goLi4udGhpcy5leHRyYUNsYXNzZXMuc3BsaXQoJyAnKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXh0cmFDbGFzc2VzLnB1c2goLi4udGhpcy5leHRyYUNsYXNzZXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8QnV0dG9uUmVuZGVyZXI+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgY29tcG9uZW50UmVuZGVyZXIuYnV0dG9uID0ge1xyXG4gICAgICB0ZXh0LFxyXG4gICAgICBleHRyYUNsYXNzZXMsXHJcbiAgICAgIHR5cGU6IGlzU3VibWl0ID8gJ3N1Ym1pdCcgOiAnYnV0dG9uJyxcclxuICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXHJcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGljayxcclxuICAgICAgY2xhc3M6IChzdHlsZSAmJiBzdHlsZS5jbGFzcykgfHwgdW5kZWZpbmVkXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb25DbGljayA9IChlKSA9PiB7XHJcbiAgICB0aGlzLmNsaWNrLmVtaXQoZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==