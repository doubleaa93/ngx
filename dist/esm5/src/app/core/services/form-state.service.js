/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilderService } from './form-builder.service';
var FormStateService = /** @class */ (function () {
    function FormStateService(formBuilder) {
        this.formBuilder = formBuilder;
        this._cache = {};
    }
    /**
     * @return {?}
     */
    FormStateService.generateId = /**
     * @return {?}
     */
    function () {
        return Math.random();
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormStateService.assignDefaults = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        if (!options.headerSize) {
            options.headerSize = 3;
        }
    };
    // TODO: This should expand strings into a label object; the renderers should handle which label to show based on screen size
    /**
     * @param {?} label
     * @return {?}
     */
    FormStateService.parseLabel = /**
     * @param {?} label
     * @return {?}
     */
    function (label) {
        if (typeof label === 'string') {
            return label;
        }
        return label.short;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    FormStateService.parseSchema = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        /** @type {?} */
        var structs = [];
        /** @type {?} */
        var fields = [];
        /** @type {?} */
        var blocks = [];
        try {
            for (var _e = tslib_1.__values(options.schema), _f = _e.next(); !_f.done; _f = _e.next()) {
                var structSchema = _f.value;
                /** @type {?} */
                var struct = tslib_1.__assign({}, structSchema, { label: this.parseLabel(structSchema.label), collectionLabel: this.parseLabel(structSchema.label), fields: [], blocks: [] });
                try {
                    for (var _g = tslib_1.__values(structSchema.fields), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var fieldSchema = _h.value;
                        /** @type {?} */
                        var label = this.parseLabel(fieldSchema.label);
                        /** @type {?} */
                        var field = tslib_1.__assign({}, fieldSchema, { label: label, placeholder: fieldSchema.placeholder || label, struct: structSchema.name });
                        if (field.reference && !field.reference.block) {
                            field.reference.block = 'default';
                        }
                        fields.push(field);
                        struct.fields.push(field.name);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    for (var _j = tslib_1.__values(structSchema.blocks), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var blockSchema = _k.value;
                        /** @type {?} */
                        var block = tslib_1.__assign({}, blockSchema, { fields: [], struct: structSchema.name });
                        try {
                            for (var _l = tslib_1.__values(blockSchema.fields), _m = _l.next(); !_m.done; _m = _l.next()) {
                                var reference = _m.value;
                                if (!reference) {
                                    continue;
                                }
                                /** @type {?} */
                                var fieldReference = reference.field
                                    ? reference
                                    : { field: reference };
                                /** @type {?} */
                                var condition = void 0;
                                if (fieldReference.condition) {
                                    /** @type {?} */
                                    var returnValue = fieldReference.condition[0] === '{'
                                        ? fieldReference.condition
                                        : "return " + fieldReference.condition;
                                    // tslint:disable-next-line:no-function-constructor-with-string-args
                                    condition = new Function('value', 'rootValue', returnValue);
                                }
                                else {
                                    // tslint:disable-next-line:no-function-constructor-with-string-args
                                    condition = FormStateService.defaultConditionFunc;
                                }
                                fieldReference.condition = condition;
                                block.fields.push(fieldReference);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        blocks.push(block);
                        struct.blocks.push(block.name);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                structs.push(struct);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            structs: structs,
            fields: fields,
            blocks: blocks
        };
    };
    /**
     * @param {?} id
     * @return {?}
     */
    FormStateService.prototype.get = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this._cache[id];
    };
    /**
     * @param {?} options
     * @param {?} value
     * @param {?=} initialErrors
     * @return {?}
     */
    FormStateService.prototype.create = /**
     * @param {?} options
     * @param {?} value
     * @param {?=} initialErrors
     * @return {?}
     */
    function (options, value, initialErrors) {
        /** @type {?} */
        var id;
        while (true) {
            id = FormStateService.generateId();
            if (this._cache[id]) {
                continue;
            }
            break;
        }
        FormStateService.assignDefaults(options);
        /** @type {?} */
        var schema = FormStateService.parseSchema(options);
        /** @type {?} */
        var structs = this.arrayToMap(function (struct) { return struct.name; }, schema.structs);
        /** @type {?} */
        var fields = this.arrayToMap(function (field) { return field.struct + "-" + field.name; }, schema.fields);
        /** @type {?} */
        var blocks = this.arrayToMap(function (block) { return block.struct + "-" + block.name; }, schema.blocks);
        /** @type {?} */
        var form = this.formBuilder.group(options.struct, options.block, blocks, fields, value);
        /** @type {?} */
        var state = {
            id: id,
            options: options,
            form: form,
            structs: structs,
            fields: fields,
            blocks: blocks,
            submissionErrors: initialErrors,
            onSubmissionErrorsChange: new Subject(),
            navigationStack: [],
            onNavigationChange: new Subject(),
            onValueChange: new Subject()
        };
        this._cache[id] = state;
        return state;
    };
    /**
     * @param {?} formId
     * @param {?} struct
     * @param {?} block
     * @return {?}
     */
    FormStateService.prototype.createForm = /**
     * @param {?} formId
     * @param {?} struct
     * @param {?} block
     * @return {?}
     */
    function (formId, struct, block) {
        if (!this._cache[formId]) {
            return;
        }
        var _a = this._cache[formId], fields = _a.fields, blocks = _a.blocks;
        return this.formBuilder.group(struct, block, blocks, fields);
    };
    /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    FormStateService.prototype.update = /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    function (id, value) {
        if (!this._cache[id]) {
            return;
        }
        var form = this._cache[id].form;
        form.patchValue(value);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    FormStateService.prototype.remove = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (!this._cache[id]) {
            return;
        }
        delete this._cache[id];
    };
    /**
     * @param {?} id
     * @param {?=} formPath
     * @return {?}
     */
    FormStateService.prototype.clearErrors = /**
     * @param {?} id
     * @param {?=} formPath
     * @return {?}
     */
    function (id, formPath) {
        if (!this._cache[id]) {
            return;
        }
        if (formPath) {
            delete this._cache[id].submissionErrors[formPath];
        }
        else {
            this._cache[id].submissionErrors = {};
        }
        this.pushSubmissionErrorsChange(id);
    };
    /**
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    FormStateService.prototype.setErrors = /**
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    function (id, errors) {
        if (!this._cache[id]) {
            return;
        }
        this._cache[id].submissionErrors = errors;
        this.pushSubmissionErrorsChange(id);
    };
    /**
     * @param {?} id
     * @param {?} formPath
     * @param {?} newValue
     * @param {?} event
     * @return {?}
     */
    FormStateService.prototype.onChange = /**
     * @param {?} id
     * @param {?} formPath
     * @param {?} newValue
     * @param {?} event
     * @return {?}
     */
    function (id, formPath, newValue, event) {
        if (!this._cache[id]) {
            return;
        }
        /** @type {?} */
        var state = this._cache[id];
        this.clearErrors(id, formPath);
        if (event && state.options.changeNotificationType !== event) {
            return;
        }
        (/** @type {?} */ (state.onValueChange)).next({
            fieldPath: formPath,
            value: newValue,
            formValue: state.form.value
        });
    };
    /**
     * @param {?} id
     * @param {?} struct
     * @param {?} block
     * @param {?} path
     * @param {?} parentPath
     * @return {?}
     */
    FormStateService.prototype.pushNavigation = /**
     * @param {?} id
     * @param {?} struct
     * @param {?} block
     * @param {?} path
     * @param {?} parentPath
     * @return {?}
     */
    function (id, struct, block, path, parentPath) {
        if (!this._cache[id]) {
            return;
        }
        this._cache[id].navigationStack.push({
            struct: struct,
            block: block,
            path: path,
            parentPath: parentPath
        });
        this.pushNavigationChange(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    FormStateService.prototype.popNavigation = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (!this._cache[id]) {
            return;
        }
        this._cache[id].navigationStack.pop();
        this.pushNavigationChange(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    FormStateService.prototype.completeNavigation = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        if (!this._cache[id]) {
            return;
        }
        this.popNavigation(id);
    };
    /**
     * @param {?} id
     * @param {?=} childId
     * @return {?}
     */
    FormStateService.prototype.pushNavigationChange = /**
     * @param {?} id
     * @param {?=} childId
     * @return {?}
     */
    function (id, childId) {
        /** @type {?} */
        var state = this._cache[id];
        (/** @type {?} */ (state.onNavigationChange)).next(childId);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    FormStateService.prototype.pushSubmissionErrorsChange = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var state = this._cache[id];
        (/** @type {?} */ (state.onSubmissionErrorsChange)).next(state.submissionErrors);
    };
    /**
     * @template T
     * @param {?} getKey
     * @param {?} array
     * @return {?}
     */
    FormStateService.prototype.arrayToMap = /**
     * @template T
     * @param {?} getKey
     * @param {?} array
     * @return {?}
     */
    function (getKey, array) {
        return array.reduce(function (acc, current) {
            acc[getKey(current)] = current;
            return acc;
        }, new Map());
    };
    FormStateService.defaultConditionFunc = new Function('return true');
    FormStateService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormStateService.ctorParameters = function () { return [
        { type: FormBuilderService }
    ]; };
    return FormStateService;
}());
export { FormStateService };
function FormStateService_tsickle_Closure_declarations() {
    /** @type {?} */
    FormStateService.defaultConditionFunc;
    /** @type {?} */
    FormStateService.prototype._cache;
    /** @type {?} */
    FormStateService.prototype.formBuilder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUkvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFhMUQsMEJBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtzQkFGTCxFQUFFO0tBRU87Ozs7SUFFaEQsMkJBQVU7OztJQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RCOzs7OztJQUVNLCtCQUFjOzs7O0lBQXJCLFVBQXNCLE9BQXdCO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7SUFFRCw2SEFBNkg7Ozs7O0lBQ3RILDJCQUFVOzs7O0lBQWpCLFVBQWtCLEtBQWlDO1FBQ2pELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDcEI7Ozs7O0lBRU0sNEJBQVc7Ozs7SUFBbEIsVUFBbUIsT0FBd0I7OztRQUN6QyxJQUFNLE9BQU8sR0FBYyxFQUFFLENBQUM7O1FBQzlCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQzs7UUFDNUIsSUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDOztZQUU1QixLQUEyQixJQUFBLEtBQUEsaUJBQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBdEMsSUFBTSxZQUFZLFdB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LEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixtQkFBa0IsS0FBSyxDQUFDLGtCQUFrQixFQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7SUFHcEQscURBQTBCOzs7O2NBQUMsRUFBVTs7UUFDM0MsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixtQkFBZ0MsS0FBSyxDQUFDLHdCQUF3QixFQUFDLENBQUMsSUFBSSxDQUNsRSxLQUFLLENBQUMsZ0JBQWdCLENBQ3ZCLENBQUM7Ozs7Ozs7O0lBR0kscUNBQVU7Ozs7OztjQUFJLE1BQXlCLEVBQUUsS0FBVTtRQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQWlCLFVBQUMsR0FBRyxFQUFFLE9BQU87WUFDL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUMvQixPQUFPLEdBQUcsQ0FBQztTQUNaLEVBQUUsSUFBSSxHQUFHLEVBQWEsQ0FBQyxDQUFDOzs0Q0F6UlcsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDOztnQkFKbEUsVUFBVTs7OztnQkFORixrQkFBa0I7OzJCQU4zQjs7U0FjYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3B0aW9ucyc7XHJcbmltcG9ydCB7IElTdHJ1Y3QsIElGaWVsZCwgSUJsb2NrIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdWJtaXNzaW9uRXJyb3JzIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3VibWlzc2lvbic7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyU2VydmljZSB9IGZyb20gJy4vZm9ybS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtQ2hhbmdlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tY2hhbmdlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5cclxuZXhwb3J0IHR5cGUgR2V0S2V5RnVuY3Rpb248VD4gPSAoaXRlbTogVCkgPT4gc3RyaW5nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgRm9ybVN0YXRlU2VydmljZSB7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWNvbnN0cnVjdG9yLXdpdGgtc3RyaW5nLWFyZ3NcclxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0Q29uZGl0aW9uRnVuYyA9IG5ldyBGdW5jdGlvbigncmV0dXJuIHRydWUnKTtcclxuICBwcml2YXRlIF9jYWNoZTogeyBbaWQ6IG51bWJlcl06IEZvcm1TdGF0ZSB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyU2VydmljZSkge31cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlSWQoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3NpZ25EZWZhdWx0cyhvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucy5oZWFkZXJTaXplKSB7XHJcbiAgICAgIG9wdGlvbnMuaGVhZGVyU2l6ZSA9IDM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBUaGlzIHNob3VsZCBleHBhbmQgc3RyaW5ncyBpbnRvIGEgbGFiZWwgb2JqZWN0OyB0aGUgcmVuZGVyZXJzIHNob3VsZCBoYW5kbGUgd2hpY2ggbGFiZWwgdG8gc2hvdyBiYXNlZCBvbiBzY3JlZW4gc2l6ZVxyXG4gIHN0YXRpYyBwYXJzZUxhYmVsKGxhYmVsOiBzdHJpbmcgfCB7IHNob3J0OiBzdHJpbmcgfSkge1xyXG4gICAgaWYgKHR5cGVvZiBsYWJlbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbC5zaG9ydDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZVNjaGVtYShvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHN0cnVjdHM6IElTdHJ1Y3RbXSA9IFtdO1xyXG4gICAgY29uc3QgZmllbGRzOiBJRmllbGRbXSA9IFtdO1xyXG4gICAgY29uc3QgYmxvY2tzOiBJQmxvY2tbXSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qgc3RydWN0U2NoZW1hIG9mIG9wdGlvbnMuc2NoZW1hKSB7XHJcbiAgICAgIGNvbnN0IHN0cnVjdCA9IHtcclxuICAgICAgICAuLi5zdHJ1Y3RTY2hlbWEsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGFyc2VMYWJlbChzdHJ1Y3RTY2hlbWEubGFiZWwpLFxyXG4gICAgICAgIGNvbGxlY3Rpb25MYWJlbDogdGhpcy5wYXJzZUxhYmVsKHN0cnVjdFNjaGVtYS5sYWJlbCksXHJcbiAgICAgICAgZmllbGRzOiBbXSxcclxuICAgICAgICBibG9ja3M6IFtdXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGZpZWxkU2NoZW1hIG9mIHN0cnVjdFNjaGVtYS5maWVsZHMpIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucGFyc2VMYWJlbChmaWVsZFNjaGVtYS5sYWJlbCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpZWxkID0ge1xyXG4gICAgICAgICAgLi4uZmllbGRTY2hlbWEsXHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZFNjaGVtYS5wbGFjZWhvbGRlciB8fCBsYWJlbCxcclxuICAgICAgICAgIHN0cnVjdDogc3RydWN0U2NoZW1hLm5hbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZmllbGQucmVmZXJlbmNlICYmICFmaWVsZC5yZWZlcmVuY2UuYmxvY2spIHtcclxuICAgICAgICAgIGZpZWxkLnJlZmVyZW5jZS5ibG9jayA9ICdkZWZhdWx0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICBzdHJ1Y3QuZmllbGRzLnB1c2goZmllbGQubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgYmxvY2tTY2hlbWEgb2Ygc3RydWN0U2NoZW1hLmJsb2Nrcykge1xyXG4gICAgICAgIGNvbnN0IGJsb2NrID0ge1xyXG4gICAgICAgICAgLi4uYmxvY2tTY2hlbWEsXHJcbiAgICAgICAgICBmaWVsZHM6IFtdLFxyXG4gICAgICAgICAgc3RydWN0OiBzdHJ1Y3RTY2hlbWEubmFtZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcmVmZXJlbmNlIG9mIGJsb2NrU2NoZW1hLmZpZWxkcykge1xyXG4gICAgICAgICAgaWYgKCFyZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZmllbGRSZWZlcmVuY2UgPSByZWZlcmVuY2UuZmllbGRcclxuICAgICAgICAgICAgPyByZWZlcmVuY2VcclxuICAgICAgICAgICAgOiB7IGZpZWxkOiByZWZlcmVuY2UgfTtcclxuXHJcbiAgICAgICAgICBsZXQgY29uZGl0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChmaWVsZFJlZmVyZW5jZS5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPVxyXG4gICAgICAgICAgICAgIGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvblswXSA9PT0gJ3snXHJcbiAgICAgICAgICAgICAgICA/IGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvblxyXG4gICAgICAgICAgICAgICAgOiBgcmV0dXJuICR7ZmllbGRSZWZlcmVuY2UuY29uZGl0aW9ufWA7XHJcblxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tY29uc3RydWN0b3Itd2l0aC1zdHJpbmctYXJnc1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBuZXcgRnVuY3Rpb24oJ3ZhbHVlJywgJ3Jvb3RWYWx1ZScsIHJldHVyblZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1jb25zdHJ1Y3Rvci13aXRoLXN0cmluZy1hcmdzXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IEZvcm1TdGF0ZVNlcnZpY2UuZGVmYXVsdENvbmRpdGlvbkZ1bmM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgYmxvY2suZmllbGRzLnB1c2goZmllbGRSZWZlcmVuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xyXG4gICAgICAgIHN0cnVjdC5ibG9ja3MucHVzaChibG9jay5uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RydWN0cy5wdXNoKHN0cnVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RydWN0cyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICBibG9ja3NcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQoaWQ6IG51bWJlcik6IEZvcm1TdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbaWRdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKG9wdGlvbnM6IERlUmVDcnVkT3B0aW9ucywgdmFsdWU6IG9iamVjdCwgaW5pdGlhbEVycm9ycz86IEZvcm1TdWJtaXNzaW9uRXJyb3JzKTogRm9ybVN0YXRlIHtcclxuICAgIGxldCBpZDogbnVtYmVyO1xyXG5cclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGlkID0gRm9ybVN0YXRlU2VydmljZS5nZW5lcmF0ZUlkKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIEZvcm1TdGF0ZVNlcnZpY2UuYXNzaWduRGVmYXVsdHMob3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3Qgc2NoZW1hID0gRm9ybVN0YXRlU2VydmljZS5wYXJzZVNjaGVtYShvcHRpb25zKTtcclxuICAgIGNvbnN0IHN0cnVjdHMgPSB0aGlzLmFycmF5VG9NYXAoc3RydWN0ID0+IHN0cnVjdC5uYW1lLCBzY2hlbWEuc3RydWN0cyk7XHJcbiAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmFycmF5VG9NYXAoXHJcbiAgICAgIGZpZWxkID0+IGAke2ZpZWxkLnN0cnVjdH0tJHtmaWVsZC5uYW1lfWAsXHJcbiAgICAgIHNjaGVtYS5maWVsZHNcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYmxvY2tzID0gdGhpcy5hcnJheVRvTWFwKFxyXG4gICAgICBibG9jayA9PiBgJHtibG9jay5zdHJ1Y3R9LSR7YmxvY2submFtZX1gLFxyXG4gICAgICBzY2hlbWEuYmxvY2tzXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxyXG4gICAgICBvcHRpb25zLnN0cnVjdCxcclxuICAgICAgb3B0aW9ucy5ibG9jayxcclxuICAgICAgYmxvY2tzLFxyXG4gICAgICBmaWVsZHMsXHJcbiAgICAgIHZhbHVlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHN0YXRlOiBGb3JtU3RhdGUgPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBmb3JtLFxyXG4gICAgICBzdHJ1Y3RzLFxyXG4gICAgICBmaWVsZHMsXHJcbiAgICAgIGJsb2NrcyxcclxuICAgICAgc3VibWlzc2lvbkVycm9yczogaW5pdGlhbEVycm9ycyxcclxuICAgICAgb25TdWJtaXNzaW9uRXJyb3JzQ2hhbmdlOiBuZXcgU3ViamVjdDxGb3JtU3VibWlzc2lvbkVycm9ycz4oKSxcclxuICAgICAgbmF2aWdhdGlvblN0YWNrOiBbXSxcclxuICAgICAgb25OYXZpZ2F0aW9uQ2hhbmdlOiBuZXcgU3ViamVjdDxudW1iZXI+KCksXHJcbiAgICAgIG9uVmFsdWVDaGFuZ2U6IG5ldyBTdWJqZWN0PEZvcm1DaGFuZ2U+KClcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRm9ybShmb3JtSWQ6IG51bWJlciwgc3RydWN0OiBzdHJpbmcsIGJsb2NrOiBzdHJpbmcpOiBGb3JtR3JvdXAge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtmb3JtSWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZpZWxkcywgYmxvY2tzIH0gPSB0aGlzLl9jYWNoZVtmb3JtSWRdO1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoc3RydWN0LCBibG9jaywgYmxvY2tzLCBmaWVsZHMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBudW1iZXIsIHZhbHVlOiBvYmplY3QpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuX2NhY2hlW2lkXTtcclxuXHJcbiAgICBmb3JtLnBhdGNoVmFsdWUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgdGhpcy5fY2FjaGVbaWRdO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJFcnJvcnMoaWQ6IG51bWJlciwgZm9ybVBhdGg/OiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9ybVBhdGgpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzW2Zvcm1QYXRoXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wdXNoU3VibWlzc2lvbkVycm9yc0NoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBzZXRFcnJvcnMoaWQ6IG51bWJlciwgZXJyb3JzOiBGb3JtU3VibWlzc2lvbkVycm9ycykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgdGhpcy5wdXNoU3VibWlzc2lvbkVycm9yc0NoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZShpZDogbnVtYmVyLCBmb3JtUGF0aDogc3RyaW5nLCBuZXdWYWx1ZTogYW55LCBldmVudDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICB0aGlzLmNsZWFyRXJyb3JzKGlkLCBmb3JtUGF0aCk7XHJcblxyXG4gICAgaWYgKGV2ZW50ICYmIHN0YXRlLm9wdGlvbnMuY2hhbmdlTm90aWZpY2F0aW9uVHlwZSAhPT0gZXZlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICg8U3ViamVjdDxGb3JtQ2hhbmdlPj5zdGF0ZS5vblZhbHVlQ2hhbmdlKS5uZXh0KHtcclxuICAgICAgZmllbGRQYXRoOiBmb3JtUGF0aCxcclxuICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICBmb3JtVmFsdWU6IHN0YXRlLmZvcm0udmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVzaE5hdmlnYXRpb24oaWQ6IG51bWJlciwgc3RydWN0OiBzdHJpbmcsIGJsb2NrOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcGFyZW50UGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdLm5hdmlnYXRpb25TdGFjay5wdXNoKHtcclxuICAgICAgc3RydWN0LFxyXG4gICAgICBibG9jayxcclxuICAgICAgcGF0aCxcclxuICAgICAgcGFyZW50UGF0aFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wdXNoTmF2aWdhdGlvbkNoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBwb3BOYXZpZ2F0aW9uKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jYWNoZVtpZF0ubmF2aWdhdGlvblN0YWNrLnBvcCgpO1xyXG5cclxuICAgIHRoaXMucHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgY29tcGxldGVOYXZpZ2F0aW9uKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvcE5hdmlnYXRpb24oaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoTmF2aWdhdGlvbkNoYW5nZShpZDogbnVtYmVyLCBjaGlsZElkPzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NhY2hlW2lkXTtcclxuICAgICg8U3ViamVjdDxudW1iZXI+PnN0YXRlLm9uTmF2aWdhdGlvbkNoYW5nZSkubmV4dChjaGlsZElkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQ6IG51bWJlcikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICAoPFN1YmplY3Q8Rm9ybVN1Ym1pc3Npb25FcnJvcnM+PnN0YXRlLm9uU3VibWlzc2lvbkVycm9yc0NoYW5nZSkubmV4dChcclxuICAgICAgc3RhdGUuc3VibWlzc2lvbkVycm9yc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXJyYXlUb01hcDxUPihnZXRLZXk6IEdldEtleUZ1bmN0aW9uPFQ+LCBhcnJheTogVFtdKSB7XHJcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlPE1hcDxzdHJpbmcsIFQ+PigoYWNjLCBjdXJyZW50KSA9PiB7XHJcbiAgICAgIGFjY1tnZXRLZXkoY3VycmVudCldID0gY3VycmVudDtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIG5ldyBNYXA8c3RyaW5nLCBUPigpKTtcclxuICB9XHJcbn1cclxuIl19