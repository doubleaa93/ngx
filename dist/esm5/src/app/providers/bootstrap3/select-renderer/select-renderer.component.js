/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var Bootstrap3SelectRendererComponent = /** @class */ (function () {
    function Bootstrap3SelectRendererComponent() {
    }
    Bootstrap3SelectRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-select-renderer',
                    template: "<ng-container [formGroup]=\"control.form\">\n  <de-re-crud-bootstrap3-label-renderer [control]=\"control\"></de-re-crud-bootstrap3-label-renderer>\n  <select class=\"form-control\"\n          [id]=\"control.htmlId\"\n          [name]=\"control.field.name\"\n          [formControlName]=\"control.field.name\"\n          (focus)=\"control.onFocus($event)\"\n          (blur)=\"control.onBlur($event)\"\n          (change)=\"control.onChange($event)\">\n    <option *ngFor=\"let option of control.options\" [value]=\"option.value\">{{option.label}}</option>\n  </select>\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3SelectRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3SelectRendererComponent;
}());
export { Bootstrap3SelectRendererComponent };
function Bootstrap3SelectRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3SelectRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXJlbmRlcmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztnQkFHaEQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1Q0FBdUM7b0JBQ2pELFFBQVEsRUFBRSx5ekJBZ0JYO2lCQUNBOzs7MEJBRUUsS0FBSzs7NENBeEJSOztTQXVCYSxpQ0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSVNlbGVjdENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXNlbGVjdC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtmb3JtR3JvdXBdPVwiY29udHJvbC5mb3JtXCI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+PC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXI+XHJcbiAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5odG1sSWRcIlxyXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgIChmb2N1cyk9XCJjb250cm9sLm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgICAoYmx1cik9XCJjb250cm9sLm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgIChjaGFuZ2UpPVwiY29udHJvbC5vbkNoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29udHJvbC5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiPnt7b3B0aW9uLmxhYmVsfX08L29wdGlvbj5cclxuICA8L3NlbGVjdD5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElTZWxlY3RDb250cm9sO1xyXG59XHJcbiJdfQ==