/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class Bootstrap3CheckboxRendererComponent {
}
Bootstrap3CheckboxRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-checkbox-renderer',
                template: `<ng-container [formGroup]="control.form">
  <div class="checkbox">
    <label [htmlFor]="control.htmlId">
      <input type="checkbox"
        [id]="control.htmlId"
        [name]="control.field.name"
        [formControlName]="control.field.name"
        (focus)="control.onFocus($event)"
        (blur)="control.onBlur($event)"
        (input)="control.onChange($event)" /> {{control.field.label}}
    </label>
  </div>
  <de-re-crud-bootstrap3-help-renderer [control]="control">
  </de-re-crud-bootstrap3-help-renderer>
  <de-re-crud-bootstrap3-validation-errors-renderer [control]="control">
  </de-re-crud-bootstrap3-validation-errors-renderer>
</ng-container>
`
            },] },
];
Bootstrap3CheckboxRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3CheckboxRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3CheckboxRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9jaGVja2JveC1yZW5kZXJlci9jaGVja2JveC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBd0JqRCxNQUFNOzs7WUFyQkwsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5Q0FBeUM7Z0JBQ25ELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQlg7YUFDQTs7O3NCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWNoZWNrYm94LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj5cclxuICAgIDxsYWJlbCBbaHRtbEZvcl09XCJjb250cm9sLmh0bWxJZFwiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICBbaWRdPVwiY29udHJvbC5odG1sSWRcIlxyXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2wuZmllbGQubmFtZVwiXHJcbiAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgIChmb2N1cyk9XCJjb250cm9sLm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgKGJsdXIpPVwiY29udHJvbC5vbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgKGlucHV0KT1cImNvbnRyb2wub25DaGFuZ2UoJGV2ZW50KVwiIC8+IHt7Y29udHJvbC5maWVsZC5sYWJlbH19XHJcbiAgICA8L2xhYmVsPlxyXG4gIDwvZGl2PlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNDaGVja2JveFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG4iXX0=