/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IControl() { }
function IControl_tsickle_Closure_declarations() {
    /** @type {?} */
    IControl.prototype.form;
    /** @type {?} */
    IControl.prototype.formId;
    /** @type {?} */
    IControl.prototype.formPath;
    /** @type {?} */
    IControl.prototype.value;
    /** @type {?} */
    IControl.prototype.htmlId;
    /** @type {?} */
    IControl.prototype.rendererType;
    /** @type {?} */
    IControl.prototype.field;
    /** @type {?} */
    IControl.prototype.submissionErrors;
    /** @type {?} */
    IControl.prototype.onFocus;
    /** @type {?} */
    IControl.prototype.onBlur;
    /** @type {?} */
    IControl.prototype.onChange;
}
/**
 * @record
 */
export function ISelectControl() { }
function ISelectControl_tsickle_Closure_declarations() {
    /** @type {?} */
    ISelectControl.prototype.options;
}
/**
 * @record
 */
export function ICollectionControl() { }
function ICollectionControl_tsickle_Closure_declarations() {
    /** @type {?} */
    ICollectionControl.prototype.stamp;
    /** @type {?} */
    ICollectionControl.prototype.field;
    /** @type {?} */
    ICollectionControl.prototype.nestedFields;
    /** @type {?} */
    ICollectionControl.prototype.nestedValues;
    /** @type {?} */
    ICollectionControl.prototype.layout;
    /** @type {?} */
    ICollectionControl.prototype.value;
    /** @type {?} */
    ICollectionControl.prototype.canAdd;
    /** @type {?} */
    ICollectionControl.prototype.onAdd;
}
/**
 * @record
 */
export function ControlRenderer() { }
function ControlRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlRenderer.prototype.control;
}
/**
 * @record
 */
export function SelectControlRenderer() { }
function SelectControlRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectControlRenderer.prototype.control;
}
/**
 * @record
 */
export function CollectionControlRenderer() { }
function CollectionControlRenderer_tsickle_Closure_declarations() {
    /** @type {?} */
    CollectionControlRenderer.prototype.control;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZS1yZS1jcnVkL25neC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSUZpZWxkLCBJT3B0aW9uLCBJUmVmZXJlbmNlRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgSVN0YW1wIH0gZnJvbSAnLi9zdGFtcC5yZW5kZXJlcic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sIHtcclxuICBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgZm9ybUlkOiBudW1iZXI7XHJcbiAgZm9ybVBhdGg6IHN0cmluZztcclxuICB2YWx1ZTogQWJzdHJhY3RDb250cm9sO1xyXG4gIGh0bWxJZDogc3RyaW5nO1xyXG4gIHJlbmRlcmVyVHlwZTogc3RyaW5nO1xyXG4gIGZpZWxkOiBJRmllbGQ7XHJcbiAgc3VibWlzc2lvbkVycm9yczogc3RyaW5nW107XHJcbiAgb25Gb2N1czogKGU6IGFueSkgPT4gdm9pZDtcclxuICBvbkJsdXI6IChlOiBhbnkpID0+IHZvaWQ7XHJcbiAgb25DaGFuZ2U6IChlOiBhbnkpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdENvbnRyb2wgZXh0ZW5kcyBJQ29udHJvbCB7XHJcbiAgb3B0aW9uczogKChyb290VmFsdWU6IGFueSkgPT4gSU9wdGlvbltdKTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ29sbGVjdGlvbkNvbnRyb2wgZXh0ZW5kcyBJQ29udHJvbCB7XHJcbiAgc3RhbXA6IElTdGFtcDtcclxuICBmaWVsZDogSVJlZmVyZW5jZUZpZWxkO1xyXG4gIG5lc3RlZEZpZWxkczogSUZpZWxkW107XHJcbiAgbmVzdGVkVmFsdWVzOiBGb3JtR3JvdXBbXTtcclxuICBsYXlvdXQ6ICdpbmxpbmUnIHwgJ3RhYmxlJztcclxuICB2YWx1ZTogRm9ybUFycmF5O1xyXG4gIGNhbkFkZDogYm9vbGVhbjtcclxuICBvbkFkZDogKGUpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbFJlbmRlcmVyIHtcclxuICBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RDb250cm9sUmVuZGVyZXIge1xyXG4gIGNvbnRyb2w6IElTZWxlY3RDb250cm9sO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxufVxyXG4iXX0=