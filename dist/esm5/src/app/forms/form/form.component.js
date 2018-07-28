/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormStateService } from '../../core/services/form-state.service';
var FormComponent = /** @class */ (function () {
    function FormComponent(stateService) {
        this.stateService = stateService;
        this.valueChange = new EventEmitter();
        this.submit = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    Object.defineProperty(FormComponent.prototype, "cancelVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this.state.navigationStack.length || this._cancelVisible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._cancelVisible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "submitEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.submitting && this.form.valid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "cancelEnabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.submitting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "struct", {
        get: /**
         * @return {?}
         */
        function () {
            var navigationStack = this.state.navigationStack;
            /** @type {?} */
            var navigationStackCount = navigationStack.length;
            return navigationStackCount
                ? navigationStack[navigationStackCount - 1].struct
                : this.state.options.struct;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "block", {
        get: /**
         * @return {?}
         */
        function () {
            var navigationStack = this.state.navigationStack;
            /** @type {?} */
            var navigationStackCount = navigationStack.length;
            return navigationStackCount
                ? navigationStack[navigationStackCount - 1].block
                : this.state.options.block;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "form", {
        get: /**
         * @return {?}
         */
        function () {
            var navigationStack = this.state.navigationStack;
            /** @type {?} */
            var navigationStackCount = navigationStack.length;
            return navigationStackCount
                ? this.state.form.get(navigationStack[navigationStackCount - 1].path)
                : this.state.form;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "parentPath", {
        get: /**
         * @return {?}
         */
        function () {
            var navigationStack = this.state.navigationStack;
            /** @type {?} */
            var navigationStackCount = navigationStack.length;
            return navigationStackCount
                ? navigationStack[navigationStackCount - 1].parentPath
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "parentForm", {
        get: /**
         * @return {?}
         */
        function () {
            var navigationStack = this.state.navigationStack;
            /** @type {?} */
            var navigationStackCount = navigationStack.length;
            return navigationStackCount
                ? this.state.form.get(navigationStack[navigationStackCount - 1].parentPath)
                : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = this.stateService.create(this.options, this.value, this.errors);
        this.update();
        this._navigationChangeSubscription = this.state.onNavigationChange.subscribe(function () {
            _this.update();
        });
        this._formChangeSubscription = this.state.onValueChange.subscribe(function (change) {
            _this.valueChange.emit(change);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FormComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["value"] && !changes["value"].firstChange) {
            this.stateService.update(this.state.id, changes["value"].currentValue);
        }
        if (changes["errors"] && !changes["errors"].firstChange) {
            this.stateService.setErrors(this.state.id, changes["errors"].currentValue);
        }
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._navigationChangeSubscription) {
            this._navigationChangeSubscription.unsubscribe();
        }
        if (this._formChangeSubscription) {
            this._formChangeSubscription.unsubscribe();
        }
        this.stateService.remove(this.state.id);
    };
    /**
     * @return {?}
     */
    FormComponent.prototype.update = /**
     * @return {?}
     */
    function () {
        var _a = this.state, options = _a.options, navigationStack = _a.navigationStack;
        /** @type {?} */
        var struct;
        /** @type {?} */
        var block;
        /** @type {?} */
        var child = navigationStack[navigationStack.length - 1];
        if (child) {
            (struct = child.struct, block = child.block);
        }
        else {
            (struct = options.struct, block = options.block);
        }
        /** @type {?} */
        var blockFields = this.getBlockFields(struct, block);
        this.fields = blockFields;
    };
    /**
     * @param {?} struct
     * @param {?} blockName
     * @return {?}
     */
    FormComponent.prototype.getBlockFields = /**
     * @param {?} struct
     * @param {?} blockName
     * @return {?}
     */
    function (struct, blockName) {
        var e_1, _a;
        var _b = this.state, blocks = _b.blocks, fields = _b.fields;
        if (!blocks || !fields) {
            // TODO: Log error
            return [];
        }
        /** @type {?} */
        var block = blocks[struct + "-" + blockName];
        if (!block) {
            // TODO: Log error
            return [];
        }
        /** @type {?} */
        var references = block.fields;
        /** @type {?} */
        var blockFields = [];
        try {
            for (var references_1 = tslib_1.__values(references), references_1_1 = references_1.next(); !references_1_1.done; references_1_1 = references_1.next()) {
                var reference = references_1_1.value;
                blockFields.push(fields[struct + "-" + reference.field]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (references_1_1 && !references_1_1.done && (_a = references_1.return)) _a.call(references_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return blockFields;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FormComponent.prototype.onCancel = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        e.preventDefault();
        if (!this.cancelEnabled) {
            return;
        }
        if (this.state.navigationStack.length) {
            this.stateService.popNavigation(this.state.id);
            return;
        }
        this.cancel.emit();
        this.state.form.reset();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    FormComponent.prototype.onSubmit = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        e.stopPropagation();
        e.preventDefault();
        if (!this.submitEnabled) {
            return;
        }
        if (this.state.navigationStack.length) {
            this.stateService.completeNavigation(this.state.id);
            return;
        }
        this.submitting = true;
        this.submit.emit({
            value: this.state.form.value,
            onComplete: function (errors) {
                if (!errors) {
                    _this.stateService.clearErrors(_this.state.id);
                    _this.state.form.reset();
                }
                else {
                    _this.stateService.setErrors(_this.state.id, errors);
                }
                _this.submitting = false;
            }
        });
    };
    FormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-form',
                    template: "<form *ngIf=\"state.form\" [formGroup]=\"state.form\">\n  <de-re-crud-form-host [formId]=\"state.id\"\n                        [form]=\"form\"\n                        [struct]=\"struct\"\n                        [block]=\"block\"\n                        [parentPath]=\"parentPath\"\n                        [parentForm]=\"parentForm\"\n                        [fields]=\"fields\">\n  </de-re-crud-form-host>\n  <de-re-crud-button-host type=\"submit\"\n                          [formId]=\"state.id\"\n                          [disabled]=\"!submitEnabled\"\n                          text=\"Submit\"\n                          (click)=\"onSubmit($event)\">\n  </de-re-crud-button-host>\n  <de-re-crud-button-host *ngIf=\"cancelVisible\"\n                          type=\"cancel\"\n                          [formId]=\"state.id\"\n                          [disabled]=\"!cancelEnabled\"\n                          text=\"Cancel\"\n                          (click)=\"onCancel($event)\">\n  </de-re-crud-button-host>\n</form>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    FormComponent.ctorParameters = function () { return [
        { type: FormStateService }
    ]; };
    FormComponent.propDecorators = {
        options: [{ type: Input }],
        value: [{ type: Input }],
        errors: [{ type: Input }],
        valueChange: [{ type: Output }],
        submit: [{ type: Output }],
        cancel: [{ type: Output }],
        cancelVisible: [{ type: Input }]
    };
    return FormComponent;
}());
export { FormComponent };
function FormComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormComponent.prototype._navigationChangeSubscription;
    /** @type {?} */
    FormComponent.prototype._formChangeSubscription;
    /** @type {?} */
    FormComponent.prototype._cancelVisible;
    /** @type {?} */
    FormComponent.prototype.options;
    /** @type {?} */
    FormComponent.prototype.value;
    /** @type {?} */
    FormComponent.prototype.errors;
    /** @type {?} */
    FormComponent.prototype.valueChange;
    /** @type {?} */
    FormComponent.prototype.submit;
    /** @type {?} */
    FormComponent.prototype.cancel;
    /** @type {?} */
    FormComponent.prototype.fields;
    /** @type {?} */
    FormComponent.prototype.state;
    /** @type {?} */
    FormComponent.prototype.submitting;
    /** @type {?} */
    FormComponent.prototype.stateService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2Zvcm1zL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztJQW1EeEUsdUJBQW9CLFlBQThCO1FBQTlCLGlCQUFZLEdBQVosWUFBWSxDQUFrQjsyQkFSMUIsSUFBSSxZQUFZLEVBQWM7c0JBQ25DLElBQUksWUFBWSxFQUFrQjtzQkFDbEMsSUFBSSxZQUFZLEVBQU87S0FNWTtJQUV0RCxzQkFBSSx3Q0FBYTs7OztRQUFqQjtZQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ25FOzs7OztRQUVELFVBQ2tCLEtBQWM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7OztPQUxBO0lBT0Qsc0JBQUksd0NBQWE7Ozs7UUFBakI7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM1Qzs7O09BQUE7SUFFRCxzQkFBSSx3Q0FBYTs7OztRQUFqQjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3pCOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFNOzs7O1FBQVY7WUFDVSxJQUFBLDRDQUFlLENBQWdCOztZQUN2QyxJQUFNLG9CQUFvQixHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7WUFFcEQsT0FBTyxvQkFBb0I7Z0JBQ3pCLENBQUMsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcs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LFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDNUIsVUFBVSxFQUFFLFVBQUMsTUFBTTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWCxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQ3BEO2dCQUVELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7O2dCQXZPRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLHFnQ0F1Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7O2dCQWxDUSxnQkFBZ0I7OzswQkF3Q3RCLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLE1BQU07eUJBQ04sTUFBTTt5QkFDTixNQUFNO2dDQVlOLEtBQUs7O3dCQXJFUjs7U0ErQ2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGVSZUNydWRPcHRpb25zIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvb3B0aW9ucyc7XHJcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdWJtaXNzaW9uLCBGb3JtU3VibWlzc2lvbkVycm9ycyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL2Zvcm0tc3VibWlzc2lvbic7XHJcbmltcG9ydCB7IEZvcm1DaGFuZ2UgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9mb3JtLWNoYW5nZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPGZvcm0gKm5nSWY9XCJzdGF0ZS5mb3JtXCIgW2Zvcm1Hcm91cF09XCJzdGF0ZS5mb3JtXCI+XHJcbiAgPGRlLXJlLWNydWQtZm9ybS1ob3N0IFtmb3JtSWRdPVwic3RhdGUuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9ybV09XCJmb3JtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0cnVjdF09XCJzdHJ1Y3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYmxvY2tdPVwiYmxvY2tcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50UGF0aF09XCJwYXJlbnRQYXRoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3BhcmVudEZvcm1dPVwicGFyZW50Rm9ybVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmaWVsZHNdPVwiZmllbGRzXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWZvcm0taG9zdD5cclxuICA8ZGUtcmUtY3J1ZC1idXR0b24taG9zdCB0eXBlPVwic3VibWl0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUlkXT1cInN0YXRlLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIXN1Ym1pdEVuYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ9XCJTdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblN1Ym1pdCgkZXZlbnQpXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJ1dHRvbi1ob3N0PlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0ICpuZ0lmPVwiY2FuY2VsVmlzaWJsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNhbmNlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1JZF09XCJzdGF0ZS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFjYW5jZWxFbmFibGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0PVwiQ2FuY2VsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25DYW5jZWwoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9mb3JtPlxyXG5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX25hdmlnYXRpb25DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfY2FuY2VsVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgb3B0aW9uczogRGVSZUNydWRPcHRpb25zO1xyXG4gIEBJbnB1dCgpIHZhbHVlOiBvYmplY3Q7XHJcbiAgQElucHV0KCkgZXJyb3JzOiBGb3JtU3VibWlzc2lvbkVycm9ycztcclxuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1DaGFuZ2U+KCk7XHJcbiAgQE91dHB1dCgpIHN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybVN1Ym1pc3Npb24+KCk7XHJcbiAgQE91dHB1dCgpIGNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBmaWVsZHM6IElGaWVsZFtdO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcbiAgc3VibWl0dGluZzogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGF0ZVNlcnZpY2U6IEZvcm1TdGF0ZVNlcnZpY2UpIHt9XHJcblxyXG4gIGdldCBjYW5jZWxWaXNpYmxlKCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5zdGF0ZS5uYXZpZ2F0aW9uU3RhY2subGVuZ3RoIHx8IHRoaXMuX2NhbmNlbFZpc2libGU7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjYW5jZWxWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9jYW5jZWxWaXNpYmxlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgc3VibWl0RW5hYmxlZCgpIHtcclxuICAgIHJldHVybiAhdGhpcy5zdWJtaXR0aW5nICYmIHRoaXMuZm9ybS52YWxpZDtcclxuICB9XHJcblxyXG4gIGdldCBjYW5jZWxFbmFibGVkKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnN1Ym1pdHRpbmc7XHJcbiAgfVxyXG5cclxuICBnZXQgc3RydWN0KCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0uc3RydWN0XHJcbiAgICAgIDogdGhpcy5zdGF0ZS5vcHRpb25zLnN0cnVjdDtcclxuICB9XHJcblxyXG4gIGdldCBibG9jaygpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLmJsb2NrXHJcbiAgICAgIDogdGhpcy5zdGF0ZS5vcHRpb25zLmJsb2NrO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGZvcm0oKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyB0aGlzLnN0YXRlLmZvcm0uZ2V0KG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLnBhdGgpXHJcbiAgICAgIDogdGhpcy5zdGF0ZS5mb3JtO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmVudFBhdGgoKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyBuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5wYXJlbnRQYXRoXHJcbiAgICAgIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGdldCBwYXJlbnRGb3JtKCk6IChBYnN0cmFjdENvbnRyb2wgfCBudWxsKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyB0aGlzLnN0YXRlLmZvcm0uZ2V0KG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLnBhcmVudFBhdGgpXHJcbiAgICAgIDogbnVsbDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVTZXJ2aWNlLmNyZWF0ZSh0aGlzLm9wdGlvbnMsIHRoaXMudmFsdWUsIHRoaXMuZXJyb3JzKTtcclxuICAgIHRoaXMudXBkYXRlKCk7XHJcblxyXG4gICAgdGhpcy5fbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RhdGUub25OYXZpZ2F0aW9uQ2hhbmdlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5vblZhbHVlQ2hhbmdlLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XHJcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChjaGFuZ2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy52YWx1ZSAmJiAhY2hhbmdlcy52YWx1ZS5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS51cGRhdGUodGhpcy5zdGF0ZS5pZCwgY2hhbmdlcy52YWx1ZS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzLmVycm9ycyAmJiAhY2hhbmdlcy5lcnJvcnMuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uuc2V0RXJyb3JzKHRoaXMuc3RhdGUuaWQsIGNoYW5nZXMuZXJyb3JzLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9uYXZpZ2F0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX25hdmlnYXRpb25DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZVNlcnZpY2UucmVtb3ZlKHRoaXMuc3RhdGUuaWQpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgY29uc3QgeyBvcHRpb25zLCBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgbGV0IHN0cnVjdDtcclxuICAgIGxldCBibG9jaztcclxuXHJcbiAgICBjb25zdCBjaGlsZCA9IG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2subGVuZ3RoIC0gMV07XHJcbiAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgKHsgc3RydWN0LCBibG9jayB9ID0gY2hpbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgKHsgc3RydWN0LCBibG9jayB9ID0gb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvY2tGaWVsZHMgPSB0aGlzLmdldEJsb2NrRmllbGRzKHN0cnVjdCwgYmxvY2spO1xyXG5cclxuICAgIHRoaXMuZmllbGRzID0gYmxvY2tGaWVsZHM7XHJcbiAgfVxyXG5cclxuICBnZXRCbG9ja0ZpZWxkcyhzdHJ1Y3Q6IHN0cmluZywgYmxvY2tOYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHsgYmxvY2tzLCBmaWVsZHMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBpZiAoIWJsb2NrcyB8fCAhZmllbGRzKSB7XHJcbiAgICAgICAvLyBUT0RPOiBMb2cgZXJyb3JcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJsb2NrID0gYmxvY2tzW2Ake3N0cnVjdH0tJHtibG9ja05hbWV9YF07XHJcblxyXG4gICAgaWYgKCFibG9jaykge1xyXG4gICAgICAvLyBUT0RPOiBMb2cgZXJyb3JcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBibG9jay5maWVsZHM7XHJcblxyXG4gICAgY29uc3QgYmxvY2tGaWVsZHMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHJlZmVyZW5jZSBvZiByZWZlcmVuY2VzKSB7XHJcbiAgICAgIGJsb2NrRmllbGRzLnB1c2goZmllbGRzW2Ake3N0cnVjdH0tJHtyZWZlcmVuY2UuZmllbGR9YF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBibG9ja0ZpZWxkcztcclxuICB9XHJcblxyXG4gIG9uQ2FuY2VsKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmNhbmNlbEVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLm5hdmlnYXRpb25TdGFjay5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UucG9wTmF2aWdhdGlvbih0aGlzLnN0YXRlLmlkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FuY2VsLmVtaXQoKTtcclxuICAgIHRoaXMuc3RhdGUuZm9ybS5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgb25TdWJtaXQoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc3VibWl0RW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUubmF2aWdhdGlvblN0YWNrLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5jb21wbGV0ZU5hdmlnYXRpb24odGhpcy5zdGF0ZS5pZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN1Ym1pdHRpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuc3VibWl0LmVtaXQoe1xyXG4gICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5mb3JtLnZhbHVlLFxyXG4gICAgICBvbkNvbXBsZXRlOiAoZXJyb3JzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFlcnJvcnMpIHtcclxuICAgICAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLmNsZWFyRXJyb3JzKHRoaXMuc3RhdGUuaWQpO1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5mb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnNldEVycm9ycyh0aGlzLnN0YXRlLmlkLCBlcnJvcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdWJtaXR0aW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=