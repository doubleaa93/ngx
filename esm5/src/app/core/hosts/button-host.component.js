/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { FormStateService } from '../services/form-state.service';
import { ComponentHostDirective } from './component-host.directive';
var ButtonHostComponent = /** @class */ (function () {
    function ButtonHostComponent(stateService, componentFactoryResolver, providerService) {
        var _this = this;
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.click = new EventEmitter();
        this.onClick = function (e) {
            _this.click.emit(e);
        };
    }
    /**
     * @return {?}
     */
    ButtonHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.state = this.stateService.get(this.formId);
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ButtonHostComponent.prototype.ngOnChanges = /**
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
    ButtonHostComponent.prototype.ngOnDestroy = /**
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
    ButtonHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.buttonComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    ButtonHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        if (!this._componentRef) {
            return;
        }
        var _a = this.state, _b = _a.options, struct = _b.struct, submitButtonStyle = _b.submitButtonStyle, cancelButtonStyle = _b.cancelButtonStyle, structs = _a.structs;
        /** @type {?} */
        var isSubmit = this.type === 'submit';
        /** @type {?} */
        var style = null;
        switch (this.type) {
            case 'submit':
                style = submitButtonStyle;
                break;
            case 'cancel':
                style = cancelButtonStyle;
                break;
        }
        /** @type {?} */
        var text = (style && style.text) || this.text;
        if (isSubmit &&
            submitButtonStyle &&
            submitButtonStyle.appendSchemaLabel) {
            text = text + " " + structs[struct].label;
        }
        /** @type {?} */
        var extraClasses = [];
        if (this.state.options.extraButtonClasses) {
            extraClasses.push.apply(extraClasses, tslib_1.__spread(this.state.options.extraButtonClasses));
        }
        if (this.extraClasses) {
            if (typeof this.extraClasses === 'string') {
                extraClasses.push.apply(extraClasses, tslib_1.__spread(this.extraClasses.split(' ')));
            }
            else {
                extraClasses.push.apply(extraClasses, tslib_1.__spread(this.extraClasses));
            }
        }
        /** @type {?} */
        var componentRenderer = /** @type {?} */ (this._componentRef.instance);
        componentRenderer.button = {
            text: text,
            extraClasses: extraClasses,
            type: isSubmit ? 'submit' : 'button',
            disabled: this.disabled,
            onClick: this.onClick,
            class: (style && style.class) || undefined
        };
    };
    ButtonHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-button-host',
                    template: "<ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    ButtonHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
    ButtonHostComponent.propDecorators = {
        componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
        formId: [{ type: Input }],
        type: [{ type: Input }],
        extraClasses: [{ type: Input }],
        text: [{ type: Input }],
        disabled: [{ type: Input }],
        click: [{ type: Output }]
    };
    return ButtonHostComponent;
}());
export { ButtonHostComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWhvc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL2hvc3RzL2J1dHRvbi1ob3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLFNBQVMsRUFDVCx3QkFBd0IsRUFHeEIsTUFBTSxFQUNOLFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUdwRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7SUFpQmxFLDZCQUNVLGNBQ0EsMEJBQ0E7UUFIVixpQkFJSTtRQUhNLGlCQUFZLEdBQVosWUFBWTtRQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlO3FCQU5QLElBQUksWUFBWSxFQUFPO3VCQStHL0IsVUFBQyxDQUFDO1lBQ1YsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7S0ExR0c7Ozs7SUFFSixzQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7Ozs7SUFFRCx5Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NB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RSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUNwQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEtBQUssRUFBRSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUztTQUMzQyxDQUFDO0tBQ0g7O2dCQXpIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsUUFBUSxFQUFFLG1EQUFtRDtpQkFDOUQ7Ozs7Z0JBTlEsZ0JBQWdCO2dCQVR2Qix3QkFBd0I7Z0JBTWpCLHVCQUF1Qjs7O2dDQVk3QixTQUFTLFNBQUMsc0JBQXNCO3lCQUNoQyxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsTUFBTTs7OEJBL0JUOztTQXVCYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgQnV0dG9uUmVuZGVyZXIgfSBmcm9tICcuLi9yZW5kZXJlcnMvYnV0dG9uLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYnV0dG9uLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIGRlUmVDcnVkQ29tcG9uZW50SG9zdD48L25nLXRlbXBsYXRlPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xyXG4gIEBWaWV3Q2hpbGQoQ29tcG9uZW50SG9zdERpcmVjdGl2ZSkgY29tcG9uZW50SG9zdDogQ29tcG9uZW50SG9zdERpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBmb3JtSWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSB0eXBlOiAnYnV0dG9uJyB8ICdzdWJtaXQnIHwgJ2NhbmNlbCc7XHJcbiAgQElucHV0KCkgZXh0cmFDbGFzc2VzOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVTZXJ2aWNlLmdldCh0aGlzLmZvcm1JZCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvdmlkZXJPcHRpb25zID0gdGhpcy5wcm92aWRlclNlcnZpY2UuZ2V0KFxyXG4gICAgICB0aGlzLnN0YXRlLm9wdGlvbnMucHJvdmlkZXJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgcHJvdmlkZXJPcHRpb25zLmJ1dHRvbkNvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgb3B0aW9uczogeyBzdHJ1Y3QsIHN1Ym1pdEJ1dHRvblN0eWxlLCBjYW5jZWxCdXR0b25TdHlsZSB9LFxyXG4gICAgICBzdHJ1Y3RzXHJcbiAgICB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBjb25zdCBpc1N1Ym1pdCA9IHRoaXMudHlwZSA9PT0gJ3N1Ym1pdCc7XHJcblxyXG4gICAgbGV0IHN0eWxlID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgIHN0eWxlID0gc3VibWl0QnV0dG9uU3R5bGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhbmNlbCc6XHJcbiAgICAgICAgc3R5bGUgPSBjYW5jZWxCdXR0b25TdHlsZTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGV4dCA9IChzdHlsZSAmJiBzdHlsZS50ZXh0KSB8fCB0aGlzLnRleHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBpc1N1Ym1pdCAmJlxyXG4gICAgICBzdWJtaXRCdXR0b25TdHlsZSAmJlxyXG4gICAgICBzdWJtaXRCdXR0b25TdHlsZS5hcHBlbmRTY2hlbWFMYWJlbFxyXG4gICAgKSB7XHJcbiAgICAgIHRleHQgPSBgJHt0ZXh0fSAke3N0cnVjdHNbc3RydWN0XS5sYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dHJhQ2xhc3NlcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLm9wdGlvbnMuZXh0cmFCdXR0b25DbGFzc2VzKSB7XHJcbiAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuc3RhdGUub3B0aW9ucy5leHRyYUJ1dHRvbkNsYXNzZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmV4dHJhQ2xhc3Nlcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuZXh0cmFDbGFzc2VzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuZXh0cmFDbGFzc2VzLnNwbGl0KCcgJykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuZXh0cmFDbGFzc2VzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPEJ1dHRvblJlbmRlcmVyPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgIGNvbXBvbmVudFJlbmRlcmVyLmJ1dHRvbiA9IHtcclxuICAgICAgdGV4dCxcclxuICAgICAgZXh0cmFDbGFzc2VzLFxyXG4gICAgICB0eXBlOiBpc1N1Ym1pdCA/ICdzdWJtaXQnIDogJ2J1dHRvbicsXHJcbiAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxyXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2ssXHJcbiAgICAgIGNsYXNzOiAoc3R5bGUgJiYgc3R5bGUuY2xhc3MpIHx8IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5jbGljay5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=