import { Directive, ViewContainerRef, Injectable, Component, Input, ComponentFactoryResolver, ViewChild, Output, EventEmitter, NgModule } from '@angular/core';
import { __spread, __assign, __values } from 'tslib';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ComponentHostDirective = /** @class */ (function () {
    function ComponentHostDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ComponentHostDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[deReCrudComponentHost]'
                },] },
    ];
    /** @nocollapse */
    ComponentHostDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return ComponentHostDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DeReCrudProviderService = /** @class */ (function () {
    function DeReCrudProviderService() {
        this._cache = {};
    }
    /**
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    DeReCrudProviderService.prototype.register = /**
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    function (name, options) {
        this._cache[name] = options;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    DeReCrudProviderService.prototype.get = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var options = this._cache[name];
        if (!options) {
            throw new Error("Provider '" + name + "' is not registered. Make sure register(name, options) is called in the applicatio root.");
        }
        return options;
    };
    DeReCrudProviderService.decorators = [
        { type: Injectable },
    ];
    return DeReCrudProviderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @type {?} */
var whitespaceValidator = function (control) {
    /** @type {?} */
    var isWhiteSpace = (control.value || '').trim().length === 0;
    return !isWhiteSpace ? null : { required: true };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormBuilderService = /** @class */ (function () {
    function FormBuilderService(fb) {
        this.fb = fb;
    }
    /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    FormBuilderService.prototype.group = /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    function (struct, blockName, blocks, fields, value) {
        if (value === void 0) { value = {}; }
        var e_1, _a;
        /** @type {?} */
        var group = {};
        /** @type {?} */
        var block = blocks[struct + "-" + blockName];
        try {
            for (var _b = __values(block.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fieldReference = _c.value;
                /** @type {?} */
                var field = fields[struct + "-" + fieldReference.field];
                if (field.type === 'stamp') {
                    continue;
                }
                if (field.type === 'linkedStruct') {
                    /** @type {?} */
                    var linkedStructField = /** @type {?} */ (field);
                    var reference = linkedStructField.reference;
                    /** @type {?} */
                    var array = this.array(reference.struct, reference.block, blocks, fields, value[field.name]);
                    if (!array.value.length && linkedStructField.minInstances > 0) {
                        // tslint:disable-next-line:no-increment-decrement
                        for (var i = 0; i < linkedStructField.minInstances; i++) {
                            array.push(this.group(reference.struct, reference.block, blocks, fields));
                        }
                    }
                    group[field.name] = array;
                    continue;
                }
                /** @type {?} */
                var validators = this.getValidators(fieldReference, field);
                /** @type {?} */
                var initialValue = value[field.name] || field.initialValue;
                group[field.name] = [initialValue, validators];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /** @type {?} */
        var formGroup = this.fb.group(group);
        if (!formGroup.value) {
            formGroup.patchValue({});
        }
        return formGroup;
    };
    /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    FormBuilderService.prototype.array = /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    function (struct, blockName, blocks, fields, value) {
        var _this = this;
        if (value === void 0) { value = []; }
        /** @type {?} */
        var array = [];
        if (value && value.length) {
            value.forEach(function (item) {
                /** @type {?} */
                var group = _this.group(struct, blockName, blocks, fields, item);
                array.push(group);
            });
        }
        /** @type {?} */
        var formArray = this.fb.array(array);
        if (!formArray.value) {
            formArray.setValue([]);
        }
        return formArray;
    };
    /**
     * @param {?} fieldReference
     * @param {?} field
     * @return {?}
     */
    FormBuilderService.prototype.getValidators = /**
     * @param {?} fieldReference
     * @param {?} field
     * @return {?}
     */
    function (fieldReference, field) {
        return function (control) {
            /** @type {?} */
            var validators = [];
            /** @type {?} */
            var root = control.root;
            /** @type {?} */
            var parent = control.parent;
            if (parent instanceof FormGroup &&
                !fieldReference.condition(parent.value, root.value)) {
                return null;
            }
            if (field.required) {
                validators.push(Validators.required, whitespaceValidator);
            }
            if ((/** @type {?} */ (field)).minLength) {
                validators.push(Validators.minLength((/** @type {?} */ (field)).minLength));
            }
            if ((/** @type {?} */ (field)).maxLength) {
                validators.push(Validators.maxLength((/** @type {?} */ (field)).maxLength));
            }
            if ((/** @type {?} */ (field)).min) {
                validators.push(Validators.min((/** @type {?} */ (field)).min));
            }
            if ((/** @type {?} */ (field)).max) {
                validators.push(Validators.max((/** @type {?} */ (field)).max));
            }
            if (!validators.length) {
                return null;
            }
            return Validators.compose(validators)(control);
        };
    };
    FormBuilderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormBuilderService.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    return FormBuilderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            for (var _e = __values(options.schema), _f = _e.next(); !_f.done; _f = _e.next()) {
                var structSchema = _f.value;
                /** @type {?} */
                var struct = __assign({}, structSchema, { label: this.parseLabel(structSchema.label), collectionLabel: this.parseLabel(structSchema.label), fields: [], blocks: [] });
                try {
                    for (var _g = __values(structSchema.fields), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var fieldSchema = _h.value;
                        /** @type {?} */
                        var label = this.parseLabel(fieldSchema.label);
                        /** @type {?} */
                        var field = __assign({}, fieldSchema, { label: label, placeholder: fieldSchema.placeholder || label, struct: structSchema.name });
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
                    for (var _j = __values(structSchema.blocks), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var blockSchema = _k.value;
                        /** @type {?} */
                        var block = __assign({}, blockSchema, { fields: [], struct: structSchema.name });
                        try {
                            for (var _l = __values(blockSchema.fields), _m = _l.next(); !_m.done; _m = _l.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CollectionFieldHostComponent = /** @class */ (function () {
    function CollectionFieldHostComponent(stateService, componentFactoryResolver, providerService) {
        var _this = this;
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.onAdd = function (e) {
            e.stopPropagation();
            e.preventDefault();
            /** @type {?} */
            var reference = (/** @type {?} */ (_this.control.field)).reference;
            /** @type {?} */
            var form = _this.stateService.createForm(_this.control.formId, reference.struct, reference.block);
            _this.control.value.push(form);
            /** @type {?} */
            var index = _this.control.value.controls.indexOf(form);
            /** @type {?} */
            var childPath = _this.control.formPath + "." + index;
            if (_this.control.layout === 'table') {
                _this.stateService.pushNavigation(_this.control.formId, reference.struct, reference.block, childPath, _this.control.formPath);
            }
            _this.control.onChange(null);
        };
    }
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.state = this.stateService.get(this.control.formId);
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["control"] && !changes["control"].firstChange) {
            this.updateInputs();
        }
    };
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        var controlComponent;
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.control.layout) {
            case 'inline':
                controlComponent = providerOptions.inlineComponent;
                break;
            case 'table':
                controlComponent = providerOptions.tableComponent;
                break;
            default:
                console.error(this.control.layout + " layout is not supported.", JSON.stringify(this.control.field));
                return;
        }
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    CollectionFieldHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        if (!this._componentRef) {
            return;
        }
        /** @type {?} */
        var componentRenderer = /** @type {?} */ (this._componentRef.instance);
        /** @type {?} */
        var control = __assign({}, this.control, { onAdd: this.onAdd });
        /** @type {?} */
        var previousControl = componentRenderer.control;
        componentRenderer.control = control;
        /** @type {?} */
        var onComponentChange = (/** @type {?} */ (this._componentRef.instance)).ngOnChanges;
        if (onComponentChange) {
            /** @type {?} */
            var change_1 = {
                previousValue: previousControl,
                currentValue: control,
                firstChange: typeof previousControl === 'undefined',
                isFirstChange: function () { return change_1.firstChange; }
            };
            onComponentChange.call(componentRenderer, { control: change_1 });
        }
    };
    CollectionFieldHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-collection-field-host',
                    template: "<ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    CollectionFieldHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
    CollectionFieldHostComponent.propDecorators = {
        componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
        control: [{ type: Input }]
    };
    return CollectionFieldHostComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputFieldHostComponent = /** @class */ (function () {
    function InputFieldHostComponent(stateService, componentFactoryResolver, providerService) {
        var _this = this;
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this._componentRefs = [];
        this.onFocus = function () {
            _this._valueOnFocus = _this.form.root.get(_this.formPath).value;
        };
        this.onBlur = function () {
            /** @type {?} */
            var newValue = _this.form.root.get(_this.formPath).value;
            if (_this._valueOnFocus !== newValue) {
                _this.stateService.onChange(_this.formId, _this.formPath, newValue, 'blur');
            }
        };
        this.onChange = function (e) {
            /** @type {?} */
            var newValue = _this.form.root.get(_this.formPath).value;
            _this.stateService.onChange(_this.formId, _this.formPath, newValue, e ? 'change' : null);
        };
    }
    Object.defineProperty(InputFieldHostComponent.prototype, "formPath", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formPath = this.field.name;
            if (this.parentPath) {
                /** @type {?} */
                var parentPath = this.parentPath;
                if (this.parentForm instanceof FormArray) {
                    /** @type {?} */
                    var index = this.parentForm.controls.indexOf(this.form);
                    parentPath += '.' + index;
                }
                formPath = parentPath + "." + formPath;
            }
            return formPath;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        var fieldReference = this.state.blocks[this.struct + "-" + this.block].fields.find(function (x) { return x.field === _this.field.name; });
        this.fieldReference = fieldReference;
        this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(function () {
            _this.updateInputs();
        });
        this._formChangeSubscription = this.form.valueChanges.subscribe(function () {
            if (!_this.shouldRender()) {
                _this.destroyRefs();
            }
            else if (!_this._componentRefs.length) {
                _this.render();
            }
            else {
                _this.updateInputs();
            }
        });
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    InputFieldHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._submissionErrorsChangeSubscription) {
            this._submissionErrorsChangeSubscription.unsubscribe();
        }
        if (this._formChangeSubscription) {
            this._formChangeSubscription.unsubscribe();
        }
        this.destroyRefs();
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.destroyRefs = /**
     * @return {?}
     */
    function () {
        if (this._componentRefs.length) {
            this._componentRefs.forEach(function (x) { return x.destroy(); });
            this._componentRefs = [];
        }
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.shouldRender = /**
     * @return {?}
     */
    function () {
        return this.fieldReference && this.fieldReference.condition(this.form.value, this.state.form.root.value);
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        this.destroyRefs();
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        var controlComponent;
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.field.type) {
            case 'text':
            case 'integer':
            case 'date':
                controlComponent = providerOptions.inputComponent;
                break;
            case 'boolean':
                controlComponent = providerOptions.checkboxComponent;
                break;
            case 'list':
            case 'foreignKey':
                controlComponent = providerOptions.selectComponent;
                break;
            case 'linkedStruct':
                controlComponent = CollectionFieldHostComponent;
                break;
            default:
                console.error(this.field.type + " control is not supported.", JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.containerComponent);
        /** @type {?} */
        var controlComponentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        /** @type {?} */
        var controlComponentRef = viewContainerRef.createComponent(controlComponentFactory);
        /** @type {?} */
        var containerComponentRef = viewContainerRef.createComponent(containerComponentFactory, 0, undefined, [[controlComponentRef.location.nativeElement]]);
        this._componentRefs.push(controlComponentRef, containerComponentRef);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    InputFieldHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b, e_3, _c;
        if (this.shouldRender() && !this._componentRefs.length) {
            this.render();
            return;
        }
        if (!this._componentRefs.length) {
            return;
        }
        /** @type {?} */
        var formPath = this.formPath;
        /** @type {?} */
        var value = this.form.root.get(formPath);
        /** @type {?} */
        var control = {
            value: value,
            formPath: formPath,
            field: this.field,
            formId: this.formId,
            submissionErrors: (this.state.submissionErrors &&
                this.state.submissionErrors[formPath]) ||
                [],
            form: this.form,
            rendererType: this.mapType(this.field.type),
            htmlId: this.formId + "-" + formPath,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange
        };
        switch (this.field.type) {
            case 'list':
            case 'foreignKey': {
                /** @type {?} */
                var listField_1 = /** @type {?} */ (this.field);
                /** @type {?} */
                var selectControl = /** @type {?} */ (control);
                if (this.field.type === 'foreignKey') {
                    selectControl.options = function () { return []; };
                }
                else {
                    selectControl.options = function () { return listField_1.options; };
                }
                break;
            }
            case 'linkedStruct': {
                /** @type {?} */
                var collectionControl = /** @type {?} */ (control);
                /** @type {?} */
                var linkedStructField_1 = /** @type {?} */ (this.field);
                var reference = linkedStructField_1.reference;
                /** @type {?} */
                var blockFields = this.state.blocks[this.struct + "-" + this.block].fields;
                var hints = /** @type {?} */ (blockFields.find(function (x) { return x.field === linkedStructField_1.name; })).hints;
                /** @type {?} */
                var referenceBlock = (hints && hints.block) || reference.block;
                /** @type {?} */
                var fieldReferences = /** @type {?} */ (this.state
                    .blocks[reference.struct + "-" + referenceBlock].fields);
                /** @type {?} */
                var nestedFields = [];
                try {
                    for (var fieldReferences_1 = __values(fieldReferences), fieldReferences_1_1 = fieldReferences_1.next(); !fieldReferences_1_1.done; fieldReferences_1_1 = fieldReferences_1.next()) {
                        var fieldReference = fieldReferences_1_1.value;
                        /** @type {?} */
                        var field = this.state.fields[reference.struct + "-" + fieldReference.field];
                        nestedFields.push(field);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (fieldReferences_1_1 && !fieldReferences_1_1.done && (_a = fieldReferences_1.return)) _a.call(fieldReferences_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                /** @type {?} */
                var nestedValues = [];
                try {
                    for (var _d = __values(collectionControl.value.controls), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var nestedValue = _e.value;
                        nestedValues.push(/** @type {?} */ (nestedValue));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                collectionControl.stamp = {
                    text: control.field.label,
                    headerSize: this.state.options.headerSize
                };
                collectionControl.canAdd = !linkedStructField_1.maxInstances || nestedValues.length < linkedStructField_1.maxInstances;
                collectionControl.nestedValues = nestedValues;
                collectionControl.nestedFields = nestedFields;
                collectionControl.layout = (hints && hints.layout) || 'inline';
                break;
            }
        }
        var _loop_1 = function (componentRef) {
            /** @type {?} */
            var componentRenderer = /** @type {?} */ (componentRef.instance);
            /** @type {?} */
            var previousControl = componentRenderer.control;
            componentRenderer.control = control;
            /** @type {?} */
            var onComponentChange = (/** @type {?} */ (componentRef.instance)).ngOnChanges;
            if (onComponentChange) {
                /** @type {?} */
                var change_1 = {
                    previousValue: previousControl,
                    currentValue: control,
                    firstChange: typeof previousControl === 'undefined',
                    isFirstChange: function () { return change_1.firstChange; }
                };
                onComponentChange.call(componentRenderer, { control: change_1 });
            }
        };
        try {
            for (var _f = __values(this._componentRefs), _g = _f.next(); !_g.done; _g = _f.next()) {
                var componentRef = _g.value;
                _loop_1(componentRef);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    InputFieldHostComponent.prototype.mapType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        switch (type) {
            case 'integer':
                return 'number';
            default:
                return type;
        }
    };
    InputFieldHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-input-field-host',
                    template: "\n    <ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    InputFieldHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
    InputFieldHostComponent.propDecorators = {
        componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
        formId: [{ type: Input }],
        form: [{ type: Input }],
        struct: [{ type: Input }],
        block: [{ type: Input }],
        field: [{ type: Input }],
        parentForm: [{ type: Input }],
        parentPath: [{ type: Input }]
    };
    return InputFieldHostComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ButtonHostComponent = /** @class */ (function () {
    function ButtonHostComponent(stateService, componentFactoryResolver, providerService) {
        var _this = this;
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.click = new EventEmitter();
        this.onClick = function (e) {
            _this.click.emit(e);
        };
    }
    /**
     * @return {?}
     */
    ButtonHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.state = this.stateService.get(this.formId);
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ButtonHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    ButtonHostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    /**
     * @return {?}
     */
    ButtonHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.buttonComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    ButtonHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        if (!this._componentRef) {
            return;
        }
        var _a = this.state, _b = _a.options, struct = _b.struct, submitButtonStyle = _b.submitButtonStyle, cancelButtonStyle = _b.cancelButtonStyle, structs = _a.structs;
        /** @type {?} */
        var isSubmit = this.type === 'submit';
        /** @type {?} */
        var style = null;
        switch (this.type) {
            case 'submit':
                style = submitButtonStyle;
                break;
            case 'cancel':
                style = cancelButtonStyle;
                break;
        }
        /** @type {?} */
        var text = (style && style.text) || this.text;
        if (isSubmit &&
            submitButtonStyle &&
            submitButtonStyle.appendSchemaLabel) {
            text = text + " " + structs[struct].label;
        }
        /** @type {?} */
        var extraClasses = [];
        if (this.state.options.extraButtonClasses) {
            extraClasses.push.apply(extraClasses, __spread(this.state.options.extraButtonClasses));
        }
        if (this.extraClasses) {
            if (typeof this.extraClasses === 'string') {
                extraClasses.push.apply(extraClasses, __spread(this.extraClasses.split(' ')));
            }
            else {
                extraClasses.push.apply(extraClasses, __spread(this.extraClasses));
            }
        }
        /** @type {?} */
        var componentRenderer = /** @type {?} */ (this._componentRef.instance);
        componentRenderer.button = {
            text: text,
            extraClasses: extraClasses,
            type: isSubmit ? 'submit' : 'button',
            disabled: this.disabled,
            onClick: this.onClick,
            class: (style && style.class) || undefined
        };
    };
    ButtonHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-button-host',
                    template: "<ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    ButtonHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
    ButtonHostComponent.propDecorators = {
        componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
        formId: [{ type: Input }],
        type: [{ type: Input }],
        extraClasses: [{ type: Input }],
        text: [{ type: Input }],
        disabled: [{ type: Input }],
        click: [{ type: Output }]
    };
    return ButtonHostComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var StampFieldHostComponent = /** @class */ (function () {
    function StampFieldHostComponent(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
    }
    /**
     * @return {?}
     */
    StampFieldHostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        var fieldReference = this.state.blocks[this.struct + "-" + this.block].fields.find(function (x) { return x.field === _this.field.name; });
        this.fieldReference = fieldReference;
        this.render();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    StampFieldHostComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    StampFieldHostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    };
    /**
     * @return {?}
     */
    StampFieldHostComponent.prototype.shouldRender = /**
     * @return {?}
     */
    function () {
        return this.fieldReference.condition(this.form.value, this.state.form.root.value);
    };
    /**
     * @return {?}
     */
    StampFieldHostComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        var controlComponent;
        /** @type {?} */
        var providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.field.type) {
            case 'stamp':
                controlComponent = providerOptions.stampComponent;
                break;
            default:
                console.error(this.field.type + " control is not supported.", JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        var viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    };
    /**
     * @return {?}
     */
    StampFieldHostComponent.prototype.updateInputs = /**
     * @return {?}
     */
    function () {
        if (!this._componentRef) {
            return;
        }
        /** @type {?} */
        var componentRenderer = /** @type {?} */ (this._componentRef.instance);
        /** @type {?} */
        var stampField = /** @type {?} */ (this.field);
        /** @type {?} */
        var stamp = {
            text: stampField.label,
            headerSize: this.state.options.headerSize
        };
        if (stampField.hints) {
            if (stampField.hints.headerSize) {
                stamp.headerSize = stampField.hints.headerSize;
            }
            if (stampField.hints.displayClassNames) {
                stamp.classes = stampField.hints.displayClassNames;
            }
        }
        /** @type {?} */
        var previousStamp = componentRenderer.stamp;
        componentRenderer.stamp = stamp;
        /** @type {?} */
        var onComponentChange = (/** @type {?} */ (this._componentRef.instance))
            .ngOnChanges;
        if (onComponentChange) {
            /** @type {?} */
            var change_1 = {
                previousValue: previousStamp,
                currentValue: stamp,
                firstChange: typeof previousStamp === 'undefined',
                isFirstChange: function () { return change_1.firstChange; }
            };
            onComponentChange.call(componentRenderer, { control: change_1 });
        }
    };
    StampFieldHostComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-stamp-field-host',
                    template: "<ng-template deReCrudComponentHost></ng-template>"
                },] },
    ];
    /** @nocollapse */
    StampFieldHostComponent.ctorParameters = function () { return [
        { type: FormStateService },
        { type: ComponentFactoryResolver },
        { type: DeReCrudProviderService }
    ]; };
    StampFieldHostComponent.propDecorators = {
        componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
        formId: [{ type: Input }],
        form: [{ type: Input }],
        struct: [{ type: Input }],
        block: [{ type: Input }],
        field: [{ type: Input }]
    };
    return StampFieldHostComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DeReCrudCoreModule = /** @class */ (function () {
    function DeReCrudCoreModule() {
    }
    DeReCrudCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule
                    ],
                    declarations: [
                        ComponentHostDirective,
                        InputFieldHostComponent,
                        StampFieldHostComponent,
                        ButtonHostComponent,
                        CollectionFieldHostComponent,
                        FormHostComponent
                    ],
                    providers: [FormStateService, FormBuilderService],
                    exports: [InputFieldHostComponent, StampFieldHostComponent, ButtonHostComponent, FormHostComponent],
                    entryComponents: [CollectionFieldHostComponent]
                },] },
    ];
    return DeReCrudCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            for (var references_1 = __values(references), references_1_1 = references_1.next(); !references_1_1.done; references_1_1 = references_1.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DeReCrudFormsModule = /** @class */ (function () {
    function DeReCrudFormsModule() {
    }
    DeReCrudFormsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        DeReCrudCoreModule,
                        ReactiveFormsModule
                    ],
                    declarations: [
                        FormComponent
                    ],
                    exports: [FormComponent]
                },] },
    ];
    return DeReCrudFormsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ValidationErrorHelper = /** @class */ (function () {
    function ValidationErrorHelper() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    ValidationErrorHelper.getFormControlIfErrorFound = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var formControl = control.form.get(control.field.name);
        if ((!formControl.errors || !formControl.touched) &&
            !control.submissionErrors.length) {
            return null;
        }
        return formControl;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ValidationErrorHelper.hasError = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return !!this.getFormControlIfErrorFound(control);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    ValidationErrorHelper.getErrors = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var e_1, _a;
        /** @type {?} */
        var formControl = this.getFormControlIfErrorFound(control);
        if (!formControl) {
            return null;
        }
        /** @type {?} */
        var sortedErrors = [];
        /** @type {?} */
        var unsortedErrors = [];
        if (formControl.errors && formControl.touched) {
            try {
                for (var _b = __values(Object.keys(formControl.errors)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    /** @type {?} */
                    var sort = this._errorSort[key];
                    /** @type {?} */
                    var metadata = formControl.errors[key];
                    if (typeof sort === 'undefined') {
                        unsortedErrors.push({ key: key, metadata: metadata });
                    }
                    else {
                        sortedErrors.push({ key: key, metadata: metadata, sort: sort });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return sortedErrors
            .sort(function (x) { return x.sort; })
            .concat(unsortedErrors)
            .map(this.getErrorMessage)
            .concat(control.submissionErrors);
    };
    /**
     * @param {?} error
     * @return {?}
     */
    ValidationErrorHelper.getErrorMessage = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        switch (error.key) {
            case 'required':
                return 'This field is required.';
            case 'minlength':
                return "This field must have at least " + error.metadata.requiredLength + " characters.";
            case 'maxlength':
                return "This field can not exceed " + error.metadata.requiredLength + " characters.";
            default:
                return "Validation failed with error: " + error;
        }
    };
    ValidationErrorHelper._errorSort = ['required'];
    return ValidationErrorHelper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3ControlContainerRendererComponent = /** @class */ (function () {
    function Bootstrap3ControlContainerRendererComponent() {
    }
    /**
     * @return {?}
     */
    Bootstrap3ControlContainerRendererComponent.prototype.getClasses = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var hasError = ValidationErrorHelper.hasError(this.control);
        return {
            'has-error': hasError,
            'has-feedback': hasError
        };
    };
    Bootstrap3ControlContainerRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-control-container-renderer',
                    template: "<div class=\"form-group\" [ngClass]=\"getClasses()\">\n  <ng-content></ng-content>\n</div>\n"
                },] },
    ];
    Bootstrap3ControlContainerRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3ControlContainerRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DeReCrudProviderModule = /** @class */ (function () {
    function DeReCrudProviderModule() {
    }
    DeReCrudProviderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    providers: [DeReCrudProviderService],
                    declarations: []
                },] },
    ];
    return DeReCrudProviderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3InputRendererComponent = /** @class */ (function () {
    function Bootstrap3InputRendererComponent() {
    }
    Bootstrap3InputRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-input-renderer',
                    template: "<ng-container [formGroup]=\"control.form\">\n  <de-re-crud-bootstrap3-label-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-label-renderer>\n  <input class=\"form-control\"\n         [type]=\"control.rendererType\"\n         [id]=\"control.htmlId\"\n         [name]=\"control.field.name\"\n         [formControlName]=\"control.field.name\"\n         (focus)=\"control.onFocus($event)\"\n         (blur)=\"control.onBlur($event)\"\n         (input)=\"control.onChange($event)\" />\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3InputRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3InputRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3SelectRendererComponent = /** @class */ (function () {
    function Bootstrap3SelectRendererComponent() {
    }
    Bootstrap3SelectRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-select-renderer',
                    template: "<ng-container [formGroup]=\"control.form\">\n  <de-re-crud-bootstrap3-label-renderer [control]=\"control\"></de-re-crud-bootstrap3-label-renderer>\n  <select class=\"form-control\"\n          [id]=\"control.htmlId\"\n          [name]=\"control.field.name\"\n          [formControlName]=\"control.field.name\"\n          (focus)=\"control.onFocus($event)\"\n          (blur)=\"control.onBlur($event)\"\n          (change)=\"control.onChange($event)\">\n    <option *ngFor=\"let option of control.options\" [value]=\"option.value\">{{option.label}}</option>\n  </select>\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3SelectRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3SelectRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3LabelRendererComponent = /** @class */ (function () {
    function Bootstrap3LabelRendererComponent() {
    }
    Bootstrap3LabelRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-label-renderer',
                    template: "<label class=\"control-label\" [htmlFor]=\"control.htmlId\">{{control.field.label}}</label>\n"
                },] },
    ];
    Bootstrap3LabelRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3LabelRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3ButtonRendererComponent = /** @class */ (function () {
    function Bootstrap3ButtonRendererComponent() {
    }
    Object.defineProperty(Bootstrap3ButtonRendererComponent.prototype, "classes", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var classes;
            if (this._classes) {
                classes = this._classes;
            }
            if (this.button.extraClasses) {
                classes = (classes || []).concat(this.button.extraClasses);
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Bootstrap3ButtonRendererComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateClasses();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    Bootstrap3ButtonRendererComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["button"]) {
            if (changes["button"].currentValue.type !==
                changes["button"].previousValue.type) {
                this.updateClasses();
            }
        }
    };
    /**
     * @return {?}
     */
    Bootstrap3ButtonRendererComponent.prototype.updateClasses = /**
     * @return {?}
     */
    function () {
        if (this.button.class) {
            this._classes = [this.button.class];
            return;
        }
        switch (this.button.type) {
            case 'submit':
                this._classes = ['btn-primary'];
                break;
            default:
                this._classes = ['btn-default'];
                break;
        }
    };
    Bootstrap3ButtonRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-button-renderer',
                    template: "<button class=\"btn\" [ngClass]=\"classes\"\n        [type]=\"button.type\"\n        [disabled]=\"button.disabled\"\n        (click)=\"button.onClick($event)\">\n  {{button.text}}\n</button>\n"
                },] },
    ];
    Bootstrap3ButtonRendererComponent.propDecorators = {
        button: [{ type: Input }]
    };
    return Bootstrap3ButtonRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3TableRendererComponent = /** @class */ (function () {
    function Bootstrap3TableRendererComponent() {
    }
    /**
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    Bootstrap3TableRendererComponent.prototype.getValue = /**
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    function (field, value) {
        /** @type {?} */
        var fieldValue = value[field.name];
        if (fieldValue == null || typeof fieldValue === 'undefined') {
            return '&nbsp;';
        }
        return fieldValue;
    };
    Bootstrap3TableRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-table-renderer',
                    template: "<div>\n  <de-re-crud-stamp-renderer [stamp]=\"control.stamp\">\n  </de-re-crud-stamp-renderer>\n  <de-re-crud-button-host\n    [formId]=\"control.formId\"\n    extraClasses=\"btn-sm\"\n    text=\"Add\"\n    (click)=\"control.onAdd($event)\">\n  </de-re-crud-button-host>\n</div>\n\n<div class=\"table-control-container\">\n  <table class=\"table table-bordered table-condensed\">\n    <thead>\n      <tr>\n        <th *ngFor=\"let field of control.nestedFields\">\n          {{field.label}}\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngIf=\"!control.nestedValues.length\">\n        <td colspan=\"100%\">None</td>\n      </tr>\n      <tr *ngFor=\"let form of control.nestedValues\">\n        <td *ngFor=\"let field of control.nestedFields\" [innerHtml]=\"getValue(field, form.value)\"></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n",
                    styles: [".table-control-container{margin-top:10px}"]
                },] },
    ];
    Bootstrap3TableRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3TableRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3CheckboxRendererComponent = /** @class */ (function () {
    function Bootstrap3CheckboxRendererComponent() {
    }
    Bootstrap3CheckboxRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-checkbox-renderer',
                    template: "<ng-container [formGroup]=\"control.form\">\n  <div class=\"checkbox\">\n    <label [htmlFor]=\"control.htmlId\">\n      <input type=\"checkbox\"\n        [id]=\"control.htmlId\"\n        [name]=\"control.field.name\"\n        [formControlName]=\"control.field.name\"\n        (focus)=\"control.onFocus($event)\"\n        (blur)=\"control.onBlur($event)\"\n        (input)=\"control.onChange($event)\" /> {{control.field.label}}\n    </label>\n  </div>\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3CheckboxRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3CheckboxRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3HelpRendererComponent = /** @class */ (function () {
    function Bootstrap3HelpRendererComponent() {
    }
    /**
     * @return {?}
     */
    Bootstrap3HelpRendererComponent.prototype.hasError = /**
     * @return {?}
     */
    function () {
        return ValidationErrorHelper.hasError(this.control);
    };
    Bootstrap3HelpRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-help-renderer',
                    template: "<p *ngIf=\"control.field.help && !hasError()\" class=\"help-block\">{{control.field.help}}</p>\n"
                },] },
    ];
    Bootstrap3HelpRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3HelpRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3ValidationErrorsRendererComponent = /** @class */ (function () {
    function Bootstrap3ValidationErrorsRendererComponent() {
    }
    /**
     * @return {?}
     */
    Bootstrap3ValidationErrorsRendererComponent.prototype.hasError = /**
     * @return {?}
     */
    function () {
        return ValidationErrorHelper.hasError(this.control);
    };
    /**
     * @return {?}
     */
    Bootstrap3ValidationErrorsRendererComponent.prototype.getErrors = /**
     * @return {?}
     */
    function () {
        return ValidationErrorHelper.getErrors(this.control);
    };
    Bootstrap3ValidationErrorsRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-validation-errors-renderer',
                    template: "<ng-container *ngIf=\"hasError()\"\n  [ngTemplateOutlet]=\"validationErrors\"\n  [ngTemplateOutletContext]=\"{ errors: getErrors() }\">\n</ng-container>\n\n<ng-template #validationErrors let-errors=\"errors\">\n  <ng-container>\n    <p *ngFor=\"let error of errors\" class=\"help-block\">\n      {{error}}\n    </p>\n  </ng-container>\n</ng-template>\n"
                },] },
    ];
    Bootstrap3ValidationErrorsRendererComponent.propDecorators = {
        control: [{ type: Input }]
    };
    return Bootstrap3ValidationErrorsRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3InlineRendererComponent = /** @class */ (function () {
    function Bootstrap3InlineRendererComponent() {
    }
    Bootstrap3InlineRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-bootstrap3-inline-renderer',
                    template: "<div>\n  <de-re-crud-stamp-renderer [stamp]=\"control.stamp\">\n  </de-re-crud-stamp-renderer>\n  <de-re-crud-button-host\n    *ngIf=\"control.canAdd\"\n    [formId]=\"control.formId\"\n    extraClasses=\"btn-sm\"\n    text=\"Add\"\n    (click)=\"control.onAdd($event)\">\n  </de-re-crud-button-host>\n</div>\n\n<div class=\"inline-control-container\">\n  <span *ngIf=\"!control.nestedValues.length\">None</span>\n  <div *ngFor=\"let value of control.nestedValues\">\n    <de-re-crud-form-host\n      [formId]=\"control.formId\"\n      [form]=\"value\"\n      [parentPath]=\"control.formPath\"\n      [parentForm]=\"control.value\"\n      [fields]=\"control.nestedFields\"\n      [struct]=\"control.field.reference.struct\"\n      [block]=\"control.field.reference.block\">\n    </de-re-crud-form-host>\n  </div>\n</div>\n",
                    styles: [".inline-control-container{margin-top:10px;margin-bottom:10px}"]
                },] },
    ];
    return Bootstrap3InlineRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3StampRendererComponent = /** @class */ (function () {
    function Bootstrap3StampRendererComponent() {
    }
    Bootstrap3StampRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'de-re-crud-stamp-renderer',
                    template: "<ng-container [ngSwitch]=\"stamp.headerSize\">\n  <h1 *ngSwitchCase=\"1\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h1>\n  <h2 *ngSwitchCase=\"2\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h2>\n  <h3 *ngSwitchCase=\"3\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h3>\n  <h4 *ngSwitchCase=\"4\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h4>\n  <h5 *ngSwitchCase=\"5\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h5>\n  <h6 *ngSwitchCase=\"6\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h6>\n  <p *ngSwitchDefault [ngClass]=\"stamp.classes\">{{stamp.text}}</p>\n</ng-container>\n"
                },] },
    ];
    Bootstrap3StampRendererComponent.propDecorators = {
        stamp: [{ type: Input }]
    };
    return Bootstrap3StampRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Bootstrap3DeReCrudProviderModule = /** @class */ (function () {
    function Bootstrap3DeReCrudProviderModule(providerService) {
        providerService.register('bootstrap3', {
            stampComponent: Bootstrap3StampRendererComponent,
            containerComponent: Bootstrap3ControlContainerRendererComponent,
            inputComponent: Bootstrap3InputRendererComponent,
            selectComponent: Bootstrap3SelectRendererComponent,
            buttonComponent: Bootstrap3ButtonRendererComponent,
            tableComponent: Bootstrap3TableRendererComponent,
            inlineComponent: Bootstrap3InlineRendererComponent,
            checkboxComponent: Bootstrap3CheckboxRendererComponent
        });
    }
    Bootstrap3DeReCrudProviderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ReactiveFormsModule, DeReCrudCoreModule, DeReCrudProviderModule],
                    declarations: [
                        Bootstrap3ControlContainerRendererComponent,
                        Bootstrap3InputRendererComponent,
                        Bootstrap3SelectRendererComponent,
                        Bootstrap3LabelRendererComponent,
                        Bootstrap3ButtonRendererComponent,
                        Bootstrap3InlineRendererComponent,
                        Bootstrap3TableRendererComponent,
                        Bootstrap3CheckboxRendererComponent,
                        Bootstrap3HelpRendererComponent,
                        Bootstrap3ValidationErrorsRendererComponent,
                        Bootstrap3StampRendererComponent
                    ],
                    entryComponents: [
                        Bootstrap3ControlContainerRendererComponent,
                        Bootstrap3InputRendererComponent,
                        Bootstrap3SelectRendererComponent,
                        Bootstrap3ButtonRendererComponent,
                        Bootstrap3InlineRendererComponent,
                        Bootstrap3TableRendererComponent,
                        Bootstrap3CheckboxRendererComponent,
                        Bootstrap3StampRendererComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    Bootstrap3DeReCrudProviderModule.ctorParameters = function () { return [
        { type: DeReCrudProviderService }
    ]; };
    return Bootstrap3DeReCrudProviderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DeReCrudFormsModule, Bootstrap3DeReCrudProviderModule, DeReCrudCoreModule as ɵa, ButtonHostComponent as ɵh, CollectionFieldHostComponent as ɵi, ComponentHostDirective as ɵb, FormHostComponent as ɵj, InputFieldHostComponent as ɵc, StampFieldHostComponent as ɵg, FormBuilderService as ɵe, FormStateService as ɵd, FormComponent as ɵk, Bootstrap3ButtonRendererComponent as ɵq, Bootstrap3CheckboxRendererComponent as ɵt, Bootstrap3ControlContainerRendererComponent as ɵm, Bootstrap3HelpRendererComponent as ɵu, Bootstrap3InlineRendererComponent as ɵr, Bootstrap3InputRendererComponent as ɵn, Bootstrap3LabelRendererComponent as ɵp, Bootstrap3SelectRendererComponent as ɵo, Bootstrap3StampRendererComponent as ɵw, Bootstrap3TableRendererComponent as ɵs, Bootstrap3ValidationErrorsRendererComponent as ɵv, DeReCrudProviderModule as ɵl, DeReCrudProviderService as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUtcmUtY3J1ZC1uZ3guanMubWFwIiwic291cmNlcyI6WyJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL2NvcmUvaG9zdHMvY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS92YWxpZGF0b3JzL3doaXRlc3BhY2UtdmFsaWRhdG9yLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tYnVpbGRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9jb2xsZWN0aW9uLWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2lucHV0LWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2J1dHRvbi1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9zdGFtcC1maWVsZC1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9jb3JlLm1vZHVsZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvZm9ybXMvZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvZm9ybXMvZm9ybXMubW9kdWxlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3ZhbGlkYXRpb24tZXJyb3ItaGVscGVyLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5tb2R1bGUudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2lucHV0LXJlbmRlcmVyL2lucHV0LXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2xhYmVsLXJlbmRlcmVyL2xhYmVsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvYnV0dG9uLXJlbmRlcmVyL2J1dHRvbi1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL3RhYmxlLXJlbmRlcmVyL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvY2hlY2tib3gtcmVuZGVyZXIvY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9oZWxwLXJlbmRlcmVyL2hlbHAtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2lubGluZS1yZW5kZXJlci9pbmxpbmUtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9zdGFtcC1yZW5kZXJlci9zdGFtcC1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2Jvb3RzdHJhcDMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnW2RlUmVDcnVkQ29tcG9uZW50SG9zdF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyT3B0aW9ucyB9IGZyb20gJy4vcHJvdmlkZXItb3B0aW9ucyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfY2FjaGU6IHsgW25hbWU6IHN0cmluZ106IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zIH0gPSB7fTtcclxuXHJcbiAgcmVnaXN0ZXIobmFtZTogc3RyaW5nLCBvcHRpb25zOiBEZVJlQ3J1ZFByb3ZpZGVyT3B0aW9ucykge1xyXG4gICAgdGhpcy5fY2FjaGVbbmFtZV0gPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0KG5hbWU6IHN0cmluZyk6IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9jYWNoZVtuYW1lXTtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3ZpZGVyICcke25hbWV9JyBpcyBub3QgcmVnaXN0ZXJlZC4gTWFrZSBzdXJlIHJlZ2lzdGVyKG5hbWUsIG9wdGlvbnMpIGlzIGNhbGxlZCBpbiB0aGUgYXBwbGljYXRpbyByb290LmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3Qgd2hpdGVzcGFjZVZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcclxuICBjb25zdCBpc1doaXRlU3BhY2UgPSAoY29udHJvbC52YWx1ZSB8fCAnJykudHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgcmV0dXJuICFpc1doaXRlU3BhY2UgPyBudWxsIDogeyByZXF1aXJlZDogdHJ1ZSB9O1xyXG59O1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIEZvcm1CdWlsZGVyLFxyXG4gIEZvcm1Hcm91cCxcclxuICBWYWxpZGF0b3JzLFxyXG4gIEZvcm1BcnJheVxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBJRmllbGQsXHJcbiAgSVRleHRGaWVsZCxcclxuICBJTGlua2VkU3RydWN0RmllbGQsXHJcbiAgSUJsb2NrLFxyXG4gIElJbnRlZ2VyRmllbGQsXHJcbiAgSUZpZWxkUmVmZXJlbmNlXHJcbn0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IHdoaXRlc3BhY2VWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL3doaXRlc3BhY2UtdmFsaWRhdG9yJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1CdWlsZGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHt9XHJcblxyXG4gIGdyb3VwKFxyXG4gICAgc3RydWN0OiBzdHJpbmcsXHJcbiAgICBibG9ja05hbWU6IHN0cmluZyxcclxuICAgIGJsb2NrczogTWFwPHN0cmluZywgSUJsb2NrPixcclxuICAgIGZpZWxkczogTWFwPHN0cmluZywgSUZpZWxkPixcclxuICAgIHZhbHVlID0ge31cclxuICApOiBGb3JtR3JvdXAge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcclxuICAgIGNvbnN0IGJsb2NrID0gYmxvY2tzW2Ake3N0cnVjdH0tJHtibG9ja05hbWV9YF07XHJcblxyXG4gICAgZm9yIChjb25zdCBmaWVsZFJlZmVyZW5jZSBvZiBibG9jay5maWVsZHMpIHtcclxuICAgICAgY29uc3QgZmllbGQgPSBmaWVsZHNbYCR7c3RydWN0fS0ke2ZpZWxkUmVmZXJlbmNlLmZpZWxkfWBdO1xyXG5cclxuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdzdGFtcCcpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdsaW5rZWRTdHJ1Y3QnKSB7XHJcbiAgICAgICAgY29uc3QgbGlua2VkU3RydWN0RmllbGQgPSA8SUxpbmtlZFN0cnVjdEZpZWxkPmZpZWxkO1xyXG4gICAgICAgIGNvbnN0IHsgcmVmZXJlbmNlIH0gPSBsaW5rZWRTdHJ1Y3RGaWVsZDtcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmFycmF5KFxyXG4gICAgICAgICAgcmVmZXJlbmNlLnN0cnVjdCxcclxuICAgICAgICAgIHJlZmVyZW5jZS5ibG9jayxcclxuICAgICAgICAgIGJsb2NrcyxcclxuICAgICAgICAgIGZpZWxkcyxcclxuICAgICAgICAgIHZhbHVlW2ZpZWxkLm5hbWVdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcnJheS52YWx1ZS5sZW5ndGggJiYgbGlua2VkU3RydWN0RmllbGQubWluSW5zdGFuY2VzID4gMCkge1xyXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWluY3JlbWVudC1kZWNyZW1lbnRcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua2VkU3RydWN0RmllbGQubWluSW5zdGFuY2VzOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaCh0aGlzLmdyb3VwKHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jaywgYmxvY2tzLCBmaWVsZHMpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3VwW2ZpZWxkLm5hbWVdID0gYXJyYXk7XHJcblxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy5nZXRWYWxpZGF0b3JzKGZpZWxkUmVmZXJlbmNlLCBmaWVsZCk7XHJcbiAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHZhbHVlW2ZpZWxkLm5hbWVdIHx8IGZpZWxkLmluaXRpYWxWYWx1ZTtcclxuXHJcbiAgICAgIGdyb3VwW2ZpZWxkLm5hbWVdID0gW2luaXRpYWxWYWx1ZSwgdmFsaWRhdG9yc107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5mYi5ncm91cChncm91cCk7XHJcblxyXG4gICAgaWYgKCFmb3JtR3JvdXAudmFsdWUpIHtcclxuICAgICAgZm9ybUdyb3VwLnBhdGNoVmFsdWUoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtR3JvdXA7XHJcbiAgfVxyXG5cclxuICBhcnJheShcclxuICAgIHN0cnVjdDogc3RyaW5nLFxyXG4gICAgYmxvY2tOYW1lOiBzdHJpbmcsXHJcbiAgICBibG9ja3M6IE1hcDxzdHJpbmcsIElCbG9jaz4sXHJcbiAgICBmaWVsZHM6IE1hcDxzdHJpbmcsIElGaWVsZD4sXHJcbiAgICB2YWx1ZSA9IFtdXHJcbiAgKTogRm9ybUFycmF5IHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkge1xyXG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwKHN0cnVjdCwgYmxvY2tOYW1lLCBibG9ja3MsIGZpZWxkcywgaXRlbSk7XHJcblxyXG4gICAgICAgIGFycmF5LnB1c2goZ3JvdXApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmZiLmFycmF5KGFycmF5KTtcclxuICAgIGlmICghZm9ybUFycmF5LnZhbHVlKSB7XHJcbiAgICAgIGZvcm1BcnJheS5zZXRWYWx1ZShbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1BcnJheTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgcHJpdmF0ZSBnZXRWYWxpZGF0b3JzKGZpZWxkUmVmZXJlbmNlOiBJRmllbGRSZWZlcmVuY2UsIGZpZWxkOiBJRmllbGQpIHtcclxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBbXTtcclxuXHJcbiAgICAgIGNvbnN0IHJvb3QgPSBjb250cm9sLnJvb3Q7XHJcbiAgICAgIGNvbnN0IHBhcmVudCA9IGNvbnRyb2wucGFyZW50O1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHBhcmVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCAmJlxyXG4gICAgICAgICFmaWVsZFJlZmVyZW5jZS5jb25kaXRpb24ocGFyZW50LnZhbHVlLCByb290LnZhbHVlKVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpZWxkLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQsIHdoaXRlc3BhY2VWYWxpZGF0b3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJVGV4dEZpZWxkPmZpZWxkKS5taW5MZW5ndGgpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoKDxJVGV4dEZpZWxkPmZpZWxkKS5taW5MZW5ndGgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SVRleHRGaWVsZD5maWVsZCkubWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKCg8SVRleHRGaWVsZD5maWVsZCkubWF4TGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoPElJbnRlZ2VyRmllbGQ+ZmllbGQpLm1pbikge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbigoPElJbnRlZ2VyRmllbGQ+ZmllbGQpLm1pbikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5tYXgpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5tYXgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF2YWxpZGF0b3JzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkYXRvcnMpKGNvbnRyb2wpO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGVSZUNydWRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL29wdGlvbnMnO1xyXG5pbXBvcnQgeyBJU3RydWN0LCBJRmllbGQsIElCbG9jayB9IGZyb20gJy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtU3VibWlzc2lvbkVycm9ycyB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN1Ym1pc3Npb24nO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUNoYW5nZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLWNoYW5nZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuXHJcbmV4cG9ydCB0eXBlIEdldEtleUZ1bmN0aW9uPFQ+ID0gKGl0ZW06IFQpID0+IHN0cmluZztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIEZvcm1TdGF0ZVNlcnZpY2Uge1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1jb25zdHJ1Y3Rvci13aXRoLXN0cmluZy1hcmdzXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdENvbmRpdGlvbkZ1bmMgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiB0cnVlJyk7XHJcbiAgcHJpdmF0ZSBfY2FjaGU6IHsgW2lkOiBudW1iZXJdOiBGb3JtU3RhdGUgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlclNlcnZpY2UpIHt9XHJcblxyXG4gIHN0YXRpYyBnZW5lcmF0ZUlkKCkge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXNzaWduRGVmYXVsdHMob3B0aW9uczogRGVSZUNydWRPcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVyU2l6ZSkge1xyXG4gICAgICBvcHRpb25zLmhlYWRlclNpemUgPSAzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogVGhpcyBzaG91bGQgZXhwYW5kIHN0cmluZ3MgaW50byBhIGxhYmVsIG9iamVjdDsgdGhlIHJlbmRlcmVycyBzaG91bGQgaGFuZGxlIHdoaWNoIGxhYmVsIHRvIHNob3cgYmFzZWQgb24gc2NyZWVuIHNpemVcclxuICBzdGF0aWMgcGFyc2VMYWJlbChsYWJlbDogc3RyaW5nIHwgeyBzaG9ydDogc3RyaW5nIH0pIHtcclxuICAgIGlmICh0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWwuc2hvcnQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VTY2hlbWEob3B0aW9uczogRGVSZUNydWRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBzdHJ1Y3RzOiBJU3RydWN0W10gPSBbXTtcclxuICAgIGNvbnN0IGZpZWxkczogSUZpZWxkW10gPSBbXTtcclxuICAgIGNvbnN0IGJsb2NrczogSUJsb2NrW10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHN0cnVjdFNjaGVtYSBvZiBvcHRpb25zLnNjaGVtYSkge1xyXG4gICAgICBjb25zdCBzdHJ1Y3QgPSB7XHJcbiAgICAgICAgLi4uc3RydWN0U2NoZW1hLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBhcnNlTGFiZWwoc3RydWN0U2NoZW1hLmxhYmVsKSxcclxuICAgICAgICBjb2xsZWN0aW9uTGFiZWw6IHRoaXMucGFyc2VMYWJlbChzdHJ1Y3RTY2hlbWEubGFiZWwpLFxyXG4gICAgICAgIGZpZWxkczogW10sXHJcbiAgICAgICAgYmxvY2tzOiBbXVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBmaWVsZFNjaGVtYSBvZiBzdHJ1Y3RTY2hlbWEuZmllbGRzKSB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLnBhcnNlTGFiZWwoZmllbGRTY2hlbWEubGFiZWwpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWVsZCA9IHtcclxuICAgICAgICAgIC4uLmZpZWxkU2NoZW1hLFxyXG4gICAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRTY2hlbWEucGxhY2Vob2xkZXIgfHwgbGFiZWwsXHJcbiAgICAgICAgICBzdHJ1Y3Q6IHN0cnVjdFNjaGVtYS5uYW1lXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkLnJlZmVyZW5jZSAmJiAhZmllbGQucmVmZXJlbmNlLmJsb2NrKSB7XHJcbiAgICAgICAgICBmaWVsZC5yZWZlcmVuY2UuYmxvY2sgPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgICAgc3RydWN0LmZpZWxkcy5wdXNoKGZpZWxkLm5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGJsb2NrU2NoZW1hIG9mIHN0cnVjdFNjaGVtYS5ibG9ja3MpIHtcclxuICAgICAgICBjb25zdCBibG9jayA9IHtcclxuICAgICAgICAgIC4uLmJsb2NrU2NoZW1hLFxyXG4gICAgICAgICAgZmllbGRzOiBbXSxcclxuICAgICAgICAgIHN0cnVjdDogc3RydWN0U2NoZW1hLm5hbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHJlZmVyZW5jZSBvZiBibG9ja1NjaGVtYS5maWVsZHMpIHtcclxuICAgICAgICAgIGlmICghcmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlID0gcmVmZXJlbmNlLmZpZWxkXHJcbiAgICAgICAgICAgID8gcmVmZXJlbmNlXHJcbiAgICAgICAgICAgIDogeyBmaWVsZDogcmVmZXJlbmNlIH07XHJcblxyXG4gICAgICAgICAgbGV0IGNvbmRpdGlvbjtcclxuXHJcbiAgICAgICAgICBpZiAoZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbHVlID1cclxuICAgICAgICAgICAgICBmaWVsZFJlZmVyZW5jZS5jb25kaXRpb25bMF0gPT09ICd7J1xyXG4gICAgICAgICAgICAgICAgPyBmaWVsZFJlZmVyZW5jZS5jb25kaXRpb25cclxuICAgICAgICAgICAgICAgIDogYHJldHVybiAke2ZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbn1gO1xyXG5cclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWNvbnN0cnVjdG9yLXdpdGgtc3RyaW5nLWFyZ3NcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gbmV3IEZ1bmN0aW9uKCd2YWx1ZScsICdyb290VmFsdWUnLCByZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tY29uc3RydWN0b3Itd2l0aC1zdHJpbmctYXJnc1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBGb3JtU3RhdGVTZXJ2aWNlLmRlZmF1bHRDb25kaXRpb25GdW5jO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICAgIGJsb2NrLmZpZWxkcy5wdXNoKGZpZWxkUmVmZXJlbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcclxuICAgICAgICBzdHJ1Y3QuYmxvY2tzLnB1c2goYmxvY2submFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0cnVjdHMucHVzaChzdHJ1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0cnVjdHMsXHJcbiAgICAgIGZpZWxkcyxcclxuICAgICAgYmxvY2tzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0KGlkOiBudW1iZXIpOiBGb3JtU3RhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlW2lkXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZShvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMsIHZhbHVlOiBvYmplY3QsIGluaXRpYWxFcnJvcnM/OiBGb3JtU3VibWlzc2lvbkVycm9ycyk6IEZvcm1TdGF0ZSB7XHJcbiAgICBsZXQgaWQ6IG51bWJlcjtcclxuXHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBpZCA9IEZvcm1TdGF0ZVNlcnZpY2UuZ2VuZXJhdGVJZCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBGb3JtU3RhdGVTZXJ2aWNlLmFzc2lnbkRlZmF1bHRzKG9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IHNjaGVtYSA9IEZvcm1TdGF0ZVNlcnZpY2UucGFyc2VTY2hlbWEob3B0aW9ucyk7XHJcbiAgICBjb25zdCBzdHJ1Y3RzID0gdGhpcy5hcnJheVRvTWFwKHN0cnVjdCA9PiBzdHJ1Y3QubmFtZSwgc2NoZW1hLnN0cnVjdHMpO1xyXG4gICAgY29uc3QgZmllbGRzID0gdGhpcy5hcnJheVRvTWFwKFxyXG4gICAgICBmaWVsZCA9PiBgJHtmaWVsZC5zdHJ1Y3R9LSR7ZmllbGQubmFtZX1gLFxyXG4gICAgICBzY2hlbWEuZmllbGRzXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGJsb2NrcyA9IHRoaXMuYXJyYXlUb01hcChcclxuICAgICAgYmxvY2sgPT4gYCR7YmxvY2suc3RydWN0fS0ke2Jsb2NrLm5hbWV9YCxcclxuICAgICAgc2NoZW1hLmJsb2Nrc1xyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBmb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cChcclxuICAgICAgb3B0aW9ucy5zdHJ1Y3QsXHJcbiAgICAgIG9wdGlvbnMuYmxvY2ssXHJcbiAgICAgIGJsb2NrcyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICB2YWx1ZVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBzdGF0ZTogRm9ybVN0YXRlID0ge1xyXG4gICAgICBpZCxcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgZm9ybSxcclxuICAgICAgc3RydWN0cyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICBibG9ja3MsXHJcbiAgICAgIHN1Ym1pc3Npb25FcnJvcnM6IGluaXRpYWxFcnJvcnMsXHJcbiAgICAgIG9uU3VibWlzc2lvbkVycm9yc0NoYW5nZTogbmV3IFN1YmplY3Q8Rm9ybVN1Ym1pc3Npb25FcnJvcnM+KCksXHJcbiAgICAgIG5hdmlnYXRpb25TdGFjazogW10sXHJcbiAgICAgIG9uTmF2aWdhdGlvbkNoYW5nZTogbmV3IFN1YmplY3Q8bnVtYmVyPigpLFxyXG4gICAgICBvblZhbHVlQ2hhbmdlOiBuZXcgU3ViamVjdDxGb3JtQ2hhbmdlPigpXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUZvcm0oZm9ybUlkOiBudW1iZXIsIHN0cnVjdDogc3RyaW5nLCBibG9jazogc3RyaW5nKTogRm9ybUdyb3VwIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbZm9ybUlkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBmaWVsZHMsIGJsb2NrcyB9ID0gdGhpcy5fY2FjaGVbZm9ybUlkXTtcclxuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHN0cnVjdCwgYmxvY2ssIGJsb2NrcywgZmllbGRzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShpZDogbnVtYmVyLCB2YWx1ZTogb2JqZWN0KSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBmb3JtIH0gPSB0aGlzLl9jYWNoZVtpZF07XHJcblxyXG4gICAgZm9ybS5wYXRjaFZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZShpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIHRoaXMuX2NhY2hlW2lkXTtcclxuICB9XHJcblxyXG4gIGNsZWFyRXJyb3JzKGlkOiBudW1iZXIsIGZvcm1QYXRoPzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZvcm1QYXRoKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9jYWNoZVtpZF0uc3VibWlzc2lvbkVycm9yc1tmb3JtUGF0aF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9jYWNoZVtpZF0uc3VibWlzc2lvbkVycm9ycyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgc2V0RXJyb3JzKGlkOiBudW1iZXIsIGVycm9yczogRm9ybVN1Ym1pc3Npb25FcnJvcnMpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jYWNoZVtpZF0uc3VibWlzc2lvbkVycm9ycyA9IGVycm9ycztcclxuICAgIHRoaXMucHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoaWQ6IG51bWJlciwgZm9ybVBhdGg6IHN0cmluZywgbmV3VmFsdWU6IGFueSwgZXZlbnQ6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY2FjaGVbaWRdO1xyXG4gICAgdGhpcy5jbGVhckVycm9ycyhpZCwgZm9ybVBhdGgpO1xyXG5cclxuICAgIGlmIChldmVudCAmJiBzdGF0ZS5vcHRpb25zLmNoYW5nZU5vdGlmaWNhdGlvblR5cGUgIT09IGV2ZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAoPFN1YmplY3Q8Rm9ybUNoYW5nZT4+c3RhdGUub25WYWx1ZUNoYW5nZSkubmV4dCh7XHJcbiAgICAgIGZpZWxkUGF0aDogZm9ybVBhdGgsXHJcbiAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcclxuICAgICAgZm9ybVZhbHVlOiBzdGF0ZS5mb3JtLnZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1c2hOYXZpZ2F0aW9uKGlkOiBudW1iZXIsIHN0cnVjdDogc3RyaW5nLCBibG9jazogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHBhcmVudFBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXS5uYXZpZ2F0aW9uU3RhY2sucHVzaCh7XHJcbiAgICAgIHN0cnVjdCxcclxuICAgICAgYmxvY2ssXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIHBhcmVudFBhdGhcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgcG9wTmF2aWdhdGlvbihpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdLm5hdmlnYXRpb25TdGFjay5wb3AoKTtcclxuXHJcbiAgICB0aGlzLnB1c2hOYXZpZ2F0aW9uQ2hhbmdlKGlkKTtcclxuICB9XHJcblxyXG4gIGNvbXBsZXRlTmF2aWdhdGlvbihpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb3BOYXZpZ2F0aW9uKGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQ6IG51bWJlciwgY2hpbGRJZD86IG51bWJlcikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICAoPFN1YmplY3Q8bnVtYmVyPj5zdGF0ZS5vbk5hdmlnYXRpb25DaGFuZ2UpLm5leHQoY2hpbGRJZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHB1c2hTdWJtaXNzaW9uRXJyb3JzQ2hhbmdlKGlkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY2FjaGVbaWRdO1xyXG4gICAgKDxTdWJqZWN0PEZvcm1TdWJtaXNzaW9uRXJyb3JzPj5zdGF0ZS5vblN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UpLm5leHQoXHJcbiAgICAgIHN0YXRlLnN1Ym1pc3Npb25FcnJvcnNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFycmF5VG9NYXA8VD4oZ2V0S2V5OiBHZXRLZXlGdW5jdGlvbjxUPiwgYXJyYXk6IFRbXSkge1xyXG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZTxNYXA8c3RyaW5nLCBUPj4oKGFjYywgY3VycmVudCkgPT4ge1xyXG4gICAgICBhY2NbZ2V0S2V5KGN1cnJlbnQpXSA9IGN1cnJlbnQ7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBuZXcgTWFwPHN0cmluZywgVD4oKSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIsIElDb2xsZWN0aW9uQ29udHJvbCB9IGZyb20gJy4uL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgSVJlZmVyZW5jZUZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnQtaG9zdC5kaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWNvbGxlY3Rpb24tZmllbGQtaG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuY29udHJvbC5mb3JtSWQpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmNvbnRyb2wgJiYgIWNoYW5nZXMuY29udHJvbC5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xDb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSB0aGlzLnByb3ZpZGVyU2VydmljZS5nZXQoXHJcbiAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5wcm92aWRlclxyXG4gICAgKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuY29udHJvbC5sYXlvdXQpIHtcclxuICAgICAgY2FzZSAnaW5saW5lJzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLmlubGluZUNvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGFibGUnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMudGFibGVDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgIGAke3RoaXMuY29udHJvbC5sYXlvdXR9IGxheW91dCBpcyBub3Qgc3VwcG9ydGVkLmAsXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRyb2wuZmllbGQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29udHJvbENvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXI+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbCA9IHtcclxuICAgICAgLi4udGhpcy5jb250cm9sLFxyXG4gICAgICBvbkFkZDogdGhpcy5vbkFkZFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c0NvbnRyb2wgPSBjb21wb25lbnRSZW5kZXJlci5jb250cm9sO1xyXG4gICAgY29tcG9uZW50UmVuZGVyZXIuY29udHJvbCA9IGNvbnRyb2w7XHJcblxyXG4gICAgY29uc3Qgb25Db21wb25lbnRDaGFuZ2UgPSAoPE9uQ2hhbmdlcz50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UpLm5nT25DaGFuZ2VzO1xyXG5cclxuICAgIGlmIChvbkNvbXBvbmVudENoYW5nZSkge1xyXG4gICAgICBjb25zdCBjaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IHtcclxuICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c0NvbnRyb2wsXHJcbiAgICAgICAgY3VycmVudFZhbHVlOiBjb250cm9sLFxyXG4gICAgICAgIGZpcnN0Q2hhbmdlOiB0eXBlb2YgcHJldmlvdXNDb250cm9sID09PSAndW5kZWZpbmVkJyxcclxuICAgICAgICBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiBjaGFuZ2UuZmlyc3RDaGFuZ2VcclxuICAgICAgfTtcclxuXHJcbiAgICAgIG9uQ29tcG9uZW50Q2hhbmdlLmNhbGwoY29tcG9uZW50UmVuZGVyZXIsIHsgY29udHJvbDogY2hhbmdlIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25BZGQgPSAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCByZWZlcmVuY2UgPSAoPElSZWZlcmVuY2VGaWVsZD50aGlzLmNvbnRyb2wuZmllbGQpLnJlZmVyZW5jZTtcclxuXHJcbiAgICBjb25zdCBmb3JtID0gdGhpcy5zdGF0ZVNlcnZpY2UuY3JlYXRlRm9ybSh0aGlzLmNvbnRyb2wuZm9ybUlkLCByZWZlcmVuY2Uuc3RydWN0LCByZWZlcmVuY2UuYmxvY2spO1xyXG4gICAgdGhpcy5jb250cm9sLnZhbHVlLnB1c2goZm9ybSk7XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbnRyb2wudmFsdWUuY29udHJvbHMuaW5kZXhPZihmb3JtKTtcclxuICAgIGNvbnN0IGNoaWxkUGF0aCA9IGAke3RoaXMuY29udHJvbC5mb3JtUGF0aH0uJHtpbmRleH1gO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbnRyb2wubGF5b3V0ID09PSAndGFibGUnKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnB1c2hOYXZpZ2F0aW9uKHRoaXMuY29udHJvbC5mb3JtSWQsIHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jaywgY2hpbGRQYXRoLCB0aGlzLmNvbnRyb2wuZm9ybVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udHJvbC5vbkNoYW5nZShudWxsKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIElGaWVsZCxcclxuICBJTGlzdEZpZWxkLFxyXG4gIElMaW5rZWRTdHJ1Y3RGaWVsZCxcclxuICBJTGlua2VkU3RydWN0RmllbGRSZWZlcmVuY2UsXHJcbiAgSUZpZWxkUmVmZXJlbmNlXHJcbn0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5LCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFJlbmRlcmVyLFxyXG4gIElDb250cm9sLFxyXG4gIElTZWxlY3RDb250cm9sLFxyXG4gIElDb2xsZWN0aW9uQ29udHJvbFxyXG59IGZyb20gJy4uL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWlucHV0LWZpZWxkLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZEhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWZzOiBDb21wb25lbnRSZWY8YW55PltdID0gW107XHJcbiAgcHJpdmF0ZSBfc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF92YWx1ZU9uRm9jdXM6IGFueTtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgZm9ybUlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xyXG4gIEBJbnB1dCgpIHN0cnVjdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJsb2NrOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZmllbGQ6IElGaWVsZDtcclxuICBASW5wdXQoKSBwYXJlbnRGb3JtOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgQElucHV0KCkgcGFyZW50UGF0aDogc3RyaW5nO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcbiAgZmllbGRSZWZlcmVuY2U6IElGaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIGdldCBmb3JtUGF0aCgpIHtcclxuICAgIGxldCBmb3JtUGF0aCA9IHRoaXMuZmllbGQubmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnRQYXRoKSB7XHJcbiAgICAgIGxldCBwYXJlbnRQYXRoID0gdGhpcy5wYXJlbnRQYXRoO1xyXG5cclxuICAgICAgaWYgKHRoaXMucGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJlbnRGb3JtLmNvbnRyb2xzLmluZGV4T2YodGhpcy5mb3JtKTtcclxuICAgICAgICBwYXJlbnRQYXRoICs9ICcuJyArIGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtUGF0aCA9IGAke3BhcmVudFBhdGh9LiR7Zm9ybVBhdGh9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybVBhdGg7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5mb3JtSWQpO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlID0gdGhpcy5zdGF0ZS5ibG9ja3NbYCR7dGhpcy5zdHJ1Y3R9LSR7dGhpcy5ibG9ja31gXS5maWVsZHMuZmluZChcclxuICAgICAgeCA9PiB4LmZpZWxkID09PSB0aGlzLmZpZWxkLm5hbWVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5maWVsZFJlZmVyZW5jZSA9IGZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICAgIHRoaXMuX3N1Ym1pc3Npb25FcnJvcnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uU3VibWlzc2lvbkVycm9yc0NoYW5nZS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xyXG4gICAgICAgICAgdGhpcy5kZXN0cm95UmVmcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zdWJtaXNzaW9uRXJyb3JzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVzdHJveVJlZnMoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3lSZWZzKCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZnMuZm9yRWFjaCh4ID0+IHguZGVzdHJveSgpKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmcyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkUmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRSZWZlcmVuY2UgJiYgdGhpcy5maWVsZFJlZmVyZW5jZS5jb25kaXRpb24odGhpcy5mb3JtLnZhbHVlLCB0aGlzLnN0YXRlLmZvcm0ucm9vdC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3lSZWZzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5maWVsZC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5pbnB1dENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5jaGVja2JveENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGlzdCc6XHJcbiAgICAgIGNhc2UgJ2ZvcmVpZ25LZXknOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuc2VsZWN0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaW5rZWRTdHJ1Y3QnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgJHt0aGlzLmZpZWxkLnR5cGV9IGNvbnRyb2wgaXMgbm90IHN1cHBvcnRlZC5gLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyQ29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBwcm92aWRlck9wdGlvbnMuY29udGFpbmVyQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xDb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbnRyb2xDb21wb25lbnRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udHJvbENvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50RmFjdG9yeVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXJDb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcclxuICAgICAgY29udGFpbmVyQ29tcG9uZW50RmFjdG9yeSxcclxuICAgICAgMCxcclxuICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICBbW2NvbnRyb2xDb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZnMucHVzaChjb250cm9sQ29tcG9uZW50UmVmLCBjb250YWluZXJDb21wb25lbnRSZWYpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAodGhpcy5zaG91bGRSZW5kZXIoKSAmJiAhdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1QYXRoID0gdGhpcy5mb3JtUGF0aDtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtLnJvb3QuZ2V0KGZvcm1QYXRoKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sOiBJQ29udHJvbCA9IHtcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIGZvcm1QYXRoLFxyXG4gICAgICBmaWVsZDogdGhpcy5maWVsZCxcclxuICAgICAgZm9ybUlkOiB0aGlzLmZvcm1JZCxcclxuICAgICAgc3VibWlzc2lvbkVycm9yczpcclxuICAgICAgICAodGhpcy5zdGF0ZS5zdWJtaXNzaW9uRXJyb3JzICYmXHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnN1Ym1pc3Npb25FcnJvcnNbZm9ybVBhdGhdKSB8fFxyXG4gICAgICAgIFtdLFxyXG4gICAgICBmb3JtOiB0aGlzLmZvcm0sXHJcbiAgICAgIHJlbmRlcmVyVHlwZTogdGhpcy5tYXBUeXBlKHRoaXMuZmllbGQudHlwZSksXHJcbiAgICAgIGh0bWxJZDogYCR7dGhpcy5mb3JtSWR9LSR7Zm9ybVBhdGh9YCxcclxuICAgICAgb25Gb2N1czogdGhpcy5vbkZvY3VzLFxyXG4gICAgICBvbkJsdXI6IHRoaXMub25CbHVyLFxyXG4gICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZVxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZmllbGQudHlwZSkge1xyXG4gICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgY2FzZSAnZm9yZWlnbktleSc6IHtcclxuICAgICAgICBjb25zdCBsaXN0RmllbGQgPSA8SUxpc3RGaWVsZD50aGlzLmZpZWxkO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RDb250cm9sID0gPElTZWxlY3RDb250cm9sPmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpZWxkLnR5cGUgPT09ICdmb3JlaWduS2V5Jykge1xyXG4gICAgICAgICAgc2VsZWN0Q29udHJvbC5vcHRpb25zID0gKCkgPT4gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGVjdENvbnRyb2wub3B0aW9ucyA9ICgpID0+IGxpc3RGaWVsZC5vcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdsaW5rZWRTdHJ1Y3QnOiB7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbkNvbnRyb2wgPSA8SUNvbGxlY3Rpb25Db250cm9sPmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmtlZFN0cnVjdEZpZWxkID0gPElMaW5rZWRTdHJ1Y3RGaWVsZD50aGlzLmZpZWxkO1xyXG4gICAgICAgIGNvbnN0IHsgcmVmZXJlbmNlIH0gPSBsaW5rZWRTdHJ1Y3RGaWVsZDtcclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tGaWVsZHMgPSB0aGlzLnN0YXRlLmJsb2Nrc1tgJHt0aGlzLnN0cnVjdH0tJHt0aGlzLmJsb2NrfWBdLmZpZWxkcztcclxuXHJcbiAgICAgICAgY29uc3QgeyBoaW50cyB9ID0gPElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZT5ibG9ja0ZpZWxkcy5maW5kKFxyXG4gICAgICAgICAgeCA9PiB4LmZpZWxkID09PSBsaW5rZWRTdHJ1Y3RGaWVsZC5uYW1lXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlQmxvY2sgPSAoaGludHMgJiYgaGludHMuYmxvY2spIHx8IHJlZmVyZW5jZS5ibG9jaztcclxuXHJcbiAgICAgICAgY29uc3QgZmllbGRSZWZlcmVuY2VzID0gPElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZVtdPnRoaXMuc3RhdGVcclxuICAgICAgICAgIC5ibG9ja3NbYCR7cmVmZXJlbmNlLnN0cnVjdH0tJHtyZWZlcmVuY2VCbG9ja31gXS5maWVsZHM7XHJcblxyXG4gICAgICAgIGNvbnN0IG5lc3RlZEZpZWxkcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkUmVmZXJlbmNlIG9mIGZpZWxkUmVmZXJlbmNlcykge1xyXG4gICAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnN0YXRlLmZpZWxkc1tgJHtyZWZlcmVuY2Uuc3RydWN0fS0ke2ZpZWxkUmVmZXJlbmNlLmZpZWxkfWBdO1xyXG4gICAgICAgICAgbmVzdGVkRmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmVzdGVkVmFsdWVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmVzdGVkVmFsdWUgb2YgY29sbGVjdGlvbkNvbnRyb2wudmFsdWUuY29udHJvbHMpIHtcclxuICAgICAgICAgIG5lc3RlZFZhbHVlcy5wdXNoKDxGb3JtR3JvdXA+bmVzdGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wuc3RhbXAgPSB7XHJcbiAgICAgICAgICB0ZXh0OiBjb250cm9sLmZpZWxkLmxhYmVsLFxyXG4gICAgICAgICAgaGVhZGVyU2l6ZTogdGhpcy5zdGF0ZS5vcHRpb25zLmhlYWRlclNpemVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5jYW5BZGQgPSAhbGlua2VkU3RydWN0RmllbGQubWF4SW5zdGFuY2VzIHx8IG5lc3RlZFZhbHVlcy5sZW5ndGggPCBsaW5rZWRTdHJ1Y3RGaWVsZC5tYXhJbnN0YW5jZXM7XHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wubmVzdGVkVmFsdWVzID0gbmVzdGVkVmFsdWVzO1xyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLm5lc3RlZEZpZWxkcyA9IG5lc3RlZEZpZWxkcztcclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5sYXlvdXQgPSAoaGludHMgJiYgaGludHMubGF5b3V0KSB8fCAnaW5saW5lJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgY29tcG9uZW50UmVmIG9mIHRoaXMuX2NvbXBvbmVudFJlZnMpIHtcclxuICAgICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8Q29udHJvbFJlbmRlcmVyPmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuXHJcbiAgICAgIGNvbnN0IHByZXZpb3VzQ29udHJvbCA9IGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2w7XHJcbiAgICAgIGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2wgPSBjb250cm9sO1xyXG5cclxuICAgICAgY29uc3Qgb25Db21wb25lbnRDaGFuZ2UgPSAoPE9uQ2hhbmdlcz5jb21wb25lbnRSZWYuaW5zdGFuY2UpLm5nT25DaGFuZ2VzO1xyXG4gICAgICBpZiAob25Db21wb25lbnRDaGFuZ2UpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IHtcclxuICAgICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzQ29udHJvbCxcclxuICAgICAgICAgIGN1cnJlbnRWYWx1ZTogY29udHJvbCxcclxuICAgICAgICAgIGZpcnN0Q2hhbmdlOiB0eXBlb2YgcHJldmlvdXNDb250cm9sID09PSAndW5kZWZpbmVkJyxcclxuICAgICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9uQ29tcG9uZW50Q2hhbmdlLmNhbGwoY29tcG9uZW50UmVuZGVyZXIsIHsgY29udHJvbDogY2hhbmdlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5fdmFsdWVPbkZvY3VzID0gdGhpcy5mb3JtLnJvb3QuZ2V0KHRoaXMuZm9ybVBhdGgpLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgb25CbHVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmZvcm0ucm9vdC5nZXQodGhpcy5mb3JtUGF0aCkudmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX3ZhbHVlT25Gb2N1cyAhPT0gbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uub25DaGFuZ2UodGhpcy5mb3JtSWQsIHRoaXMuZm9ybVBhdGgsIG5ld1ZhbHVlLCAnYmx1cicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAoZTogYW55KSA9PiB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZm9ybS5yb290LmdldCh0aGlzLmZvcm1QYXRoKS52YWx1ZTtcclxuICAgIHRoaXMuc3RhdGVTZXJ2aWNlLm9uQ2hhbmdlKHRoaXMuZm9ybUlkLCB0aGlzLmZvcm1QYXRoLCBuZXdWYWx1ZSwgZSA/ICdjaGFuZ2UnIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1hcFR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgQnV0dG9uUmVuZGVyZXIgfSBmcm9tICcuLi9yZW5kZXJlcnMvYnV0dG9uLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYnV0dG9uLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIGRlUmVDcnVkQ29tcG9uZW50SG9zdD48L25nLXRlbXBsYXRlPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xyXG4gIEBWaWV3Q2hpbGQoQ29tcG9uZW50SG9zdERpcmVjdGl2ZSkgY29tcG9uZW50SG9zdDogQ29tcG9uZW50SG9zdERpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBmb3JtSWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSB0eXBlOiAnYnV0dG9uJyB8ICdzdWJtaXQnIHwgJ2NhbmNlbCc7XHJcbiAgQElucHV0KCkgZXh0cmFDbGFzc2VzOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVTZXJ2aWNlLmdldCh0aGlzLmZvcm1JZCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvdmlkZXJPcHRpb25zID0gdGhpcy5wcm92aWRlclNlcnZpY2UuZ2V0KFxyXG4gICAgICB0aGlzLnN0YXRlLm9wdGlvbnMucHJvdmlkZXJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgcHJvdmlkZXJPcHRpb25zLmJ1dHRvbkNvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgb3B0aW9uczogeyBzdHJ1Y3QsIHN1Ym1pdEJ1dHRvblN0eWxlLCBjYW5jZWxCdXR0b25TdHlsZSB9LFxyXG4gICAgICBzdHJ1Y3RzXHJcbiAgICB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBjb25zdCBpc1N1Ym1pdCA9IHRoaXMudHlwZSA9PT0gJ3N1Ym1pdCc7XHJcblxyXG4gICAgbGV0IHN0eWxlID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgIHN0eWxlID0gc3VibWl0QnV0dG9uU3R5bGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhbmNlbCc6XHJcbiAgICAgICAgc3R5bGUgPSBjYW5jZWxCdXR0b25TdHlsZTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGV4dCA9IChzdHlsZSAmJiBzdHlsZS50ZXh0KSB8fCB0aGlzLnRleHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBpc1N1Ym1pdCAmJlxyXG4gICAgICBzdWJtaXRCdXR0b25TdHlsZSAmJlxyXG4gICAgICBzdWJtaXRCdXR0b25TdHlsZS5hcHBlbmRTY2hlbWFMYWJlbFxyXG4gICAgKSB7XHJcbiAgICAgIHRleHQgPSBgJHt0ZXh0fSAke3N0cnVjdHNbc3RydWN0XS5sYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dHJhQ2xhc3NlcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLm9wdGlvbnMuZXh0cmFCdXR0b25DbGFzc2VzKSB7XHJcbiAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuc3RhdGUub3B0aW9ucy5leHRyYUJ1dHRvbkNsYXNzZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmV4dHJhQ2xhc3Nlcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuZXh0cmFDbGFzc2VzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuZXh0cmFDbGFzc2VzLnNwbGl0KCcgJykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuZXh0cmFDbGFzc2VzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPEJ1dHRvblJlbmRlcmVyPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgIGNvbXBvbmVudFJlbmRlcmVyLmJ1dHRvbiA9IHtcclxuICAgICAgdGV4dCxcclxuICAgICAgZXh0cmFDbGFzc2VzLFxyXG4gICAgICB0eXBlOiBpc1N1Ym1pdCA/ICdzdWJtaXQnIDogJ2J1dHRvbicsXHJcbiAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxyXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2ssXHJcbiAgICAgIGNsYXNzOiAoc3R5bGUgJiYgc3R5bGUuY2xhc3MpIHx8IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5jbGljay5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJRmllbGQsIElGaWVsZFJlZmVyZW5jZSwgSVN0YW1wRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YW1wUmVuZGVyZXIsIElTdGFtcCB9IGZyb20gJy4uL3JlbmRlcmVycy9zdGFtcC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1zdGFtcC1maWVsZC1ob3N0JyxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBkZVJlQ3J1ZENvbXBvbmVudEhvc3Q+PC9uZy10ZW1wbGF0ZT5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGFtcEZpZWxkSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcclxuICBASW5wdXQoKSBzdHJ1Y3Q6IHN0cmluZztcclxuICBASW5wdXQoKSBibG9jazogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBJRmllbGQ7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuICBmaWVsZFJlZmVyZW5jZTogSUZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuXHJcbiAgICBjb25zdCBmaWVsZFJlZmVyZW5jZSA9IHRoaXMuc3RhdGUuYmxvY2tzW1xyXG4gICAgICBgJHt0aGlzLnN0cnVjdH0tJHt0aGlzLmJsb2NrfWBcclxuICAgIF0uZmllbGRzLmZpbmQoeCA9PiB4LmZpZWxkID09PSB0aGlzLmZpZWxkLm5hbWUpO1xyXG5cclxuICAgIHRoaXMuZmllbGRSZWZlcmVuY2UgPSBmaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG91bGRSZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFJlZmVyZW5jZS5jb25kaXRpb24oXHJcbiAgICAgIHRoaXMuZm9ybS52YWx1ZSxcclxuICAgICAgdGhpcy5zdGF0ZS5mb3JtLnJvb3QudmFsdWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5maWVsZC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N0YW1wJzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLnN0YW1wQ29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgJHt0aGlzLmZpZWxkLnR5cGV9IGNvbnRyb2wgaXMgbm90IHN1cHBvcnRlZC5gLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8U3RhbXBSZW5kZXJlcj50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICBjb25zdCBzdGFtcEZpZWxkID0gPElTdGFtcEZpZWxkPnRoaXMuZmllbGQ7XHJcblxyXG4gICAgY29uc3Qgc3RhbXA6IElTdGFtcCA9IHtcclxuICAgICAgdGV4dDogc3RhbXBGaWVsZC5sYWJlbCxcclxuICAgICAgaGVhZGVyU2l6ZTogdGhpcy5zdGF0ZS5vcHRpb25zLmhlYWRlclNpemVcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHN0YW1wRmllbGQuaGludHMpIHtcclxuICAgICAgaWYgKHN0YW1wRmllbGQuaGludHMuaGVhZGVyU2l6ZSkge1xyXG4gICAgICAgIHN0YW1wLmhlYWRlclNpemUgPSBzdGFtcEZpZWxkLmhpbnRzLmhlYWRlclNpemU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzdGFtcEZpZWxkLmhpbnRzLmRpc3BsYXlDbGFzc05hbWVzKSB7XHJcbiAgICAgICAgc3RhbXAuY2xhc3NlcyA9IHN0YW1wRmllbGQuaGludHMuZGlzcGxheUNsYXNzTmFtZXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmV2aW91c1N0YW1wID0gY29tcG9uZW50UmVuZGVyZXIuc3RhbXA7XHJcbiAgICBjb21wb25lbnRSZW5kZXJlci5zdGFtcCA9IHN0YW1wO1xyXG5cclxuICAgIGNvbnN0IG9uQ29tcG9uZW50Q2hhbmdlID0gKDxPbkNoYW5nZXM+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlKVxyXG4gICAgICAubmdPbkNoYW5nZXM7XHJcblxyXG4gICAgaWYgKG9uQ29tcG9uZW50Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0ge1xyXG4gICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzU3RhbXAsXHJcbiAgICAgICAgY3VycmVudFZhbHVlOiBzdGFtcCxcclxuICAgICAgICBmaXJzdENoYW5nZTogdHlwZW9mIHByZXZpb3VzU3RhbXAgPT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgb25Db21wb25lbnRDaGFuZ2UuY2FsbChjb21wb25lbnRSZW5kZXJlciwgeyBjb250cm9sOiBjaGFuZ2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJRmllbGQgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1mb3JtLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCI+XHJcbiAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZmllbGQudHlwZVwiPlxyXG4gICAgPGRlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdFxyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3N0YW1wJ1wiXHJcbiAgICAgIFtmb3JtSWRdPVwiZm9ybUlkXCJcclxuICAgICAgW2Zvcm1dPVwiZm9ybVwiXHJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiXHJcbiAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdD5cclxuICAgIDxkZS1yZS1jcnVkLWlucHV0LWZpZWxkLWhvc3RcclxuICAgICAgKm5nU3dpdGNoRGVmYXVsdFxyXG4gICAgICBbZm9ybUlkXT1cImZvcm1JZFwiXHJcbiAgICAgIFtmb3JtXT1cImZvcm1cIlxyXG4gICAgICBbcGFyZW50UGF0aF09XCJwYXJlbnRQYXRoXCJcclxuICAgICAgW3BhcmVudEZvcm1dPVwicGFyZW50Rm9ybVwiXHJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiXHJcbiAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtaW5wdXQtZmllbGQtaG9zdD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Ib3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX3N0cnVjdDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2Jsb2NrOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcclxuICBASW5wdXQoKSBmaWVsZHM6IElGaWVsZFtdO1xyXG4gIEBJbnB1dCgpIHBhcmVudEZvcm06IEFic3RyYWN0Q29udHJvbDtcclxuICBASW5wdXQoKSBwYXJlbnRQYXRoOiBzdHJpbmc7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgZ2V0IHN0cnVjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdHJ1Y3QgfHwgdGhpcy5zdGF0ZS5vcHRpb25zLnN0cnVjdDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHN0cnVjdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9zdHJ1Y3QgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBibG9jaygpIHtcclxuICAgIHJldHVybiB0aGlzLl9ibG9jayB8fCB0aGlzLnN0YXRlLm9wdGlvbnMuYmxvY2s7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBibG9jayh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9ibG9jayA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmZvcm1JZCAmJiAhY2hhbmdlcy5mb3JtSWQuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vaG9zdHMvY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSW5wdXRGaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2hvc3RzL2lucHV0LWZpZWxkLWhvc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQnV0dG9uSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvYnV0dG9uLWhvc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2hvc3RzL2NvbGxlY3Rpb24tZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFtcEZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvc3RhbXAtZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvZm9ybS1ob3N0L2Zvcm0taG9zdC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENvbXBvbmVudEhvc3REaXJlY3RpdmUsXHJcbiAgICBJbnB1dEZpZWxkSG9zdENvbXBvbmVudCxcclxuICAgIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50LFxyXG4gICAgQnV0dG9uSG9zdENvbXBvbmVudCxcclxuICAgIENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQsXHJcbiAgICBGb3JtSG9zdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVN0YXRlU2VydmljZSwgRm9ybUJ1aWxkZXJTZXJ2aWNlXSxcclxuICBleHBvcnRzOiBbSW5wdXRGaWVsZEhvc3RDb21wb25lbnQsIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50LCBCdXR0b25Ib3N0Q29tcG9uZW50LCBGb3JtSG9zdENvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkQ29yZU1vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZE9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9vcHRpb25zJztcclxuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN1Ym1pc3Npb24sIEZvcm1TdWJtaXNzaW9uRXJyb3JzIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1zdWJtaXNzaW9uJztcclxuaW1wb3J0IHsgRm9ybUNoYW5nZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL2Zvcm0tY2hhbmdlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8Zm9ybSAqbmdJZj1cInN0YXRlLmZvcm1cIiBbZm9ybUdyb3VwXT1cInN0YXRlLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1mb3JtLWhvc3QgW2Zvcm1JZF09XCJzdGF0ZS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImZvcm1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3RydWN0XT1cInN0cnVjdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtibG9ja109XCJibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRQYXRoXT1cInBhcmVudFBhdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50Rm9ybV09XCJwYXJlbnRGb3JtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZpZWxkc109XCJmaWVsZHNcIj5cclxuICA8L2RlLXJlLWNydWQtZm9ybS1ob3N0PlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0IHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtSWRdPVwic3RhdGUuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhc3VibWl0RW5hYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dD1cIlN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU3VibWl0KCRldmVudClcIj5cclxuICA8L2RlLXJlLWNydWQtYnV0dG9uLWhvc3Q+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3QgKm5nSWY9XCJjYW5jZWxWaXNpYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2FuY2VsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUlkXT1cInN0YXRlLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNhbmNlbEVuYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ9XCJDYW5jZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgkZXZlbnQpXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJ1dHRvbi1ob3N0PlxyXG48L2Zvcm0+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9jYW5jZWxWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnM7XHJcbiAgQElucHV0KCkgdmFsdWU6IG9iamVjdDtcclxuICBASW5wdXQoKSBlcnJvcnM6IEZvcm1TdWJtaXNzaW9uRXJyb3JzO1xyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybUNoYW5nZT4oKTtcclxuICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtU3VibWlzc2lvbj4oKTtcclxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGZpZWxkczogSUZpZWxkW107XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuICBzdWJtaXR0aW5nOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSkge31cclxuXHJcbiAgZ2V0IGNhbmNlbFZpc2libGUoKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLnN0YXRlLm5hdmlnYXRpb25TdGFjay5sZW5ndGggfHwgdGhpcy5fY2FuY2VsVmlzaWJsZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNhbmNlbFZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2NhbmNlbFZpc2libGUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBzdWJtaXRFbmFibGVkKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnN1Ym1pdHRpbmcgJiYgdGhpcy5mb3JtLnZhbGlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbmNlbEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuc3VibWl0dGluZztcclxuICB9XHJcblxyXG4gIGdldCBzdHJ1Y3QoKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyBuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5zdHJ1Y3RcclxuICAgICAgOiB0aGlzLnN0YXRlLm9wdGlvbnMuc3RydWN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJsb2NrKCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0uYmxvY2tcclxuICAgICAgOiB0aGlzLnN0YXRlLm9wdGlvbnMuYmxvY2s7XHJcbiAgfVxyXG5cclxuICBnZXQgZm9ybSgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IHRoaXMuc3RhdGUuZm9ybS5nZXQobmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGF0aClcclxuICAgICAgOiB0aGlzLnN0YXRlLmZvcm07XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyZW50UGF0aCgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLnBhcmVudFBhdGhcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmVudEZvcm0oKTogKEFic3RyYWN0Q29udHJvbCB8IG51bGwpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IHRoaXMuc3RhdGUuZm9ybS5nZXQobmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGFyZW50UGF0aClcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuY3JlYXRlKHRoaXMub3B0aW9ucywgdGhpcy52YWx1ZSwgdGhpcy5lcnJvcnMpO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5vbk5hdmlnYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGNoYW5nZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLnZhbHVlICYmICFjaGFuZ2VzLnZhbHVlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnVwZGF0ZSh0aGlzLnN0YXRlLmlkLCBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZXJyb3JzICYmICFjaGFuZ2VzLmVycm9ycy5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5zZXRFcnJvcnModGhpcy5zdGF0ZS5pZCwgY2hhbmdlcy5lcnJvcnMuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX25hdmlnYXRpb25DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlU2VydmljZS5yZW1vdmUodGhpcy5zdGF0ZS5pZCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCB7IG9wdGlvbnMsIG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBsZXQgc3RydWN0O1xyXG4gICAgbGV0IGJsb2NrO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkID0gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFjay5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAoeyBzdHJ1Y3QsIGJsb2NrIH0gPSBjaGlsZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAoeyBzdHJ1Y3QsIGJsb2NrIH0gPSBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBibG9ja0ZpZWxkcyA9IHRoaXMuZ2V0QmxvY2tGaWVsZHMoc3RydWN0LCBibG9jayk7XHJcblxyXG4gICAgdGhpcy5maWVsZHMgPSBibG9ja0ZpZWxkcztcclxuICB9XHJcblxyXG4gIGdldEJsb2NrRmllbGRzKHN0cnVjdDogc3RyaW5nLCBibG9ja05hbWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgeyBibG9ja3MsIGZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmICghYmxvY2tzIHx8ICFmaWVsZHMpIHtcclxuICAgICAgIC8vIFRPRE86IExvZyBlcnJvclxyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvY2sgPSBibG9ja3NbYCR7c3RydWN0fS0ke2Jsb2NrTmFtZX1gXTtcclxuXHJcbiAgICBpZiAoIWJsb2NrKSB7XHJcbiAgICAgIC8vIFRPRE86IExvZyBlcnJvclxyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IGJsb2NrLmZpZWxkcztcclxuXHJcbiAgICBjb25zdCBibG9ja0ZpZWxkcyA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVmZXJlbmNlIG9mIHJlZmVyZW5jZXMpIHtcclxuICAgICAgYmxvY2tGaWVsZHMucHVzaChmaWVsZHNbYCR7c3RydWN0fS0ke3JlZmVyZW5jZS5maWVsZH1gXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJsb2NrRmllbGRzO1xyXG4gIH1cclxuXHJcbiAgb25DYW5jZWwoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY2FuY2VsRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUubmF2aWdhdGlvblN0YWNrLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5wb3BOYXZpZ2F0aW9uKHRoaXMuc3RhdGUuaWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xyXG4gICAgdGhpcy5zdGF0ZS5mb3JtLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5zdWJtaXRFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZS5uYXZpZ2F0aW9uU3RhY2subGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLmNvbXBsZXRlTmF2aWdhdGlvbih0aGlzLnN0YXRlLmlkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VibWl0dGluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zdWJtaXQuZW1pdCh7XHJcbiAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmZvcm0udmFsdWUsXHJcbiAgICAgIG9uQ29tcGxldGU6IChlcnJvcnMpID0+IHtcclxuICAgICAgICBpZiAoIWVycm9ycykge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UuY2xlYXJFcnJvcnModGhpcy5zdGF0ZS5pZCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmZvcm0ucmVzZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uuc2V0RXJyb3JzKHRoaXMuc3RhdGUuaWQsIGVycm9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN1Ym1pdHRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkQ29yZU1vZHVsZSB9IGZyb20gJy4uL2NvcmUvY29yZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Zvcm0uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRGVSZUNydWRDb3JlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGb3JtQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbRm9ybUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkRm9ybXNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IElDb250cm9sIH0gZnJvbSAnLi9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9ySGVscGVyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfZXJyb3JTb3J0ID0gWydyZXF1aXJlZCddO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXRGb3JtQ29udHJvbElmRXJyb3JGb3VuZChjb250cm9sOiBJQ29udHJvbCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBjb250cm9sLmZvcm0uZ2V0KGNvbnRyb2wuZmllbGQubmFtZSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIWZvcm1Db250cm9sLmVycm9ycyB8fCAhZm9ybUNvbnRyb2wudG91Y2hlZCkgJiZcclxuICAgICAgIWNvbnRyb2wuc3VibWlzc2lvbkVycm9ycy5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaGFzRXJyb3IoY29udHJvbDogSUNvbnRyb2wpIHtcclxuICAgIHJldHVybiAhIXRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RXJyb3JzKGNvbnRyb2w6IElDb250cm9sKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgICBpZiAoIWZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnRlZEVycm9ycyA9IFtdO1xyXG4gICAgY29uc3QgdW5zb3J0ZWRFcnJvcnMgPSBbXTtcclxuXHJcbiAgICBpZiAoZm9ybUNvbnRyb2wuZXJyb3JzICYmIGZvcm1Db250cm9sLnRvdWNoZWQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybUNvbnRyb2wuZXJyb3JzKSkge1xyXG4gICAgICAgIGNvbnN0IHNvcnQgPSB0aGlzLl9lcnJvclNvcnRba2V5XTtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGZvcm1Db250cm9sLmVycm9yc1trZXldO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB1bnNvcnRlZEVycm9ycy5wdXNoKHsga2V5LCBtZXRhZGF0YSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc29ydGVkRXJyb3JzLnB1c2goeyBrZXksIG1ldGFkYXRhLCBzb3J0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0ZWRFcnJvcnNcclxuICAgICAgLnNvcnQoeCA9PiB4LnNvcnQpXHJcbiAgICAgIC5jb25jYXQodW5zb3J0ZWRFcnJvcnMpXHJcbiAgICAgIC5tYXAodGhpcy5nZXRFcnJvck1lc3NhZ2UpXHJcbiAgICAgIC5jb25jYXQoY29udHJvbC5zdWJtaXNzaW9uRXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFcnJvck1lc3NhZ2UoZXJyb3I6IHsga2V5OiBzdHJpbmc7IG1ldGFkYXRhOiBhbnkgfSkge1xyXG4gICAgc3dpdGNoIChlcnJvci5rZXkpIHtcclxuICAgICAgY2FzZSAncmVxdWlyZWQnOlxyXG4gICAgICAgIHJldHVybiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nO1xyXG4gICAgICBjYXNlICdtaW5sZW5ndGgnOlxyXG4gICAgICAgIHJldHVybiBgVGhpcyBmaWVsZCBtdXN0IGhhdmUgYXQgbGVhc3QgJHtcclxuICAgICAgICAgIGVycm9yLm1ldGFkYXRhLnJlcXVpcmVkTGVuZ3RoXHJcbiAgICAgICAgfSBjaGFyYWN0ZXJzLmA7XHJcbiAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgcmV0dXJuIGBUaGlzIGZpZWxkIGNhbiBub3QgZXhjZWVkICR7XHJcbiAgICAgICAgICBlcnJvci5tZXRhZGF0YS5yZXF1aXJlZExlbmd0aFxyXG4gICAgICAgIH0gY2hhcmFjdGVycy5gO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBgVmFsaWRhdGlvbiBmYWlsZWQgd2l0aCBlcnJvcjogJHtlcnJvcn1gO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uLWVycm9yLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cImdldENsYXNzZXMoKVwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9kaXY+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb250cm9sO1xyXG5cclxuICBnZXRDbGFzc2VzKCkge1xyXG4gICAgY29uc3QgaGFzRXJyb3IgPSBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuaGFzRXJyb3IodGhpcy5jb250cm9sKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAnaGFzLWVycm9yJzogaGFzRXJyb3IsXHJcbiAgICAgICdoYXMtZmVlZGJhY2snOiBoYXNFcnJvclxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVSZUNydWRQcm92aWRlck1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWlucHV0LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlcj5cclxuICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICBbdHlwZV09XCJjb250cm9sLnJlbmRlcmVyVHlwZVwiXHJcbiAgICAgICAgIFtpZF09XCJjb250cm9sLmh0bWxJZFwiXHJcbiAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wuZmllbGQubmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgKGZvY3VzKT1cImNvbnRyb2wub25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgKGJsdXIpPVwiY29udHJvbC5vbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIChpbnB1dCk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIiAvPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSVNlbGVjdENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXNlbGVjdC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtmb3JtR3JvdXBdPVwiY29udHJvbC5mb3JtXCI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+PC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXI+XHJcbiAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5odG1sSWRcIlxyXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgIChmb2N1cyk9XCJjb250cm9sLm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgICAoYmx1cik9XCJjb250cm9sLm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgIChjaGFuZ2UpPVwiY29udHJvbC5vbkNoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29udHJvbC5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiPnt7b3B0aW9uLmxhYmVsfX08L29wdGlvbj5cclxuICA8L3NlbGVjdD5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElTZWxlY3RDb250cm9sO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIFtodG1sRm9yXT1cImNvbnRyb2wuaHRtbElkXCI+e3tjb250cm9sLmZpZWxkLmxhYmVsfX08L2xhYmVsPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzTGFiZWxSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbnB1dCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJ1dHRvblJlbmRlcmVyLCBJQnV0dG9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvYnV0dG9uLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWJ1dHRvbi1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgW25nQ2xhc3NdPVwiY2xhc3Nlc1wiXHJcbiAgICAgICAgW3R5cGVdPVwiYnV0dG9uLnR5cGVcIlxyXG4gICAgICAgIFtkaXNhYmxlZF09XCJidXR0b24uZGlzYWJsZWRcIlxyXG4gICAgICAgIChjbGljayk9XCJidXR0b24ub25DbGljaygkZXZlbnQpXCI+XHJcbiAge3tidXR0b24udGV4dH19XHJcbjwvYnV0dG9uPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzQnV0dG9uUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQnV0dG9uUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGJ1dHRvbjogSUJ1dHRvbjtcclxuICBfY2xhc3Nlczogc3RyaW5nW107XHJcblxyXG4gIGdldCBjbGFzc2VzKCkge1xyXG4gICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGlmICh0aGlzLl9jbGFzc2VzKSB7XHJcbiAgICAgIGNsYXNzZXMgPSB0aGlzLl9jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJ1dHRvbi5leHRyYUNsYXNzZXMpIHtcclxuICAgICAgY2xhc3NlcyA9IChjbGFzc2VzIHx8IFtdKS5jb25jYXQodGhpcy5idXR0b24uZXh0cmFDbGFzc2VzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xhc3NlcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5idXR0b24pIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNoYW5nZXMuYnV0dG9uLmN1cnJlbnRWYWx1ZS50eXBlICE9PVxyXG4gICAgICAgIGNoYW5nZXMuYnV0dG9uLnByZXZpb3VzVmFsdWUudHlwZVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ2xhc3NlcygpIHtcclxuICAgIGlmICh0aGlzLmJ1dHRvbi5jbGFzcykge1xyXG4gICAgICB0aGlzLl9jbGFzc2VzID0gW3RoaXMuYnV0dG9uLmNsYXNzXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAodGhpcy5idXR0b24udHlwZSkge1xyXG4gICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgIHRoaXMuX2NsYXNzZXMgPSBbJ2J0bi1wcmltYXJ5J107XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5fY2xhc3NlcyA9IFsnYnRuLWRlZmF1bHQnXTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyLCBJQ29sbGVjdGlvbkNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvc2NoZW1hJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXRhYmxlLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgPGRlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXIgW3N0YW1wXT1cImNvbnRyb2wuc3RhbXBcIj5cclxuICA8L2RlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3RcclxuICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgZXh0cmFDbGFzc2VzPVwiYnRuLXNtXCJcclxuICAgIHRleHQ9XCJBZGRcIlxyXG4gICAgKGNsaWNrKT1cImNvbnRyb2wub25BZGQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwidGFibGUtY29udHJvbC1jb250YWluZXJcIj5cclxuICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgIDx0aGVhZD5cclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29udHJvbC5uZXN0ZWRGaWVsZHNcIj5cclxuICAgICAgICAgIHt7ZmllbGQubGFiZWx9fVxyXG4gICAgICAgIDwvdGg+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5PlxyXG4gICAgICA8dHIgKm5nSWY9XCIhY29udHJvbC5uZXN0ZWRWYWx1ZXMubGVuZ3RoXCI+XHJcbiAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+Tm9uZTwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZm9ybSBvZiBjb250cm9sLm5lc3RlZFZhbHVlc1wiPlxyXG4gICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29udHJvbC5uZXN0ZWRGaWVsZHNcIiBbaW5uZXJIdG1sXT1cImdldFZhbHVlKGZpZWxkLCBmb3JtLnZhbHVlKVwiPjwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3Rib2R5PlxyXG4gIDwvdGFibGU+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AudGFibGUtY29udHJvbC1jb250YWluZXJ7bWFyZ2luLXRvcDoxMHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxuXHJcbiAgZ2V0VmFsdWUoZmllbGQ6IElGaWVsZCwgdmFsdWU6IGFueSkge1xyXG4gICAgY29uc3QgZmllbGRWYWx1ZSA9IHZhbHVlW2ZpZWxkLm5hbWVdO1xyXG5cclxuICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwgfHwgdHlwZW9mIGZpZWxkVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiAnJm5ic3A7JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmllbGRWYWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1jaGVja2JveC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtmb3JtR3JvdXBdPVwiY29udHJvbC5mb3JtXCI+XHJcbiAgPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+XHJcbiAgICA8bGFiZWwgW2h0bWxGb3JdPVwiY29udHJvbC5odG1sSWRcIj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgW2lkXT1cImNvbnRyb2wuaHRtbElkXCJcclxuICAgICAgICBbbmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAoZm9jdXMpPVwiY29udHJvbC5vbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgIChibHVyKT1cImNvbnRyb2wub25CbHVyKCRldmVudClcIlxyXG4gICAgICAgIChpbnB1dCk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIiAvPiB7e2NvbnRyb2wuZmllbGQubGFiZWx9fVxyXG4gICAgPC9sYWJlbD5cclxuICA8L2Rpdj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3RDb250cm9sUmVuZGVyZXIsIElTZWxlY3RDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvckhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8cCAqbmdJZj1cImNvbnRyb2wuZmllbGQuaGVscCAmJiAhaGFzRXJyb3IoKVwiIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7Y29udHJvbC5maWVsZC5oZWxwfX08L3A+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNIZWxwUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBTZWxlY3RDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElTZWxlY3RDb250cm9sO1xyXG5cclxuICBoYXNFcnJvcigpIHtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuaGFzRXJyb3IodGhpcy5jb250cm9sKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvckhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0Vycm9yKClcIlxyXG4gIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInZhbGlkYXRpb25FcnJvcnNcIlxyXG4gIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGVycm9yczogZ2V0RXJyb3JzKCkgfVwiPlxyXG48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdmFsaWRhdGlvbkVycm9ycyBsZXQtZXJyb3JzPVwiZXJyb3JzXCI+XHJcbiAgPG5nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvcnNcIiBjbGFzcz1cImhlbHAtYmxvY2tcIj5cclxuICAgICAge3tlcnJvcn19XHJcbiAgICA8L3A+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNWYWxpZGF0aW9uRXJyb3JzUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb250cm9sO1xyXG5cclxuICBoYXNFcnJvcigpIHtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuaGFzRXJyb3IodGhpcy5jb250cm9sKTtcclxuICB9XHJcblxyXG4gIGdldEVycm9ycygpIHtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuZ2V0RXJyb3JzKHRoaXMuY29udHJvbCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyLCBJQ29sbGVjdGlvbkNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWlubGluZS1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2PlxyXG4gIDxkZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyIFtzdGFtcF09XCJjb250cm9sLnN0YW1wXCI+XHJcbiAgPC9kZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyPlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0XHJcbiAgICAqbmdJZj1cImNvbnRyb2wuY2FuQWRkXCJcclxuICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgZXh0cmFDbGFzc2VzPVwiYnRuLXNtXCJcclxuICAgIHRleHQ9XCJBZGRcIlxyXG4gICAgKGNsaWNrKT1cImNvbnRyb2wub25BZGQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiaW5saW5lLWNvbnRyb2wtY29udGFpbmVyXCI+XHJcbiAgPHNwYW4gKm5nSWY9XCIhY29udHJvbC5uZXN0ZWRWYWx1ZXMubGVuZ3RoXCI+Tm9uZTwvc3Bhbj5cclxuICA8ZGl2ICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBjb250cm9sLm5lc3RlZFZhbHVlc1wiPlxyXG4gICAgPGRlLXJlLWNydWQtZm9ybS1ob3N0XHJcbiAgICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgICBbZm9ybV09XCJ2YWx1ZVwiXHJcbiAgICAgIFtwYXJlbnRQYXRoXT1cImNvbnRyb2wuZm9ybVBhdGhcIlxyXG4gICAgICBbcGFyZW50Rm9ybV09XCJjb250cm9sLnZhbHVlXCJcclxuICAgICAgW2ZpZWxkc109XCJjb250cm9sLm5lc3RlZEZpZWxkc1wiXHJcbiAgICAgIFtzdHJ1Y3RdPVwiY29udHJvbC5maWVsZC5yZWZlcmVuY2Uuc3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImNvbnRyb2wuZmllbGQucmVmZXJlbmNlLmJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtZm9ybS1ob3N0PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlubGluZS1jb250cm9sLWNvbnRhaW5lcnttYXJnaW4tdG9wOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyIHtcclxuICBjb250cm9sOiBJQ29sbGVjdGlvbkNvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGFtcFJlbmRlcmVyLCBJU3RhbXAgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9zdGFtcC5yZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwic3RhbXAuaGVhZGVyU2l6ZVwiPlxyXG4gIDxoMSAqbmdTd2l0Y2hDYXNlPVwiMVwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDE+XHJcbiAgPGgyICpuZ1N3aXRjaENhc2U9XCIyXCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oMj5cclxuICA8aDMgKm5nU3dpdGNoQ2FzZT1cIjNcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2gzPlxyXG4gIDxoNCAqbmdTd2l0Y2hDYXNlPVwiNFwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDQ+XHJcbiAgPGg1ICpuZ1N3aXRjaENhc2U9XCI1XCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oNT5cclxuICA8aDYgKm5nU3dpdGNoQ2FzZT1cIjZcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2g2PlxyXG4gIDxwICpuZ1N3aXRjaERlZmF1bHQgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9wPlxyXG48L25nLWNvbnRhaW5lcj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBTdGFtcFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBzdGFtcDogSVN0YW1wO1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyL2NvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERlUmVDcnVkQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlIH0gZnJvbSAnLi4vcHJvdmlkZXIvcHJvdmlkZXIubW9kdWxlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2lucHV0LXJlbmRlcmVyL2lucHV0LXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzTGFiZWxSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vbGFiZWwtcmVuZGVyZXIvbGFiZWwtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24tcmVuZGVyZXIvYnV0dG9uLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yZW5kZXJlci90YWJsZS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gtcmVuZGVyZXIvY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0hlbHBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaGVscC1yZW5kZXJlci9oZWxwLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNWYWxpZGF0aW9uRXJyb3JzUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3ZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyL3ZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaW5saW5lLXJlbmRlcmVyL2lubGluZS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vc3RhbXAtcmVuZGVyZXIvc3RhbXAtcmVuZGVyZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRGVSZUNydWRDb3JlTW9kdWxlLCBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNMYWJlbFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNIZWxwUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzVmFsaWRhdGlvbkVycm9yc1JlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1NlbGVjdFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0RlUmVDcnVkUHJvdmlkZXJNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIHByb3ZpZGVyU2VydmljZS5yZWdpc3RlcignYm9vdHN0cmFwMycsIHtcclxuICAgICAgc3RhbXBDb21wb25lbnQ6IEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBjb250YWluZXJDb21wb25lbnQ6IEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGlucHV0Q29tcG9uZW50OiBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgc2VsZWN0Q29tcG9uZW50OiBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGJ1dHRvbkNvbXBvbmVudDogQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICB0YWJsZUNvbXBvbmVudDogQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGlubGluZUNvbXBvbmVudDogQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBjaGVja2JveENvbXBvbmVudDogQm9vdHN0cmFwM0NoZWNrYm94UmVuZGVyZXJDb21wb25lbnRcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX3ZhbHVlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0lBT0UsZ0NBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0tBQUk7O2dCQUwxRCxTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3BDOzs7O2dCQUxtQixnQkFBZ0I7O2lDQUFwQzs7Ozs7OztBQ0FBOztzQkFLZ0UsRUFBRTs7Ozs7OztJQUVoRSwwQ0FBUTs7Ozs7SUFBUixVQUFTLElBQVksRUFBRSxPQUFnQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztLQUM3Qjs7Ozs7SUFFRCxxQ0FBRzs7OztJQUFILFVBQUksSUFBWTs7UUFDZCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWEsSUFBSSw2RkFBMEYsQ0FBQyxDQUFDO1NBQzlIO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7O2dCQWZGLFVBQVU7O2tDQUhYOzs7Ozs7OztBQ0VBLElBQWEsbUJBQW1CLEdBQUcsVUFBQyxPQUF3Qjs7SUFDMUQsSUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBRS9ELE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0NBQ2xELENBQUM7Ozs7Ozs7SUNjQSw0QkFBb0IsRUFBZTtRQUFmLE9B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