/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';
export class Bootstrap3ValidationErrorsRendererComponent {
    /**
     * @return {?}
     */
    hasError() {
        return ValidationErrorHelper.hasError(this.control);
    }
    /**
     * @return {?}
     */
    getErrors() {
        return ValidationErrorHelper.getErrors(this.control);
    }
}
Bootstrap3ValidationErrorsRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-validation-errors-renderer',
                template: `<ng-container *ngIf="hasError()"
  [ngTemplateOutlet]="validationErrors"
  [ngTemplateOutletContext]="{ errors: getErrors() }">
</ng-container>

<ng-template #validationErrors let-errors="errors">
  <ng-container>
    <p *ngFor="let error of errors" class="help-block">
      {{error}}
    </p>
  </ng-container>
</ng-template>
`
            },] },
];
Bootstrap3ValidationErrorsRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3ValidationErrorsRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3ValidationErrorsRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBa0I5RSxNQUFNOzs7O0lBR0osUUFBUTtRQUNOLE9BQU8scUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyRDs7OztJQUVELFNBQVM7UUFDUCxPQUFPLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEQ7OztZQXpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtEQUFrRDtnQkFDNUQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Q0FZWDthQUNBOzs7c0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24tZXJyb3ItaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNFcnJvcigpXCJcclxuICBbbmdUZW1wbGF0ZU91dGxldF09XCJ2YWxpZGF0aW9uRXJyb3JzXCJcclxuICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyBlcnJvcnM6IGdldEVycm9ycygpIH1cIj5cclxuPC9uZy1jb250YWluZXI+XHJcblxyXG48bmctdGVtcGxhdGUgI3ZhbGlkYXRpb25FcnJvcnMgbGV0LWVycm9ycz1cImVycm9yc1wiPlxyXG4gIDxuZy1jb250YWluZXI+XHJcbiAgICA8cCAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzXCIgY2xhc3M9XCJoZWxwLWJsb2NrXCI+XHJcbiAgICAgIHt7ZXJyb3J9fVxyXG4gICAgPC9wPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzVmFsaWRhdGlvbkVycm9yc1JlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxuXHJcbiAgaGFzRXJyb3IoKSB7XHJcbiAgICByZXR1cm4gVmFsaWRhdGlvbkVycm9ySGVscGVyLmhhc0Vycm9yKHRoaXMuY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBnZXRFcnJvcnMoKSB7XHJcbiAgICByZXR1cm4gVmFsaWRhdGlvbkVycm9ySGVscGVyLmdldEVycm9ycyh0aGlzLmNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG4iXX0=