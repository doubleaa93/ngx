/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class Bootstrap3InputRendererComponent {
}
Bootstrap3InputRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-input-renderer',
                template: `<ng-container [formGroup]="control.form">
  <de-re-crud-bootstrap3-label-renderer [control]="control">
  </de-re-crud-bootstrap3-label-renderer>
  <input class="form-control"
         [type]="control.rendererType"
         [id]="control.htmlId"
         [name]="control.field.name"
         [formControlName]="control.field.name"
         (focus)="control.onFocus($event)"
         (blur)="control.onBlur($event)"
         (input)="control.onChange($event)" />
  <de-re-crud-bootstrap3-help-renderer [control]="control">
  </de-re-crud-bootstrap3-help-renderer>
  <de-re-crud-bootstrap3-validation-errors-renderer [control]="control">
  </de-re-crud-bootstrap3-validation-errors-renderer>
</ng-container>
`
            },] },
];
Bootstrap3InputRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3InputRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3InputRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9pbnB1dC1yZW5kZXJlci9pbnB1dC1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUJqRCxNQUFNOzs7WUFwQkwsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztDQWdCWDthQUNBOzs7c0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaW5wdXQtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbZm9ybUdyb3VwXT1cImNvbnRyb2wuZm9ybVwiPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyPlxyXG4gIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgIFt0eXBlXT1cImNvbnRyb2wucmVuZGVyZXJUeXBlXCJcclxuICAgICAgICAgW2lkXT1cImNvbnRyb2wuaHRtbElkXCJcclxuICAgICAgICAgW25hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgICAoZm9jdXMpPVwiY29udHJvbC5vbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgICAoYmx1cik9XCJjb250cm9sLm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgKGlucHV0KT1cImNvbnRyb2wub25DaGFuZ2UoJGV2ZW50KVwiIC8+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy1oZWxwLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1oZWxwLXJlbmRlcmVyPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb250cm9sO1xyXG59XHJcbiJdfQ==