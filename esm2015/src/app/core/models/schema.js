/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IStruct() { }
function IStruct_tsickle_Closure_declarations() {
    /** @type {?} */
    IStruct.prototype.name;
    /** @type {?} */
    IStruct.prototype.label;
    /** @type {?} */
    IStruct.prototype.fields;
    /** @type {?} */
    IStruct.prototype.blocks;
}
/**
 * @record
 */
export function IField() { }
function IField_tsickle_Closure_declarations() {
    /** @type {?} */
    IField.prototype.name;
    /** @type {?} */
    IField.prototype.struct;
    /** @type {?} */
    IField.prototype.keyField;
    /** @type {?} */
    IField.prototype.label;
    /** @type {?} */
    IField.prototype.type;
    /** @type {?} */
    IField.prototype.required;
    /** @type {?|undefined} */
    IField.prototype.help;
    /** @type {?|undefined} */
    IField.prototype.initialValue;
}
/**
 * @record
 */
export function IStampField() { }
function IStampField_tsickle_Closure_declarations() {
    /** @type {?} */
    IStampField.prototype.type;
    /** @type {?|undefined} */
    IStampField.prototype.hints;
}
/**
 * @record
 */
export function ITextField() { }
function ITextField_tsickle_Closure_declarations() {
    /** @type {?} */
    ITextField.prototype.type;
    /** @type {?|undefined} */
    ITextField.prototype.initialValue;
    /** @type {?|undefined} */
    ITextField.prototype.minLength;
    /** @type {?|undefined} */
    ITextField.prototype.maxLength;
}
/**
 * @record
 */
export function IIntegerField() { }
function IIntegerField_tsickle_Closure_declarations() {
    /** @type {?} */
    IIntegerField.prototype.type;
    /** @type {?|undefined} */
    IIntegerField.prototype.min;
    /** @type {?|undefined} */
    IIntegerField.prototype.max;
}
/**
 * @record
 */
export function IListField() { }
function IListField_tsickle_Closure_declarations() {
    /** @type {?} */
    IListField.prototype.type;
    /** @type {?} */
    IListField.prototype.options;
}
/**
 * @record
 */
export function IOption() { }
function IOption_tsickle_Closure_declarations() {
    /** @type {?} */
    IOption.prototype.label;
    /** @type {?} */
    IOption.prototype.value;
}
/**
 * @record
 */
export function IReferenceField() { }
function IReferenceField_tsickle_Closure_declarations() {
    /** @type {?} */
    IReferenceField.prototype.reference;
}
/**
 * @record
 */
export function ILinkedStructField() { }
function ILinkedStructField_tsickle_Closure_declarations() {
    /** @type {?} */
    ILinkedStructField.prototype.type;
    /** @type {?|undefined} */
    ILinkedStructField.prototype.initialValue;
    /** @type {?|undefined} */
    ILinkedStructField.prototype.minInstances;
    /** @type {?|undefined} */
    ILinkedStructField.prototype.maxInstances;
}
/**
 * @record
 */
export function IForeignKeyField() { }
function IForeignKeyField_tsickle_Closure_declarations() {
    /** @type {?} */
    IForeignKeyField.prototype.type;
    /** @type {?|undefined} */
    IForeignKeyField.prototype.initialValue;
}
/**
 * @record
 */
export function IBlock() { }
function IBlock_tsickle_Closure_declarations() {
    /** @type {?} */
    IBlock.prototype.name;
    /** @type {?} */
    IBlock.prototype.struct;
    /** @type {?} */
    IBlock.prototype.fields;
}
/**
 * @record
 */
export function IFieldReference() { }
function IFieldReference_tsickle_Closure_declarations() {
    /** @type {?} */
    IFieldReference.prototype.field;
    /** @type {?} */
    IFieldReference.prototype.condition;
}
/**
 * @record
 */
export function ILinkedStructFieldReference() { }
function ILinkedStructFieldReference_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ILinkedStructFieldReference.prototype.hints;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL21vZGVscy9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIEhlYWRlclNpemUgPSAxfDJ8M3w0fDV8NjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN0cnVjdCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgZmllbGRzOiBzdHJpbmdbXTtcclxuICBibG9ja3M6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElGaWVsZCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHN0cnVjdDogc3RyaW5nO1xyXG4gIGtleUZpZWxkOiBib29sZWFuO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgdHlwZTogYW55O1xyXG4gIHJlcXVpcmVkOiBib29sZWFuO1xyXG4gIGhlbHA/OiBzdHJpbmc7XHJcbiAgaW5pdGlhbFZhbHVlPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdGFtcEZpZWxkIGV4dGVuZHMgSUZpZWxkIHtcclxuICB0eXBlOiAnc3RhbXAnO1xyXG4gIGhpbnRzPzoge1xyXG4gICAgaGVhZGVyU2l6ZT86IEhlYWRlclNpemU7XHJcbiAgICBkaXNwbGF5Q2xhc3NOYW1lcz86IHN0cmluZ1tdO1xyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVRleHRGaWVsZCBleHRlbmRzIElGaWVsZCB7XHJcbiAgdHlwZTogJ3RleHQnO1xyXG4gIGluaXRpYWxWYWx1ZT86IHN0cmluZztcclxuICBtaW5MZW5ndGg/OiBudW1iZXI7XHJcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElJbnRlZ2VyRmllbGQgZXh0ZW5kcyBJRmllbGQge1xyXG4gIHR5cGU6ICdpbnRlZ2VyJztcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMaXN0RmllbGQgZXh0ZW5kcyBJRmllbGQge1xyXG4gIHR5cGU6ICdsaXN0JztcclxuICBvcHRpb25zOiBJT3B0aW9uW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU9wdGlvbiB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICB2YWx1ZTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZWZlcmVuY2VGaWVsZCBleHRlbmRzIElGaWVsZCB7XHJcbiAgcmVmZXJlbmNlOiB7XHJcbiAgICBzdHJ1Y3Q6IHN0cmluZztcclxuICAgIGxhYmVsRmllbGQ6IHN0cmluZztcclxuICAgIGJsb2NrOiBzdHJpbmc7XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTGlua2VkU3RydWN0RmllbGQgZXh0ZW5kcyBJUmVmZXJlbmNlRmllbGQge1xyXG4gIHR5cGU6ICdsaW5rZWRTdHJ1Y3QnO1xyXG4gIGluaXRpYWxWYWx1ZT86IGFueVtdO1xyXG4gIG1pbkluc3RhbmNlcz86IG51bWJlcjtcclxuICBtYXhJbnN0YW5jZXM/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZvcmVpZ25LZXlGaWVsZCBleHRlbmRzIElSZWZlcmVuY2VGaWVsZCB7XHJcbiAgdHlwZTogJ2ZvcmVpZ25LZXknO1xyXG4gIGluaXRpYWxWYWx1ZT86IG9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQmxvY2sge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBzdHJ1Y3Q6IHN0cmluZztcclxuICBmaWVsZHM6IChJRmllbGRSZWZlcmVuY2UgfCBJTGlua2VkU3RydWN0RmllbGRSZWZlcmVuY2UpW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUZpZWxkUmVmZXJlbmNlIHtcclxuICBmaWVsZDogc3RyaW5nO1xyXG4gIGNvbmRpdGlvbjogKHZhbHVlOiBhbnksIHJvb3RWYWx1ZTogYW55KSA9PiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZSBleHRlbmRzIElGaWVsZFJlZmVyZW5jZSB7XHJcbiAgaGludHM/OiB7XHJcbiAgICBsYXlvdXQ/OiAnaW5saW5lJyB8ICd0YWJsZSdcclxuICAgIGJsb2NrPzogc3RyaW5nO1xyXG4gIH07XHJcbn1cclxuIl19