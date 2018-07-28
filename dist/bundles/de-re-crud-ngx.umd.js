(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@de-re-crud/ngx', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/common'], factory) :
    (factory((global['de-re-crud'] = global['de-re-crud'] || {}, global['de-re-crud'].ngx = {}),global.ng.core,global.ng.forms,global.rxjs,global.ng.common));
}(this, (function (exports,core,forms,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ComponentHostDirective = /** @class */ (function () {
        function ComponentHostDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        ComponentHostDirective.decorators = [
            { type: core.Directive, args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: '[deReCrudComponentHost]'
                    },] },
        ];
        /** @nocollapse */
        ComponentHostDirective.ctorParameters = function () {
            return [
                { type: core.ViewContainerRef }
            ];
        };
        return ComponentHostDirective;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            { type: core.Injectable },
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
                if (value === void 0) {
                    value = {};
                }
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                if (value === void 0) {
                    value = [];
                }
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
                    if (parent instanceof forms.FormGroup &&
                        !fieldReference.condition(parent.value, root.value)) {
                        return null;
                    }
                    if (field.required) {
                        validators.push(forms.Validators.required, whitespaceValidator);
                    }
                    if (( /** @type {?} */(field)).minLength) {
                        validators.push(forms.Validators.minLength(( /** @type {?} */(field)).minLength));
                    }
                    if (( /** @type {?} */(field)).maxLength) {
                        validators.push(forms.Validators.maxLength(( /** @type {?} */(field)).maxLength));
                    }
                    if (( /** @type {?} */(field)).min) {
                        validators.push(forms.Validators.min(( /** @type {?} */(field)).min));
                    }
                    if (( /** @type {?} */(field)).max) {
                        validators.push(forms.Validators.max(( /** @type {?} */(field)).max));
                    }
                    if (!validators.length) {
                        return null;
                    }
                    return forms.Validators.compose(validators)(control);
                };
            };
        FormBuilderService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormBuilderService.ctorParameters = function () {
            return [
                { type: forms.FormBuilder }
            ];
        };
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
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_h && !_h.done && (_b = _g.return))
                                    _b.call(_g);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
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
                                catch (e_4_1) {
                                    e_4 = { error: e_4_1 };
                                }
                                finally {
                                    try {
                                        if (_m && !_m.done && (_d = _l.return))
                                            _d.call(_l);
                                    }
                                    finally {
                                        if (e_4)
                                            throw e_4.error;
                                    }
                                }
                                blocks.push(block);
                                struct.blocks.push(block.name);
                            }
                        }
                        catch (e_3_1) {
                            e_3 = { error: e_3_1 };
                        }
                        finally {
                            try {
                                if (_k && !_k.done && (_c = _j.return))
                                    _c.call(_j);
                            }
                            finally {
                                if (e_3)
                                    throw e_3.error;
                            }
                        }
                        structs.push(struct);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return))
                            _a.call(_e);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                    onSubmissionErrorsChange: new rxjs.Subject(),
                    navigationStack: [],
                    onNavigationChange: new rxjs.Subject(),
                    onValueChange: new rxjs.Subject()
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
                ( /** @type {?} */(state.onValueChange)).next({
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
                ( /** @type {?} */(state.onNavigationChange)).next(childId);
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
                ( /** @type {?} */(state.onSubmissionErrorsChange)).next(state.submissionErrors);
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        FormStateService.ctorParameters = function () {
            return [
                { type: FormBuilderService }
            ];
        };
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
                var reference = ( /** @type {?} */(_this.control.field)).reference;
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
                var onComponentChange = ( /** @type {?} */(this._componentRef.instance)).ngOnChanges;
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-collection-field-host',
                        template: "<ng-template deReCrudComponentHost></ng-template>"
                    },] },
        ];
        /** @nocollapse */
        CollectionFieldHostComponent.ctorParameters = function () {
            return [
                { type: FormStateService },
                { type: core.ComponentFactoryResolver },
                { type: DeReCrudProviderService }
            ];
        };
        CollectionFieldHostComponent.propDecorators = {
            componentHost: [{ type: core.ViewChild, args: [ComponentHostDirective,] }],
            control: [{ type: core.Input }]
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
             */ function () {
                /** @type {?} */
                var formPath = this.field.name;
                if (this.parentPath) {
                    /** @type {?} */
                    var parentPath = this.parentPath;
                    if (this.parentForm instanceof forms.FormArray) {
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
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (fieldReferences_1_1 && !fieldReferences_1_1.done && (_a = fieldReferences_1.return))
                                    _a.call(fieldReferences_1);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
                        }
                        /** @type {?} */
                        var nestedValues = [];
                        try {
                            for (var _d = __values(collectionControl.value.controls), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var nestedValue = _e.value;
                                nestedValues.push(/** @type {?} */ (nestedValue));
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_e && !_e.done && (_b = _d.return))
                                    _b.call(_d);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
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
                    var onComponentChange = ( /** @type {?} */(componentRef.instance)).ngOnChanges;
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
                catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                }
                finally {
                    try {
                        if (_g && !_g.done && (_c = _f.return))
                            _c.call(_f);
                    }
                    finally {
                        if (e_3)
                            throw e_3.error;
                    }
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-input-field-host',
                        template: "\n    <ng-template deReCrudComponentHost></ng-template>"
                    },] },
        ];
        /** @nocollapse */
        InputFieldHostComponent.ctorParameters = function () {
            return [
                { type: FormStateService },
                { type: core.ComponentFactoryResolver },
                { type: DeReCrudProviderService }
            ];
        };
        InputFieldHostComponent.propDecorators = {
            componentHost: [{ type: core.ViewChild, args: [ComponentHostDirective,] }],
            formId: [{ type: core.Input }],
            form: [{ type: core.Input }],
            struct: [{ type: core.Input }],
            block: [{ type: core.Input }],
            field: [{ type: core.Input }],
            parentForm: [{ type: core.Input }],
            parentPath: [{ type: core.Input }]
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
            this.click = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-button-host',
                        template: "<ng-template deReCrudComponentHost></ng-template>"
                    },] },
        ];
        /** @nocollapse */
        ButtonHostComponent.ctorParameters = function () {
            return [
                { type: FormStateService },
                { type: core.ComponentFactoryResolver },
                { type: DeReCrudProviderService }
            ];
        };
        ButtonHostComponent.propDecorators = {
            componentHost: [{ type: core.ViewChild, args: [ComponentHostDirective,] }],
            formId: [{ type: core.Input }],
            type: [{ type: core.Input }],
            extraClasses: [{ type: core.Input }],
            text: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            click: [{ type: core.Output }]
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
                var onComponentChange = ( /** @type {?} */(this._componentRef.instance))
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-stamp-field-host',
                        template: "<ng-template deReCrudComponentHost></ng-template>"
                    },] },
        ];
        /** @nocollapse */
        StampFieldHostComponent.ctorParameters = function () {
            return [
                { type: FormStateService },
                { type: core.ComponentFactoryResolver },
                { type: DeReCrudProviderService }
            ];
        };
        StampFieldHostComponent.propDecorators = {
            componentHost: [{ type: core.ViewChild, args: [ComponentHostDirective,] }],
            formId: [{ type: core.Input }],
            form: [{ type: core.Input }],
            struct: [{ type: core.Input }],
            block: [{ type: core.Input }],
            field: [{ type: core.Input }]
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
             */ function () {
                return this._struct || this.state.options.struct;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._struct = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormHostComponent.prototype, "block", {
            get: /**
             * @return {?}
             */ function () {
                return this._block || this.state.options.block;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-form-host',
                        template: "<ng-container *ngFor=\"let field of fields\">\n  <ng-container [ngSwitch]=\"field.type\">\n    <de-re-crud-stamp-field-host\n      *ngSwitchCase=\"'stamp'\"\n      [formId]=\"formId\"\n      [form]=\"form\"\n      [field]=\"field\"\n      [struct]=\"struct\"\n      [block]=\"block\">\n    </de-re-crud-stamp-field-host>\n    <de-re-crud-input-field-host\n      *ngSwitchDefault\n      [formId]=\"formId\"\n      [form]=\"form\"\n      [parentPath]=\"parentPath\"\n      [parentForm]=\"parentForm\"\n      [field]=\"field\"\n      [struct]=\"struct\"\n      [block]=\"block\">\n    </de-re-crud-input-field-host>\n  </ng-container>\n</ng-container>\n"
                    },] },
        ];
        /** @nocollapse */
        FormHostComponent.ctorParameters = function () {
            return [
                { type: FormStateService }
            ];
        };
        FormHostComponent.propDecorators = {
            formId: [{ type: core.Input }],
            form: [{ type: core.Input }],
            fields: [{ type: core.Input }],
            parentForm: [{ type: core.Input }],
            parentPath: [{ type: core.Input }],
            struct: [{ type: core.Input }],
            block: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.ReactiveFormsModule
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
            this.valueChange = new core.EventEmitter();
            this.submit = new core.EventEmitter();
            this.cancel = new core.EventEmitter();
        }
        Object.defineProperty(FormComponent.prototype, "cancelVisible", {
            get: /**
             * @return {?}
             */ function () {
                return !!this.state.navigationStack.length || this._cancelVisible;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                this._cancelVisible = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormComponent.prototype, "submitEnabled", {
            get: /**
             * @return {?}
             */ function () {
                return !this.submitting && this.form.valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormComponent.prototype, "cancelEnabled", {
            get: /**
             * @return {?}
             */ function () {
                return !this.submitting;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormComponent.prototype, "struct", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function () {
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
             */ function () {
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
             */ function () {
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
             */ function () {
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (references_1_1 && !references_1_1.done && (_a = references_1.return))
                            _a.call(references_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-form',
                        template: "<form *ngIf=\"state.form\" [formGroup]=\"state.form\">\n  <de-re-crud-form-host [formId]=\"state.id\"\n                        [form]=\"form\"\n                        [struct]=\"struct\"\n                        [block]=\"block\"\n                        [parentPath]=\"parentPath\"\n                        [parentForm]=\"parentForm\"\n                        [fields]=\"fields\">\n  </de-re-crud-form-host>\n  <de-re-crud-button-host type=\"submit\"\n                          [formId]=\"state.id\"\n                          [disabled]=\"!submitEnabled\"\n                          text=\"Submit\"\n                          (click)=\"onSubmit($event)\">\n  </de-re-crud-button-host>\n  <de-re-crud-button-host *ngIf=\"cancelVisible\"\n                          type=\"cancel\"\n                          [formId]=\"state.id\"\n                          [disabled]=\"!cancelEnabled\"\n                          text=\"Cancel\"\n                          (click)=\"onCancel($event)\">\n  </de-re-crud-button-host>\n</form>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        FormComponent.ctorParameters = function () {
            return [
                { type: FormStateService }
            ];
        };
        FormComponent.propDecorators = {
            options: [{ type: core.Input }],
            value: [{ type: core.Input }],
            errors: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            submit: [{ type: core.Output }],
            cancel: [{ type: core.Output }],
            cancelVisible: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            DeReCrudCoreModule,
                            forms.ReactiveFormsModule
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return))
                                _a.call(_b);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-control-container-renderer',
                        template: "<div class=\"form-group\" [ngClass]=\"getClasses()\">\n  <ng-content></ng-content>\n</div>\n"
                    },] },
        ];
        Bootstrap3ControlContainerRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-input-renderer',
                        template: "<ng-container [formGroup]=\"control.form\">\n  <de-re-crud-bootstrap3-label-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-label-renderer>\n  <input class=\"form-control\"\n         [type]=\"control.rendererType\"\n         [id]=\"control.htmlId\"\n         [name]=\"control.field.name\"\n         [formControlName]=\"control.field.name\"\n         (focus)=\"control.onFocus($event)\"\n         (blur)=\"control.onBlur($event)\"\n         (input)=\"control.onChange($event)\" />\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                    },] },
        ];
        Bootstrap3InputRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-select-renderer',
                        template: "<ng-container [formGroup]=\"control.form\">\n  <de-re-crud-bootstrap3-label-renderer [control]=\"control\"></de-re-crud-bootstrap3-label-renderer>\n  <select class=\"form-control\"\n          [id]=\"control.htmlId\"\n          [name]=\"control.field.name\"\n          [formControlName]=\"control.field.name\"\n          (focus)=\"control.onFocus($event)\"\n          (blur)=\"control.onBlur($event)\"\n          (change)=\"control.onChange($event)\">\n    <option *ngFor=\"let option of control.options\" [value]=\"option.value\">{{option.label}}</option>\n  </select>\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                    },] },
        ];
        Bootstrap3SelectRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-label-renderer',
                        template: "<label class=\"control-label\" [htmlFor]=\"control.htmlId\">{{control.field.label}}</label>\n"
                    },] },
        ];
        Bootstrap3LabelRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-button-renderer',
                        template: "<button class=\"btn\" [ngClass]=\"classes\"\n        [type]=\"button.type\"\n        [disabled]=\"button.disabled\"\n        (click)=\"button.onClick($event)\">\n  {{button.text}}\n</button>\n"
                    },] },
        ];
        Bootstrap3ButtonRendererComponent.propDecorators = {
            button: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-table-renderer',
                        template: "<div>\n  <de-re-crud-stamp-renderer [stamp]=\"control.stamp\">\n  </de-re-crud-stamp-renderer>\n  <de-re-crud-button-host\n    [formId]=\"control.formId\"\n    extraClasses=\"btn-sm\"\n    text=\"Add\"\n    (click)=\"control.onAdd($event)\">\n  </de-re-crud-button-host>\n</div>\n\n<div class=\"table-control-container\">\n  <table class=\"table table-bordered table-condensed\">\n    <thead>\n      <tr>\n        <th *ngFor=\"let field of control.nestedFields\">\n          {{field.label}}\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngIf=\"!control.nestedValues.length\">\n        <td colspan=\"100%\">None</td>\n      </tr>\n      <tr *ngFor=\"let form of control.nestedValues\">\n        <td *ngFor=\"let field of control.nestedFields\" [innerHtml]=\"getValue(field, form.value)\"></td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n",
                        styles: [".table-control-container{margin-top:10px}"]
                    },] },
        ];
        Bootstrap3TableRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-checkbox-renderer',
                        template: "<ng-container [formGroup]=\"control.form\">\n  <div class=\"checkbox\">\n    <label [htmlFor]=\"control.htmlId\">\n      <input type=\"checkbox\"\n        [id]=\"control.htmlId\"\n        [name]=\"control.field.name\"\n        [formControlName]=\"control.field.name\"\n        (focus)=\"control.onFocus($event)\"\n        (blur)=\"control.onBlur($event)\"\n        (input)=\"control.onChange($event)\" /> {{control.field.label}}\n    </label>\n  </div>\n  <de-re-crud-bootstrap3-help-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-help-renderer>\n  <de-re-crud-bootstrap3-validation-errors-renderer [control]=\"control\">\n  </de-re-crud-bootstrap3-validation-errors-renderer>\n</ng-container>\n"
                    },] },
        ];
        Bootstrap3CheckboxRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-help-renderer',
                        template: "<p *ngIf=\"control.field.help && !hasError()\" class=\"help-block\">{{control.field.help}}</p>\n"
                    },] },
        ];
        Bootstrap3HelpRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-bootstrap3-validation-errors-renderer',
                        template: "<ng-container *ngIf=\"hasError()\"\n  [ngTemplateOutlet]=\"validationErrors\"\n  [ngTemplateOutletContext]=\"{ errors: getErrors() }\">\n</ng-container>\n\n<ng-template #validationErrors let-errors=\"errors\">\n  <ng-container>\n    <p *ngFor=\"let error of errors\" class=\"help-block\">\n      {{error}}\n    </p>\n  </ng-container>\n</ng-template>\n"
                    },] },
        ];
        Bootstrap3ValidationErrorsRendererComponent.propDecorators = {
            control: [{ type: core.Input }]
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
            { type: core.Component, args: [{
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
            { type: core.Component, args: [{
                        selector: 'de-re-crud-stamp-renderer',
                        template: "<ng-container [ngSwitch]=\"stamp.headerSize\">\n  <h1 *ngSwitchCase=\"1\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h1>\n  <h2 *ngSwitchCase=\"2\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h2>\n  <h3 *ngSwitchCase=\"3\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h3>\n  <h4 *ngSwitchCase=\"4\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h4>\n  <h5 *ngSwitchCase=\"5\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h5>\n  <h6 *ngSwitchCase=\"6\" [ngClass]=\"stamp.classes\">{{stamp.text}}</h6>\n  <p *ngSwitchDefault [ngClass]=\"stamp.classes\">{{stamp.text}}</p>\n</ng-container>\n"
                    },] },
        ];
        Bootstrap3StampRendererComponent.propDecorators = {
            stamp: [{ type: core.Input }]
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
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.ReactiveFormsModule, DeReCrudCoreModule, DeReCrudProviderModule],
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
        Bootstrap3DeReCrudProviderModule.ctorParameters = function () {
            return [
                { type: DeReCrudProviderService }
            ];
        };
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

    exports.DeReCrudFormsModule = DeReCrudFormsModule;
    exports.Bootstrap3DeReCrudProviderModule = Bootstrap3DeReCrudProviderModule;
    exports.ɵa = DeReCrudCoreModule;
    exports.ɵh = ButtonHostComponent;
    exports.ɵi = CollectionFieldHostComponent;
    exports.ɵb = ComponentHostDirective;
    exports.ɵj = FormHostComponent;
    exports.ɵc = InputFieldHostComponent;
    exports.ɵg = StampFieldHostComponent;
    exports.ɵe = FormBuilderService;
    exports.ɵd = FormStateService;
    exports.ɵk = FormComponent;
    exports.ɵq = Bootstrap3ButtonRendererComponent;
    exports.ɵt = Bootstrap3CheckboxRendererComponent;
    exports.ɵm = Bootstrap3ControlContainerRendererComponent;
    exports.ɵu = Bootstrap3HelpRendererComponent;
    exports.ɵr = Bootstrap3InlineRendererComponent;
    exports.ɵn = Bootstrap3InputRendererComponent;
    exports.ɵp = Bootstrap3LabelRendererComponent;
    exports.ɵo = Bootstrap3SelectRendererComponent;
    exports.ɵw = Bootstrap3StampRendererComponent;
    exports.ɵs = Bootstrap3TableRendererComponent;
    exports.ɵv = Bootstrap3ValidationErrorsRendererComponent;
    exports.ɵl = DeReCrudProviderModule;
    exports.ɵf = DeReCrudProviderService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUtcmUtY3J1ZC1uZ3gudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZS50cyIsbnVsbCwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS92YWxpZGF0b3JzL3doaXRlc3BhY2UtdmFsaWRhdG9yLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tYnVpbGRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9jb2xsZWN0aW9uLWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2lucHV0LWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2J1dHRvbi1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9zdGFtcC1maWVsZC1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9jb3JlLm1vZHVsZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvZm9ybXMvZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvZm9ybXMvZm9ybXMubW9kdWxlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3ZhbGlkYXRpb24tZXJyb3ItaGVscGVyLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5tb2R1bGUudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2lucHV0LXJlbmRlcmVyL2lucHV0LXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2xhYmVsLXJlbmRlcmVyL2xhYmVsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvYnV0dG9uLXJlbmRlcmVyL2J1dHRvbi1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL3RhYmxlLXJlbmRlcmVyL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvY2hlY2tib3gtcmVuZGVyZXIvY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9oZWxwLXJlbmRlcmVyL2hlbHAtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2lubGluZS1yZW5kZXJlci9pbmxpbmUtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9zdGFtcC1yZW5kZXJlci9zdGFtcC1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2Jvb3RzdHJhcDMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnW2RlUmVDcnVkQ29tcG9uZW50SG9zdF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cclxufVxyXG5cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zIH0gZnJvbSAnLi9wcm92aWRlci1vcHRpb25zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9jYWNoZTogeyBbbmFtZTogc3RyaW5nXTogRGVSZUNydWRQcm92aWRlck9wdGlvbnMgfSA9IHt9O1xyXG5cclxuICByZWdpc3RlcihuYW1lOiBzdHJpbmcsIG9wdGlvbnM6IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zKSB7XHJcbiAgICB0aGlzLl9jYWNoZVtuYW1lXSA9IG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXQobmFtZTogc3RyaW5nKTogRGVSZUNydWRQcm92aWRlck9wdGlvbnMge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX2NhY2hlW25hbWVdO1xyXG4gICAgaWYgKCFvcHRpb25zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUHJvdmlkZXIgJyR7bmFtZX0nIGlzIG5vdCByZWdpc3RlcmVkLiBNYWtlIHN1cmUgcmVnaXN0ZXIobmFtZSwgb3B0aW9ucykgaXMgY2FsbGVkIGluIHRoZSBhcHBsaWNhdGlvIHJvb3QuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBjb25zdCB3aGl0ZXNwYWNlVmFsaWRhdG9yID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xyXG4gIGNvbnN0IGlzV2hpdGVTcGFjZSA9IChjb250cm9sLnZhbHVlIHx8ICcnKS50cmltKCkubGVuZ3RoID09PSAwO1xyXG5cclxuICByZXR1cm4gIWlzV2hpdGVTcGFjZSA/IG51bGwgOiB7IHJlcXVpcmVkOiB0cnVlIH07XHJcbn07XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgRm9ybUJ1aWxkZXIsXHJcbiAgRm9ybUdyb3VwLFxyXG4gIFZhbGlkYXRvcnMsXHJcbiAgRm9ybUFycmF5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1xyXG4gIElGaWVsZCxcclxuICBJVGV4dEZpZWxkLFxyXG4gIElMaW5rZWRTdHJ1Y3RGaWVsZCxcclxuICBJQmxvY2ssXHJcbiAgSUludGVnZXJGaWVsZCxcclxuICBJRmllbGRSZWZlcmVuY2VcclxufSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgd2hpdGVzcGFjZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvd2hpdGVzcGFjZS12YWxpZGF0b3InO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRm9ybUJ1aWxkZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge31cclxuXHJcbiAgZ3JvdXAoXHJcbiAgICBzdHJ1Y3Q6IHN0cmluZyxcclxuICAgIGJsb2NrTmFtZTogc3RyaW5nLFxyXG4gICAgYmxvY2tzOiBNYXA8c3RyaW5nLCBJQmxvY2s+LFxyXG4gICAgZmllbGRzOiBNYXA8c3RyaW5nLCBJRmllbGQ+LFxyXG4gICAgdmFsdWUgPSB7fVxyXG4gICk6IEZvcm1Hcm91cCB7XHJcbiAgICBjb25zdCBncm91cCA9IHt9O1xyXG4gICAgY29uc3QgYmxvY2sgPSBibG9ja3NbYCR7c3RydWN0fS0ke2Jsb2NrTmFtZX1gXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGZpZWxkUmVmZXJlbmNlIG9mIGJsb2NrLmZpZWxkcykge1xyXG4gICAgICBjb25zdCBmaWVsZCA9IGZpZWxkc1tgJHtzdHJ1Y3R9LSR7ZmllbGRSZWZlcmVuY2UuZmllbGR9YF07XHJcblxyXG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ3N0YW1wJykge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ2xpbmtlZFN0cnVjdCcpIHtcclxuICAgICAgICBjb25zdCBsaW5rZWRTdHJ1Y3RGaWVsZCA9IDxJTGlua2VkU3RydWN0RmllbGQ+ZmllbGQ7XHJcbiAgICAgICAgY29uc3QgeyByZWZlcmVuY2UgfSA9IGxpbmtlZFN0cnVjdEZpZWxkO1xyXG5cclxuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMuYXJyYXkoXHJcbiAgICAgICAgICByZWZlcmVuY2Uuc3RydWN0LFxyXG4gICAgICAgICAgcmVmZXJlbmNlLmJsb2NrLFxyXG4gICAgICAgICAgYmxvY2tzLFxyXG4gICAgICAgICAgZmllbGRzLFxyXG4gICAgICAgICAgdmFsdWVbZmllbGQubmFtZV1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIWFycmF5LnZhbHVlLmxlbmd0aCAmJiBsaW5rZWRTdHJ1Y3RGaWVsZC5taW5JbnN0YW5jZXMgPiAwKSB7XHJcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5jcmVtZW50LWRlY3JlbWVudFxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5rZWRTdHJ1Y3RGaWVsZC5taW5JbnN0YW5jZXM7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJheS5wdXNoKHRoaXMuZ3JvdXAocmVmZXJlbmNlLnN0cnVjdCwgcmVmZXJlbmNlLmJsb2NrLCBibG9ja3MsIGZpZWxkcykpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ3JvdXBbZmllbGQubmFtZV0gPSBhcnJheTtcclxuXHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSB0aGlzLmdldFZhbGlkYXRvcnMoZmllbGRSZWZlcmVuY2UsIGZpZWxkKTtcclxuICAgICAgY29uc3QgaW5pdGlhbFZhbHVlID0gdmFsdWVbZmllbGQubmFtZV0gfHwgZmllbGQuaW5pdGlhbFZhbHVlO1xyXG5cclxuICAgICAgZ3JvdXBbZmllbGQubmFtZV0gPSBbaW5pdGlhbFZhbHVlLCB2YWxpZGF0b3JzXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLmZiLmdyb3VwKGdyb3VwKTtcclxuXHJcbiAgICBpZiAoIWZvcm1Hcm91cC52YWx1ZSkge1xyXG4gICAgICBmb3JtR3JvdXAucGF0Y2hWYWx1ZSh7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1Hcm91cDtcclxuICB9XHJcblxyXG4gIGFycmF5KFxyXG4gICAgc3RydWN0OiBzdHJpbmcsXHJcbiAgICBibG9ja05hbWU6IHN0cmluZyxcclxuICAgIGJsb2NrczogTWFwPHN0cmluZywgSUJsb2NrPixcclxuICAgIGZpZWxkczogTWFwPHN0cmluZywgSUZpZWxkPixcclxuICAgIHZhbHVlID0gW11cclxuICApOiBGb3JtQXJyYXkge1xyXG4gICAgY29uc3QgYXJyYXkgPSBbXTtcclxuXHJcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XHJcbiAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBncm91cCA9IHRoaXMuZ3JvdXAoc3RydWN0LCBibG9ja05hbWUsIGJsb2NrcywgZmllbGRzLCBpdGVtKTtcclxuXHJcbiAgICAgICAgYXJyYXkucHVzaChncm91cCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuZmIuYXJyYXkoYXJyYXkpO1xyXG4gICAgaWYgKCFmb3JtQXJyYXkudmFsdWUpIHtcclxuICAgICAgZm9ybUFycmF5LnNldFZhbHVlKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUFycmF5O1xyXG4gIH1cclxuXHJcblxyXG5cclxuICBwcml2YXRlIGdldFZhbGlkYXRvcnMoZmllbGRSZWZlcmVuY2U6IElGaWVsZFJlZmVyZW5jZSwgZmllbGQ6IElGaWVsZCkge1xyXG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcclxuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IFtdO1xyXG5cclxuICAgICAgY29uc3Qgcm9vdCA9IGNvbnRyb2wucm9vdDtcclxuICAgICAgY29uc3QgcGFyZW50ID0gY29udHJvbC5wYXJlbnQ7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgcGFyZW50IGluc3RhbmNlb2YgRm9ybUdyb3VwICYmXHJcbiAgICAgICAgIWZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbihwYXJlbnQudmFsdWUsIHJvb3QudmFsdWUpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZmllbGQucmVxdWlyZWQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCwgd2hpdGVzcGFjZVZhbGlkYXRvcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoPElUZXh0RmllbGQ+ZmllbGQpLm1pbkxlbmd0aCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aCgoPElUZXh0RmllbGQ+ZmllbGQpLm1pbkxlbmd0aCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJVGV4dEZpZWxkPmZpZWxkKS5tYXhMZW5ndGgpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgoKDxJVGV4dEZpZWxkPmZpZWxkKS5tYXhMZW5ndGgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SUludGVnZXJGaWVsZD5maWVsZCkubWluKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKCg8SUludGVnZXJGaWVsZD5maWVsZCkubWluKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoPElJbnRlZ2VyRmllbGQ+ZmllbGQpLm1heCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heCgoPElJbnRlZ2VyRmllbGQ+ZmllbGQpLm1heCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXZhbGlkYXRvcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRhdG9ycykoY29udHJvbCk7XHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvb3B0aW9ucyc7XHJcbmltcG9ydCB7IElTdHJ1Y3QsIElGaWVsZCwgSUJsb2NrIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdWJtaXNzaW9uRXJyb3JzIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3VibWlzc2lvbic7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyU2VydmljZSB9IGZyb20gJy4vZm9ybS1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGb3JtQ2hhbmdlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tY2hhbmdlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5cclxuZXhwb3J0IHR5cGUgR2V0S2V5RnVuY3Rpb248VD4gPSAoaXRlbTogVCkgPT4gc3RyaW5nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgRm9ybVN0YXRlU2VydmljZSB7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWNvbnN0cnVjdG9yLXdpdGgtc3RyaW5nLWFyZ3NcclxuICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0Q29uZGl0aW9uRnVuYyA9IG5ldyBGdW5jdGlvbigncmV0dXJuIHRydWUnKTtcclxuICBwcml2YXRlIF9jYWNoZTogeyBbaWQ6IG51bWJlcl06IEZvcm1TdGF0ZSB9ID0ge307XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyU2VydmljZSkge31cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlSWQoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3NpZ25EZWZhdWx0cyhvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMpIHtcclxuICAgIGlmICghb3B0aW9ucy5oZWFkZXJTaXplKSB7XHJcbiAgICAgIG9wdGlvbnMuaGVhZGVyU2l6ZSA9IDM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPOiBUaGlzIHNob3VsZCBleHBhbmQgc3RyaW5ncyBpbnRvIGEgbGFiZWwgb2JqZWN0OyB0aGUgcmVuZGVyZXJzIHNob3VsZCBoYW5kbGUgd2hpY2ggbGFiZWwgdG8gc2hvdyBiYXNlZCBvbiBzY3JlZW4gc2l6ZVxyXG4gIHN0YXRpYyBwYXJzZUxhYmVsKGxhYmVsOiBzdHJpbmcgfCB7IHNob3J0OiBzdHJpbmcgfSkge1xyXG4gICAgaWYgKHR5cGVvZiBsYWJlbCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYWJlbC5zaG9ydDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwYXJzZVNjaGVtYShvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHN0cnVjdHM6IElTdHJ1Y3RbXSA9IFtdO1xyXG4gICAgY29uc3QgZmllbGRzOiBJRmllbGRbXSA9IFtdO1xyXG4gICAgY29uc3QgYmxvY2tzOiBJQmxvY2tbXSA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3Qgc3RydWN0U2NoZW1hIG9mIG9wdGlvbnMuc2NoZW1hKSB7XHJcbiAgICAgIGNvbnN0IHN0cnVjdCA9IHtcclxuICAgICAgICAuLi5zdHJ1Y3RTY2hlbWEsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGFyc2VMYWJlbChzdHJ1Y3RTY2hlbWEubGFiZWwpLFxyXG4gICAgICAgIGNvbGxlY3Rpb25MYWJlbDogdGhpcy5wYXJzZUxhYmVsKHN0cnVjdFNjaGVtYS5sYWJlbCksXHJcbiAgICAgICAgZmllbGRzOiBbXSxcclxuICAgICAgICBibG9ja3M6IFtdXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGZpZWxkU2NoZW1hIG9mIHN0cnVjdFNjaGVtYS5maWVsZHMpIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMucGFyc2VMYWJlbChmaWVsZFNjaGVtYS5sYWJlbCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpZWxkID0ge1xyXG4gICAgICAgICAgLi4uZmllbGRTY2hlbWEsXHJcbiAgICAgICAgICBsYWJlbCxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiBmaWVsZFNjaGVtYS5wbGFjZWhvbGRlciB8fCBsYWJlbCxcclxuICAgICAgICAgIHN0cnVjdDogc3RydWN0U2NoZW1hLm5hbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoZmllbGQucmVmZXJlbmNlICYmICFmaWVsZC5yZWZlcmVuY2UuYmxvY2spIHtcclxuICAgICAgICAgIGZpZWxkLnJlZmVyZW5jZS5ibG9jayA9ICdkZWZhdWx0JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZWxkcy5wdXNoKGZpZWxkKTtcclxuICAgICAgICBzdHJ1Y3QuZmllbGRzLnB1c2goZmllbGQubmFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAoY29uc3QgYmxvY2tTY2hlbWEgb2Ygc3RydWN0U2NoZW1hLmJsb2Nrcykge1xyXG4gICAgICAgIGNvbnN0IGJsb2NrID0ge1xyXG4gICAgICAgICAgLi4uYmxvY2tTY2hlbWEsXHJcbiAgICAgICAgICBmaWVsZHM6IFtdLFxyXG4gICAgICAgICAgc3RydWN0OiBzdHJ1Y3RTY2hlbWEubmFtZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcmVmZXJlbmNlIG9mIGJsb2NrU2NoZW1hLmZpZWxkcykge1xyXG4gICAgICAgICAgaWYgKCFyZWZlcmVuY2UpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgZmllbGRSZWZlcmVuY2UgPSByZWZlcmVuY2UuZmllbGRcclxuICAgICAgICAgICAgPyByZWZlcmVuY2VcclxuICAgICAgICAgICAgOiB7IGZpZWxkOiByZWZlcmVuY2UgfTtcclxuXHJcbiAgICAgICAgICBsZXQgY29uZGl0aW9uO1xyXG5cclxuICAgICAgICAgIGlmIChmaWVsZFJlZmVyZW5jZS5jb25kaXRpb24pIHtcclxuICAgICAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPVxyXG4gICAgICAgICAgICAgIGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvblswXSA9PT0gJ3snXHJcbiAgICAgICAgICAgICAgICA/IGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvblxyXG4gICAgICAgICAgICAgICAgOiBgcmV0dXJuICR7ZmllbGRSZWZlcmVuY2UuY29uZGl0aW9ufWA7XHJcblxyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tY29uc3RydWN0b3Itd2l0aC1zdHJpbmctYXJnc1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBuZXcgRnVuY3Rpb24oJ3ZhbHVlJywgJ3Jvb3RWYWx1ZScsIHJldHVyblZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1jb25zdHJ1Y3Rvci13aXRoLXN0cmluZy1hcmdzXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9IEZvcm1TdGF0ZVNlcnZpY2UuZGVmYXVsdENvbmRpdGlvbkZ1bmM7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uID0gY29uZGl0aW9uO1xyXG4gICAgICAgICAgYmxvY2suZmllbGRzLnB1c2goZmllbGRSZWZlcmVuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmxvY2tzLnB1c2goYmxvY2spO1xyXG4gICAgICAgIHN0cnVjdC5ibG9ja3MucHVzaChibG9jay5uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RydWN0cy5wdXNoKHN0cnVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RydWN0cyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICBibG9ja3NcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXQoaWQ6IG51bWJlcik6IEZvcm1TdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVbaWRdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKG9wdGlvbnM6IERlUmVDcnVkT3B0aW9ucywgdmFsdWU6IG9iamVjdCwgaW5pdGlhbEVycm9ycz86IEZvcm1TdWJtaXNzaW9uRXJyb3JzKTogRm9ybVN0YXRlIHtcclxuICAgIGxldCBpZDogbnVtYmVyO1xyXG5cclxuICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgIGlkID0gRm9ybVN0YXRlU2VydmljZS5nZW5lcmF0ZUlkKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIEZvcm1TdGF0ZVNlcnZpY2UuYXNzaWduRGVmYXVsdHMob3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3Qgc2NoZW1hID0gRm9ybVN0YXRlU2VydmljZS5wYXJzZVNjaGVtYShvcHRpb25zKTtcclxuICAgIGNvbnN0IHN0cnVjdHMgPSB0aGlzLmFycmF5VG9NYXAoc3RydWN0ID0+IHN0cnVjdC5uYW1lLCBzY2hlbWEuc3RydWN0cyk7XHJcbiAgICBjb25zdCBmaWVsZHMgPSB0aGlzLmFycmF5VG9NYXAoXHJcbiAgICAgIGZpZWxkID0+IGAke2ZpZWxkLnN0cnVjdH0tJHtmaWVsZC5uYW1lfWAsXHJcbiAgICAgIHNjaGVtYS5maWVsZHNcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgYmxvY2tzID0gdGhpcy5hcnJheVRvTWFwKFxyXG4gICAgICBibG9jayA9PiBgJHtibG9jay5zdHJ1Y3R9LSR7YmxvY2submFtZX1gLFxyXG4gICAgICBzY2hlbWEuYmxvY2tzXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKFxyXG4gICAgICBvcHRpb25zLnN0cnVjdCxcclxuICAgICAgb3B0aW9ucy5ibG9jayxcclxuICAgICAgYmxvY2tzLFxyXG4gICAgICBmaWVsZHMsXHJcbiAgICAgIHZhbHVlXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHN0YXRlOiBGb3JtU3RhdGUgPSB7XHJcbiAgICAgIGlkLFxyXG4gICAgICBvcHRpb25zLFxyXG4gICAgICBmb3JtLFxyXG4gICAgICBzdHJ1Y3RzLFxyXG4gICAgICBmaWVsZHMsXHJcbiAgICAgIGJsb2NrcyxcclxuICAgICAgc3VibWlzc2lvbkVycm9yczogaW5pdGlhbEVycm9ycyxcclxuICAgICAgb25TdWJtaXNzaW9uRXJyb3JzQ2hhbmdlOiBuZXcgU3ViamVjdDxGb3JtU3VibWlzc2lvbkVycm9ycz4oKSxcclxuICAgICAgbmF2aWdhdGlvblN0YWNrOiBbXSxcclxuICAgICAgb25OYXZpZ2F0aW9uQ2hhbmdlOiBuZXcgU3ViamVjdDxudW1iZXI+KCksXHJcbiAgICAgIG9uVmFsdWVDaGFuZ2U6IG5ldyBTdWJqZWN0PEZvcm1DaGFuZ2U+KClcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRm9ybShmb3JtSWQ6IG51bWJlciwgc3RydWN0OiBzdHJpbmcsIGJsb2NrOiBzdHJpbmcpOiBGb3JtR3JvdXAge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtmb3JtSWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZpZWxkcywgYmxvY2tzIH0gPSB0aGlzLl9jYWNoZVtmb3JtSWRdO1xyXG4gICAgcmV0dXJuIHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoc3RydWN0LCBibG9jaywgYmxvY2tzLCBmaWVsZHMpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKGlkOiBudW1iZXIsIHZhbHVlOiBvYmplY3QpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGZvcm0gfSA9IHRoaXMuX2NhY2hlW2lkXTtcclxuXHJcbiAgICBmb3JtLnBhdGNoVmFsdWUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGUgdGhpcy5fY2FjaGVbaWRdO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJFcnJvcnMoaWQ6IG51bWJlciwgZm9ybVBhdGg/OiBzdHJpbmcpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm9ybVBhdGgpIHtcclxuICAgICAgZGVsZXRlIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzW2Zvcm1QYXRoXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wdXNoU3VibWlzc2lvbkVycm9yc0NoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBzZXRFcnJvcnMoaWQ6IG51bWJlciwgZXJyb3JzOiBGb3JtU3VibWlzc2lvbkVycm9ycykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXS5zdWJtaXNzaW9uRXJyb3JzID0gZXJyb3JzO1xyXG4gICAgdGhpcy5wdXNoU3VibWlzc2lvbkVycm9yc0NoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZShpZDogbnVtYmVyLCBmb3JtUGF0aDogc3RyaW5nLCBuZXdWYWx1ZTogYW55LCBldmVudDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICB0aGlzLmNsZWFyRXJyb3JzKGlkLCBmb3JtUGF0aCk7XHJcblxyXG4gICAgaWYgKGV2ZW50ICYmIHN0YXRlLm9wdGlvbnMuY2hhbmdlTm90aWZpY2F0aW9uVHlwZSAhPT0gZXZlbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICg8U3ViamVjdDxGb3JtQ2hhbmdlPj5zdGF0ZS5vblZhbHVlQ2hhbmdlKS5uZXh0KHtcclxuICAgICAgZmllbGRQYXRoOiBmb3JtUGF0aCxcclxuICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxyXG4gICAgICBmb3JtVmFsdWU6IHN0YXRlLmZvcm0udmFsdWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVzaE5hdmlnYXRpb24oaWQ6IG51bWJlciwgc3RydWN0OiBzdHJpbmcsIGJsb2NrOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgcGFyZW50UGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdLm5hdmlnYXRpb25TdGFjay5wdXNoKHtcclxuICAgICAgc3RydWN0LFxyXG4gICAgICBibG9jayxcclxuICAgICAgcGF0aCxcclxuICAgICAgcGFyZW50UGF0aFxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wdXNoTmF2aWdhdGlvbkNoYW5nZShpZCk7XHJcbiAgfVxyXG5cclxuICBwb3BOYXZpZ2F0aW9uKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jYWNoZVtpZF0ubmF2aWdhdGlvblN0YWNrLnBvcCgpO1xyXG5cclxuICAgIHRoaXMucHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgY29tcGxldGVOYXZpZ2F0aW9uKGlkOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnBvcE5hdmlnYXRpb24oaWQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwdXNoTmF2aWdhdGlvbkNoYW5nZShpZDogbnVtYmVyLCBjaGlsZElkPzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2NhY2hlW2lkXTtcclxuICAgICg8U3ViamVjdDxudW1iZXI+PnN0YXRlLm9uTmF2aWdhdGlvbkNoYW5nZSkubmV4dChjaGlsZElkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQ6IG51bWJlcikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICAoPFN1YmplY3Q8Rm9ybVN1Ym1pc3Npb25FcnJvcnM+PnN0YXRlLm9uU3VibWlzc2lvbkVycm9yc0NoYW5nZSkubmV4dChcclxuICAgICAgc3RhdGUuc3VibWlzc2lvbkVycm9yc1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXJyYXlUb01hcDxUPihnZXRLZXk6IEdldEtleUZ1bmN0aW9uPFQ+LCBhcnJheTogVFtdKSB7XHJcbiAgICByZXR1cm4gYXJyYXkucmVkdWNlPE1hcDxzdHJpbmcsIFQ+PigoYWNjLCBjdXJyZW50KSA9PiB7XHJcbiAgICAgIGFjY1tnZXRLZXkoY3VycmVudCldID0gY3VycmVudDtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIG5ldyBNYXA8c3RyaW5nLCBUPigpKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciwgSUNvbGxlY3Rpb25Db250cm9sIH0gZnJvbSAnLi4vcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBJUmVmZXJlbmNlRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtY29sbGVjdGlvbi1maWVsZC1ob3N0JyxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBkZVJlQ3J1ZENvbXBvbmVudEhvc3Q+PC9uZy10ZW1wbGF0ZT5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdGF0ZVNlcnZpY2U6IEZvcm1TdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBwcm92aWRlclNlcnZpY2U6IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5jb250cm9sLmZvcm1JZCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuY29udHJvbCAmJiAhY2hhbmdlcy5jb250cm9sLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5jb250cm9sLmxheW91dCkge1xyXG4gICAgICBjYXNlICdpbmxpbmUnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuaW5saW5lQ29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0YWJsZSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy50YWJsZUNvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgYCR7dGhpcy5jb250cm9sLmxheW91dH0gbGF5b3V0IGlzIG5vdCBzdXBwb3J0ZWQuYCxcclxuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHRoaXMuY29udHJvbC5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8Q29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlcj50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcblxyXG4gICAgY29uc3QgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sID0ge1xyXG4gICAgICAuLi50aGlzLmNvbnRyb2wsXHJcbiAgICAgIG9uQWRkOiB0aGlzLm9uQWRkXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzQ29udHJvbCA9IGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2w7XHJcbiAgICBjb21wb25lbnRSZW5kZXJlci5jb250cm9sID0gY29udHJvbDtcclxuXHJcbiAgICBjb25zdCBvbkNvbXBvbmVudENoYW5nZSA9ICg8T25DaGFuZ2VzPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZSkubmdPbkNoYW5nZXM7XHJcblxyXG4gICAgaWYgKG9uQ29tcG9uZW50Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0ge1xyXG4gICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzQ29udHJvbCxcclxuICAgICAgICBjdXJyZW50VmFsdWU6IGNvbnRyb2wsXHJcbiAgICAgICAgZmlyc3RDaGFuZ2U6IHR5cGVvZiBwcmV2aW91c0NvbnRyb2wgPT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgb25Db21wb25lbnRDaGFuZ2UuY2FsbChjb21wb25lbnRSZW5kZXJlciwgeyBjb250cm9sOiBjaGFuZ2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkZCA9IChlKSA9PiB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHJlZmVyZW5jZSA9ICg8SVJlZmVyZW5jZUZpZWxkPnRoaXMuY29udHJvbC5maWVsZCkucmVmZXJlbmNlO1xyXG5cclxuICAgIGNvbnN0IGZvcm0gPSB0aGlzLnN0YXRlU2VydmljZS5jcmVhdGVGb3JtKHRoaXMuY29udHJvbC5mb3JtSWQsIHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jayk7XHJcbiAgICB0aGlzLmNvbnRyb2wudmFsdWUucHVzaChmb3JtKTtcclxuXHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY29udHJvbC52YWx1ZS5jb250cm9scy5pbmRleE9mKGZvcm0pO1xyXG4gICAgY29uc3QgY2hpbGRQYXRoID0gYCR7dGhpcy5jb250cm9sLmZvcm1QYXRofS4ke2luZGV4fWA7XHJcblxyXG4gICAgaWYgKHRoaXMuY29udHJvbC5sYXlvdXQgPT09ICd0YWJsZScpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UucHVzaE5hdmlnYXRpb24odGhpcy5jb250cm9sLmZvcm1JZCwgcmVmZXJlbmNlLnN0cnVjdCwgcmVmZXJlbmNlLmJsb2NrLCBjaGlsZFBhdGgsIHRoaXMuY29udHJvbC5mb3JtUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb250cm9sLm9uQ2hhbmdlKG51bGwpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIFZpZXdDaGlsZCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIE9uQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgSUZpZWxkLFxyXG4gIElMaXN0RmllbGQsXHJcbiAgSUxpbmtlZFN0cnVjdEZpZWxkLFxyXG4gIElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZSxcclxuICBJRmllbGRSZWZlcmVuY2VcclxufSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXksIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBDb250cm9sUmVuZGVyZXIsXHJcbiAgSUNvbnRyb2wsXHJcbiAgSVNlbGVjdENvbnRyb2wsXHJcbiAgSUNvbGxlY3Rpb25Db250cm9sXHJcbn0gZnJvbSAnLi4vcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnQtaG9zdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50IH0gZnJvbSAnLi9jb2xsZWN0aW9uLWZpZWxkLWhvc3QuY29tcG9uZW50JztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtaW5wdXQtZmllbGQtaG9zdCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy10ZW1wbGF0ZSBkZVJlQ3J1ZENvbXBvbmVudEhvc3Q+PC9uZy10ZW1wbGF0ZT5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEZpZWxkSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZnM6IENvbXBvbmVudFJlZjxhbnk+W10gPSBbXTtcclxuICBwcml2YXRlIF9zdWJtaXNzaW9uRXJyb3JzQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfZm9ybUNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX3ZhbHVlT25Gb2N1czogYW55O1xyXG4gIEBWaWV3Q2hpbGQoQ29tcG9uZW50SG9zdERpcmVjdGl2ZSkgY29tcG9uZW50SG9zdDogQ29tcG9uZW50SG9zdERpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBmb3JtSWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XHJcbiAgQElucHV0KCkgc3RydWN0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmxvY2s6IHN0cmluZztcclxuICBASW5wdXQoKSBmaWVsZDogSUZpZWxkO1xyXG4gIEBJbnB1dCgpIHBhcmVudEZvcm06IEFic3RyYWN0Q29udHJvbDtcclxuICBASW5wdXQoKSBwYXJlbnRQYXRoOiBzdHJpbmc7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuICBmaWVsZFJlZmVyZW5jZTogSUZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgZ2V0IGZvcm1QYXRoKCkge1xyXG4gICAgbGV0IGZvcm1QYXRoID0gdGhpcy5maWVsZC5uYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnBhcmVudFBhdGgpIHtcclxuICAgICAgbGV0IHBhcmVudFBhdGggPSB0aGlzLnBhcmVudFBhdGg7XHJcblxyXG4gICAgICBpZiAodGhpcy5wYXJlbnRGb3JtIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnBhcmVudEZvcm0uY29udHJvbHMuaW5kZXhPZih0aGlzLmZvcm0pO1xyXG4gICAgICAgIHBhcmVudFBhdGggKz0gJy4nICsgaW5kZXg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvcm1QYXRoID0gYCR7cGFyZW50UGF0aH0uJHtmb3JtUGF0aH1gO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtUGF0aDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVTZXJ2aWNlLmdldCh0aGlzLmZvcm1JZCk7XHJcblxyXG4gICAgY29uc3QgZmllbGRSZWZlcmVuY2UgPSB0aGlzLnN0YXRlLmJsb2Nrc1tgJHt0aGlzLnN0cnVjdH0tJHt0aGlzLmJsb2NrfWBdLmZpZWxkcy5maW5kKFxyXG4gICAgICB4ID0+IHguZmllbGQgPT09IHRoaXMuZmllbGQubmFtZVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkUmVmZXJlbmNlID0gZmllbGRSZWZlcmVuY2U7XHJcblxyXG4gICAgdGhpcy5fc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RhdGUub25TdWJtaXNzaW9uRXJyb3JzQ2hhbmdlLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XHJcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lSZWZzKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5mb3JtSWQgJiYgIWNoYW5nZXMuZm9ybUlkLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9zdWJtaXNzaW9uRXJyb3JzQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3N1Ym1pc3Npb25FcnJvcnNDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZXN0cm95UmVmcygpO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveVJlZnMoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmcy5mb3JFYWNoKHggPT4geC5kZXN0cm95KCkpO1xyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWZzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG91bGRSZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFJlZmVyZW5jZSAmJiB0aGlzLmZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbih0aGlzLmZvcm0udmFsdWUsIHRoaXMuc3RhdGUuZm9ybS5yb290LnZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHRoaXMuZGVzdHJveVJlZnMoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sQ29tcG9uZW50OiBhbnk7XHJcblxyXG4gICAgY29uc3QgcHJvdmlkZXJPcHRpb25zID0gdGhpcy5wcm92aWRlclNlcnZpY2UuZ2V0KFxyXG4gICAgICB0aGlzLnN0YXRlLm9wdGlvbnMucHJvdmlkZXJcclxuICAgICk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmZpZWxkLnR5cGUpIHtcclxuICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgIGNhc2UgJ2ludGVnZXInOlxyXG4gICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLmlucHV0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdib29sZWFuJzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLmNoZWNrYm94Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgY2FzZSAnZm9yZWlnbktleSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5zZWxlY3RDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2xpbmtlZFN0cnVjdCc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgIGAke3RoaXMuZmllbGQudHlwZX0gY29udHJvbCBpcyBub3Qgc3VwcG9ydGVkLmAsXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmZpZWxkKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmNvbXBvbmVudEhvc3Qudmlld0NvbnRhaW5lclJlZjtcclxuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXJDb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIHByb3ZpZGVyT3B0aW9ucy5jb250YWluZXJDb21wb25lbnRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udHJvbENvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29udHJvbENvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sQ29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXHJcbiAgICAgIGNvbnRyb2xDb21wb25lbnRGYWN0b3J5XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lckNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICBjb250YWluZXJDb21wb25lbnRGYWN0b3J5LFxyXG4gICAgICAwLFxyXG4gICAgICB1bmRlZmluZWQsXHJcbiAgICAgIFtbY29udHJvbENvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY29tcG9uZW50UmVmcy5wdXNoKGNvbnRyb2xDb21wb25lbnRSZWYsIGNvbnRhaW5lckNvbXBvbmVudFJlZik7XHJcblxyXG4gICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUlucHV0cygpIHtcclxuICAgIGlmICh0aGlzLnNob3VsZFJlbmRlcigpICYmICF0aGlzLl9jb21wb25lbnRSZWZzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWZzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybVBhdGggPSB0aGlzLmZvcm1QYXRoO1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmZvcm0ucm9vdC5nZXQoZm9ybVBhdGgpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2w6IElDb250cm9sID0ge1xyXG4gICAgICB2YWx1ZSxcclxuICAgICAgZm9ybVBhdGgsXHJcbiAgICAgIGZpZWxkOiB0aGlzLmZpZWxkLFxyXG4gICAgICBmb3JtSWQ6IHRoaXMuZm9ybUlkLFxyXG4gICAgICBzdWJtaXNzaW9uRXJyb3JzOlxyXG4gICAgICAgICh0aGlzLnN0YXRlLnN1Ym1pc3Npb25FcnJvcnMgJiZcclxuICAgICAgICAgIHRoaXMuc3RhdGUuc3VibWlzc2lvbkVycm9yc1tmb3JtUGF0aF0pIHx8XHJcbiAgICAgICAgW10sXHJcbiAgICAgIGZvcm06IHRoaXMuZm9ybSxcclxuICAgICAgcmVuZGVyZXJUeXBlOiB0aGlzLm1hcFR5cGUodGhpcy5maWVsZC50eXBlKSxcclxuICAgICAgaHRtbElkOiBgJHt0aGlzLmZvcm1JZH0tJHtmb3JtUGF0aH1gLFxyXG4gICAgICBvbkZvY3VzOiB0aGlzLm9uRm9jdXMsXHJcbiAgICAgIG9uQmx1cjogdGhpcy5vbkJsdXIsXHJcbiAgICAgIG9uQ2hhbmdlOiB0aGlzLm9uQ2hhbmdlXHJcbiAgICB9O1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5maWVsZC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2xpc3QnOlxyXG4gICAgICBjYXNlICdmb3JlaWduS2V5Jzoge1xyXG4gICAgICAgIGNvbnN0IGxpc3RGaWVsZCA9IDxJTGlzdEZpZWxkPnRoaXMuZmllbGQ7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdENvbnRyb2wgPSA8SVNlbGVjdENvbnRyb2w+Y29udHJvbDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmllbGQudHlwZSA9PT0gJ2ZvcmVpZ25LZXknKSB7XHJcbiAgICAgICAgICBzZWxlY3RDb250cm9sLm9wdGlvbnMgPSAoKSA9PiBbXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VsZWN0Q29udHJvbC5vcHRpb25zID0gKCkgPT4gbGlzdEZpZWxkLm9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2xpbmtlZFN0cnVjdCc6IHtcclxuICAgICAgICBjb25zdCBjb2xsZWN0aW9uQ29udHJvbCA9IDxJQ29sbGVjdGlvbkNvbnRyb2w+Y29udHJvbDtcclxuXHJcbiAgICAgICAgY29uc3QgbGlua2VkU3RydWN0RmllbGQgPSA8SUxpbmtlZFN0cnVjdEZpZWxkPnRoaXMuZmllbGQ7XHJcbiAgICAgICAgY29uc3QgeyByZWZlcmVuY2UgfSA9IGxpbmtlZFN0cnVjdEZpZWxkO1xyXG5cclxuICAgICAgICBjb25zdCBibG9ja0ZpZWxkcyA9IHRoaXMuc3RhdGUuYmxvY2tzW2Ake3RoaXMuc3RydWN0fS0ke3RoaXMuYmxvY2t9YF0uZmllbGRzO1xyXG5cclxuICAgICAgICBjb25zdCB7IGhpbnRzIH0gPSA8SUxpbmtlZFN0cnVjdEZpZWxkUmVmZXJlbmNlPmJsb2NrRmllbGRzLmZpbmQoXHJcbiAgICAgICAgICB4ID0+IHguZmllbGQgPT09IGxpbmtlZFN0cnVjdEZpZWxkLm5hbWVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCByZWZlcmVuY2VCbG9jayA9IChoaW50cyAmJiBoaW50cy5ibG9jaykgfHwgcmVmZXJlbmNlLmJsb2NrO1xyXG5cclxuICAgICAgICBjb25zdCBmaWVsZFJlZmVyZW5jZXMgPSA8SUxpbmtlZFN0cnVjdEZpZWxkUmVmZXJlbmNlW10+dGhpcy5zdGF0ZVxyXG4gICAgICAgICAgLmJsb2Nrc1tgJHtyZWZlcmVuY2Uuc3RydWN0fS0ke3JlZmVyZW5jZUJsb2NrfWBdLmZpZWxkcztcclxuXHJcbiAgICAgICAgY29uc3QgbmVzdGVkRmllbGRzID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgZmllbGRSZWZlcmVuY2Ugb2YgZmllbGRSZWZlcmVuY2VzKSB7XHJcbiAgICAgICAgICBjb25zdCBmaWVsZCA9IHRoaXMuc3RhdGUuZmllbGRzW2Ake3JlZmVyZW5jZS5zdHJ1Y3R9LSR7ZmllbGRSZWZlcmVuY2UuZmllbGR9YF07XHJcbiAgICAgICAgICBuZXN0ZWRGaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXN0ZWRWYWx1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBuZXN0ZWRWYWx1ZSBvZiBjb2xsZWN0aW9uQ29udHJvbC52YWx1ZS5jb250cm9scykge1xyXG4gICAgICAgICAgbmVzdGVkVmFsdWVzLnB1c2goPEZvcm1Hcm91cD5uZXN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5zdGFtcCA9IHtcclxuICAgICAgICAgIHRleHQ6IGNvbnRyb2wuZmllbGQubGFiZWwsXHJcbiAgICAgICAgICBoZWFkZXJTaXplOiB0aGlzLnN0YXRlLm9wdGlvbnMuaGVhZGVyU2l6ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLmNhbkFkZCA9ICFsaW5rZWRTdHJ1Y3RGaWVsZC5tYXhJbnN0YW5jZXMgfHwgbmVzdGVkVmFsdWVzLmxlbmd0aCA8IGxpbmtlZFN0cnVjdEZpZWxkLm1heEluc3RhbmNlcztcclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5uZXN0ZWRWYWx1ZXMgPSBuZXN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wubmVzdGVkRmllbGRzID0gbmVzdGVkRmllbGRzO1xyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLmxheW91dCA9IChoaW50cyAmJiBoaW50cy5sYXlvdXQpIHx8ICdpbmxpbmUnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBjb21wb25lbnRSZWYgb2YgdGhpcy5fY29tcG9uZW50UmVmcykge1xyXG4gICAgICBjb25zdCBjb21wb25lbnRSZW5kZXJlciA9IDxDb250cm9sUmVuZGVyZXI+Y29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG5cclxuICAgICAgY29uc3QgcHJldmlvdXNDb250cm9sID0gY29tcG9uZW50UmVuZGVyZXIuY29udHJvbDtcclxuICAgICAgY29tcG9uZW50UmVuZGVyZXIuY29udHJvbCA9IGNvbnRyb2w7XHJcblxyXG4gICAgICBjb25zdCBvbkNvbXBvbmVudENoYW5nZSA9ICg8T25DaGFuZ2VzPmNvbXBvbmVudFJlZi5pbnN0YW5jZSkubmdPbkNoYW5nZXM7XHJcbiAgICAgIGlmIChvbkNvbXBvbmVudENoYW5nZSkge1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0ge1xyXG4gICAgICAgICAgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNDb250cm9sLFxyXG4gICAgICAgICAgY3VycmVudFZhbHVlOiBjb250cm9sLFxyXG4gICAgICAgICAgZmlyc3RDaGFuZ2U6IHR5cGVvZiBwcmV2aW91c0NvbnRyb2wgPT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgICAgaXNGaXJzdENoYW5nZTogKCkgPT4gY2hhbmdlLmZpcnN0Q2hhbmdlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgb25Db21wb25lbnRDaGFuZ2UuY2FsbChjb21wb25lbnRSZW5kZXJlciwgeyBjb250cm9sOiBjaGFuZ2UgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uRm9jdXMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLl92YWx1ZU9uRm9jdXMgPSB0aGlzLmZvcm0ucm9vdC5nZXQodGhpcy5mb3JtUGF0aCkudmFsdWU7XHJcbiAgfVxyXG5cclxuICBvbkJsdXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZm9ybS5yb290LmdldCh0aGlzLmZvcm1QYXRoKS52YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy5fdmFsdWVPbkZvY3VzICE9PSBuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5vbkNoYW5nZSh0aGlzLmZvcm1JZCwgdGhpcy5mb3JtUGF0aCwgbmV3VmFsdWUsICdibHVyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZSA9IChlOiBhbnkpID0+IHtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5mb3JtLnJvb3QuZ2V0KHRoaXMuZm9ybVBhdGgpLnZhbHVlO1xyXG4gICAgdGhpcy5zdGF0ZVNlcnZpY2Uub25DaGFuZ2UodGhpcy5mb3JtSWQsIHRoaXMuZm9ybVBhdGgsIG5ld1ZhbHVlLCBlID8gJ2NoYW5nZScgOiBudWxsKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWFwVHlwZSh0eXBlOiBzdHJpbmcpIHtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgICByZXR1cm4gJ251bWJlcic7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIFZpZXdDaGlsZCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBCdXR0b25SZW5kZXJlciB9IGZyb20gJy4uL3JlbmRlcmVycy9idXR0b24ucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1idXR0b24taG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHR5cGU6ICdidXR0b24nIHwgJ3N1Ym1pdCcgfCAnY2FuY2VsJztcclxuICBASW5wdXQoKSBleHRyYUNsYXNzZXM6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcclxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5mb3JtSWQgJiYgIWNoYW5nZXMuZm9ybUlkLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSB0aGlzLnByb3ZpZGVyU2VydmljZS5nZXQoXHJcbiAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5wcm92aWRlclxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBwcm92aWRlck9wdGlvbnMuYnV0dG9uQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qge1xyXG4gICAgICBvcHRpb25zOiB7IHN0cnVjdCwgc3VibWl0QnV0dG9uU3R5bGUsIGNhbmNlbEJ1dHRvblN0eWxlIH0sXHJcbiAgICAgIHN0cnVjdHNcclxuICAgIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGNvbnN0IGlzU3VibWl0ID0gdGhpcy50eXBlID09PSAnc3VibWl0JztcclxuXHJcbiAgICBsZXQgc3R5bGUgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XHJcbiAgICAgICAgc3R5bGUgPSBzdWJtaXRCdXR0b25TdHlsZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2FuY2VsJzpcclxuICAgICAgICBzdHlsZSA9IGNhbmNlbEJ1dHRvblN0eWxlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0ZXh0ID0gKHN0eWxlICYmIHN0eWxlLnRleHQpIHx8IHRoaXMudGV4dDtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIGlzU3VibWl0ICYmXHJcbiAgICAgIHN1Ym1pdEJ1dHRvblN0eWxlICYmXHJcbiAgICAgIHN1Ym1pdEJ1dHRvblN0eWxlLmFwcGVuZFNjaGVtYUxhYmVsXHJcbiAgICApIHtcclxuICAgICAgdGV4dCA9IGAke3RleHR9ICR7c3RydWN0c1tzdHJ1Y3RdLmxhYmVsfWA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXh0cmFDbGFzc2VzID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUub3B0aW9ucy5leHRyYUJ1dHRvbkNsYXNzZXMpIHtcclxuICAgICAgZXh0cmFDbGFzc2VzLnB1c2goLi4udGhpcy5zdGF0ZS5vcHRpb25zLmV4dHJhQnV0dG9uQ2xhc3Nlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZXh0cmFDbGFzc2VzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5leHRyYUNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgZXh0cmFDbGFzc2VzLnB1c2goLi4udGhpcy5leHRyYUNsYXNzZXMuc3BsaXQoJyAnKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXh0cmFDbGFzc2VzLnB1c2goLi4udGhpcy5leHRyYUNsYXNzZXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8QnV0dG9uUmVuZGVyZXI+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgY29tcG9uZW50UmVuZGVyZXIuYnV0dG9uID0ge1xyXG4gICAgICB0ZXh0LFxyXG4gICAgICBleHRyYUNsYXNzZXMsXHJcbiAgICAgIHR5cGU6IGlzU3VibWl0ID8gJ3N1Ym1pdCcgOiAnYnV0dG9uJyxcclxuICAgICAgZGlzYWJsZWQ6IHRoaXMuZGlzYWJsZWQsXHJcbiAgICAgIG9uQ2xpY2s6IHRoaXMub25DbGljayxcclxuICAgICAgY2xhc3M6IChzdHlsZSAmJiBzdHlsZS5jbGFzcykgfHwgdW5kZWZpbmVkXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgb25DbGljayA9IChlKSA9PiB7XHJcbiAgICB0aGlzLmNsaWNrLmVtaXQoZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIENvbXBvbmVudFJlZixcclxuICBWaWV3Q2hpbGQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElGaWVsZCwgSUZpZWxkUmVmZXJlbmNlLCBJU3RhbXBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RhbXBSZW5kZXJlciwgSVN0YW1wIH0gZnJvbSAnLi4vcmVuZGVyZXJzL3N0YW1wLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnQtaG9zdC5kaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLXN0YW1wLWZpZWxkLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIGRlUmVDcnVkQ29tcG9uZW50SG9zdD48L25nLXRlbXBsYXRlPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PjtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgZm9ybUlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xyXG4gIEBJbnB1dCgpIHN0cnVjdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJsb2NrOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZmllbGQ6IElGaWVsZDtcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG4gIGZpZWxkUmVmZXJlbmNlOiBJRmllbGRSZWZlcmVuY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdGF0ZVNlcnZpY2U6IEZvcm1TdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBwcm92aWRlclNlcnZpY2U6IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5mb3JtSWQpO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlID0gdGhpcy5zdGF0ZS5ibG9ja3NbXHJcbiAgICAgIGAke3RoaXMuc3RydWN0fS0ke3RoaXMuYmxvY2t9YFxyXG4gICAgXS5maWVsZHMuZmluZCh4ID0+IHguZmllbGQgPT09IHRoaXMuZmllbGQubmFtZSk7XHJcblxyXG4gICAgdGhpcy5maWVsZFJlZmVyZW5jZSA9IGZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5mb3JtSWQgJiYgIWNoYW5nZXMuZm9ybUlkLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICB0aGlzLm5nT25EZXN0cm95KCk7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3VsZFJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbihcclxuICAgICAgdGhpcy5mb3JtLnZhbHVlLFxyXG4gICAgICB0aGlzLnN0YXRlLmZvcm0ucm9vdC52YWx1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGlmICh0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sQ29tcG9uZW50OiBhbnk7XHJcblxyXG4gICAgY29uc3QgcHJvdmlkZXJPcHRpb25zID0gdGhpcy5wcm92aWRlclNlcnZpY2UuZ2V0KFxyXG4gICAgICB0aGlzLnN0YXRlLm9wdGlvbnMucHJvdmlkZXJcclxuICAgICk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmZpZWxkLnR5cGUpIHtcclxuICAgICAgY2FzZSAnc3RhbXAnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuc3RhbXBDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgIGAke3RoaXMuZmllbGQudHlwZX0gY29udHJvbCBpcyBub3Qgc3VwcG9ydGVkLmAsXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmZpZWxkKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZpZXdDb250YWluZXJSZWYgPSB0aGlzLmNvbXBvbmVudEhvc3Qudmlld0NvbnRhaW5lclJlZjtcclxuICAgIHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbnRyb2xDb21wb25lbnRcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5fY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVJbnB1dHMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUlucHV0cygpIHtcclxuICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRSZW5kZXJlciA9IDxTdGFtcFJlbmRlcmVyPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgIGNvbnN0IHN0YW1wRmllbGQgPSA8SVN0YW1wRmllbGQ+dGhpcy5maWVsZDtcclxuXHJcbiAgICBjb25zdCBzdGFtcDogSVN0YW1wID0ge1xyXG4gICAgICB0ZXh0OiBzdGFtcEZpZWxkLmxhYmVsLFxyXG4gICAgICBoZWFkZXJTaXplOiB0aGlzLnN0YXRlLm9wdGlvbnMuaGVhZGVyU2l6ZVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoc3RhbXBGaWVsZC5oaW50cykge1xyXG4gICAgICBpZiAoc3RhbXBGaWVsZC5oaW50cy5oZWFkZXJTaXplKSB7XHJcbiAgICAgICAgc3RhbXAuaGVhZGVyU2l6ZSA9IHN0YW1wRmllbGQuaGludHMuaGVhZGVyU2l6ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN0YW1wRmllbGQuaGludHMuZGlzcGxheUNsYXNzTmFtZXMpIHtcclxuICAgICAgICBzdGFtcC5jbGFzc2VzID0gc3RhbXBGaWVsZC5oaW50cy5kaXNwbGF5Q2xhc3NOYW1lcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHByZXZpb3VzU3RhbXAgPSBjb21wb25lbnRSZW5kZXJlci5zdGFtcDtcclxuICAgIGNvbXBvbmVudFJlbmRlcmVyLnN0YW1wID0gc3RhbXA7XHJcblxyXG4gICAgY29uc3Qgb25Db21wb25lbnRDaGFuZ2UgPSAoPE9uQ2hhbmdlcz50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UpXHJcbiAgICAgIC5uZ09uQ2hhbmdlcztcclxuXHJcbiAgICBpZiAob25Db21wb25lbnRDaGFuZ2UpIHtcclxuICAgICAgY29uc3QgY2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSB7XHJcbiAgICAgICAgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNTdGFtcCxcclxuICAgICAgICBjdXJyZW50VmFsdWU6IHN0YW1wLFxyXG4gICAgICAgIGZpcnN0Q2hhbmdlOiB0eXBlb2YgcHJldmlvdXNTdGFtcCA9PT0gJ3VuZGVmaW5lZCcsXHJcbiAgICAgICAgaXNGaXJzdENoYW5nZTogKCkgPT4gY2hhbmdlLmZpcnN0Q2hhbmdlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBvbkNvbXBvbmVudENoYW5nZS5jYWxsKGNvbXBvbmVudFJlbmRlcmVyLCB7IGNvbnRyb2w6IGNoYW5nZSB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IElGaWVsZCB9IGZyb20gJy4uLy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGUgfSBmcm9tICcuLi8uLi9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWZvcm0taG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWVsZHNcIj5cclxuICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJmaWVsZC50eXBlXCI+XHJcbiAgICA8ZGUtcmUtY3J1ZC1zdGFtcC1maWVsZC1ob3N0XHJcbiAgICAgICpuZ1N3aXRjaENhc2U9XCInc3RhbXAnXCJcclxuICAgICAgW2Zvcm1JZF09XCJmb3JtSWRcIlxyXG4gICAgICBbZm9ybV09XCJmb3JtXCJcclxuICAgICAgW2ZpZWxkXT1cImZpZWxkXCJcclxuICAgICAgW3N0cnVjdF09XCJzdHJ1Y3RcIlxyXG4gICAgICBbYmxvY2tdPVwiYmxvY2tcIj5cclxuICAgIDwvZGUtcmUtY3J1ZC1zdGFtcC1maWVsZC1ob3N0PlxyXG4gICAgPGRlLXJlLWNydWQtaW5wdXQtZmllbGQtaG9zdFxyXG4gICAgICAqbmdTd2l0Y2hEZWZhdWx0XHJcbiAgICAgIFtmb3JtSWRdPVwiZm9ybUlkXCJcclxuICAgICAgW2Zvcm1dPVwiZm9ybVwiXHJcbiAgICAgIFtwYXJlbnRQYXRoXT1cInBhcmVudFBhdGhcIlxyXG4gICAgICBbcGFyZW50Rm9ybV09XCJwYXJlbnRGb3JtXCJcclxuICAgICAgW2ZpZWxkXT1cImZpZWxkXCJcclxuICAgICAgW3N0cnVjdF09XCJzdHJ1Y3RcIlxyXG4gICAgICBbYmxvY2tdPVwiYmxvY2tcIj5cclxuICAgIDwvZGUtcmUtY3J1ZC1pbnB1dC1maWVsZC1ob3N0PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRm9ybUhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgcHJpdmF0ZSBfc3RydWN0OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfYmxvY2s6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgZm9ybUlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xyXG4gIEBJbnB1dCgpIGZpZWxkczogSUZpZWxkW107XHJcbiAgQElucHV0KCkgcGFyZW50Rm9ybTogQWJzdHJhY3RDb250cm9sO1xyXG4gIEBJbnB1dCgpIHBhcmVudFBhdGg6IHN0cmluZztcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBnZXQgc3RydWN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0cnVjdCB8fCB0aGlzLnN0YXRlLm9wdGlvbnMuc3RydWN0O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgc3RydWN0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3N0cnVjdCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJsb2NrKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Jsb2NrIHx8IHRoaXMuc3RhdGUub3B0aW9ucy5ibG9jaztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGJsb2NrKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2Jsb2NrID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5mb3JtSWQpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIH0gZnJvbSAnLi9ob3N0cy9jb21wb25lbnQtaG9zdC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJbnB1dEZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvaW5wdXQtZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCdXR0b25Ib3N0Q29tcG9uZW50IH0gZnJvbSAnLi9ob3N0cy9idXR0b24taG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0YW1wRmllbGRIb3N0Q29tcG9uZW50IH0gZnJvbSAnLi9ob3N0cy9zdGFtcC1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEZvcm1Ib3N0Q29tcG9uZW50IH0gZnJvbSAnLi9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSxcclxuICAgIElucHV0RmllbGRIb3N0Q29tcG9uZW50LFxyXG4gICAgU3RhbXBGaWVsZEhvc3RDb21wb25lbnQsXHJcbiAgICBCdXR0b25Ib3N0Q29tcG9uZW50LFxyXG4gICAgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCxcclxuICAgIEZvcm1Ib3N0Q29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtGb3JtU3RhdGVTZXJ2aWNlLCBGb3JtQnVpbGRlclNlcnZpY2VdLFxyXG4gIGV4cG9ydHM6IFtJbnB1dEZpZWxkSG9zdENvbXBvbmVudCwgU3RhbXBGaWVsZEhvc3RDb21wb25lbnQsIEJ1dHRvbkhvc3RDb21wb25lbnQsIEZvcm1Ib3N0Q29tcG9uZW50XSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVSZUNydWRDb3JlTW9kdWxlIHsgfVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkT3B0aW9ucyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL29wdGlvbnMnO1xyXG5pbXBvcnQgeyBJRmllbGQgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtU3VibWlzc2lvbiwgRm9ybVN1Ym1pc3Npb25FcnJvcnMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9mb3JtLXN1Ym1pc3Npb24nO1xyXG5pbXBvcnQgeyBGb3JtQ2hhbmdlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1jaGFuZ2UnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGUgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9mb3JtLXN0YXRlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1mb3JtJyxcclxuICB0ZW1wbGF0ZTogYDxmb3JtICpuZ0lmPVwic3RhdGUuZm9ybVwiIFtmb3JtR3JvdXBdPVwic3RhdGUuZm9ybVwiPlxyXG4gIDxkZS1yZS1jcnVkLWZvcm0taG9zdCBbZm9ybUlkXT1cInN0YXRlLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1dPVwiZm9ybVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2Jsb2NrXT1cImJsb2NrXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3BhcmVudFBhdGhdPVwicGFyZW50UGF0aFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRGb3JtXT1cInBhcmVudEZvcm1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZmllbGRzXT1cImZpZWxkc1wiPlxyXG4gIDwvZGUtcmUtY3J1ZC1mb3JtLWhvc3Q+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3QgdHlwZT1cInN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zvcm1JZF09XCJzdGF0ZS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFzdWJtaXRFbmFibGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0PVwiU3VibWl0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25TdWJtaXQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuICA8ZGUtcmUtY3J1ZC1idXR0b24taG9zdCAqbmdJZj1cImNhbmNlbFZpc2libGVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjYW5jZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtSWRdPVwic3RhdGUuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhY2FuY2VsRW5hYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dD1cIkNhbmNlbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2FuY2VsKCRldmVudClcIj5cclxuICA8L2RlLXJlLWNydWQtYnV0dG9uLWhvc3Q+XHJcbjwvZm9ybT5cclxuYCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9uYXZpZ2F0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBfZm9ybUNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2NhbmNlbFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IERlUmVDcnVkT3B0aW9ucztcclxuICBASW5wdXQoKSB2YWx1ZTogb2JqZWN0O1xyXG4gIEBJbnB1dCgpIGVycm9yczogRm9ybVN1Ym1pc3Npb25FcnJvcnM7XHJcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtQ2hhbmdlPigpO1xyXG4gIEBPdXRwdXQoKSBzdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPEZvcm1TdWJtaXNzaW9uPigpO1xyXG4gIEBPdXRwdXQoKSBjYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgZmllbGRzOiBJRmllbGRbXTtcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG4gIHN1Ym1pdHRpbmc6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlKSB7fVxyXG5cclxuICBnZXQgY2FuY2VsVmlzaWJsZSgpIHtcclxuICAgIHJldHVybiAhIXRoaXMuc3RhdGUubmF2aWdhdGlvblN0YWNrLmxlbmd0aCB8fCB0aGlzLl9jYW5jZWxWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY2FuY2VsVmlzaWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fY2FuY2VsVmlzaWJsZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN1Ym1pdEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuc3VibWl0dGluZyAmJiB0aGlzLmZvcm0udmFsaWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgY2FuY2VsRW5hYmxlZCgpIHtcclxuICAgIHJldHVybiAhdGhpcy5zdWJtaXR0aW5nO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHN0cnVjdCgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLnN0cnVjdFxyXG4gICAgICA6IHRoaXMuc3RhdGUub3B0aW9ucy5zdHJ1Y3Q7XHJcbiAgfVxyXG5cclxuICBnZXQgYmxvY2soKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyBuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5ibG9ja1xyXG4gICAgICA6IHRoaXMuc3RhdGUub3B0aW9ucy5ibG9jaztcclxuICB9XHJcblxyXG4gIGdldCBmb3JtKCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gdGhpcy5zdGF0ZS5mb3JtLmdldChuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5wYXRoKVxyXG4gICAgICA6IHRoaXMuc3RhdGUuZm9ybTtcclxuICB9XHJcblxyXG4gIGdldCBwYXJlbnRQYXRoKCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGFyZW50UGF0aFxyXG4gICAgICA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyZW50Rm9ybSgpOiAoQWJzdHJhY3RDb250cm9sIHwgbnVsbCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gdGhpcy5zdGF0ZS5mb3JtLmdldChuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5wYXJlbnRQYXRoKVxyXG4gICAgICA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5jcmVhdGUodGhpcy5vcHRpb25zLCB0aGlzLnZhbHVlLCB0aGlzLmVycm9ycyk7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuX25hdmlnYXRpb25DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uTmF2aWdhdGlvbkNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuc3RhdGUub25WYWx1ZUNoYW5nZS5zdWJzY3JpYmUoKGNoYW5nZSkgPT4ge1xyXG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoY2hhbmdlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMudmFsdWUgJiYgIWNoYW5nZXMudmFsdWUuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UudXBkYXRlKHRoaXMuc3RhdGUuaWQsIGNoYW5nZXMudmFsdWUuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2hhbmdlcy5lcnJvcnMgJiYgIWNoYW5nZXMuZXJyb3JzLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnNldEVycm9ycyh0aGlzLnN0YXRlLmlkLCBjaGFuZ2VzLmVycm9ycy5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9uYXZpZ2F0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnJlbW92ZSh0aGlzLnN0YXRlLmlkKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGNvbnN0IHsgb3B0aW9ucywgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGxldCBzdHJ1Y3Q7XHJcbiAgICBsZXQgYmxvY2s7XHJcblxyXG4gICAgY29uc3QgY2hpbGQgPSBuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICh7IHN0cnVjdCwgYmxvY2sgfSA9IGNoaWxkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICh7IHN0cnVjdCwgYmxvY2sgfSA9IG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJsb2NrRmllbGRzID0gdGhpcy5nZXRCbG9ja0ZpZWxkcyhzdHJ1Y3QsIGJsb2NrKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcyA9IGJsb2NrRmllbGRzO1xyXG4gIH1cclxuXHJcbiAgZ2V0QmxvY2tGaWVsZHMoc3RydWN0OiBzdHJpbmcsIGJsb2NrTmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCB7IGJsb2NrcywgZmllbGRzIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgaWYgKCFibG9ja3MgfHwgIWZpZWxkcykge1xyXG4gICAgICAgLy8gVE9ETzogTG9nIGVycm9yXHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBibG9jayA9IGJsb2Nrc1tgJHtzdHJ1Y3R9LSR7YmxvY2tOYW1lfWBdO1xyXG5cclxuICAgIGlmICghYmxvY2spIHtcclxuICAgICAgLy8gVE9ETzogTG9nIGVycm9yXHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWZlcmVuY2VzID0gYmxvY2suZmllbGRzO1xyXG5cclxuICAgIGNvbnN0IGJsb2NrRmllbGRzID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCByZWZlcmVuY2Ugb2YgcmVmZXJlbmNlcykge1xyXG4gICAgICBibG9ja0ZpZWxkcy5wdXNoKGZpZWxkc1tgJHtzdHJ1Y3R9LSR7cmVmZXJlbmNlLmZpZWxkfWBdKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYmxvY2tGaWVsZHM7XHJcbiAgfVxyXG5cclxuICBvbkNhbmNlbChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5jYW5jZWxFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZS5uYXZpZ2F0aW9uU3RhY2subGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnBvcE5hdmlnYXRpb24odGhpcy5zdGF0ZS5pZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhbmNlbC5lbWl0KCk7XHJcbiAgICB0aGlzLnN0YXRlLmZvcm0ucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIG9uU3VibWl0KGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnN1Ym1pdEVuYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLm5hdmlnYXRpb25TdGFjay5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UuY29tcGxldGVOYXZpZ2F0aW9uKHRoaXMuc3RhdGUuaWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdWJtaXR0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnN1Ym1pdC5lbWl0KHtcclxuICAgICAgdmFsdWU6IHRoaXMuc3RhdGUuZm9ybS52YWx1ZSxcclxuICAgICAgb25Db21wbGV0ZTogKGVycm9ycykgPT4ge1xyXG4gICAgICAgIGlmICghZXJyb3JzKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlU2VydmljZS5jbGVhckVycm9ycyh0aGlzLnN0YXRlLmlkKTtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuZm9ybS5yZXNldCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlU2VydmljZS5zZXRFcnJvcnModGhpcy5zdGF0ZS5pZCwgZXJyb3JzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3VibWl0dGluZyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGVSZUNydWRDb3JlTW9kdWxlIH0gZnJvbSAnLi4vY29yZS9jb3JlLm1vZHVsZSc7XHJcbmltcG9ydCB7IEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0vZm9ybS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEZVJlQ3J1ZENvcmVNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEZvcm1Db21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtGb3JtQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVSZUNydWRGb3Jtc01vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgSUNvbnRyb2wgfSBmcm9tICcuL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbi8vIEBkeW5hbWljXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRXJyb3JIZWxwZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIF9lcnJvclNvcnQgPSBbJ3JlcXVpcmVkJ107XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdldEZvcm1Db250cm9sSWZFcnJvckZvdW5kKGNvbnRyb2w6IElDb250cm9sKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbCA9IGNvbnRyb2wuZm9ybS5nZXQoY29udHJvbC5maWVsZC5uYW1lKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICghZm9ybUNvbnRyb2wuZXJyb3JzIHx8ICFmb3JtQ29udHJvbC50b3VjaGVkKSAmJlxyXG4gICAgICAhY29udHJvbC5zdWJtaXNzaW9uRXJyb3JzLmxlbmd0aFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtQ29udHJvbDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBoYXNFcnJvcihjb250cm9sOiBJQ29udHJvbCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5nZXRGb3JtQ29udHJvbElmRXJyb3JGb3VuZChjb250cm9sKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFcnJvcnMoY29udHJvbDogSUNvbnRyb2wpIHtcclxuICAgIGNvbnN0IGZvcm1Db250cm9sID0gdGhpcy5nZXRGb3JtQ29udHJvbElmRXJyb3JGb3VuZChjb250cm9sKTtcclxuICAgIGlmICghZm9ybUNvbnRyb2wpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc29ydGVkRXJyb3JzID0gW107XHJcbiAgICBjb25zdCB1bnNvcnRlZEVycm9ycyA9IFtdO1xyXG5cclxuICAgIGlmIChmb3JtQ29udHJvbC5lcnJvcnMgJiYgZm9ybUNvbnRyb2wudG91Y2hlZCkge1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmb3JtQ29udHJvbC5lcnJvcnMpKSB7XHJcbiAgICAgICAgY29uc3Qgc29ydCA9IHRoaXMuX2Vycm9yU29ydFtrZXldO1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhID0gZm9ybUNvbnRyb2wuZXJyb3JzW2tleV07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHVuc29ydGVkRXJyb3JzLnB1c2goeyBrZXksIG1ldGFkYXRhIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzb3J0ZWRFcnJvcnMucHVzaCh7IGtleSwgbWV0YWRhdGEsIHNvcnQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvcnRlZEVycm9yc1xyXG4gICAgICAuc29ydCh4ID0+IHguc29ydClcclxuICAgICAgLmNvbmNhdCh1bnNvcnRlZEVycm9ycylcclxuICAgICAgLm1hcCh0aGlzLmdldEVycm9yTWVzc2FnZSlcclxuICAgICAgLmNvbmNhdChjb250cm9sLnN1Ym1pc3Npb25FcnJvcnMpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEVycm9yTWVzc2FnZShlcnJvcjogeyBrZXk6IHN0cmluZzsgbWV0YWRhdGE6IGFueSB9KSB7XHJcbiAgICBzd2l0Y2ggKGVycm9yLmtleSkge1xyXG4gICAgICBjYXNlICdyZXF1aXJlZCc6XHJcbiAgICAgICAgcmV0dXJuICdUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLic7XHJcbiAgICAgIGNhc2UgJ21pbmxlbmd0aCc6XHJcbiAgICAgICAgcmV0dXJuIGBUaGlzIGZpZWxkIG11c3QgaGF2ZSBhdCBsZWFzdCAke1xyXG4gICAgICAgICAgZXJyb3IubWV0YWRhdGEucmVxdWlyZWRMZW5ndGhcclxuICAgICAgICB9IGNoYXJhY3RlcnMuYDtcclxuICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcclxuICAgICAgICByZXR1cm4gYFRoaXMgZmllbGQgY2FuIG5vdCBleGNlZWQgJHtcclxuICAgICAgICAgIGVycm9yLm1ldGFkYXRhLnJlcXVpcmVkTGVuZ3RoXHJcbiAgICAgICAgfSBjaGFyYWN0ZXJzLmA7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGBWYWxpZGF0aW9uIGZhaWxlZCB3aXRoIGVycm9yOiAke2Vycm9yfWA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3JIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3ZhbGlkYXRpb24tZXJyb3ItaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWNvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCIgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NlcygpXCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48L2Rpdj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcblxyXG4gIGdldENsYXNzZXMoKSB7XHJcbiAgICBjb25zdCBoYXNFcnJvciA9IFZhbGlkYXRpb25FcnJvckhlbHBlci5oYXNFcnJvcih0aGlzLmNvbnRyb2wpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICdoYXMtZXJyb3InOiBoYXNFcnJvcixcclxuICAgICAgJ2hhcy1mZWVkYmFjayc6IGhhc0Vycm9yXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4vcHJvdmlkZXIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW0RlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaW5wdXQtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbZm9ybUdyb3VwXT1cImNvbnRyb2wuZm9ybVwiPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyPlxyXG4gIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgIFt0eXBlXT1cImNvbnRyb2wucmVuZGVyZXJUeXBlXCJcclxuICAgICAgICAgW2lkXT1cImNvbnRyb2wuaHRtbElkXCJcclxuICAgICAgICAgW25hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgICAoZm9jdXMpPVwiY29udHJvbC5vbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgICAoYmx1cik9XCJjb250cm9sLm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgKGlucHV0KT1cImNvbnRyb2wub25DaGFuZ2UoJGV2ZW50KVwiIC8+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy1oZWxwLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1oZWxwLXJlbmRlcmVyPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyPlxyXG48L25nLWNvbnRhaW5lcj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb250cm9sO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJU2VsZWN0Q29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtc2VsZWN0LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj48L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlcj5cclxuICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgIFtpZF09XCJjb250cm9sLmh0bWxJZFwiXHJcbiAgICAgICAgICBbbmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgICAgKGZvY3VzKT1cImNvbnRyb2wub25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgIChibHVyKT1cImNvbnRyb2wub25CbHVyKCRldmVudClcIlxyXG4gICAgICAgICAgKGNoYW5nZSk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIj5cclxuICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb250cm9sLm9wdGlvbnNcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCI+e3tvcHRpb24ubGFiZWx9fTwvb3B0aW9uPlxyXG4gIDwvc2VsZWN0PlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSVNlbGVjdENvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bGFiZWwgY2xhc3M9XCJjb250cm9sLWxhYmVsXCIgW2h0bWxGb3JdPVwiY29udHJvbC5odG1sSWRcIj57e2NvbnRyb2wuZmllbGQubGFiZWx9fTwvbGFiZWw+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNMYWJlbFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIElucHV0LFxyXG4gIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnV0dG9uUmVuZGVyZXIsIElCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9idXR0b24ucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtYnV0dG9uLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG5cIiBbbmdDbGFzc109XCJjbGFzc2VzXCJcclxuICAgICAgICBbdHlwZV09XCJidXR0b24udHlwZVwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cImJ1dHRvbi5kaXNhYmxlZFwiXHJcbiAgICAgICAgKGNsaWNrKT1cImJ1dHRvbi5vbkNsaWNrKCRldmVudClcIj5cclxuICB7e2J1dHRvbi50ZXh0fX1cclxuPC9idXR0b24+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNCdXR0b25SZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBCdXR0b25SZW5kZXJlciB7XHJcbiAgQElucHV0KCkgYnV0dG9uOiBJQnV0dG9uO1xyXG4gIF9jbGFzc2VzOiBzdHJpbmdbXTtcclxuXHJcbiAgZ2V0IGNsYXNzZXMoKSB7XHJcbiAgICBsZXQgY2xhc3Nlczogc3RyaW5nW107XHJcblxyXG4gICAgaWYgKHRoaXMuX2NsYXNzZXMpIHtcclxuICAgICAgY2xhc3NlcyA9IHRoaXMuX2NsYXNzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYnV0dG9uLmV4dHJhQ2xhc3Nlcykge1xyXG4gICAgICBjbGFzc2VzID0gKGNsYXNzZXMgfHwgW10pLmNvbmNhdCh0aGlzLmJ1dHRvbi5leHRyYUNsYXNzZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbGFzc2VzO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmJ1dHRvbikge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY2hhbmdlcy5idXR0b24uY3VycmVudFZhbHVlLnR5cGUgIT09XHJcbiAgICAgICAgY2hhbmdlcy5idXR0b24ucHJldmlvdXNWYWx1ZS50eXBlXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2xhc3NlcygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDbGFzc2VzKCkge1xyXG4gICAgaWYgKHRoaXMuYnV0dG9uLmNsYXNzKSB7XHJcbiAgICAgIHRoaXMuX2NsYXNzZXMgPSBbdGhpcy5idXR0b24uY2xhc3NdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmJ1dHRvbi50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XHJcbiAgICAgICAgdGhpcy5fY2xhc3NlcyA9IFsnYnRuLXByaW1hcnknXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLl9jbGFzc2VzID0gWydidG4tZGVmYXVsdCddO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIsIElDb2xsZWN0aW9uQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5pbXBvcnQgeyBJRmllbGQgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVscy9zY2hlbWEnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtdGFibGUtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdj5cclxuICA8ZGUtcmUtY3J1ZC1zdGFtcC1yZW5kZXJlciBbc3RhbXBdPVwiY29udHJvbC5zdGFtcFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1zdGFtcC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1idXR0b24taG9zdFxyXG4gICAgW2Zvcm1JZF09XCJjb250cm9sLmZvcm1JZFwiXHJcbiAgICBleHRyYUNsYXNzZXM9XCJidG4tc21cIlxyXG4gICAgdGV4dD1cIkFkZFwiXHJcbiAgICAoY2xpY2spPVwiY29udHJvbC5vbkFkZCgkZXZlbnQpXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJ1dHRvbi1ob3N0PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJ0YWJsZS1jb250cm9sLWNvbnRhaW5lclwiPlxyXG4gIDx0YWJsZSBjbGFzcz1cInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLWNvbmRlbnNlZFwiPlxyXG4gICAgPHRoZWFkPlxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBjb250cm9sLm5lc3RlZEZpZWxkc1wiPlxyXG4gICAgICAgICAge3tmaWVsZC5sYWJlbH19XHJcbiAgICAgICAgPC90aD5cclxuICAgICAgPC90cj5cclxuICAgIDwvdGhlYWQ+XHJcbiAgICA8dGJvZHk+XHJcbiAgICAgIDx0ciAqbmdJZj1cIiFjb250cm9sLm5lc3RlZFZhbHVlcy5sZW5ndGhcIj5cclxuICAgICAgICA8dGQgY29sc3Bhbj1cIjEwMCVcIj5Ob25lPC90ZD5cclxuICAgICAgPC90cj5cclxuICAgICAgPHRyICpuZ0Zvcj1cImxldCBmb3JtIG9mIGNvbnRyb2wubmVzdGVkVmFsdWVzXCI+XHJcbiAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBjb250cm9sLm5lc3RlZEZpZWxkc1wiIFtpbm5lckh0bWxdPVwiZ2V0VmFsdWUoZmllbGQsIGZvcm0udmFsdWUpXCI+PC90ZD5cclxuICAgICAgPC90cj5cclxuICAgIDwvdGJvZHk+XHJcbiAgPC90YWJsZT5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC50YWJsZS1jb250cm9sLWNvbnRhaW5lcnttYXJnaW4tdG9wOjEwcHh9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29sbGVjdGlvbkNvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbGxlY3Rpb25Db250cm9sO1xyXG5cclxuICBnZXRWYWx1ZShmaWVsZDogSUZpZWxkLCB2YWx1ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZFZhbHVlID0gdmFsdWVbZmllbGQubmFtZV07XHJcblxyXG4gICAgaWYgKGZpZWxkVmFsdWUgPT0gbnVsbCB8fCB0eXBlb2YgZmllbGRWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuICcmbmJzcDsnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWVsZFZhbHVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWNoZWNrYm94LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj5cclxuICAgIDxsYWJlbCBbaHRtbEZvcl09XCJjb250cm9sLmh0bWxJZFwiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICBbaWRdPVwiY29udHJvbC5odG1sSWRcIlxyXG4gICAgICAgIFtuYW1lXT1cImNvbnRyb2wuZmllbGQubmFtZVwiXHJcbiAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgIChmb2N1cyk9XCJjb250cm9sLm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgKGJsdXIpPVwiY29udHJvbC5vbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgKGlucHV0KT1cImNvbnRyb2wub25DaGFuZ2UoJGV2ZW50KVwiIC8+IHt7Y29udHJvbC5maWVsZC5sYWJlbH19XHJcbiAgICA8L2xhYmVsPlxyXG4gIDwvZGl2PlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNDaGVja2JveFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdENvbnRyb2xSZW5kZXJlciwgSVNlbGVjdENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uLWVycm9yLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1oZWxwLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxwICpuZ0lmPVwiY29udHJvbC5maWVsZC5oZWxwICYmICFoYXNFcnJvcigpXCIgY2xhc3M9XCJoZWxwLWJsb2NrXCI+e3tjb250cm9sLmZpZWxkLmhlbHB9fTwvcD5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0hlbHBSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIFNlbGVjdENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSVNlbGVjdENvbnRyb2w7XHJcblxyXG4gIGhhc0Vycm9yKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25FcnJvckhlbHBlci5oYXNFcnJvcih0aGlzLmNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uLWVycm9yLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzRXJyb3IoKVwiXHJcbiAgW25nVGVtcGxhdGVPdXRsZXRdPVwidmFsaWRhdGlvbkVycm9yc1wiXHJcbiAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgZXJyb3JzOiBnZXRFcnJvcnMoKSB9XCI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5cclxuPG5nLXRlbXBsYXRlICN2YWxpZGF0aW9uRXJyb3JzIGxldC1lcnJvcnM9XCJlcnJvcnNcIj5cclxuICA8bmctY29udGFpbmVyPlxyXG4gICAgPHAgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1wiIGNsYXNzPVwiaGVscC1ibG9ja1wiPlxyXG4gICAgICB7e2Vycm9yfX1cclxuICAgIDwvcD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM1ZhbGlkYXRpb25FcnJvcnNSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcblxyXG4gIGhhc0Vycm9yKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25FcnJvckhlbHBlci5oYXNFcnJvcih0aGlzLmNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RXJyb3JzKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRpb25FcnJvckhlbHBlci5nZXRFcnJvcnModGhpcy5jb250cm9sKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIsIElDb2xsZWN0aW9uQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaW5saW5lLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgPGRlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXIgW3N0YW1wXT1cImNvbnRyb2wuc3RhbXBcIj5cclxuICA8L2RlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3RcclxuICAgICpuZ0lmPVwiY29udHJvbC5jYW5BZGRcIlxyXG4gICAgW2Zvcm1JZF09XCJjb250cm9sLmZvcm1JZFwiXHJcbiAgICBleHRyYUNsYXNzZXM9XCJidG4tc21cIlxyXG4gICAgdGV4dD1cIkFkZFwiXHJcbiAgICAoY2xpY2spPVwiY29udHJvbC5vbkFkZCgkZXZlbnQpXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJ1dHRvbi1ob3N0PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJpbmxpbmUtY29udHJvbC1jb250YWluZXJcIj5cclxuICA8c3BhbiAqbmdJZj1cIiFjb250cm9sLm5lc3RlZFZhbHVlcy5sZW5ndGhcIj5Ob25lPC9zcGFuPlxyXG4gIDxkaXYgKm5nRm9yPVwibGV0IHZhbHVlIG9mIGNvbnRyb2wubmVzdGVkVmFsdWVzXCI+XHJcbiAgICA8ZGUtcmUtY3J1ZC1mb3JtLWhvc3RcclxuICAgICAgW2Zvcm1JZF09XCJjb250cm9sLmZvcm1JZFwiXHJcbiAgICAgIFtmb3JtXT1cInZhbHVlXCJcclxuICAgICAgW3BhcmVudFBhdGhdPVwiY29udHJvbC5mb3JtUGF0aFwiXHJcbiAgICAgIFtwYXJlbnRGb3JtXT1cImNvbnRyb2wudmFsdWVcIlxyXG4gICAgICBbZmllbGRzXT1cImNvbnRyb2wubmVzdGVkRmllbGRzXCJcclxuICAgICAgW3N0cnVjdF09XCJjb250cm9sLmZpZWxkLnJlZmVyZW5jZS5zdHJ1Y3RcIlxyXG4gICAgICBbYmxvY2tdPVwiY29udHJvbC5maWVsZC5yZWZlcmVuY2UuYmxvY2tcIj5cclxuICAgIDwvZGUtcmUtY3J1ZC1mb3JtLWhvc3Q+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuaW5saW5lLWNvbnRyb2wtY29udGFpbmVye21hcmdpbi10b3A6MTBweDttYXJnaW4tYm90dG9tOjEwcHh9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0YW1wUmVuZGVyZXIsIElTdGFtcCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL3N0YW1wLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1zdGFtcC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJzdGFtcC5oZWFkZXJTaXplXCI+XHJcbiAgPGgxICpuZ1N3aXRjaENhc2U9XCIxXCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oMT5cclxuICA8aDIgKm5nU3dpdGNoQ2FzZT1cIjJcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2gyPlxyXG4gIDxoMyAqbmdTd2l0Y2hDYXNlPVwiM1wiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDM+XHJcbiAgPGg0ICpuZ1N3aXRjaENhc2U9XCI0XCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oND5cclxuICA8aDUgKm5nU3dpdGNoQ2FzZT1cIjVcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2g1PlxyXG4gIDxoNiAqbmdTd2l0Y2hDYXNlPVwiNlwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDY+XHJcbiAgPHAgKm5nU3dpdGNoRGVmYXVsdCBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L3A+XHJcbjwvbmctY29udGFpbmVyPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIFN0YW1wUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIHN0YW1wOiBJU3RhbXA7XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vY29udHJvbC1jb250YWluZXItcmVuZGVyZXIvY29udHJvbC1jb250YWluZXItcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGVSZUNydWRDb3JlTW9kdWxlIH0gZnJvbSAnLi4vLi4vY29yZS9jb3JlLm1vZHVsZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJNb2R1bGUgfSBmcm9tICcuLi9wcm92aWRlci9wcm92aWRlci5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB9IGZyb20gJy4uL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaW5wdXQtcmVuZGVyZXIvaW5wdXQtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM1NlbGVjdFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtcmVuZGVyZXIvc2VsZWN0LXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNMYWJlbFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYWJlbC1yZW5kZXJlci9sYWJlbC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzQnV0dG9uUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2J1dHRvbi1yZW5kZXJlci9idXR0b24tcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXJlbmRlcmVyL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNDaGVja2JveFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveC1yZW5kZXJlci9jaGVja2JveC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzSGVscFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9oZWxwLXJlbmRlcmVyL2hlbHAtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM1ZhbGlkYXRpb25FcnJvcnNSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXIvdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9pbmxpbmUtcmVuZGVyZXIvaW5saW5lLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zdGFtcC1yZW5kZXJlci9zdGFtcC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBEZVJlQ3J1ZENvcmVNb2R1bGUsIERlUmVDcnVkUHJvdmlkZXJNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1NlbGVjdFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0xhYmVsUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQnV0dG9uUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNDaGVja2JveFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0hlbHBSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNWYWxpZGF0aW9uRXJyb3JzUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBCb290c3RyYXAzQ29udHJvbENvbnRhaW5lclJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQnV0dG9uUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNDaGVja2JveFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzRGVSZUNydWRQcm92aWRlck1vZHVsZSB7XHJcbiAgY29uc3RydWN0b3IocHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSkge1xyXG4gICAgcHJvdmlkZXJTZXJ2aWNlLnJlZ2lzdGVyKCdib290c3RyYXAzJywge1xyXG4gICAgICBzdGFtcENvbXBvbmVudDogQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGNvbnRhaW5lckNvbXBvbmVudDogQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgaW5wdXRDb21wb25lbnQ6IEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBzZWxlY3RDb21wb25lbnQ6IEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgYnV0dG9uQ29tcG9uZW50OiBCb290c3RyYXAzQnV0dG9uUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIHRhYmxlQ29tcG9uZW50OiBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgaW5saW5lQ29tcG9uZW50OiBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGNoZWNrYm94Q29tcG9uZW50OiBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJEaXJlY3RpdmUiLCJWaWV3Q29udGFpbmVyUmVmIiwiSW5qZWN0YWJsZSIsInRzbGliXzEuX192YWx1ZXMiLCJGb3JtR3JvdXAiLCJWYWxpZGF0b3JzIiwiRm9ybUJ1aWxkZXIiLCJTdWJqZWN0IiwiQ29tcG9uZW50IiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiVmlld0NoaWxkIiwiSW5wdXQiLCJGb3JtQXJyYXkiLCJFdmVudEVtaXR0ZXIiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FLGdDQUFtQixnQkFBa0M7WUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtTQUFJOztvQkFMMURBLGNBQVMsU0FBQzs7d0JBRVQsUUFBUSxFQUFFLHlCQUF5QjtxQkFDcEM7Ozs7O3dCQUxtQkMscUJBQWdCOzs7cUNBQXBDOzs7SUNBQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQWVPLElBQUksUUFBUSxHQUFHO1FBQ2xCLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLGtCQUFrQixDQUFDO1lBQzNDLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7b0JBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hGO1lBQ0QsT0FBTyxDQUFDLENBQUM7U0FDWixDQUFBO1FBQ0QsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUE7QUFFRCxzQkFrRXlCLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU07b0JBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzthQUMzQztTQUNKLENBQUM7SUFDTixDQUFDO0FBRUQsb0JBQXVCLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSTtZQUNBLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7Z0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLEtBQUssRUFBRTtZQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUFFO2dCQUMvQjtZQUNKLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRDtvQkFDTztnQkFBRSxJQUFJLENBQUM7b0JBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQUU7U0FDcEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7QUFFRDtRQUNJLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQzlDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7O0FDMUlEOzswQkFLZ0UsRUFBRTs7Ozs7OztRQUVoRSwwQ0FBUTs7Ozs7WUFBUixVQUFTLElBQVksRUFBRSxPQUFnQztnQkFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7YUFDN0I7Ozs7O1FBRUQscUNBQUc7Ozs7WUFBSCxVQUFJLElBQVk7O2dCQUNkLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFhLElBQUksNkZBQTBGLENBQUMsQ0FBQztpQkFDOUg7Z0JBRUQsT0FBTyxPQUFPLENBQUM7YUFDaEI7O29CQWZGQyxlQUFVOztzQ0FIWDs7Ozs7Ozs7QUNFQSxRQUFhLG1CQUFtQixHQUFHLFVBQUMsT0FBd0I7O1FBQzFELElBQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztRQUUvRCxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNsRCxDQUFDOzs7Ozs7O1FDY0EsNEJBQW9CLEVBQWU7WUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO1NBQUk7Ozs7Ozs7OztRQUV2QyxrQ0FBSzs7Ozs7Ozs7WUFBTCxVQUNFLE1BQWMsRUFDZCxTQUFpQixFQUNqQixNQUEyQixFQUMzQixNQUEyQixFQUMzQixLQUFVO2dCQUFWLHNCQUFBO29CQUFBLFVBQVU7Ozs7Z0JBRVYsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDOztnQkFDakIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFJLE1BQU0sU0FBSSxTQUFXLENBQUMsQ0FBQzs7b0JBRS9DLEtBQTZCLElBQUEsS0FBQUMsU0FBQSxLQUFLLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO3dCQUF0QyxJQUFNLGNBQWMsV0FBQTs7d0JBQ3ZCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBSSxNQUFNLFNBQUksY0FBYyxDQUFDLEtBQU8sQ0FBQyxDQUFDO3dCQUUxRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFOzRCQUMxQixTQUFTO3lCQUNWO3dCQUVELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7OzRCQUNqQyxJQUFNLGlCQUFpQixxQkFBdUIsS0FBSyxFQUFDOzRCQUM1QyxJQUFBLHVDQUFTLENBQXVCOzs0QkFFeEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDdEIsU0FBUyxDQUFDLE1BQU0sRUFDaEIsU0FBUyxDQUFDLEtBQUssRUFDZixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQ2xCLENBQUM7NEJBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLGlCQUFpQixDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7O2dDQUU3RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO29DQUN2RCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO2lDQUMzRTs2QkFDRjs0QkFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFFMUIsU0FBUzt5QkFDVjs7d0JBRUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7O3dCQUM3RCxJQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUM7d0JBRTdELEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7cUJBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7O2dCQUVELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtvQkFDcEIsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDMUI7Z0JBRUQsT0FBTyxTQUFTLENBQUM7YUFDbEI7Ozs7Ozs7OztRQUVELGtDQUFLOzs7Ozs7OztZQUFMLFVBQ0UsTUFBYyxFQUNkLFNBQWlCLEVBQ2pCLE1BQTJCLEVBQzNCLE1BQTJCLEVBQzNCLEtBQVU7Z0JBTFosaUJBdUJDO2dCQWxCQyxzQkFBQTtvQkFBQSxVQUFVOzs7Z0JBRVYsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUVqQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUN6QixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTs7d0JBQ2pCLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUVsRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNuQixDQUFDLENBQUM7aUJBQ0o7O2dCQUVELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtvQkFDcEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDeEI7Z0JBRUQsT0FBTyxTQUFTLENBQUM7YUFDbEI7Ozs7OztRQUlPLDBDQUFhOzs7OztzQkFBQyxjQUErQixFQUFFLEtBQWE7Z0JBQ2xFLE9BQU8sVUFBQyxPQUF3Qjs7b0JBQzlCLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQzs7b0JBRXRCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7O29CQUMxQixJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUU5QixJQUNFLE1BQU0sWUFBWUMsZUFBUzt3QkFDM0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNuRDt3QkFDQSxPQUFPLElBQUksQ0FBQztxQkFDYjtvQkFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7d0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUNDLGdCQUFVLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUM7cUJBQzNEO29CQUVELElBQUksbUJBQWEsS0FBSyxHQUFFLFNBQVMsRUFBRTt3QkFDakMsVUFBVSxDQUFDLElBQUksQ0FBQ0EsZ0JBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQWEsS0FBSyxHQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7cUJBQ3RFO29CQUVELElBQUksbUJBQWEsS0FBSyxHQUFFLFNBQVMsRUFBRTt3QkFDakMsVUFBVSxDQUFDLElBQUksQ0FBQ0EsZ0JBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQWEsS0FBSyxHQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7cUJBQ3RFO29CQUVELElBQUksbUJBQWdCLEtBQUssR0FBRSxHQUFHLEVBQUU7d0JBQzlCLFVBQVUsQ0FBQyxJQUFJLENBQUNBLGdCQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFnQixLQUFLLEdBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDN0Q7b0JBRUQsSUFBSSxtQkFBZ0IsS0FBSyxHQUFFLEdBQUcsRUFBRTt3QkFDOUIsVUFBVSxDQUFDLElBQUksQ0FBQ0EsZ0JBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQWdCLEtBQUssR0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUM3RDtvQkFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTt3QkFDdEIsT0FBTyxJQUFJLENBQUM7cUJBQ2I7b0JBRUQsT0FBT0EsZ0JBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2hELENBQUM7OztvQkE5SExILGVBQVU7Ozs7O3dCQWZUSSxpQkFBVzs7O2lDQUhiOzs7Ozs7OztRQ21CRSwwQkFBb0IsV0FBK0I7WUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9COzBCQUZMLEVBQUU7U0FFTzs7OztRQUVoRCwyQkFBVTs7O1lBQWpCO2dCQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3RCOzs7OztRQUVNLCtCQUFjOzs7O1lBQXJCLFVBQXNCLE9BQXdCO2dCQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0Y7Ozs7OztRQUdNLDJCQUFVOzs7O1lBQWpCLFVBQWtCLEtBQWlDO2dCQUNqRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDN0IsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7Z0JBRUQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ3BCOzs7OztRQUVNLDRCQUFXOzs7O1lBQWxCLFVBQW1CLE9BQXdCOzs7Z0JBQ3pDLElBQU0sT0FBTyxHQUFjLEVBQUUsQ0FBQzs7Z0JBQzlCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQzs7Z0JBQzVCLElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQzs7b0JBRTVCLEtBQTJCLElBQUEsS0FBQUgsU0FBQSxPQUFPLENBQUMsTUFBTSxDQUFBLGdCQUFBLDRCQUFFO3dCQUF0QyxJQUFNLFlBQVksV0FBQTs7d0JBQ3JCLElBQU0sTUFBTSxnQkFDUCxZQUFZLElBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUMxQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQ3BELE1BQU0sRUFBRSxFQUFFLEVBQ1YsTUFBTSxFQUFFLEVBQUUsSUFDVjs7NEJBRUYsS0FBMEIsSUFBQSxLQUFBQSxTQUFBLFlBQVksQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0NBQTFDLElBQU0sV0FBVyxXQUFBOztnQ0FDcEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7O2dDQUVqRCxJQUFNLEtBQUssZ0JBQ04sV0FBVyxJQUNkLEtBQUssT0FBQSxFQUNMLFdBQVcsRUFBRSxXQUFXLENBQUMsV0FBVyxJQUFJLEtBQUssRUFDN0MsTUFBTSxFQUFFLFlBQVksQ0FBQyxJQUFJLElBQ3pCO2dDQUVGLElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFO29DQUM3QyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7aUNBQ25DO2dDQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0NBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBRUQsS0FBMEIsSUFBQSxLQUFBQSxTQUFBLFlBQVksQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0NBQTFDLElBQU0sV0FBVyxXQUFBOztnQ0FDcEIsSUFBTSxLQUFLLGdCQUNOLFdBQVcsSUFDZCxNQUFNLEVBQUUsRUFBRSxFQUNWLE1BQU0sRUFBRSxZQUFZLENBQUMsSUFBSSxJQUN6Qjs7b0NBRUYsS0FBd0IsSUFBQSxLQUFBQSxTQUFBLFdBQVcsQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7d0NBQXZDLElBQU0sU0FBUyxXQUFBO3dDQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFOzRDQUNkLFNBQVM7eUNBQ1Y7O3dDQUVELElBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLOzhDQUNsQyxTQUFTOzhDQUNULEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDOzt3Q0FFekIsSUFBSSxTQUFTLFVBQUM7d0NBRWQsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFOzs0Q0FDNUIsSUFBTSxXQUFXLEdBQ2YsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO2tEQUMvQixjQUFjLENBQUMsU0FBUztrREFDeEIsWUFBVSxjQUFjLENBQUMsU0FBVyxDQUFDOzs0Q0FHM0MsU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7eUNBQzdEOzZDQUFNOzs0Q0FFTCxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUM7eUNBQ25EO3dDQUVELGNBQWMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO3dDQUNyQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQ0FDbkM7Ozs7Ozs7Ozs7Ozs7OztnQ0FFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7d0JBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDdEI7Ozs7Ozs7Ozs7Ozs7OztnQkFFRCxPQUFPO29CQUNMLE9BQU8sU0FBQTtvQkFDUCxNQUFNLFFBQUE7b0JBQ04sTUFBTSxRQUFBO2lCQUNQLENBQUM7YUFDSDs7Ozs7UUFFRCw4QkFBRzs7OztZQUFILFVBQUksRUFBVTtnQkFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7Ozs7Ozs7UUFFRCxpQ0FBTTs7Ozs7O1lBQU4sVUFBTyxPQUF3QixFQUFFLEtBQWEsRUFBRSxhQUFvQzs7Z0JBQ2xGLElBQUksRUFBRSxDQUFTO2dCQUVmLE9BQU8sSUFBSSxFQUFFO29CQUNYLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFFbkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUNuQixTQUFTO3FCQUNWO29CQUVELE1BQU07aUJBQ1A7Z0JBRUQsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztnQkFFekMsSUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztnQkFDckQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxJQUFJLEdBQUEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7O2dCQUN2RSxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUM1QixVQUFBLEtBQUssSUFBSSxPQUFHLEtBQUssQ0FBQyxNQUFNLFNBQUksS0FBSyxDQUFDLElBQU0sR0FBQSxFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUNkLENBQUM7O2dCQUVGLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQzVCLFVBQUEsS0FBSyxJQUFJLE9BQUcsS0FBSyxDQUFDLE1BQU0sU0FBSSxLQUFLLENBQUMsSUFBTSxHQUFBLEVBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQ2QsQ0FBQzs7Z0JBRUYsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQ2pDLE9BQU8sQ0FBQyxNQUFNLEVBQ2QsT0FBTyxDQUFDLEtBQUssRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssQ0FDTixDQUFDOztnQkFFRixJQUFNLEtBQUssR0FBYztvQkFDdkIsRUFBRSxJQUFBO29CQUNGLE9BQU8sU0FBQTtvQkFDUCxJQUFJLE1BQUE7b0JBQ0osT0FBTyxTQUFBO29CQUNQLE1BQU0sUUFBQTtvQkFDTixNQUFNLFFBQUE7b0JBQ04sZ0JBQWdCLEVBQUUsYUFBYTtvQkFDL0Isd0JBQXdCLEVBQUUsSUFBSUksWUFBTyxFQUF3QjtvQkFDN0QsZUFBZSxFQUFFLEVBQUU7b0JBQ25CLGtCQUFrQixFQUFFLElBQUlBLFlBQU8sRUFBVTtvQkFDekMsYUFBYSxFQUFFLElBQUlBLFlBQU8sRUFBYztpQkFDekMsQ0FBQztnQkFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFeEIsT0FBTyxLQUFLLENBQUM7YUFDZDs7Ozs7OztRQUVELHFDQUFVOzs7Ozs7WUFBVixVQUFXLE1BQWMsRUFBRSxNQUFjLEVBQUUsS0FBYTtnQkFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3hCLE9BQU87aUJBQ1I7Z0JBRUQsOEJBQVEsa0JBQU0sRUFBRSxrQkFBTSxDQUF5QjtnQkFDL0MsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM5RDs7Ozs7O1FBRUQsaUNBQU07Ozs7O1lBQU4sVUFBTyxFQUFVLEVBQUUsS0FBYTtnQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3BCLE9BQU87aUJBQ1I7Z0JBRU8sSUFBQSwyQkFBSSxDQUFxQjtnQkFFakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4Qjs7Ozs7UUFFRCxpQ0FBTTs7OztZQUFOLFVBQU8sRUFBVTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDcEIsT0FBTztpQkFDUjtnQkFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7Ozs7OztRQUVELHNDQUFXOzs7OztZQUFYLFVBQVksRUFBVSxFQUFFLFFBQWlCO2dCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDcEIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLFFBQVEsRUFBRTtvQkFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ25EO3FCQUFNO29CQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2lCQUN2QztnQkFFRCxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDckM7Ozs7OztRQUVELG9DQUFTOzs7OztZQUFULFVBQVUsRUFBVSxFQUFFLE1BQTRCO2dCQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDcEIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztnQkFDMUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3JDOzs7Ozs7OztRQUVELG1DQUFROzs7Ozs7O1lBQVIsVUFBUyxFQUFVLEVBQUUsUUFBZ0IsRUFBRSxRQUFhLEVBQUUsS0FBYTtnQkFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3BCLE9BQU87aUJBQ1I7O2dCQUVELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUUvQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixLQUFLLEtBQUssRUFBRTtvQkFDM0QsT0FBTztpQkFDUjtnQkFFRCxtQkFBc0IsS0FBSyxDQUFDLGFBQWEsR0FBRSxJQUFJLENBQUM7b0JBQzlDLFNBQVMsRUFBRSxRQUFRO29CQUNuQixLQUFLLEVBQUUsUUFBUTtvQkFDZixTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO2lCQUM1QixDQUFDLENBQUM7YUFDSjs7Ozs7Ozs7O1FBRUQseUNBQWM7Ozs7Ozs7O1lBQWQsVUFBZSxFQUFVLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsVUFBa0I7Z0JBQ3hGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNwQixPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztvQkFDbkMsTUFBTSxRQUFBO29CQUNOLEtBQUssT0FBQTtvQkFDTCxJQUFJLE1BQUE7b0JBQ0osVUFBVSxZQUFBO2lCQUNYLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDL0I7Ozs7O1FBRUQsd0NBQWE7Ozs7WUFBYixVQUFjLEVBQVU7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNwQixPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUV0QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDL0I7Ozs7O1FBRUQsNkNBQWtCOzs7O1lBQWxCLFVBQW1CLEVBQVU7Z0JBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNwQixPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7Ozs7OztRQUVPLCtDQUFvQjs7Ozs7c0JBQUMsRUFBVSxFQUFFLE9BQWdCOztnQkFDdkQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsbUJBQWtCLEtBQUssQ0FBQyxrQkFBa0IsR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztRQUdwRCxxREFBMEI7Ozs7c0JBQUMsRUFBVTs7Z0JBQzNDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLG1CQUFnQyxLQUFLLENBQUMsd0JBQXdCLEdBQUUsSUFBSSxDQUNsRSxLQUFLLENBQUMsZ0JBQWdCLENBQ3ZCLENBQUM7Ozs7Ozs7O1FBR0kscUNBQVU7Ozs7OztzQkFBSSxNQUF5QixFQUFFLEtBQVU7Z0JBQ3pELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBaUIsVUFBQyxHQUFHLEVBQUUsT0FBTztvQkFDL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQkFDL0IsT0FBTyxHQUFHLENBQUM7aUJBQ1osRUFBRSxJQUFJLEdBQUcsRUFBYSxDQUFDLENBQUM7O2dEQXpSVyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUM7O29CQUpsRUwsZUFBVTs7Ozs7d0JBTkYsa0JBQWtCOzs7K0JBTjNCOzs7Ozs7OztRQzZCRSxzQ0FDVSxjQUNBLDBCQUNBO1lBSFYsaUJBSUk7WUFITSxpQkFBWSxHQUFaLFlBQVk7WUFDWiw2QkFBd0IsR0FBeEIsd0JBQXdCO1lBQ3hCLG9CQUFlLEdBQWYsZUFBZTt5QkF5RmpCLFVBQUMsQ0FBQztnQkFDUixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Z0JBRW5CLElBQU0sU0FBUyxHQUFHLG1CQUFrQixLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRSxTQUFTLENBQUM7O2dCQUVsRSxJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFFOUIsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ3hELElBQU0sU0FBUyxHQUFNLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxTQUFJLEtBQU8sQ0FBQztnQkFFdEQsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQ25DLEtBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDNUg7Z0JBRUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7U0F6R0c7Ozs7UUFFSiwrQ0FBUTs7O1lBQVI7Z0JBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjs7Ozs7UUFFRCxrREFBVzs7OztZQUFYLFVBQVksT0FBc0I7Z0JBQ2hDLElBQUksT0FBTyxlQUFZLENBQUMsT0FBTyxZQUFTLFdBQVcsRUFBRTtvQkFDbkQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQjthQUNGOzs7O1FBRUQsa0RBQVc7OztZQUFYO2dCQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7aUJBQzNCO2FBQ0Y7Ozs7UUFFRCw2Q0FBTTs7O1lBQU47Z0JBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDM0I7O2dCQUVELElBQUksZ0JBQWdCLENBQU07O2dCQUUxQixJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUM1QixDQUFDO2dCQUVGLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO29CQUN6QixLQUFLLFFBQVE7d0JBQ1gsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQzt3QkFDbkQsTUFBTTtvQkFDUixLQUFLLE9BQU87d0JBQ1YsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQzt3QkFDbEQsTUFBTTtvQkFDUjt3QkFDRSxPQUFPLENBQUMsS0FBSyxDQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSw4QkFBMkIsRUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUNuQyxDQUFDO3dCQUNGLE9BQU87aUJBQ1Y7O2dCQUVELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0QsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUV6QixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDNUUsZ0JBQWdCLENBQ2pCLENBQUM7Z0JBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFFeEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCOzs7O1FBRUQsbURBQVk7OztZQUFaO2dCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUN2QixPQUFPO2lCQUNSOztnQkFFRCxJQUFNLGlCQUFpQixxQkFBOEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUM7O2dCQUVqRixJQUFNLE9BQU8sZ0JBQ1IsSUFBSSxDQUFDLE9BQU8sSUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFDakI7O2dCQUVGLElBQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztnQkFDbEQsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Z0JBRXBDLElBQU0saUJBQWlCLEdBQUcsbUJBQVksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUUsV0FBVyxDQUFDO2dCQUUvRSxJQUFJLGlCQUFpQixFQUFFOztvQkFDckIsSUFBTSxRQUFNLEdBQWlCO3dCQUMzQixhQUFhLEVBQUUsZUFBZTt3QkFDOUIsWUFBWSxFQUFFLE9BQU87d0JBQ3JCLFdBQVcsRUFBRSxPQUFPLGVBQWUsS0FBSyxXQUFXO3dCQUNuRCxhQUFhLEVBQUUsY0FBTSxPQUFBLFFBQU0sQ0FBQyxXQUFXLEdBQUE7cUJBQ3hDLENBQUM7b0JBRUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQU0sRUFBRSxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7O29CQXBHRk0sY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7d0JBQzVDLFFBQVEsRUFBRSxtREFBbUQ7cUJBQzlEOzs7Ozt3QkFQUSxnQkFBZ0I7d0JBWHZCQyw2QkFBd0I7d0JBWWpCLHVCQUF1Qjs7OztvQ0FTN0JDLGNBQVMsU0FBQyxzQkFBc0I7OEJBQ2hDQyxVQUFLOzsyQ0ExQlI7Ozs7Ozs7O1FDdURFLGlDQUNVLGNBQ0EsMEJBQ0E7WUFIVixpQkFLQztZQUpTLGlCQUFZLEdBQVosWUFBWTtZQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7WUFDeEIsb0JBQWUsR0FBZixlQUFlO2tDQWxCcUIsRUFBRTsyQkFpUnRDO2dCQUNSLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDOUQ7MEJBRVE7O2dCQUNQLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUV6RCxJQUFJLEtBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO29CQUNuQyxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMxRTthQUNGOzRCQUVVLFVBQUMsQ0FBTTs7Z0JBQ2hCLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN6RCxLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDdkY7U0E1UUE7UUFFRCxzQkFBSSw2Q0FBUTs7O2dCQUFaOztnQkFDRSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFFL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFOztvQkFDbkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztvQkFFakMsSUFBSSxJQUFJLENBQUMsVUFBVSxZQUFZQyxlQUFTLEVBQUU7O3dCQUN4QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMxRCxVQUFVLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztxQkFDM0I7b0JBRUQsUUFBUSxHQUFNLFVBQVUsU0FBSSxRQUFVLENBQUM7aUJBQ3hDO2dCQUVELE9BQU8sUUFBUSxDQUFDO2FBQ2pCOzs7V0FBQTs7OztRQUVELDBDQUFROzs7WUFBUjtnQkFBQSxpQkE0QkM7Z0JBM0JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFFaEQsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLENBQUMsS0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDbEYsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFBLENBQ2pDLENBQUM7Z0JBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBRXJDLElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FDdEY7b0JBQ0UsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUNyQixDQUNGLENBQUM7Z0JBRUYsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FDN0Q7b0JBQ0UsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTt3QkFDeEIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO3FCQUNwQjt5QkFBTSxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7d0JBQ3RDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDZjt5QkFBTTt3QkFDTCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7cUJBQ3JCO2lCQUNGLENBQ0YsQ0FBQztnQkFFRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjs7Ozs7UUFFRCw2Q0FBVzs7OztZQUFYLFVBQVksT0FBc0I7Z0JBQ2hDLElBQUksT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxFQUFFO29CQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7Ozs7UUFFRCw2Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsbUNBQW1DLEVBQUU7b0JBQzVDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDeEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDNUM7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCOzs7O1FBRUQsNkNBQVc7OztZQUFYO2dCQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFBLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7aUJBQzFCO2FBQ0Y7Ozs7UUFFRCw4Q0FBWTs7O1lBQVo7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxRzs7OztRQUVELHdDQUFNOzs7WUFBTjtnQkFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7b0JBQ3hCLE9BQU87aUJBQ1I7O2dCQUVELElBQUksZ0JBQWdCLENBQU07O2dCQUUxQixJQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUM1QixDQUFDO2dCQUVGLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO29CQUNyQixLQUFLLE1BQU0sQ0FBQztvQkFDWixLQUFLLFNBQVMsQ0FBQztvQkFDZixLQUFLLE1BQU07d0JBQ1QsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQzt3QkFDbEQsTUFBTTtvQkFDUixLQUFLLFNBQVM7d0JBQ1osZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGlCQUFpQixDQUFDO3dCQUNyRCxNQUFNO29CQUNSLEtBQUssTUFBTSxDQUFDO29CQUNaLEtBQUssWUFBWTt3QkFDZixnQkFBZ0IsR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDO3dCQUNuRCxNQUFNO29CQUNSLEtBQUssY0FBYzt3QkFDakIsZ0JBQWdCLEdBQUcsNEJBQTRCLENBQUM7d0JBQ2hELE1BQU07b0JBQ1I7d0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FDUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksK0JBQTRCLEVBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUMzQixDQUFDO3dCQUNGLE9BQU87aUJBQ1Y7O2dCQUVELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0QsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUV6QixJQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDckYsZUFBZSxDQUFDLGtCQUFrQixDQUNuQyxDQUFDOztnQkFFRixJQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDbkYsZ0JBQWdCLENBQ2pCLENBQUM7O2dCQUVGLElBQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUMxRCx1QkFBdUIsQ0FDeEIsQ0FBQzs7Z0JBRUYsSUFBTSxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQzVELHlCQUF5QixFQUN6QixDQUFDLEVBQ0QsU0FBUyxFQUNULENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FDL0MsQ0FBQztnQkFFRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2dCQUVyRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7Ozs7UUFFRCw4Q0FBWTs7O1lBQVo7O2dCQUNFLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDZCxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtvQkFDL0IsT0FBTztpQkFDUjs7Z0JBRUQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7Z0JBQy9CLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Z0JBRTNDLElBQU0sT0FBTyxHQUFhO29CQUN4QixLQUFLLE9BQUE7b0JBQ0wsUUFBUSxVQUFBO29CQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixnQkFBZ0IsRUFDZCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO3dCQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQzt3QkFDdkMsRUFBRTtvQkFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQzNDLE1BQU0sRUFBSyxJQUFJLENBQUMsTUFBTSxTQUFJLFFBQVU7b0JBQ3BDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7aUJBQ3hCLENBQUM7Z0JBRUYsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7b0JBQ3JCLEtBQUssTUFBTSxDQUFDO29CQUNaLEtBQUssWUFBWSxFQUFFOzt3QkFDakIsSUFBTSxXQUFTLHFCQUFlLElBQUksQ0FBQyxLQUFLLEVBQUM7O3dCQUV6QyxJQUFNLGFBQWEscUJBQW1CLE9BQU8sRUFBQzt3QkFFOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7NEJBQ3BDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsY0FBTSxPQUFBLEVBQUUsR0FBQSxDQUFDO3lCQUNsQzs2QkFBTTs0QkFDTCxhQUFhLENBQUMsT0FBTyxHQUFHLGNBQU0sT0FBQSxXQUFTLENBQUMsT0FBTyxHQUFBLENBQUM7eUJBQ2pEO3dCQUNELE1BQU07cUJBQ1A7b0JBQ0QsS0FBSyxjQUFjLEVBQUU7O3dCQUNuQixJQUFNLGlCQUFpQixxQkFBdUIsT0FBTyxFQUFDOzt3QkFFdEQsSUFBTSxtQkFBaUIscUJBQXVCLElBQUksQ0FBQyxLQUFLLEVBQUM7d0JBQ2pELElBQUEseUNBQVMsQ0FBdUI7O3dCQUV4QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBSSxJQUFJLENBQUMsTUFBTSxTQUFJLElBQUksQ0FBQyxLQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBRXJFLElBQUEsZ0hBQUssQ0FFWDs7d0JBRUYsSUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDOzt3QkFFakUsSUFBTSxlQUFlLHFCQUFrQyxJQUFJLENBQUMsS0FBSzs2QkFDOUQsTUFBTSxDQUFJLFNBQVMsQ0FBQyxNQUFNLFNBQUksY0FBZ0IsQ0FBQyxDQUFDLE1BQU0sRUFBQzs7d0JBRTFELElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzs7NEJBRXhCLEtBQTZCLElBQUEsb0JBQUFULFNBQUEsZUFBZSxDQUFBLGdEQUFBLDZFQUFFO2dDQUF6QyxJQUFNLGNBQWMsNEJBQUE7O2dDQUN2QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBSSxTQUFTLENBQUMsTUFBTSxTQUFJLGNBQWMsQ0FBQyxLQUFPLENBQUMsQ0FBQztnQ0FDL0UsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDMUI7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBRUQsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDOzs0QkFFeEIsS0FBMEIsSUFBQSxLQUFBQSxTQUFBLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsZ0JBQUEsNEJBQUU7Z0NBQXZELElBQU0sV0FBVyxXQUFBO2dDQUNwQixZQUFZLENBQUMsSUFBSSxtQkFBWSxXQUFXLEVBQUMsQ0FBQzs2QkFDM0M7Ozs7Ozs7Ozs7Ozs7Ozt3QkFFRCxpQkFBaUIsQ0FBQyxLQUFLLEdBQUc7NEJBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUs7NEJBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVO3lCQUMxQyxDQUFDO3dCQUVGLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLG1CQUFpQixDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLG1CQUFpQixDQUFDLFlBQVksQ0FBQzt3QkFDbkgsaUJBQWlCLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzt3QkFDOUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQzt3QkFDOUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDO3dCQUMvRCxNQUFNO3FCQUNQO2lCQUNGO3dDQUVVLFlBQVk7O29CQUNyQixJQUFNLGlCQUFpQixxQkFBb0IsWUFBWSxDQUFDLFFBQVEsRUFBQzs7b0JBRWpFLElBQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztvQkFDbEQsaUJBQWlCLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7b0JBRXBDLElBQU0saUJBQWlCLEdBQUcsbUJBQVksWUFBWSxDQUFDLFFBQVEsR0FBRSxXQUFXLENBQUM7b0JBQ3pFLElBQUksaUJBQWlCLEVBQUU7O3dCQUNyQixJQUFNLFFBQU0sR0FBaUI7NEJBQzNCLGFBQWEsRUFBRSxlQUFlOzRCQUM5QixZQUFZLEVBQUUsT0FBTzs0QkFDckIsV0FBVyxFQUFFLE9BQU8sZUFBZSxLQUFLLFdBQVc7NEJBQ25ELGFBQWEsRUFBRSxjQUFNLE9BQUEsUUFBTSxDQUFDLFdBQVcsR0FBQTt5QkFDeEMsQ0FBQzt3QkFFRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBTSxFQUFFLENBQUMsQ0FBQztxQkFDaEU7OztvQkFoQkgsS0FBMkIsSUFBQSxLQUFBQSxTQUFBLElBQUksQ0FBQyxjQUFjLENBQUEsZ0JBQUE7d0JBQXpDLElBQU0sWUFBWSxXQUFBO2dDQUFaLFlBQVk7cUJBaUJ0Qjs7Ozs7Ozs7Ozs7Ozs7O2FBQ0Y7Ozs7O1FBbUJPLHlDQUFPOzs7O3NCQUFDLElBQVk7Z0JBQzFCLFFBQVEsSUFBSTtvQkFDVixLQUFLLFNBQVM7d0JBQ1osT0FBTyxRQUFRLENBQUM7b0JBQ2xCO3dCQUNFLE9BQU8sSUFBSSxDQUFDO2lCQUNmOzs7b0JBOVNKSyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLDZCQUE2Qjt3QkFDdkMsUUFBUSxFQUFFLHlEQUMwQztxQkFDckQ7Ozs7O3dCQWZRLGdCQUFnQjt3QkFqQnZCQyw2QkFBd0I7d0JBT2pCLHVCQUF1Qjs7OztvQ0ErQjdCQyxjQUFTLFNBQUMsc0JBQXNCOzZCQUNoQ0MsVUFBSzsyQkFDTEEsVUFBSzs2QkFDTEEsVUFBSzs0QkFDTEEsVUFBSzs0QkFDTEEsVUFBSztpQ0FDTEEsVUFBSztpQ0FDTEEsVUFBSzs7c0NBbkRSOzs7Ozs7OztRQ2tDRSw2QkFDVSxjQUNBLDBCQUNBO1lBSFYsaUJBSUk7WUFITSxpQkFBWSxHQUFaLFlBQVk7WUFDWiw2QkFBd0IsR0FBeEIsd0JBQXdCO1lBQ3hCLG9CQUFlLEdBQWYsZUFBZTt5QkFOUCxJQUFJRSxpQkFBWSxFQUFPOzJCQStHL0IsVUFBQyxDQUFDO2dCQUNWLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1NBMUdHOzs7O1FBRUosc0NBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDZjs7Ozs7UUFFRCx5Q0FBVzs7OztZQUFYLFVBQVksT0FBc0I7Z0JBQ2hDLElBQUksT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxFQUFFO29CQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEIsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7Ozs7UUFFRCx5Q0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztpQkFDM0I7YUFDRjs7OztRQUVELG9DQUFNOzs7WUFBTjtnQkFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2lCQUMzQjs7Z0JBRUQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDNUIsQ0FBQzs7Z0JBRUYsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3RCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Z0JBRXpCLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUM1RSxlQUFlLENBQUMsZUFBZSxDQUNoQyxDQUFDO2dCQUVGLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBRXhFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjs7OztRQUVELDBDQUFZOzs7WUFBWjtnQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDdkIsT0FBTztpQkFDUjtnQkFFRCxxQkFDRSxlQUF5RCxFQUE5QyxrQkFBTSxFQUFFLHdDQUFpQixFQUFFLHdDQUFpQixFQUN2RCxvQkFBTyxDQUNNOztnQkFFZixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQzs7Z0JBRXhDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztnQkFFakIsUUFBUSxJQUFJLENBQUMsSUFBSTtvQkFDZixLQUFLLFFBQVE7d0JBQ1gsS0FBSyxHQUFHLGlCQUFpQixDQUFDO3dCQUMxQixNQUFNO29CQUNSLEtBQUssUUFBUTt3QkFDWCxLQUFLLEdBQUcsaUJBQWlCLENBQUM7d0JBQzFCLE1BQU07aUJBQ1Q7O2dCQUVELElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFOUMsSUFDRSxRQUFRO29CQUNSLGlCQUFpQjtvQkFDakIsaUJBQWlCLENBQUMsaUJBQWlCLEVBQ25DO29CQUNBLElBQUksR0FBTSxJQUFJLFNBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQU8sQ0FBQztpQkFDM0M7O2dCQUVELElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFFeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtvQkFDekMsWUFBWSxDQUFDLElBQUksT0FBakIsWUFBWSxXQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFFO2lCQUM3RDtnQkFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTt3QkFDekMsWUFBWSxDQUFDLElBQUksT0FBakIsWUFBWSxXQUFTLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFFO3FCQUNwRDt5QkFBTTt3QkFDTCxZQUFZLENBQUMsSUFBSSxPQUFqQixZQUFZLFdBQVMsSUFBSSxDQUFDLFlBQVksR0FBRTtxQkFDekM7aUJBQ0Y7O2dCQUVELElBQU0saUJBQWlCLHFCQUFtQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQztnQkFDdEUsaUJBQWlCLENBQUMsTUFBTSxHQUFHO29CQUN6QixJQUFJLE1BQUE7b0JBQ0osWUFBWSxjQUFBO29CQUNaLElBQUksRUFBRSxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVE7b0JBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNyQixLQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTO2lCQUMzQyxDQUFDO2FBQ0g7O29CQXpIRkwsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSx3QkFBd0I7d0JBQ2xDLFFBQVEsRUFBRSxtREFBbUQ7cUJBQzlEOzs7Ozt3QkFOUSxnQkFBZ0I7d0JBVHZCQyw2QkFBd0I7d0JBTWpCLHVCQUF1Qjs7OztvQ0FZN0JDLGNBQVMsU0FBQyxzQkFBc0I7NkJBQ2hDQyxVQUFLOzJCQUNMQSxVQUFLO21DQUNMQSxVQUFLOzJCQUNMQSxVQUFLOytCQUNMQSxVQUFLOzRCQUNMRyxXQUFNOztrQ0EvQlQ7Ozs7Ozs7QUNBQTtRQW1DRSxpQ0FDVSxjQUNBLDBCQUNBO1lBRkEsaUJBQVksR0FBWixZQUFZO1lBQ1osNkJBQXdCLEdBQXhCLHdCQUF3QjtZQUN4QixvQkFBZSxHQUFmLGVBQWU7U0FDckI7Ozs7UUFFSiwwQ0FBUTs7O1lBQVI7Z0JBQUEsaUJBVUM7Z0JBVEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O2dCQUVoRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbkMsSUFBSSxDQUFDLE1BQU0sU0FBSSxJQUFJLENBQUMsS0FBTyxDQUMvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFBLENBQUMsQ0FBQztnQkFFaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBRXJDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmOzs7OztRQUVELDZDQUFXOzs7O1lBQVgsVUFBWSxPQUFzQjtnQkFDaEMsSUFBSSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNoQixPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjs7OztRQUVELDZDQUFXOzs7WUFBWDtnQkFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2lCQUMzQjthQUNGOzs7O1FBRUQsOENBQVk7OztZQUFaO2dCQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQzNCLENBQUM7YUFDSDs7OztRQUVELHdDQUFNOzs7WUFBTjtnQkFDRSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2lCQUMzQjtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO29CQUN4QixPQUFPO2lCQUNSOztnQkFFRCxJQUFJLGdCQUFnQixDQUFNOztnQkFFMUIsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDNUIsQ0FBQztnQkFFRixRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtvQkFDckIsS0FBSyxPQUFPO3dCQUNWLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUM7d0JBQ2xELE1BQU07b0JBQ1I7d0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FDUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksK0JBQTRCLEVBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUMzQixDQUFDO3dCQUNGLE9BQU87aUJBQ1Y7O2dCQUVELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDN0QsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUV6QixJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDNUUsZ0JBQWdCLENBQ2pCLENBQUM7Z0JBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFFeEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCOzs7O1FBRUQsOENBQVk7OztZQUFaO2dCQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUN2QixPQUFPO2lCQUNSOztnQkFFRCxJQUFNLGlCQUFpQixxQkFBa0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUM7O2dCQUNyRSxJQUFNLFVBQVUscUJBQWdCLElBQUksQ0FBQyxLQUFLLEVBQUM7O2dCQUUzQyxJQUFNLEtBQUssR0FBVztvQkFDcEIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLO29CQUN0QixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVTtpQkFDMUMsQ0FBQztnQkFFRixJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7d0JBQy9CLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7cUJBQ2hEO29CQUVELElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTt3QkFDdEMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3FCQUNwRDtpQkFDRjs7Z0JBRUQsSUFBTSxhQUFhLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUM5QyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztnQkFFaEMsSUFBTSxpQkFBaUIsR0FBRyxtQkFBWSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVE7cUJBQzlELFdBQVcsQ0FBQztnQkFFZixJQUFJLGlCQUFpQixFQUFFOztvQkFDckIsSUFBTSxRQUFNLEdBQWlCO3dCQUMzQixhQUFhLEVBQUUsYUFBYTt3QkFDNUIsWUFBWSxFQUFFLEtBQUs7d0JBQ25CLFdBQVcsRUFBRSxPQUFPLGFBQWEsS0FBSyxXQUFXO3dCQUNqRCxhQUFhLEVBQUUsY0FBTSxPQUFBLFFBQU0sQ0FBQyxXQUFXLEdBQUE7cUJBQ3hDLENBQUM7b0JBRUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQU0sRUFBRSxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7O29CQXhJRk4sY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSw2QkFBNkI7d0JBQ3ZDLFFBQVEsRUFBRSxtREFBbUQ7cUJBQzlEOzs7Ozt3QkFSUSxnQkFBZ0I7d0JBUHZCQyw2QkFBd0I7d0JBS2pCLHVCQUF1Qjs7OztvQ0FhN0JDLGNBQVMsU0FBQyxzQkFBc0I7NkJBQ2hDQyxVQUFLOzJCQUNMQSxVQUFLOzZCQUNMQSxVQUFLOzRCQUNMQSxVQUFLOzRCQUNMQSxVQUFLOztzQ0EvQlI7Ozs7Ozs7QUNBQTtRQTJDRSwyQkFDVTtZQUFBLGlCQUFZLEdBQVosWUFBWTtTQUNsQjtRQUVKLHNCQUFJLHFDQUFNOzs7Z0JBQVY7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUNsRDs7OztnQkFFRCxVQUNXLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3RCOzs7V0FMQTtRQU9ELHNCQUFJLG9DQUFLOzs7Z0JBQVQ7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUNoRDs7OztnQkFFRCxVQUNVLEtBQWE7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3JCOzs7V0FMQTs7OztRQU9ELG9DQUFROzs7WUFBUjtnQkFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNqRDs7Ozs7UUFFRCx1Q0FBVzs7OztZQUFYLFVBQVksT0FBc0I7Z0JBQ2hDLElBQUksT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxFQUFFO29CQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ2hCLE9BQU87aUJBQ1I7YUFDRjs7b0JBcEVGSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjt3QkFDaEMsUUFBUSxFQUFFLDRvQkFzQlg7cUJBQ0E7Ozs7O3dCQTNCUSxnQkFBZ0I7Ozs7NkJBZ0N0QkcsVUFBSzsyQkFDTEEsVUFBSzs2QkFDTEEsVUFBSztpQ0FDTEEsVUFBSztpQ0FDTEEsVUFBSzs2QkFXTEEsVUFBSzs0QkFTTEEsVUFBSzs7Z0NBNURSOzs7Ozs7O0FDQUE7Ozs7b0JBYUNJLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLG1CQUFZOzRCQUNaQyx5QkFBbUI7eUJBQ3BCO3dCQUNELFlBQVksRUFBRTs0QkFDWixzQkFBc0I7NEJBQ3RCLHVCQUF1Qjs0QkFDdkIsdUJBQXVCOzRCQUN2QixtQkFBbUI7NEJBQ25CLDRCQUE0Qjs0QkFDNUIsaUJBQWlCO3lCQUNsQjt3QkFDRCxTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxrQkFBa0IsQ0FBQzt3QkFDakQsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUM7d0JBQ25HLGVBQWUsRUFBRSxDQUFDLDRCQUE0QixDQUFDO3FCQUNoRDs7aUNBN0JEOzs7Ozs7OztRQytERSx1QkFBb0IsWUFBOEI7WUFBOUIsaUJBQVksR0FBWixZQUFZLENBQWtCOytCQVIxQixJQUFJSixpQkFBWSxFQUFjOzBCQUNuQyxJQUFJQSxpQkFBWSxFQUFrQjswQkFDbEMsSUFBSUEsaUJBQVksRUFBTztTQU1ZO1FBRXRELHNCQUFJLHdDQUFhOzs7Z0JBQWpCO2dCQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO2FBQ25FOzs7O2dCQUVELFVBQ2tCLEtBQWM7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2FBQzdCOzs7V0FMQTtRQU9ELHNCQUFJLHdDQUFhOzs7Z0JBQWpCO2dCQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQzVDOzs7V0FBQTtRQUVELHNCQUFJLHdDQUFhOzs7Z0JBQWpCO2dCQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3pCOzs7V0FBQTtRQUVELHNCQUFJLGlDQUFNOzs7Z0JBQVY7Z0JBQ1UsSUFBQSw0Q0FBZSxDQUFnQjs7Z0JBQ3ZDLElBQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztnQkFFcEQsT0FBTyxvQkFBb0I7c0JBQ3ZCLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNO3NCQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7YUFDL0I7OztXQUFBO1FBRUQsc0JBQUksZ0NBQUs7OztnQkFBVDtnQkFDVSxJQUFBLDRDQUFlLENBQWdCOztnQkFDdkMsSUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUVwRCxPQUFPLG9CQUFvQjtzQkFDdkIsZUFBZSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7c0JBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzthQUM5Qjs7O1dBQUE7UUFFRCxzQkFBSSwrQkFBSTs7O2dCQUFSO2dCQUNVLElBQUEsNENBQWUsQ0FBZ0I7O2dCQUN2QyxJQUFNLG9CQUFvQixHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7Z0JBRXBELE9BQU8sb0JBQW9CO3NCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztzQkFDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDckI7OztXQUFBO1FBRUQsc0JBQUkscUNBQVU7OztnQkFBZDtnQkFDVSxJQUFBLDRDQUFlLENBQWdCOztnQkFDdkMsSUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUVwRCxPQUFPLG9CQUFvQjtzQkFDdkIsZUFBZSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVU7c0JBQ3BELElBQUksQ0FBQzthQUNWOzs7V0FBQTtRQUVELHNCQUFJLHFDQUFVOzs7Z0JBQWQ7Z0JBQ1UsSUFBQSw0Q0FBZSxDQUFnQjs7Z0JBQ3ZDLElBQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztnQkFFcEQsT0FBTyxvQkFBb0I7c0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO3NCQUN6RSxJQUFJLENBQUM7YUFDVjs7O1dBQUE7Ozs7UUFFRCxnQ0FBUTs7O1lBQVI7Z0JBQUEsaUJBV0M7Z0JBVkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3RSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRWQsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO29CQUMzRSxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2YsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFNO29CQUN2RSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDL0IsQ0FBQyxDQUFDO2FBQ0o7Ozs7O1FBRUQsbUNBQVc7Ozs7WUFBWCxVQUFZLE9BQXNCO2dCQUNoQyxJQUFJLE9BQU8sYUFBVSxDQUFDLE9BQU8sVUFBTyxXQUFXLEVBQUU7b0JBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBTyxZQUFZLENBQUMsQ0FBQztpQkFDckU7Z0JBRUQsSUFBSSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsV0FBVyxFQUFFO29CQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxPQUFPLFdBQVEsWUFBWSxDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7Ozs7UUFFRCxtQ0FBVzs7O1lBQVg7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsNkJBQTZCLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDbEQ7Z0JBRUQsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDNUM7Z0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN6Qzs7OztRQUVELDhCQUFNOzs7WUFBTjtnQkFDRSxxQkFBUSxvQkFBTyxFQUFFLG9DQUFlLENBQWdCOztnQkFFaEQsSUFBSSxNQUFNLENBQUM7O2dCQUNYLElBQUksS0FBSyxDQUFDOztnQkFFVixJQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsQ0FBRyxxQkFBTSxFQUFFLG1CQUFLLEVBQVk7aUJBQzdCO3FCQUFNO29CQUNMLENBQUcsdUJBQU0sRUFBRSxxQkFBSyxFQUFjO2lCQUMvQjs7Z0JBRUQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXZELElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO2FBQzNCOzs7Ozs7UUFFRCxzQ0FBYzs7Ozs7WUFBZCxVQUFlLE1BQWMsRUFBRSxTQUFpQjs7Z0JBQzlDLHFCQUFRLGtCQUFNLEVBQUUsa0JBQU0sQ0FBZ0I7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7O29CQUV0QixPQUFPLEVBQUUsQ0FBQztpQkFDWDs7Z0JBRUQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFJLE1BQU0sU0FBSSxTQUFXLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxDQUFDLEtBQUssRUFBRTs7b0JBRVYsT0FBTyxFQUFFLENBQUM7aUJBQ1g7O2dCQUVELElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O2dCQUVoQyxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7O29CQUV2QixLQUF3QixJQUFBLGVBQUFWLFNBQUEsVUFBVSxDQUFBLHNDQUFBLDhEQUFFO3dCQUEvQixJQUFNLFNBQVMsdUJBQUE7d0JBQ2xCLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFJLE1BQU0sU0FBSSxTQUFTLENBQUMsS0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDMUQ7Ozs7Ozs7Ozs7Ozs7OztnQkFFRCxPQUFPLFdBQVcsQ0FBQzthQUNwQjs7Ozs7UUFFRCxnQ0FBUTs7OztZQUFSLFVBQVMsQ0FBQztnQkFDUixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3ZCLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQy9DLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDekI7Ozs7O1FBRUQsZ0NBQVE7Ozs7WUFBUixVQUFTLENBQUM7Z0JBQVYsaUJBNEJDO2dCQTNCQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3ZCLE9BQU87aUJBQ1I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEQsT0FBTztpQkFDUjtnQkFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFFdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQzVCLFVBQVUsRUFBRSxVQUFDLE1BQU07d0JBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7eUJBQ3pCOzZCQUFNOzRCQUNMLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3lCQUNwRDt3QkFFRCxLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztxQkFDekI7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0o7O29CQXZPRkssY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxpQkFBaUI7d0JBQzNCLFFBQVEsRUFBRSxxZ0NBdUJYO3dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozs7d0JBbENRLGdCQUFnQjs7Ozs4QkF3Q3RCRyxVQUFLOzRCQUNMQSxVQUFLOzZCQUNMQSxVQUFLO2tDQUNMRyxXQUFNOzZCQUNOQSxXQUFNOzZCQUNOQSxXQUFNO29DQVlOSCxVQUFLOzs0QkFyRVI7Ozs7Ozs7QUNBQTs7OztvQkFNQ0ksYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7NEJBQ1osa0JBQWtCOzRCQUNsQkMseUJBQW1CO3lCQUNwQjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1osYUFBYTt5QkFDZDt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7cUJBQ3pCOztrQ0FoQkQ7Ozs7Ozs7Ozs7Ozs7O1FDTWlCLGdEQUEwQjs7OztzQkFBQyxPQUFpQjs7Z0JBQ3pELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXpELElBQ0UsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztvQkFDNUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUNoQztvQkFDQSxPQUFPLElBQUksQ0FBQztpQkFDYjtnQkFFRCxPQUFPLFdBQVcsQ0FBQzs7Ozs7O1FBR2QsOEJBQVE7Ozs7WUFBZixVQUFnQixPQUFpQjtnQkFDL0IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25EOzs7OztRQUVNLCtCQUFTOzs7O1lBQWhCLFVBQWlCLE9BQWlCOzs7Z0JBQ2hDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDaEIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7O2dCQUVELElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzs7Z0JBQ3hCLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFFMUIsSUFBSSxXQUFXLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7O3dCQUM3QyxLQUFrQixJQUFBLEtBQUFkLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7NEJBQTlDLElBQU0sR0FBRyxXQUFBOzs0QkFDWixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs0QkFDbEMsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFFekMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7Z0NBQy9CLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUM7NkJBQ3hDO2lDQUFNO2dDQUNMLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7NkJBQzVDO3lCQUNGOzs7Ozs7Ozs7Ozs7Ozs7aUJBQ0Y7Z0JBRUQsT0FBTyxZQUFZO3FCQUNoQixJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxHQUFBLENBQUM7cUJBQ2pCLE1BQU0sQ0FBQyxjQUFjLENBQUM7cUJBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO3FCQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7YUFDckM7Ozs7O1FBRU0scUNBQWU7Ozs7WUFBdEIsVUFBdUIsS0FBcUM7Z0JBQzFELFFBQVEsS0FBSyxDQUFDLEdBQUc7b0JBQ2YsS0FBSyxVQUFVO3dCQUNiLE9BQU8seUJBQXlCLENBQUM7b0JBQ25DLEtBQUssV0FBVzt3QkFDZCxPQUFPLG1DQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxpQkFDakIsQ0FBQztvQkFDakIsS0FBSyxXQUFXO3dCQUNkLE9BQU8sK0JBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLGlCQUNqQixDQUFDO29CQUNqQjt3QkFDRSxPQUFPLG1DQUFpQyxLQUFPLENBQUM7aUJBQ25EO2FBQ0Y7MkNBL0QyQixDQUFDLFVBQVUsQ0FBQztvQ0FKMUM7Ozs7Ozs7QUNBQTs7Ozs7O1FBY0UsZ0VBQVU7OztZQUFWOztnQkFDRSxJQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUU5RCxPQUFPO29CQUNMLFdBQVcsRUFBRSxRQUFRO29CQUNyQixjQUFjLEVBQUUsUUFBUTtpQkFDekIsQ0FBQzthQUNIOztvQkFqQkZLLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsa0RBQWtEO3dCQUM1RCxRQUFRLEVBQUUsOEZBR1g7cUJBQ0E7Ozs4QkFFRUcsVUFBSzs7MERBWlI7Ozs7Ozs7QUNBQTs7OztvQkFJQ0ksYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxDQUFDQyxtQkFBWSxDQUFDO3dCQUN2QixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzt3QkFDcEMsWUFBWSxFQUFFLEVBQUU7cUJBQ2pCOztxQ0FSRDs7Ozs7OztBQ0FBOzs7O29CQUdDUixjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHNDQUFzQzt3QkFDaEQsUUFBUSxFQUFFLDJ1QkFnQlg7cUJBQ0E7Ozs4QkFFRUcsVUFBSzs7K0NBeEJSOzs7Ozs7O0FDQUE7Ozs7b0JBR0NILGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsdUNBQXVDO3dCQUNqRCxRQUFRLEVBQUUseXpCQWdCWDtxQkFDQTs7OzhCQUVFRyxVQUFLOztnREF4QlI7Ozs7Ozs7QUNBQTs7OztvQkFHQ0gsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7d0JBQ2hELFFBQVEsRUFBRSwrRkFDWDtxQkFDQTs7OzhCQUVFRyxVQUFLOzsrQ0FUUjs7Ozs7OztBQ0FBOzs7UUF1QkUsc0JBQUksc0RBQU87OztnQkFBWDs7Z0JBQ0UsSUFBSSxPQUFPLENBQVc7Z0JBRXRCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ3pCO2dCQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7b0JBQzVCLE9BQU8sR0FBRyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzVEO2dCQUVELE9BQU8sT0FBTyxDQUFDO2FBQ2hCOzs7V0FBQTs7OztRQUVELG9EQUFROzs7WUFBUjtnQkFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7Ozs7O1FBRUQsdURBQVc7Ozs7WUFBWCxVQUFZLE9BQXNCO2dCQUNoQyxJQUFJLE9BQU8sWUFBUztvQkFDbEIsSUFDRSxPQUFPLFdBQVEsWUFBWSxDQUFDLElBQUk7d0JBQ2hDLE9BQU8sV0FBUSxhQUFhLENBQUMsSUFBSSxFQUNqQzt3QkFDQSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3RCO2lCQUNGO2FBQ0Y7Ozs7UUFFRCx5REFBYTs7O1lBQWI7Z0JBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BDLE9BQU87aUJBQ1I7Z0JBRUQsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7b0JBQ3RCLEtBQUssUUFBUTt3QkFDWCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ2hDLE1BQU07b0JBQ1I7d0JBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO2lCQUNUO2FBQ0Y7O29CQXpERkgsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7d0JBQ2pELFFBQVEsRUFBRSxrTUFNWDtxQkFDQTs7OzZCQUVFRyxVQUFLOztnREFwQlI7Ozs7Ozs7QUNBQTs7Ozs7Ozs7UUEwQ0UsbURBQVE7Ozs7O1lBQVIsVUFBUyxLQUFhLEVBQUUsS0FBVTs7Z0JBQ2hDLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXJDLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxPQUFPLFVBQVUsS0FBSyxXQUFXLEVBQUU7b0JBQzNELE9BQU8sUUFBUSxDQUFDO2lCQUNqQjtnQkFFRCxPQUFPLFVBQVUsQ0FBQzthQUNuQjs7b0JBOUNGSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHNDQUFzQzt3QkFDaEQsUUFBUSxFQUFFLGcyQkE4Qlg7d0JBQ0MsTUFBTSxFQUFFLENBQUMsMkNBQTJDLENBQUM7cUJBQ3REOzs7OEJBRUVHLFVBQUs7OytDQXhDUjs7Ozs7OztBQ0FBOzs7O29CQUdDSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHlDQUF5Qzt3QkFDbkQsUUFBUSxFQUFFLHFzQkFpQlg7cUJBQ0E7Ozs4QkFFRUcsVUFBSzs7a0RBekJSOzs7Ozs7O0FDQUE7Ozs7OztRQVlFLGtEQUFROzs7WUFBUjtnQkFDRSxPQUFPLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDckQ7O29CQVZGSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHFDQUFxQzt3QkFDL0MsUUFBUSxFQUFFLGtHQUNYO3FCQUNBOzs7OEJBRUVHLFVBQUs7OzhDQVZSOzs7Ozs7O0FDQUE7Ozs7OztRQXVCRSw4REFBUTs7O1lBQVI7Z0JBQ0UsT0FBTyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JEOzs7O1FBRUQsK0RBQVM7OztZQUFUO2dCQUNFLE9BQU8scUJBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0RDs7b0JBekJGSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLGtEQUFrRDt3QkFDNUQsUUFBUSxFQUFFLGtXQVlYO3FCQUNBOzs7OEJBRUVHLFVBQUs7OzBEQXJCUjs7Ozs7OztBQ0FBOzs7O29CQUdDSCxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHVDQUF1Qzt3QkFDakQsUUFBUSxFQUFFLHd6QkEwQlg7d0JBQ0MsTUFBTSxFQUFFLENBQUMsK0RBQStELENBQUM7cUJBQzFFOztnREFqQ0Q7Ozs7Ozs7QUNBQTs7OztvQkFHQ0EsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSwyQkFBMkI7d0JBQ3JDLFFBQVEsRUFBRSwya0JBU1g7cUJBQ0E7Ozs0QkFFRUcsVUFBSzs7K0NBakJSOzs7Ozs7O0FDQUE7UUE2Q0UsMENBQVksZUFBd0M7WUFDbEQsZUFBZSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JDLGNBQWMsRUFBRSxnQ0FBZ0M7Z0JBQ2hELGtCQUFrQixFQUFFLDJDQUEyQztnQkFDL0QsY0FBYyxFQUFFLGdDQUFnQztnQkFDaEQsZUFBZSxFQUFFLGlDQUFpQztnQkFDbEQsZUFBZSxFQUFFLGlDQUFpQztnQkFDbEQsY0FBYyxFQUFFLGdDQUFnQztnQkFDaEQsZUFBZSxFQUFFLGlDQUFpQztnQkFDbEQsaUJBQWlCLEVBQUUsbUNBQW1DO2FBQ3ZELENBQUMsQ0FBQztTQUNKOztvQkF0Q0ZJLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsQ0FBQ0MsbUJBQVksRUFBRUMseUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUM7d0JBQ3hGLFlBQVksRUFBRTs0QkFDWiwyQ0FBMkM7NEJBQzNDLGdDQUFnQzs0QkFDaEMsaUNBQWlDOzRCQUNqQyxnQ0FBZ0M7NEJBQ2hDLGlDQUFpQzs0QkFDakMsaUNBQWlDOzRCQUNqQyxnQ0FBZ0M7NEJBQ2hDLG1DQUFtQzs0QkFDbkMsK0JBQStCOzRCQUMvQiwyQ0FBMkM7NEJBQzNDLGdDQUFnQzt5QkFDakM7d0JBQ0QsZUFBZSxFQUFFOzRCQUNmLDJDQUEyQzs0QkFDM0MsZ0NBQWdDOzRCQUNoQyxpQ0FBaUM7NEJBQ2pDLGlDQUFpQzs0QkFDakMsaUNBQWlDOzRCQUNqQyxnQ0FBZ0M7NEJBQ2hDLG1DQUFtQzs0QkFDbkMsZ0NBQWdDO3lCQUNqQztxQkFDRjs7Ozs7d0JBckNRLHVCQUF1Qjs7OytDQU5oQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=