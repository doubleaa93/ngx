/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class Bootstrap3TableRendererComponent {
    /**
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    getValue(field, value) {
        /** @type {?} */
        const fieldValue = value[field.name];
        if (fieldValue == null || typeof fieldValue === 'undefined') {
            return '&nbsp;';
        }
        return fieldValue;
    }
}
Bootstrap3TableRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-table-renderer',
                template: `<div>
  <de-re-crud-stamp-renderer [stamp]="control.stamp">
  </de-re-crud-stamp-renderer>
  <de-re-crud-button-host
    [formId]="control.formId"
    extraClasses="btn-sm"
    text="Add"
    (click)="control.onAdd($event)">
  </de-re-crud-button-host>
</div>

<div class="table-control-container">
  <table class="table table-bordered table-condensed">
    <thead>
      <tr>
        <th *ngFor="let field of control.nestedFields">
          {{field.label}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngIf="!control.nestedValues.length">
        <td colspan="100%">None</td>
      </tr>
      <tr *ngFor="let form of control.nestedValues">
        <td *ngFor="let field of control.nestedFields" [innerHtml]="getValue(field, form.value)"></td>
      </tr>
    </tbody>
  </table>
</div>
`,
                styles: [`.table-control-container{margin-top:10px}`]
            },] },
];
Bootstrap3TableRendererComponent.propDecorators = {
    control: [{ type: Input }]
};
function Bootstrap3TableRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    Bootstrap3TableRendererComponent.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy90YWJsZS1yZW5kZXJlci90YWJsZS1yZW5kZXJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUNqRCxNQUFNOzs7Ozs7SUFHSixRQUFRLENBQUMsS0FBYSxFQUFFLEtBQVU7O1FBQ2hDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLE9BQU8sVUFBVSxLQUFLLFdBQVcsRUFBRTtZQUMzRCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUVELE9BQU8sVUFBVSxDQUFDO0tBQ25COzs7WUE5Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBOEJYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDJDQUEyQyxDQUFDO2FBQ3REOzs7c0JBRUUsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciwgSUNvbGxlY3Rpb25Db250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvbW9kZWxzL3NjaGVtYSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy10YWJsZS1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2PlxyXG4gIDxkZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyIFtzdGFtcF09XCJjb250cm9sLnN0YW1wXCI+XHJcbiAgPC9kZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyPlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0XHJcbiAgICBbZm9ybUlkXT1cImNvbnRyb2wuZm9ybUlkXCJcclxuICAgIGV4dHJhQ2xhc3Nlcz1cImJ0bi1zbVwiXHJcbiAgICB0ZXh0PVwiQWRkXCJcclxuICAgIChjbGljayk9XCJjb250cm9sLm9uQWRkKCRldmVudClcIj5cclxuICA8L2RlLXJlLWNydWQtYnV0dG9uLWhvc3Q+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cInRhYmxlLWNvbnRyb2wtY29udGFpbmVyXCI+XHJcbiAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtYm9yZGVyZWQgdGFibGUtY29uZGVuc2VkXCI+XHJcbiAgICA8dGhlYWQ+XHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGggKm5nRm9yPVwibGV0IGZpZWxkIG9mIGNvbnRyb2wubmVzdGVkRmllbGRzXCI+XHJcbiAgICAgICAgICB7e2ZpZWxkLmxhYmVsfX1cclxuICAgICAgICA8L3RoPlxyXG4gICAgICA8L3RyPlxyXG4gICAgPC90aGVhZD5cclxuICAgIDx0Ym9keT5cclxuICAgICAgPHRyICpuZ0lmPVwiIWNvbnRyb2wubmVzdGVkVmFsdWVzLmxlbmd0aFwiPlxyXG4gICAgICAgIDx0ZCBjb2xzcGFuPVwiMTAwJVwiPk5vbmU8L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgICA8dHIgKm5nRm9yPVwibGV0IGZvcm0gb2YgY29udHJvbC5uZXN0ZWRWYWx1ZXNcIj5cclxuICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGNvbnRyb2wubmVzdGVkRmllbGRzXCIgW2lubmVySHRtbF09XCJnZXRWYWx1ZShmaWVsZCwgZm9ybS52YWx1ZSlcIj48L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgPC90Ym9keT5cclxuICA8L3RhYmxlPlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLnRhYmxlLWNvbnRyb2wtY29udGFpbmVye21hcmdpbi10b3A6MTBweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29sbGVjdGlvbkNvbnRyb2w7XHJcblxyXG4gIGdldFZhbHVlKGZpZWxkOiBJRmllbGQsIHZhbHVlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkVmFsdWUgPSB2YWx1ZVtmaWVsZC5uYW1lXTtcclxuXHJcbiAgICBpZiAoZmllbGRWYWx1ZSA9PSBudWxsIHx8IHR5cGVvZiBmaWVsZFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gJyZuYnNwOyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpZWxkVmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==