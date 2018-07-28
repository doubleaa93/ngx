/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class Bootstrap3SelectRendererComponent {
}
Bootstrap3SelectRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-select-renderer',
                template: `<ng-container [formGroup]="control.form">
  <de-re-crud-bootstrap3-label-renderer [control]="control"></de-re-crud-bootstrap3-label-renderer>
  <select class="form-control"
          [id]="control.htmlId"
          [name]="control.field.name"
          [formControlName]="control.field.name"
          (focus)="control.onFocus($event)"
          (blur)="control.onBlur($event)"
          (change)="control.onChange($event)">
    <option *ngFor="let option of control.options" [value]="option.value">{{option.label}}</option>
  </select>
  <de-re-crud-bootstrap3-help-renderer [control]="control">
  </de-re-crud-bootstrap3-help-renderer>
  <de-re-crud-bootstrap3-validation-errors-renderer [control]="control">
  </de-re-crud-bootstrap3-validation-errors-renderer>
</ng-container>
`
            },] },
];
Bootstrap3SelectRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3SelectRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3SelectRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXJlbmRlcmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUJqRCxNQUFNOzs7WUFwQkwsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztDQWdCWDthQUNBOzs7c0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJU2VsZWN0Q29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtc2VsZWN0LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj48L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlcj5cclxuICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmh0bWxJZFwiXHJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgICAgKGZvY3VzKT1cImNvbnRyb2wub25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgIChibHVyKT1cImNvbnRyb2wub25CbHVyKCRldmVudClcIlxyXG4gICAgICAgICAgKGNoYW5nZSk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIj5cclxuICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb250cm9sLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+e3tvcHRpb24ubGFiZWx9fTwvb3B0aW9uPlxyXG4gIDwvc2VsZWN0PlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSVNlbGVjdENvbnRyb2w7XHJcbn1cclxuIl19