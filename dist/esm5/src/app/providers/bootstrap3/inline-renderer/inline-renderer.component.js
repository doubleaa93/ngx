/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
var Bootstrap3InlineRendererComponent = /** @class */ (function () {
    function Bootstrap3InlineRendererComponent() {
    }
    Bootstrap3InlineRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-inline-renderer',
                    template: "<div>\n  <de-re-crud-stamp-renderer [stamp]=\"control.stamp\">\n  </de-re-crud-stamp-renderer>\n  <de-re-crud-button-host\n    *ngIf=\"control.canAdd\"\n    [formId]=\"control.formId\"\n    extraClasses=\"btn-sm\"\n    text=\"Add\"\n    (click)=\"control.onAdd($event)\">\n  </de-re-crud-button-host>\n</div>\n\n<div class=\"inline-control-container\">\n  <span *ngIf=\"!control.nestedValues.length\">None</span>\n  <div *ngFor=\"let value of control.nestedValues\">\n    <de-re-crud-form-host\n      [formId]=\"control.formId\"\n      [form]=\"value\"\n      [parentPath]=\"control.formPath\"\n      [parentForm]=\"control.value\"\n      [fields]=\"control.nestedFields\"\n      [struct]=\"control.field.reference.struct\"\n      [block]=\"control.field.reference.block\">\n    </de-re-crud-form-host>\n  </div>\n</div>\n",
                    styles: [".inline-control-container{margin-top:10px;margin-bottom:10px}"]
                },] },
    ];
    return Bootstrap3InlineRendererComponent;
}());
export { Bootstrap3InlineRendererComponent };
function Bootstrap3InlineRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3InlineRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLXJlbmRlcmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvaW5saW5lLXJlbmRlcmVyL2lubGluZS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O2dCQUd6QyxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztvQkFDakQsUUFBUSxFQUFFLHd6QkEwQlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsK0RBQStELENBQUM7aUJBQzFFOzs0Q0FqQ0Q7O1NBa0NhLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyLCBJQ29sbGVjdGlvbkNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWlubGluZS1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2PlxyXG4gIDxkZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyIFtzdGFtcF09XCJjb250cm9sLnN0YW1wXCI+XHJcbiAgPC9kZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyPlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0XHJcbiAgICAqbmdJZj1cImNvbnRyb2wuY2FuQWRkXCJcclxuICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgZXh0cmFDbGFzc2VzPVwiYnRuLXNtXCJcclxuICAgIHRleHQ9XCJBZGRcIlxyXG4gICAgKGNsaWNrKT1cImNvbnRyb2wub25BZGQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiaW5saW5lLWNvbnRyb2wtY29udGFpbmVyXCI+XHJcbiAgPHNwYW4gKm5nSWY9XCIhY29udHJvbC5uZXN0ZWRWYWx1ZXMubGVuZ3RoXCI+Tm9uZTwvc3Bhbj5cclxuICA8ZGl2ICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBjb250cm9sLm5lc3RlZFZhbHVlc1wiPlxyXG4gICAgPGRlLXJlLWNydWQtZm9ybS1ob3N0XHJcbiAgICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgICBbZm9ybV09XCJ2YWx1ZVwiXHJcbiAgICAgIFtwYXJlbnRQYXRoXT1cImNvbnRyb2wuZm9ybVBhdGhcIlxyXG4gICAgICBbcGFyZW50Rm9ybV09XCJjb250cm9sLnZhbHVlXCJcclxuICAgICAgW2ZpZWxkc109XCJjb250cm9sLm5lc3RlZEZpZWxkc1wiXHJcbiAgICAgIFtzdHJ1Y3RdPVwiY29udHJvbC5maWVsZC5yZWZlcmVuY2Uuc3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImNvbnRyb2wuZmllbGQucmVmZXJlbmNlLmJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtZm9ybS1ob3N0PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlubGluZS1jb250cm9sLWNvbnRhaW5lcnttYXJnaW4tdG9wOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyIHtcclxuICBjb250cm9sOiBJQ29sbGVjdGlvbkNvbnRyb2w7XHJcbn1cclxuIl19