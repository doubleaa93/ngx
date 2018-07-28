/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';
var Bootstrap3HelpRendererComponent = /** @class */ (function () {
    function Bootstrap3HelpRendererComponent() {
    }
    /**
     * @return {?}
     */
    Bootstrap3HelpRendererComponent.prototype.hasError = /**
     * @return {?}
     */
    function () {
        return ValidationErrorHelper.hasError(this.control);
    };
    Bootstrap3HelpRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-help-renderer',
                    template: "<p *ngIf=\"control.field.help && !hasError()\" class=\"help-block\">{{control.field.help}}</p>\n"
                },] },
    ];
    Bootstrap3HelpRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3HelpRendererComponent;
}());
export { Bootstrap3HelpRendererComponent };
function Bootstrap3HelpRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3HelpRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2hlbHAtcmVuZGVyZXIvaGVscC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7O0lBVTVFLGtEQUFROzs7SUFBUjtRQUNFLE9BQU8scUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyRDs7Z0JBVkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQ0FBcUM7b0JBQy9DLFFBQVEsRUFBRSxrR0FDWDtpQkFDQTs7OzBCQUVFLEtBQUs7OzBDQVZSOztTQVNhLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0Q29udHJvbFJlbmRlcmVyLCBJU2VsZWN0Q29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24tZXJyb3ItaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPHAgKm5nSWY9XCJjb250cm9sLmZpZWxkLmhlbHAgJiYgIWhhc0Vycm9yKClcIiBjbGFzcz1cImhlbHAtYmxvY2tcIj57e2NvbnRyb2wuZmllbGQuaGVscH19PC9wPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzSGVscFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgU2VsZWN0Q29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJU2VsZWN0Q29udHJvbDtcclxuXHJcbiAgaGFzRXJyb3IoKSB7XHJcbiAgICByZXR1cm4gVmFsaWRhdGlvbkVycm9ySGVscGVyLmhhc0Vycm9yKHRoaXMuY29udHJvbCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==