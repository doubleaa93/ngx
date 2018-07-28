/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var Bootstrap3TableRendererComponent = /** @class */ (function () {
    function Bootstrap3TableRendererComponent() {
    }
    /**
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    Bootstrap3TableRendererComponent.prototype.getValue = /**
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    function (field, value) {
        /** @type {?} */
        var fieldValue = value[field.name];
        if (fieldValue == null || typeof fieldValue === 'undefined') {
            return '&nbsp;';
        }
        return fieldValue;
    };
    Bootstrap3TableRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-table-renderer',
                    template: "<div>\n  <de-re-crud-stamp-renderer [stamp]=\"control.stamp\">\n  </de-re-crud-stamp-renderer>\n  <de-re-crud-button-host\n    [formId]=\"control.formId\"\n    extraClasses=\"btn-sm\"\n    text=\"Add\"\n    (click)=\"control.onAdd($event)\">\n  </de-re-crud-button-host>\n</div>\n\n<div class=\"table-control-container\">\n  <table class=\"table table-bordered table-condensed\">\n    <thead>\n      <tr>\n        <th *ngFor=\"let field of control.nestedFields\">\n          {{field.label}}\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngIf=\"!control.nestedValues.length\">\n        <td colspan=\"100%\">None</td>\n      </tr>\n      <tr *ngFor=\"let form of control.nestedValues\">\n        <td *ngFor=\"let field of control.nestedFields\" [innerHtml]=\"getValue(field, form.value)\"></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n",
                    styles: [".table-control-container{margin-top:10px}"]
                },] },
    ];
    Bootstrap3TableRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3TableRendererComponent;
}());
export { Bootstrap3TableRendererComponent };
function Bootstrap3TableRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3TableRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy90YWJsZS1yZW5kZXJlci90YWJsZS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7SUEwQy9DLG1EQUFROzs7OztJQUFSLFVBQVMsS0FBYSxFQUFFLEtBQVU7O1FBQ2hDLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsRUFBRTtZQUMzRCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELE9BQU8sVUFBVSxDQUFDO0tBQ25COztnQkE5Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELFFBQVEsRUFBRSxnMkJBOEJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLDJDQUEyQyxDQUFDO2lCQUN0RDs7OzBCQUVFLEtBQUs7OzJDQXhDUjs7U0F1Q2EsZ0NBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyLCBJQ29sbGVjdGlvbkNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvc2NoZW1hJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXRhYmxlLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgPGRlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXIgW3N0YW1wXT1cImNvbnRyb2wuc3RhbXBcIj5cclxuICA8L2RlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3RcclxuICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgZXh0cmFDbGFzc2VzPVwiYnRuLXNtXCJcclxuICAgIHRleHQ9XCJBZGRcIlxyXG4gICAgKGNsaWNrKT1cImNvbnRyb2wub25BZGQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwidGFibGUtY29udHJvbC1jb250YWluZXJcIj5cclxuICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgIDx0aGVhZD5cclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29udHJvbC5uZXN0ZWRGaWVsZHNcIj5cclxuICAgICAgICAgIHt7ZmllbGQubGFiZWx9fVxyXG4gICAgICAgIDwvdGg+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5PlxyXG4gICAgICA8dHIgKm5nSWY9XCIhY29udHJvbC5uZXN0ZWRWYWx1ZXMubGVuZ3RoXCI+XHJcbiAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+Tm9uZTwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZm9ybSBvZiBjb250cm9sLm5lc3RlZFZhbHVlc1wiPlxyXG4gICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29udHJvbC5uZXN0ZWRGaWVsZHNcIiBbaW5uZXJIdG1sXT1cImdldFZhbHVlKGZpZWxkLCBmb3JtLnZhbHVlKVwiPjwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3Rib2R5PlxyXG4gIDwvdGFibGU+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AudGFibGUtY29udHJvbC1jb250YWluZXJ7bWFyZ2luLXRvcDoxMHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxuXHJcbiAgZ2V0VmFsdWUoZmllbGQ6IElGaWVsZCwgdmFsdWU6IGFueSkge1xyXG4gICAgY29uc3QgZmllbGRWYWx1ZSA9IHZhbHVlW2ZpZWxkLm5hbWVdO1xyXG5cclxuICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwgfHwgdHlwZW9mIGZpZWxkVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiAnJm5ic3A7JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmllbGRWYWx1ZTtcclxuICB9XHJcbn1cclxuIl19