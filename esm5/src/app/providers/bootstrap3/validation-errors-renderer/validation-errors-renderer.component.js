/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';
var Bootstrap3ValidationErrorsRendererComponent = /** @class */ (function () {
    function Bootstrap3ValidationErrorsRendererComponent() {
    }
    /**
     * @return {?}
     */
    Bootstrap3ValidationErrorsRendererComponent.prototype.hasError = /**
     * @return {?}
     */
    function () {
        return ValidationErrorHelper.hasError(this.control);
    };
    /**
     * @return {?}
     */
    Bootstrap3ValidationErrorsRendererComponent.prototype.getErrors = /**
     * @return {?}
     */
    function () {
        return ValidationErrorHelper.getErrors(this.control);
    };
    Bootstrap3ValidationErrorsRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-validation-errors-renderer',
                    template: "<ng-container *ngIf=\"hasError()\"\n  [ngTemplateOutlet]=\"validationErrors\"\n  [ngTemplateOutletContext]=\"{ errors: getErrors() }\">\n</ng-container>\n\n<ng-template #validationErrors let-errors=\"errors\">\n  <ng-container>\n    <p *ngFor=\"let error of errors\" class=\"help-block\">\n      {{error}}\n    </p>\n  </ng-container>\n</ng-template>\n"
                },] },
    ];
    Bootstrap3ValidationErrorsRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3ValidationErrorsRendererComponent;
}());
export { Bootstrap3ValidationErrorsRendererComponent };
function Bootstrap3ValidationErrorsRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3ValidationErrorsRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7O0lBcUI1RSw4REFBUTs7O0lBQVI7UUFDRSxPQUFPLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckQ7Ozs7SUFFRCwrREFBUzs7O0lBQVQ7UUFDRSxPQUFPLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEQ7O2dCQXpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtEQUFrRDtvQkFDNUQsUUFBUSxFQUFFLGtXQVlYO2lCQUNBOzs7MEJBRUUsS0FBSzs7c0RBckJSOztTQW9CYSwyQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uLWVycm9yLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzRXJyb3IoKVwiXHJcbiAgW25nVGVtcGxhdGVPdXRsZXRdPVwidmFsaWRhdGlvbkVycm9yc1wiXHJcbiAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZXJyb3JzOiBnZXRFcnJvcnMoKSB9XCI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5cclxuPG5nLXRlbXBsYXRlICN2YWxpZGF0aW9uRXJyb3JzIGxldC1lcnJvcnM9XCJlcnJvcnNcIj5cclxuICA8bmctY29udGFpbmVyPlxyXG4gICAgPHAgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1wiIGNsYXNzPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICB7e2Vycm9yfX1cclxuICAgIDwvcD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM1ZhbGlkYXRpb25FcnJvcnNSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcblxyXG4gIGhhc0Vycm9yKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25FcnJvckhlbHBlci5oYXNFcnJvcih0aGlzLmNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RXJyb3JzKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25FcnJvckhlbHBlci5nZXRFcnJvcnModGhpcy5jb250cm9sKTtcclxuICB9XHJcbn1cclxuIl19