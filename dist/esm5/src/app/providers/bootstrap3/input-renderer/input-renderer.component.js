/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var Bootstrap3InputRendererComponent = /** @class */ (function () {
    function Bootstrap3InputRendererComponent() {
    }
    Bootstrap3InputRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-input-renderer',
                    template: "<ng-container [formGroup]=\"control.form\">\n  <de-re-crud-bootstrap3-label-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-label-renderer>\n  <input class=\"form-control\"\n         [type]=\"control.rendererType\"\n         [id]=\"control.htmlId\"\n         [name]=\"control.field.name\"\n         [formControlName]=\"control.field.name\"\n         (focus)=\"control.onFocus($event)\"\n         (blur)=\"control.onBlur($event)\"\n         (input)=\"control.onChange($event)\" />\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3InputRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3InputRendererComponent;
}());
export { Bootstrap3InputRendererComponent };
function Bootstrap3InputRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3InputRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9pbnB1dC1yZW5kZXJlci9pbnB1dC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztnQkFHaEQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELFFBQVEsRUFBRSwydUJBZ0JYO2lCQUNBOzs7MEJBRUUsS0FBSzs7MkNBeEJSOztTQXVCYSxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWlucHV0LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlcj5cclxuICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICBbdHlwZV09XCJjb250cm9sLnJlbmRlcmVyVHlwZVwiXHJcbiAgICAgICAgIFtpZF09XCJjb250cm9sLmh0bWxJZFwiXHJcbiAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wuZmllbGQubmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgKGZvY3VzKT1cImNvbnRyb2wub25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgKGJsdXIpPVwiY29udHJvbC5vbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIChpbnB1dCk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIiAvPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG4iXX0=