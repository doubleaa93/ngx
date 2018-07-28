/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { ValidationErrorHelper } from '../../../core/validation-error-helper';
export class Bootstrap3HelpRendererComponent {
    /**
     * @return {?}
     */
    hasError() {
        return ValidationErrorHelper.hasError(this.control);
    }
}
Bootstrap3HelpRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-help-renderer',
                template: `<p *ngIf="control.field.help && !hasError()" class="help-block">{{control.field.help}}</p>
`
            },] },
];
Bootstrap3HelpRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3HelpRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3HelpRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC1yZW5kZXJlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2hlbHAtcmVuZGVyZXIvaGVscC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBTzlFLE1BQU07Ozs7SUFHSixRQUFRO1FBQ04sT0FBTyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JEOzs7WUFWRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFDQUFxQztnQkFDL0MsUUFBUSxFQUFFO0NBQ1g7YUFDQTs7O3NCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdENvbnRyb2xSZW5kZXJlciwgSVNlbGVjdENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uLWVycm9yLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1oZWxwLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxwICpuZ0lmPVwiY29udHJvbC5maWVsZC5oZWxwICYmICFoYXNFcnJvcigpXCIgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tjb250cm9sLmZpZWxkLmhlbHB9fTwvcD5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0hlbHBSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIFNlbGVjdENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSVNlbGVjdENvbnRyb2w7XHJcblxyXG4gIGhhc0Vycm9yKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25FcnJvckhlbHBlci5oYXNFcnJvcih0aGlzLmNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG4iXX0=