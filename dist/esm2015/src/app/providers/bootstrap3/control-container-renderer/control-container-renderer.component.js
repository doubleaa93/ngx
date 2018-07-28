/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';
export class Bootstrap3ControlContainerRendererComponent {
    /**
     * @return {?}
     */
    getClasses() {
        /** @type {?} */
        const hasError = ValidationErrorHelper.hasError(this.control);
        return {
            'has-error': hasError,
            'has-feedback': hasError
        };
    }
}
Bootstrap3ControlContainerRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-control-container-renderer',
                template: `<div class="form-group" [ngClass]="getClasses()">
  <ng-content></ng-content>
</div>
`
            },] },
];
Bootstrap3ControlContainerRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3ControlContainerRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3ControlContainerRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1jb250YWluZXItcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBUzlFLE1BQU07Ozs7SUFHSixVQUFVOztRQUNSLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUQsT0FBTztZQUNMLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLGNBQWMsRUFBRSxRQUFRO1NBQ3pCLENBQUM7S0FDSDs7O1lBakJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0RBQWtEO2dCQUM1RCxRQUFRLEVBQUU7OztDQUdYO2FBQ0E7OztzQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvckhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtY29udHJvbC1jb250YWluZXItcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIiBbbmdDbGFzc109XCJnZXRDbGFzc2VzKClcIj5cclxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjwvZGl2PlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzQ29udHJvbENvbnRhaW5lclJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxuXHJcbiAgZ2V0Q2xhc3NlcygpIHtcclxuICAgIGNvbnN0IGhhc0Vycm9yID0gVmFsaWRhdGlvbkVycm9ySGVscGVyLmhhc0Vycm9yKHRoaXMuY29udHJvbCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ2hhcy1lcnJvcic6IGhhc0Vycm9yLFxyXG4gICAgICAnaGFzLWZlZWRiYWNrJzogaGFzRXJyb3JcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==