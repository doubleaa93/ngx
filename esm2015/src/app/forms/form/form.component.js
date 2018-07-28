/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormStateService } from '../../core/services/form-state.service';
export class FormComponent {
    /**
     * @param {?} stateService
     */
    constructor(stateService) {
        this.stateService = stateService;
        this.valueChange = new EventEmitter();
        this.submit = new EventEmitter();
        this.cancel = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get cancelVisible() {
        return !!this.state.navigationStack.length || this._cancelVisible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set cancelVisible(value) {
        this._cancelVisible = value;
    }
    /**
     * @return {?}
     */
    get submitEnabled() {
        return !this.submitting && this.form.valid;
    }
    /**
     * @return {?}
     */
    get cancelEnabled() {
        return !this.submitting;
    }
    /**
     * @return {?}
     */
    get struct() {
        const { navigationStack } = this.state;
        /** @type {?} */
        const navigationStackCount = navigationStack.length;
        return navigationStackCount
            ? navigationStack[navigationStackCount - 1].struct
            : this.state.options.struct;
    }
    /**
     * @return {?}
     */
    get block() {
        const { navigationStack } = this.state;
        /** @type {?} */
        const navigationStackCount = navigationStack.length;
        return navigationStackCount
            ? navigationStack[navigationStackCount - 1].block
            : this.state.options.block;
    }
    /**
     * @return {?}
     */
    get form() {
        const { navigationStack } = this.state;
        /** @type {?} */
        const navigationStackCount = navigationStack.length;
        return navigationStackCount
            ? this.state.form.get(navigationStack[navigationStackCount - 1].path)
            : this.state.form;
    }
    /**
     * @return {?}
     */
    get parentPath() {
        const { navigationStack } = this.state;
        /** @type {?} */
        const navigationStackCount = navigationStack.length;
        return navigationStackCount
            ? navigationStack[navigationStackCount - 1].parentPath
            : null;
    }
    /**
     * @return {?}
     */
    get parentForm() {
        const { navigationStack } = this.state;
        /** @type {?} */
        const navigationStackCount = navigationStack.length;
        return navigationStackCount
            ? this.state.form.get(navigationStack[navigationStackCount - 1].parentPath)
            : null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.create(this.options, this.value, this.errors);
        this.update();
        this._navigationChangeSubscription = this.state.onNavigationChange.subscribe(() => {
            this.update();
        });
        this._formChangeSubscription = this.state.onValueChange.subscribe((change) => {
            this.valueChange.emit(change);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["value"] && !changes["value"].firstChange) {
            this.stateService.update(this.state.id, changes["value"].currentValue);
        }
        if (changes["errors"] && !changes["errors"].firstChange) {
            this.stateService.setErrors(this.state.id, changes["errors"].currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._navigationChangeSubscription) {
            this._navigationChangeSubscription.unsubscribe();
        }
        if (this._formChangeSubscription) {
            this._formChangeSubscription.unsubscribe();
        }
        this.stateService.remove(this.state.id);
    }
    /**
     * @return {?}
     */
    update() {
        const { options, navigationStack } = this.state;
        /** @type {?} */
        let struct;
        /** @type {?} */
        let block;
        /** @type {?} */
        const child = navigationStack[navigationStack.length - 1];
        if (child) {
            ({ struct, block } = child);
        }
        else {
            ({ struct, block } = options);
        }
        /** @type {?} */
        const blockFields = this.getBlockFields(struct, block);
        this.fields = blockFields;
    }
    /**
     * @param {?} struct
     * @param {?} blockName
     * @return {?}
     */
    getBlockFields(struct, blockName) {
        const { blocks, fields } = this.state;
        if (!blocks || !fields) {
            // TODO: Log error
            return [];
        }
        /** @type {?} */
        const block = blocks[`${struct}-${blockName}`];
        if (!block) {
            // TODO: Log error
            return [];
        }
        /** @type {?} */
        const references = block.fields;
        /** @type {?} */
        const blockFields = [];
        for (const reference of references) {
            blockFields.push(fields[`${struct}-${reference.field}`]);
        }
        return blockFields;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onCancel(e) {
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
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
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
            onComplete: (errors) => {
                if (!errors) {
                    this.stateService.clearErrors(this.state.id);
                    this.state.form.reset();
                }
                else {
                    this.stateService.setErrors(this.state.id, errors);
                }
                this.submitting = false;
            }
        });
    }
}
FormComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-form',
                template: `<form *ngIf="state.form" [formGroup]="state.form">
  <de-re-crud-form-host [formId]="state.id"
                        [form]="form"
                        [struct]="struct"
                        [block]="block"
                        [parentPath]="parentPath"
                        [parentForm]="parentForm"
                        [fields]="fields">
  </de-re-crud-form-host>
  <de-re-crud-button-host type="submit"
                          [formId]="state.id"
                          [disabled]="!submitEnabled"
                          text="Submit"
                          (click)="onSubmit($event)">
  </de-re-crud-button-host>
  <de-re-crud-button-host *ngIf="cancelVisible"
                          type="cancel"
                          [formId]="state.id"
                          [disabled]="!cancelEnabled"
                          text="Cancel"
                          (click)="onCancel($event)">
  </de-re-crud-button-host>
</form>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
FormComponent.ctorParameters = () => [
    { type: FormStateService }
];
FormComponent.propDecorators = {
    options: [{ type: Input }],
    value: [{ type: Input }],
    errors: [{ type: Input }],
    valueChange: [{ type: Output }],
    submit: [{ type: Output }],
    cancel: [{ type: Output }],
    cancelVisible: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2Zvcm1zL2Zvcm0vZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFJTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFtQzFFLE1BQU07Ozs7SUFnQkosWUFBb0IsWUFBOEI7UUFBOUIsaUJBQVksR0FBWixZQUFZLENBQWtCOzJCQVIxQixJQUFJLFlBQVksRUFBYztzQkFDbkMsSUFBSSxZQUFZLEVBQWtCO3NCQUNsQyxJQUFJLFlBQVksRUFBTztLQU1ZOzs7O0lBRXRELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQ25FOzs7OztJQUVELElBQ0ksYUFBYSxDQUFDLEtBQWM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7S0FDN0I7Ozs7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1Qzs7OztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxFQUFFLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBQ3ZDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUVwRCxPQUFPLG9CQUFvQjtZQUN6QixDQUFDLENBQUMsZUFBZSxDQUFDLG9CQUFvQixHQUFHLENBQUMs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Q0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDNUIsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNwRDtnQkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzthQUN6QjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7WUF2T0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1Qlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7WUFsQ1EsZ0JBQWdCOzs7c0JBd0N0QixLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSzswQkFDTCxNQUFNO3FCQUNOLE1BQU07cUJBQ04sTUFBTTs0QkFZTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZE9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9vcHRpb25zJztcclxuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN1Ym1pc3Npb24sIEZvcm1TdWJtaXNzaW9uRXJyb3JzIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1zdWJtaXNzaW9uJztcclxuaW1wb3J0IHsgRm9ybUNoYW5nZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL2Zvcm0tY2hhbmdlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8Zm9ybSAqbmdJZj1cInN0YXRlLmZvcm1cIiBbZm9ybUdyb3VwXT1cInN0YXRlLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1mb3JtLWhvc3QgW2Zvcm1JZF09XCJzdGF0ZS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImZvcm1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3RydWN0XT1cInN0cnVjdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtibG9ja109XCJibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRQYXRoXT1cInBhcmVudFBhdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50Rm9ybV09XCJwYXJlbnRGb3JtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZpZWxkc109XCJmaWVsZHNcIj5cclxuICA8L2RlLXJlLWNydWQtZm9ybS1ob3N0PlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0IHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtSWRdPVwic3RhdGUuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhc3VibWl0RW5hYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dD1cIlN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU3VibWl0KCRldmVudClcIj5cclxuICA8L2RlLXJlLWNydWQtYnV0dG9uLWhvc3Q+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3QgKm5nSWY9XCJjYW5jZWxWaXNpYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2FuY2VsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUlkXT1cInN0YXRlLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNhbmNlbEVuYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ9XCJDYW5jZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgkZXZlbnQpXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJ1dHRvbi1ob3N0PlxyXG48L2Zvcm0+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9jYW5jZWxWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnM7XHJcbiAgQElucHV0KCkgdmFsdWU6IG9iamVjdDtcclxuICBASW5wdXQoKSBlcnJvcnM6IEZvcm1TdWJtaXNzaW9uRXJyb3JzO1xyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybUNoYW5nZT4oKTtcclxuICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtU3VibWlzc2lvbj4oKTtcclxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGZpZWxkczogSUZpZWxkW107XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuICBzdWJtaXR0aW5nOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSkge31cclxuXHJcbiAgZ2V0IGNhbmNlbFZpc2libGUoKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLnN0YXRlLm5hdmlnYXRpb25TdGFjay5sZW5ndGggfHwgdGhpcy5fY2FuY2VsVmlzaWJsZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNhbmNlbFZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2NhbmNlbFZpc2libGUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBzdWJtaXRFbmFibGVkKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnN1Ym1pdHRpbmcgJiYgdGhpcy5mb3JtLnZhbGlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbmNlbEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuc3VibWl0dGluZztcclxuICB9XHJcblxyXG4gIGdldCBzdHJ1Y3QoKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyBuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5zdHJ1Y3RcclxuICAgICAgOiB0aGlzLnN0YXRlLm9wdGlvbnMuc3RydWN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJsb2NrKCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0uYmxvY2tcclxuICAgICAgOiB0aGlzLnN0YXRlLm9wdGlvbnMuYmxvY2s7XHJcbiAgfVxyXG5cclxuICBnZXQgZm9ybSgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IHRoaXMuc3RhdGUuZm9ybS5nZXQobmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGF0aClcclxuICAgICAgOiB0aGlzLnN0YXRlLmZvcm07XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyZW50UGF0aCgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLnBhcmVudFBhdGhcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmVudEZvcm0oKTogKEFic3RyYWN0Q29udHJvbCB8IG51bGwpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IHRoaXMuc3RhdGUuZm9ybS5nZXQobmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGFyZW50UGF0aClcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuY3JlYXRlKHRoaXMub3B0aW9ucywgdGhpcy52YWx1ZSwgdGhpcy5lcnJvcnMpO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5vbk5hdmlnYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGNoYW5nZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLnZhbHVlICYmICFjaGFuZ2VzLnZhbHVlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnVwZGF0ZSh0aGlzLnN0YXRlLmlkLCBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZXJyb3JzICYmICFjaGFuZ2VzLmVycm9ycy5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5zZXRFcnJvcnModGhpcy5zdGF0ZS5pZCwgY2hhbmdlcy5lcnJvcnMuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX25hdmlnYXRpb25DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlU2VydmljZS5yZW1vdmUodGhpcy5zdGF0ZS5pZCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCB7IG9wdGlvbnMsIG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBsZXQgc3RydWN0O1xyXG4gICAgbGV0IGJsb2NrO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkID0gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFjay5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAoeyBzdHJ1Y3QsIGJsb2NrIH0gPSBjaGlsZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAoeyBzdHJ1Y3QsIGJsb2NrIH0gPSBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBibG9ja0ZpZWxkcyA9IHRoaXMuZ2V0QmxvY2tGaWVsZHMoc3RydWN0LCBibG9jayk7XHJcblxyXG4gICAgdGhpcy5maWVsZHMgPSBibG9ja0ZpZWxkcztcclxuICB9XHJcblxyXG4gIGdldEJsb2NrRmllbGRzKHN0cnVjdDogc3RyaW5nLCBibG9ja05hbWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgeyBibG9ja3MsIGZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmICghYmxvY2tzIHx8ICFmaWVsZHMpIHtcclxuICAgICAgIC8vIFRPRE86IExvZyBlcnJvclxyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvY2sgPSBibG9ja3NbYCR7c3RydWN0fS0ke2Jsb2NrTmFtZX1gXTtcclxuXHJcbiAgICBpZiAoIWJsb2NrKSB7XHJcbiAgICAgIC8vIFRPRE86IExvZyBlcnJvclxyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IGJsb2NrLmZpZWxkcztcclxuXHJcbiAgICBjb25zdCBibG9ja0ZpZWxkcyA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVmZXJlbmNlIG9mIHJlZmVyZW5jZXMpIHtcclxuICAgICAgYmxvY2tGaWVsZHMucHVzaChmaWVsZHNbYCR7c3RydWN0fS0ke3JlZmVyZW5jZS5maWVsZH1gXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJsb2NrRmllbGRzO1xyXG4gIH1cclxuXHJcbiAgb25DYW5jZWwoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY2FuY2VsRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUubmF2aWdhdGlvblN0YWNrLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5wb3BOYXZpZ2F0aW9uKHRoaXMuc3RhdGUuaWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xyXG4gICAgdGhpcy5zdGF0ZS5mb3JtLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5zdWJtaXRFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZS5uYXZpZ2F0aW9uU3RhY2subGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLmNvbXBsZXRlTmF2aWdhdGlvbih0aGlzLnN0YXRlLmlkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VibWl0dGluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zdWJtaXQuZW1pdCh7XHJcbiAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmZvcm0udmFsdWUsXHJcbiAgICAgIG9uQ29tcGxldGU6IChlcnJvcnMpID0+IHtcclxuICAgICAgICBpZiAoIWVycm9ycykge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UuY2xlYXJFcnJvcnModGhpcy5zdGF0ZS5pZCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmZvcm0ucmVzZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uuc2V0RXJyb3JzKHRoaXMuc3RhdGUuaWQsIGVycm9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN1Ym1pdHRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==