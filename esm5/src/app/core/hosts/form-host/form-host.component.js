/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormStateService } from '../../services/form-state.service';
var FormHostComponent = /** @class */ (function () {
    function FormHostComponent(stateService) {
        this.stateService = stateService;
    }
    Object.defineProperty(FormHostComponent.prototype, "struct", {
        get: /**
         * @return {?}
         */
        function () {
            return this._struct || this.state.options.struct;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._struct = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormHostComponent.prototype, "block", {
        get: /**
         * @return {?}
         */
        function () {
            return this._block || this.state.options.block;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._block = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.state = this.stateService.get(this.formId);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnInit();
            return;
        }
    };
    FormHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-form-host',
                    template: "<ng-container *ngFor=\"let field of fields\">\n  <ng-container [ngSwitch]=\"field.type\">\n    <de-re-crud-stamp-field-host\n      *ngSwitchCase=\"'stamp'\"\n      [formId]=\"formId\"\n      [form]=\"form\"\n      [field]=\"field\"\n      [struct]=\"struct\"\n      [block]=\"block\">\n    </de-re-crud-stamp-field-host>\n    <de-re-crud-input-field-host\n      *ngSwitchDefault\n      [formId]=\"formId\"\n      [form]=\"form\"\n      [parentPath]=\"parentPath\"\n      [parentForm]=\"parentForm\"\n      [field]=\"field\"\n      [struct]=\"struct\"\n      [block]=\"block\">\n    </de-re-crud-input-field-host>\n  </ng-container>\n</ng-container>\n"
                },] },
    ];
    /** @nocollapse */
    FormHostComponent.ctorParameters = function () { return [
        { type: FormStateService }
    ]; };
    FormHostComponent.propDecorators = {
        formId: [{ type: Input }],
        form: [{ type: Input }],
        fields: [{ type: Input }],
        parentForm: [{ type: Input }],
        parentPath: [{ type: Input }],
        struct: [{ type: Input }],
        block: [{ type: Input }]
    };
    return FormHostComponent;
}());
export { FormHostComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1ob3N0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0lBdUNuRSwyQkFDVTtRQUFBLGlCQUFZLEdBQVosWUFBWTtLQUNsQjtJQUVKLHNCQUFJLHFDQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1NBQ2xEOzs7OztRQUVELFVBQ1csS0FBYTtZQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN0Qjs7O09BTEE7SUFPRCxzQkFBSSxvQ0FBSzs7OztRQUFUO1lBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNoRDs7Ozs7UUFFRCxVQUNVLEtBQWE7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDckI7OztPQUxBOzs7O0lBT0Qsb0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakQ7Ozs7O0lBRUQsdUNBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NBQ1I7S0FDRjs7Z0JBcEVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsNG9CQXNCWDtpQkFDQTs7OztnQkEzQlEsZ0JBQWdCOzs7eUJBZ0N0QixLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7eUJBV0wsS0FBSzt3QkFTTCxLQUFLOzs0QkE1RFI7O1NBZ0NhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJRmllbGQgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1mb3JtLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCI+XHJcbiAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZmllbGQudHlwZVwiPlxyXG4gICAgPGRlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdFxyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3N0YW1wJ1wiXHJcbiAgICAgIFtmb3JtSWRdPVwiZm9ybUlkXCJcclxuICAgICAgW2Zvcm1dPVwiZm9ybVwiXHJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiXHJcbiAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdD5cclxuICAgIDxkZS1yZS1jcnVkLWlucHV0LWZpZWxkLWhvc3RcclxuICAgICAgKm5nU3dpdGNoRGVmYXVsdFxyXG4gICAgICBbZm9ybUlkXT1cImZvcm1JZFwiXHJcbiAgICAgIFtmb3JtXT1cImZvcm1cIlxyXG4gICAgICBbcGFyZW50UGF0aF09XCJwYXJlbnRQYXRoXCJcclxuICAgICAgW3BhcmVudEZvcm1dPVwicGFyZW50Rm9ybVwiXHJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiXHJcbiAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtaW5wdXQtZmllbGQtaG9zdD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Ib3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX3N0cnVjdDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2Jsb2NrOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcclxuICBASW5wdXQoKSBmaWVsZHM6IElGaWVsZFtdO1xyXG4gIEBJbnB1dCgpIHBhcmVudEZvcm06IEFic3RyYWN0Q29udHJvbDtcclxuICBASW5wdXQoKSBwYXJlbnRQYXRoOiBzdHJpbmc7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgZ2V0IHN0cnVjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdHJ1Y3QgfHwgdGhpcy5zdGF0ZS5vcHRpb25zLnN0cnVjdDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHN0cnVjdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9zdHJ1Y3QgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBibG9jaygpIHtcclxuICAgIHJldHVybiB0aGlzLl9ibG9jayB8fCB0aGlzLnN0YXRlLm9wdGlvbnMuYmxvY2s7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBibG9jayh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9ibG9jayA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmZvcm1JZCAmJiAhY2hhbmdlcy5mb3JtSWQuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=