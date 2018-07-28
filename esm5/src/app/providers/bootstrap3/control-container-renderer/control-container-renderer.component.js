/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';
var Bootstrap3ControlContainerRendererComponent = /** @class */ (function () {
    function Bootstrap3ControlContainerRendererComponent() {
    }
    /**
     * @return {?}
     */
    Bootstrap3ControlContainerRendererComponent.prototype.getClasses = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hasError = ValidationErrorHelper.hasError(this.control);
        return {
            'has-error': hasError,
            'has-feedback': hasError
        };
    };
    Bootstrap3ControlContainerRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-control-container-renderer',
                    template: "<div class=\"form-group\" [ngClass]=\"getClasses()\">\n  <ng-content></ng-content>\n</div>\n"
                },] },
    ];
    Bootstrap3ControlContainerRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3ControlContainerRendererComponent;
}());
export { Bootstrap3ControlContainerRendererComponent };
function Bootstrap3ControlContainerRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3ControlContainerRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1jb250YWluZXItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOzs7Ozs7O0lBWTVFLGdFQUFVOzs7SUFBVjs7UUFDRSxJQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlELE9BQU87WUFDTCxXQUFXLEVBQUUsUUFBUTtZQUNyQixjQUFjLEVBQUUsUUFBUTtTQUN6QixDQUFDO0tBQ0g7O2dCQWpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtEQUFrRDtvQkFDNUQsUUFBUSxFQUFFLDhGQUdYO2lCQUNBOzs7MEJBRUUsS0FBSzs7c0RBWlI7O1NBV2EsMkNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvckhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtY29udHJvbC1jb250YWluZXItcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJnZXRDbGFzc2VzKClcIj5cclxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjwvZGl2PlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzQ29udHJvbENvbnRhaW5lclJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxuXHJcbiAgZ2V0Q2xhc3NlcygpIHtcclxuICAgIGNvbnN0IGhhc0Vycm9yID0gVmFsaWRhdGlvbkVycm9ySGVscGVyLmhhc0Vycm9yKHRoaXMuY29udHJvbCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ2hhcy1lcnJvcic6IGhhc0Vycm9yLFxyXG4gICAgICAnaGFzLWZlZWRiYWNrJzogaGFzRXJyb3JcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==