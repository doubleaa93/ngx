/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormStateService } from '../../services/form-state.service';
export class FormHostComponent {
    /**
     * @param {?} stateService
     */
    constructor(stateService) {
        this.stateService = stateService;
    }
    /**
     * @return {?}
     */
    get struct() {
        return this._struct || this.state.options.struct;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set struct(value) {
        this._struct = value;
    }
    /**
     * @return {?}
     */
    get block() {
        return this._block || this.state.options.block;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set block(value) {
        this._block = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnInit();
            return;
        }
    }
}
FormHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-form-host',
                template: `<ng-container *ngFor="let field of fields">
  <ng-container [ngSwitch]="field.type">
    <de-re-crud-stamp-field-host
      *ngSwitchCase="'stamp'"
      [formId]="formId"
      [form]="form"
      [field]="field"
      [struct]="struct"
      [block]="block">
    </de-re-crud-stamp-field-host>
    <de-re-crud-input-field-host
      *ngSwitchDefault
      [formId]="formId"
      [form]="form"
      [parentPath]="parentPath"
      [parentForm]="parentForm"
      [field]="field"
      [struct]="struct"
      [block]="block">
    </de-re-crud-input-field-host>
  </ng-container>
</ng-container>
`
            },] },
];
/** @nocollapse */
FormHostComponent.ctorParameters = () => [
    { type: FormStateService }
];
FormHostComponent.propDecorators = {
    formId: [{ type: Input }],
    form: [{ type: Input }],
    fields: [{ type: Input }],
    parentForm: [{ type: Input }],
    parentPath: [{ type: Input }],
    struct: [{ type: Input }],
    block: [{ type: Input }]
};
function FormHostComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormHostComponent.prototype._struct;
    /** @type {?} */
    FormHostComponent.prototype._block;
    /** @type {?} */
    FormHostComponent.prototype.formId;
    /** @type {?} */
    FormHostComponent.prototype.form;
    /** @type {?} */
    FormHostComponent.prototype.fields;
    /** @type {?} */
    FormHostComponent.prototype.parentForm;
    /** @type {?} */
    FormHostComponent.prototype.parentPath;
    /** @type {?} */
    FormHostComponent.prototype.state;
    /** @type {?} */
    FormHostComponent.prototype.stateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ob3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUE0QnJFLE1BQU07Ozs7SUFXSixZQUNVO1FBQUEsaUJBQVksR0FBWixZQUFZO0tBQ2xCOzs7O0lBRUosSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztLQUNsRDs7Ozs7SUFFRCxJQUNJLE1BQU0sQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUNoRDs7Ozs7SUFFRCxJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2pEOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsT0FBTztTQUNSO0tBQ0Y7OztZQXBFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0JYO2FBQ0E7Ozs7WUEzQlEsZ0JBQWdCOzs7cUJBZ0N0QixLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7cUJBV0wsS0FBSztvQkFTTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gJy4uLy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWZvcm0taG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWVsZHNcIj5cclxuICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJmaWVsZC50eXBlXCI+XHJcbiAgICA8ZGUtcmUtY3J1ZC1zdGFtcC1maWVsZC1ob3N0XHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCInc3RhbXAnXCJcclxuICAgICAgW2Zvcm1JZF09XCJmb3JtSWRcIlxyXG4gICAgICBbZm9ybV09XCJmb3JtXCJcclxuICAgICAgW2ZpZWxkXT1cImZpZWxkXCJcclxuICAgICAgW3N0cnVjdF09XCJzdHJ1Y3RcIlxyXG4gICAgICBbYmxvY2tdPVwiYmxvY2tcIj5cclxuICAgIDwvZGUtcmUtY3J1ZC1zdGFtcC1maWVsZC1ob3N0PlxyXG4gICAgPGRlLXJlLWNydWQtaW5wdXQtZmllbGQtaG9zdFxyXG4gICAgICAqbmdTd2l0Y2hEZWZhdWx0XHJcbiAgICAgIFtmb3JtSWRdPVwiZm9ybUlkXCJcclxuICAgICAgW2Zvcm1dPVwiZm9ybVwiXHJcbiAgICAgIFtwYXJlbnRQYXRoXT1cInBhcmVudFBhdGhcIlxyXG4gICAgICBbcGFyZW50Rm9ybV09XCJwYXJlbnRGb3JtXCJcclxuICAgICAgW2ZpZWxkXT1cImZpZWxkXCJcclxuICAgICAgW3N0cnVjdF09XCJzdHJ1Y3RcIlxyXG4gICAgICBbYmxvY2tdPVwiYmxvY2tcIj5cclxuICAgIDwvZGUtcmUtY3J1ZC1pbnB1dC1maWVsZC1ob3N0PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgcHJpdmF0ZSBfc3RydWN0OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfYmxvY2s6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgZm9ybUlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xyXG4gIEBJbnB1dCgpIGZpZWxkczogSUZpZWxkW107XHJcbiAgQElucHV0KCkgcGFyZW50Rm9ybTogQWJzdHJhY3RDb250cm9sO1xyXG4gIEBJbnB1dCgpIHBhcmVudFBhdGg6IHN0cmluZztcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBnZXQgc3RydWN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0cnVjdCB8fCB0aGlzLnN0YXRlLm9wdGlvbnMuc3RydWN0O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc3RydWN0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3N0cnVjdCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJsb2NrKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Jsb2NrIHx8IHRoaXMuc3RhdGUub3B0aW9ucy5ibG9jaztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGJsb2NrKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2Jsb2NrID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5mb3JtSWQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==