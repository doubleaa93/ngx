/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilderService } from './form-builder.service';
// @dynamic
export class FormStateService {
    /**
     * @param {?} formBuilder
     */
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this._cache = {};
    }
    /**
     * @return {?}
     */
    static generateId() {
        return Math.random();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    static assignDefaults(options) {
        if (!options.headerSize) {
            options.headerSize = 3;
        }
    }
    /**
     * @param {?} label
     * @return {?}
     */
    static parseLabel(label) {
        if (typeof label === 'string') {
            return label;
        }
        return label.short;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    static parseSchema(options) {
        /** @type {?} */
        const structs = [];
        /** @type {?} */
        const fields = [];
        /** @type {?} */
        const blocks = [];
        for (const structSchema of options.schema) {
            /** @type {?} */
            const struct = Object.assign({}, structSchema, { label: this.parseLabel(structSchema.label), collectionLabel: this.parseLabel(structSchema.label), fields: [], blocks: [] });
            for (const fieldSchema of structSchema.fields) {
                /** @type {?} */
                const label = this.parseLabel(fieldSchema.label);
                /** @type {?} */
                const field = Object.assign({}, fieldSchema, { label, placeholder: fieldSchema.placeholder || label, struct: structSchema.name });
                if (field.reference && !field.reference.block) {
                    field.reference.block = 'default';
                }
                fields.push(field);
                struct.fields.push(field.name);
            }
            for (const blockSchema of structSchema.blocks) {
                /** @type {?} */
                const block = Object.assign({}, blockSchema, { fields: [], struct: structSchema.name });
                for (const reference of blockSchema.fields) {
                    if (!reference) {
                        continue;
                    }
                    /** @type {?} */
                    const fieldReference = reference.field
                        ? reference
                        : { field: reference };
                    /** @type {?} */
                    let condition;
                    if (fieldReference.condition) {
                        /** @type {?} */
                        const returnValue = fieldReference.condition[0] === '{'
                            ? fieldReference.condition
                            : `return ${fieldReference.condition}`;
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
                blocks.push(block);
                struct.blocks.push(block.name);
            }
            structs.push(struct);
        }
        return {
            structs,
            fields,
            blocks
        };
    }
    /**
     * @param {?} id
     * @return {?}
     */
    get(id) {
        return this._cache[id];
    }
    /**
     * @param {?} options
     * @param {?} value
     * @param {?=} initialErrors
     * @return {?}
     */
    create(options, value, initialErrors) {
        /** @type {?} */
        let id;
        while (true) {
            id = FormStateService.generateId();
            if (this._cache[id]) {
                continue;
            }
            break;
        }
        FormStateService.assignDefaults(options);
        /** @type {?} */
        const schema = FormStateService.parseSchema(options);
        /** @type {?} */
        const structs = this.arrayToMap(struct => struct.name, schema.structs);
        /** @type {?} */
        const fields = this.arrayToMap(field => `${field.struct}-${field.name}`, schema.fields);
        /** @type {?} */
        const blocks = this.arrayToMap(block => `${block.struct}-${block.name}`, schema.blocks);
        /** @type {?} */
        const form = this.formBuilder.group(options.struct, options.block, blocks, fields, value);
        /** @type {?} */
        const state = {
            id,
            options,
            form,
            structs,
            fields,
            blocks,
            submissionErrors: initialErrors,
            onSubmissionErrorsChange: new Subject(),
            navigationStack: [],
            onNavigationChange: new Subject(),
            onValueChange: new Subject()
        };
        this._cache[id] = state;
        return state;
    }
    /**
     * @param {?} formId
     * @param {?} struct
     * @param {?} block
     * @return {?}
     */
    createForm(formId, struct, block) {
        if (!this._cache[formId]) {
            return;
        }
        const { fields, blocks } = this._cache[formId];
        return this.formBuilder.group(struct, block, blocks, fields);
    }
    /**
     * @param {?} id
     * @param {?} value
     * @return {?}
     */
    update(id, value) {
        if (!this._cache[id]) {
            return;
        }
        const { form } = this._cache[id];
        form.patchValue(value);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    remove(id) {
        if (!this._cache[id]) {
            return;
        }
        delete this._cache[id];
    }
    /**
     * @param {?} id
     * @param {?=} formPath
     * @return {?}
     */
    clearErrors(id, formPath) {
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
    }
    /**
     * @param {?} id
     * @param {?} errors
     * @return {?}
     */
    setErrors(id, errors) {
        if (!this._cache[id]) {
            return;
        }
        this._cache[id].submissionErrors = errors;
        this.pushSubmissionErrorsChange(id);
    }
    /**
     * @param {?} id
     * @param {?} formPath
     * @param {?} newValue
     * @param {?} event
     * @return {?}
     */
    onChange(id, formPath, newValue, event) {
        if (!this._cache[id]) {
            return;
        }
        /** @type {?} */
        const state = this._cache[id];
        this.clearErrors(id, formPath);
        if (event && state.options.changeNotificationType !== event) {
            return;
        }
        (/** @type {?} */ (state.onValueChange)).next({
            fieldPath: formPath,
            value: newValue,
            formValue: state.form.value
        });
    }
    /**
     * @param {?} id
     * @param {?} struct
     * @param {?} block
     * @param {?} path
     * @param {?} parentPath
     * @return {?}
     */
    pushNavigation(id, struct, block, path, parentPath) {
        if (!this._cache[id]) {
            return;
        }
        this._cache[id].navigationStack.push({
            struct,
            block,
            path,
            parentPath
        });
        this.pushNavigationChange(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    popNavigation(id) {
        if (!this._cache[id]) {
            return;
        }
        this._cache[id].navigationStack.pop();
        this.pushNavigationChange(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    completeNavigation(id) {
        if (!this._cache[id]) {
            return;
        }
        this.popNavigation(id);
    }
    /**
     * @param {?} id
     * @param {?=} childId
     * @return {?}
     */
    pushNavigationChange(id, childId) {
        /** @type {?} */
        const state = this._cache[id];
        (/** @type {?} */ (state.onNavigationChange)).next(childId);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    pushSubmissionErrorsChange(id) {
        /** @type {?} */
        const state = this._cache[id];
        (/** @type {?} */ (state.onSubmissionErrorsChange)).next(state.submissionErrors);
    }
    /**
     * @template T
     * @param {?} getKey
     * @param {?} array
     * @return {?}
     */
    arrayToMap(getKey, array) {
        return array.reduce((acc, current) => {
            acc[getKey(current)] = current;
            return acc;
        }, new Map());
    }
}
FormStateService.defaultConditionFunc = new Function('return true');
FormStateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormStateService.ctorParameters = () => [
    { type: FormBuilderService }
];
function FormStateService_tsickle_Closure_declarations() {
    /** @type {?} */
    FormStateService.defaultConditionFunc;
    /** @type {?} */
    FormStateService.prototype._cache;
    /** @type {?} */
    FormStateService.prototype.formBuilder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGRlLXJlLWNydWQvbmd4LyIsInNvdXJjZXMiOlsic3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSS9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTTVEO0FBRUEsTUFBTTs7OztJQUtKLFlBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtzQkFGTCxFQUFFO0tBRU87Ozs7SUFFdkQsTUFBTSxDQUFDLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQXdCO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7O0lBR0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFpQztRQUNqRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO0tBQ3BCOzs7OztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBd0I7O1FBQ3pDLE1BQU0sT0FBTyxHQUFjLEVBQUUsQ0FBQzs7UUFDOUIsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDOztRQUM1QixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFFNUIsS0FBSyxNQUFNLFlBQVksSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFOztZQUN6QyxNQUFNLE1BQU0scUJBQ1AsWUFBWSxJQUNmLEtB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QUUsS0FBVTtRQUN6RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQWlCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1lBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDL0IsT0FBTyxHQUFHLENBQUM7U0FDWixFQUFFLElBQUksR0FBRyxFQUFhLENBQUMsQ0FBQzs7O3dDQXpSVyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUM7O1lBSmxFLFVBQVU7Ozs7WUFORixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3B0aW9ucyc7XHJcbmltcG9ydCB7IElTdHJ1Y3QsIElGaWVsZCwgSUJsb2NrIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdWJtaXNzaW9uRXJyb3JzIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3VibWlzc2lvbic7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyU2VydmljZSB9IGZyb20gJy4vZm9ybS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtQ2hhbmdlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tY2hhbmdlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5cclxuZXhwb3J0IHR5cGUgR2V0S2V5RnVuY3Rpb248VD4gPSAoaXRlbTogVCkgPT4gc3RyaW5nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgRm9ybVN0YXRlU2VydmljZSB7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWNvbnN0cnVjdG9yLXdpdGgtc3RyaW5nLWFyZ3NcclxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0Q29uZGl0aW9uRnVuYyA9IG5ldyBGdW5jdGlvbigncmV0dXJuIHRydWUnKTtcclxuICBwcml2YXRlIF9jYWNoZTogeyBbaWQ6IG51bWJlcl06IEZvcm1TdGF0ZSB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyU2VydmljZSkge31cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlSWQoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3NpZ25EZWZhdWx0cyhvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucy5oZWFkZXJTaXplKSB7XHJcbiAgICAgIG9wdGlvbnMuaGVhZGVyU2l6ZSA9IDM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBUaGlzIHNob3VsZCBleHBhbmQgc3RyaW5ncyBpbnRvIGEgbGFiZWwgb2JqZWN0OyB0aGUgcmVuZGVyZXJzIHNob3VsZCBoYW5kbGUgd2hpY2ggbGFiZWwgdG8gc2hvdyBiYXNlZCBvbiBzY3JlZW4gc2l6ZVxyXG4gIHN0YXRpYyBwYXJzZUxhYmVsKGxhYmVsOiBzdHJpbmcgfCB7IHNob3J0OiBzdHJpbmcgfSkge1xyXG4gICAgaWYgKHR5cGVvZiBsYWJlbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbC5zaG9ydDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZVNjaGVtYShvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHN0cnVjdHM6IElTdHJ1Y3RbXSA9IFtdO1xyXG4gICAgY29uc3QgZmllbGRzOiBJRmllbGRbXSA9IFtdO1xyXG4gICAgY29uc3QgYmxvY2tzOiBJQmxvY2tbXSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qgc3RydWN0U2NoZW1hIG9mIG9wdGlvbnMuc2NoZW1hKSB7XHJcbiAgICAgIGNvbnN0IHN0cnVjdCA9IHtcclxuICAgICAgICAuLi5zdHJ1Y3RTY2hlbWEsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGFyc2VMYWJlbChzdHJ1Y3RTY2hlbWEubGFiZWwpLFxyXG4gICAgICAgIGNvbGxlY3Rpb25MYWJlbDogdGhpcy5wYXJzZUxhYmVsKHN0cnVjdFNjaGVtYS5sYWJlbCksXHJcbiAgICAgICAgZmllbGRzOiBbXSxcclxuICAgICAgICBibG9ja3M6IFtdXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGZpZWxkU2NoZW1hIG9mIHN0cnVjdFNjaGVtYS5maWVsZHMpIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucGFyc2VMYWJlbChmaWVsZFNjaGVtYS5sYWJlbCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpZWxkID0ge1xyXG4gICAgICAgICAgLi4uZmllbGRTY2hlbWEsXHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZFNjaGVtYS5wbGFjZWhvbGRlciB8fCBsYWJlbCxcclxuICAgICAgICAgIHN0cnVjdDogc3RydWN0U2NoZW1hLm5hbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZmllbGQucmVmZXJlbmNlICYmICFmaWVsZC5yZWZlcmVuY2UuYmxvY2spIHtcclxuICAgICAgICAgIGZpZWxkLnJlZmVyZW5jZS5ibG9jayA9ICdkZWZhdWx0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICBzdHJ1Y3QuZmllbGRzLnB1c2goZmllbGQubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgYmxvY2tTY2hlbWEgb2Ygc3RydWN0U2NoZW1hLmJsb2Nrcykge1xyXG4gICAgICAgIGNvbnN0IGJsb2NrID0ge1xyXG4gICAgICAgICAgLi4uYmxvY2tTY2hlbWEsXHJcbiAgICAgICAgICBmaWVsZHM6IFtdLFxyXG4gICAgICAgICAgc3RydWN0OiBzdHJ1Y3RTY2hlbWEubmFtZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcmVmZXJlbmNlIG9mIGJsb2NrU2NoZW1hLmZpZWxkcykge1xyXG4gICAgICAgICAgaWYgKCFyZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZmllbGRSZWZlcmVuY2UgPSByZWZlcmVuY2UuZmllbGRcclxuICAgICAgICAgICAgPyByZWZlcmVuY2VcclxuICAgICAgICAgICAgOiB7IGZpZWxkOiByZWZlcmVuY2UgfTtcclxuXHJcbiAgICAgICAgICBsZXQgY29uZGl0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChmaWVsZFJlZmVyZW5jZS5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPVxyXG4gICAgICAgICAgICAgIGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvblswXSA9PT0gJ3snXHJcbiAgICAgICAgICAgICAgICA/IGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvblxyXG4gICAgICAgICAgICAgICAgOiBgcmV0dXJuICR7ZmllbGRSZWZlcmVuY2UuY29uZGl0aW9ufWA7XHJcblxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tY29uc3RydWN0b3Itd2l0aC1zdHJpbmctYXJnc1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBuZXcgRnVuY3Rpb24oJ3ZhbHVlJywgJ3Jvb3RWYWx1ZScsIHJldHVyblZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1jb25zdHJ1Y3Rvci13aXRoLXN0cmluZy1hcmdzXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IEZvcm1TdGF0ZVNlcnZpY2UuZGVmYXVsdENvbmRpdGlvbkZ1bmM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgYmxvY2suZmllbGRzLnB1c2goZmllbGRSZWZlcmVuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xyXG4gICAgICAgIHN0cnVjdC5ibG9ja3MucHVzaChibG9jay5uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RydWN0cy5wdXNoKHN0cnVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RydWN0cyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICBibG9ja3NcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQoaWQ6IG51bWJlcik6IEZvcm1TdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbaWRdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKG9wdGlvbnM6IERlUmVDcnVkT3B0aW9ucywgdmFsdWU6IG9iamVjdCwgaW5pdGlhbEVycm9ycz86IEZvcm1TdWJtaXNzaW9uRXJyb3JzKTogRm9ybVN0YXRlIHtcclxuICAgIGxldCBpZDogbnVtYmVyO1xyXG5cclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGlkID0gRm9ybVN0YXRlU2VydmljZS5nZW5lcmF0ZUlkKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIEZvcm1TdGF0ZVNlcnZpY2UuYXNzaWduRGVmYXVsdHMob3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3Qgc2NoZW1hID0gRm9ybVN0YXRlU2VydmljZS5wYXJzZVNjaGVtYShvcHRpb25zKTtcclxuICAgIGNvbnN0IHN0cnVjdHMgPSB0aGlzLmFycmF5VG9NYXAoc3RydWN0ID0+IHN0cnVjdC5uYW1lLCBzY2hlbWEuc3RydWN0cyk7XHJcbiAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmFycmF5VG9NYXAoXHJcbiAgICAgIGZpZWxkID0+IGAke2ZpZWxkLnN0cnVjdH0tJHtmaWVsZC5uYW1lfWAsXHJcbiAgICAgIHNjaGVtYS5maWVsZHNcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYmxvY2tzID0gdGhpcy5hcnJheVRvTWFwKFxyXG4gICAgICBibG9jayA9PiBgJHtibG9jay5zdHJ1Y3R9LSR7YmxvY2submFtZX1gLFxyXG4gICAgICBzY2hlbWEuYmxvY2tzXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxyXG4gICAgICBvcHRpb25zLnN0cnVjdCxcclxuICAgICAgb3B0aW9ucy5ibG9jayxcclxuICAgICAgYmxvY2tzLFxyXG4gICAgICBmaWVsZHMsXHJcbiAgICAgIHZhbHVlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHN0YXRlOiBGb3JtU3RhdGUgPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBmb3JtLFxyXG4gICAgICBzdHJ1Y3RzLFxyXG4gICAgICBmaWVsZHMsXHJcbiAgICAgIGJsb2NrcyxcclxuICAgICAgc3VibWlzc2lvbkVycm9yczogaW5pdGlhbEVycm9ycyxcclxuICAgICAgb25TdWJtaXNzaW9uRXJyb3JzQ2hhbmdlOiBuZXcgU3ViamVjdDxGb3JtU3VibWlzc2lvbkVycm9ycz4oKSxcclxuICAgICAgbmF2aWdhdGlvblN0YWNrOiBbXSxcclxuICAgICAgb25OYXZpZ2F0aW9uQ2hhbmdlOiBuZXcgU3ViamVjdDxudW1iZXI+KCksXHJcbiAgICAgIG9uVmFsdWVDaGFuZ2U6IG5ldyBTdWJqZWN0PEZvcm1DaGFuZ2U+KClcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRm9ybShmb3JtSWQ6IG51bWJlciwgc3RydWN0OiBzdHJpbmcsIGJsb2NrOiBzdHJpbmcpOiBGb3JtR3JvdXAge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtmb3JtSWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZpZWxkcywgYmxvY2tzIH0gPSB0aGlzLl9jYWNoZVtmb3JtSWRdO1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoc3RydWN0LCBibG9jaywgYmxvY2tzLCBmaWVsZHMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBudW1iZXIsIHZhbHVlOiBvYmplY3QpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuX2NhY2hlW2lkXTtcclxuXHJcbiAgICBmb3JtLnBhdGNoVmFsdWUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgdGhpcy5fY2FjaGVbaWRdO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJFcnJvcnMoaWQ6IG51bWJlciwgZm9ybVBhdGg/OiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9ybVBhdGgpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzW2Zvcm1QYXRoXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wdXNoU3VibWlzc2lvbkVycm9yc0NoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBzZXRFcnJvcnMoaWQ6IG51bWJlciwgZXJyb3JzOiBGb3JtU3VibWlzc2lvbkVycm9ycykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgdGhpcy5wdXNoU3VibWlzc2lvbkVycm9yc0NoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZShpZDogbnVtYmVyLCBmb3JtUGF0aDogc3RyaW5nLCBuZXdWYWx1ZTogYW55LCBldmVudDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICB0aGlzLmNsZWFyRXJyb3JzKGlkLCBmb3JtUGF0aCk7XHJcblxyXG4gICAgaWYgKGV2ZW50ICYmIHN0YXRlLm9wdGlvbnMuY2hhbmdlTm90aWZpY2F0aW9uVHlwZSAhPT0gZXZlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICg8U3ViamVjdDxGb3JtQ2hhbmdlPj5zdGF0ZS5vblZhbHVlQ2hhbmdlKS5uZXh0KHtcclxuICAgICAgZmllbGRQYXRoOiBmb3JtUGF0aCxcclxuICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICBmb3JtVmFsdWU6IHN0YXRlLmZvcm0udmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVzaE5hdmlnYXRpb24oaWQ6IG51bWJlciwgc3RydWN0OiBzdHJpbmcsIGJsb2NrOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcGFyZW50UGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdLm5hdmlnYXRpb25TdGFjay5wdXNoKHtcclxuICAgICAgc3RydWN0LFxyXG4gICAgICBibG9jayxcclxuICAgICAgcGF0aCxcclxuICAgICAgcGFyZW50UGF0aFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wdXNoTmF2aWdhdGlvbkNoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBwb3BOYXZpZ2F0aW9uKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jYWNoZVtpZF0ubmF2aWdhdGlvblN0YWNrLnBvcCgpO1xyXG5cclxuICAgIHRoaXMucHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgY29tcGxldGVOYXZpZ2F0aW9uKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvcE5hdmlnYXRpb24oaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoTmF2aWdhdGlvbkNoYW5nZShpZDogbnVtYmVyLCBjaGlsZElkPzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NhY2hlW2lkXTtcclxuICAgICg8U3ViamVjdDxudW1iZXI+PnN0YXRlLm9uTmF2aWdhdGlvbkNoYW5nZSkubmV4dChjaGlsZElkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQ6IG51bWJlcikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICAoPFN1YmplY3Q8Rm9ybVN1Ym1pc3Npb25FcnJvcnM+PnN0YXRlLm9uU3VibWlzc2lvbkVycm9yc0NoYW5nZSkubmV4dChcclxuICAgICAgc3RhdGUuc3VibWlzc2lvbkVycm9yc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXJyYXlUb01hcDxUPihnZXRLZXk6IEdldEtleUZ1bmN0aW9uPFQ+LCBhcnJheTogVFtdKSB7XHJcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlPE1hcDxzdHJpbmcsIFQ+PigoYWNjLCBjdXJyZW50KSA9PiB7XHJcbiAgICAgIGFjY1tnZXRLZXkoY3VycmVudCldID0gY3VycmVudDtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIG5ldyBNYXA8c3RyaW5nLCBUPigpKTtcclxuICB9XHJcbn1cclxuIl19