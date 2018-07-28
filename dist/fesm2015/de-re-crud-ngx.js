import { Directive, ViewContainerRef, Injectable, Component, Input, ComponentFactoryResolver, ViewChild, Output, EventEmitter, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ComponentHostDirective {
    /**
     * @param {?} viewContainerRef
     */
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
ComponentHostDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[deReCrudComponentHost]'
            },] },
];
/** @nocollapse */
ComponentHostDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DeReCrudProviderService {
    constructor() {
        this._cache = {};
    }
    /**
     * @param {?} name
     * @param {?} options
     * @return {?}
     */
    register(name, options) {
        this._cache[name] = options;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    get(name) {
        /** @type {?} */
        const options = this._cache[name];
        if (!options) {
            throw new Error(`Provider '${name}' is not registered. Make sure register(name, options) is called in the applicatio root.`);
        }
        return options;
    }
}
DeReCrudProviderService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @type {?} */
const whitespaceValidator = (control) => {
    /** @type {?} */
    const isWhiteSpace = (control.value || '').trim().length === 0;
    return !isWhiteSpace ? null : { required: true };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormBuilderService {
    /**
     * @param {?} fb
     */
    constructor(fb) {
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
    group(struct, blockName, blocks, fields, value = {}) {
        /** @type {?} */
        const group = {};
        /** @type {?} */
        const block = blocks[`${struct}-${blockName}`];
        for (const fieldReference of block.fields) {
            /** @type {?} */
            const field = fields[`${struct}-${fieldReference.field}`];
            if (field.type === 'stamp') {
                continue;
            }
            if (field.type === 'linkedStruct') {
                /** @type {?} */
                const linkedStructField = /** @type {?} */ (field);
                const { reference } = linkedStructField;
                /** @type {?} */
                const array = this.array(reference.struct, reference.block, blocks, fields, value[field.name]);
                if (!array.value.length && linkedStructField.minInstances > 0) {
                    // tslint:disable-next-line:no-increment-decrement
                    for (let i = 0; i < linkedStructField.minInstances; i++) {
                        array.push(this.group(reference.struct, reference.block, blocks, fields));
                    }
                }
                group[field.name] = array;
                continue;
            }
            /** @type {?} */
            const validators = this.getValidators(fieldReference, field);
            /** @type {?} */
            const initialValue = value[field.name] || field.initialValue;
            group[field.name] = [initialValue, validators];
        }
        /** @type {?} */
        const formGroup = this.fb.group(group);
        if (!formGroup.value) {
            formGroup.patchValue({});
        }
        return formGroup;
    }
    /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    array(struct, blockName, blocks, fields, value = []) {
        /** @type {?} */
        const array = [];
        if (value && value.length) {
            value.forEach((item) => {
                /** @type {?} */
                const group = this.group(struct, blockName, blocks, fields, item);
                array.push(group);
            });
        }
        /** @type {?} */
        const formArray = this.fb.array(array);
        if (!formArray.value) {
            formArray.setValue([]);
        }
        return formArray;
    }
    /**
     * @param {?} fieldReference
     * @param {?} field
     * @return {?}
     */
    getValidators(fieldReference, field) {
        return (control) => {
            /** @type {?} */
            const validators = [];
            /** @type {?} */
            const root = control.root;
            /** @type {?} */
            const parent = control.parent;
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
    }
}
FormBuilderService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FormBuilderService.ctorParameters = () => [
    { type: FormBuilder }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// @dynamic
class FormStateService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CollectionFieldHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.onAdd = (e) => {
            e.stopPropagation();
            e.preventDefault();
            /** @type {?} */
            const reference = (/** @type {?} */ (this.control.field)).reference;
            /** @type {?} */
            const form = this.stateService.createForm(this.control.formId, reference.struct, reference.block);
            this.control.value.push(form);
            /** @type {?} */
            const index = this.control.value.controls.indexOf(form);
            /** @type {?} */
            const childPath = `${this.control.formPath}.${index}`;
            if (this.control.layout === 'table') {
                this.stateService.pushNavigation(this.control.formId, reference.struct, reference.block, childPath, this.control.formPath);
            }
            this.control.onChange(null);
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.control.formId);
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["control"] && !changes["control"].firstChange) {
            this.updateInputs();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    }
    /**
     * @return {?}
     */
    render() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        let controlComponent;
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.control.layout) {
            case 'inline':
                controlComponent = providerOptions.inlineComponent;
                break;
            case 'table':
                controlComponent = providerOptions.tableComponent;
                break;
            default:
                console.error(`${this.control.layout} layout is not supported.`, JSON.stringify(this.control.field));
                return;
        }
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    updateInputs() {
        if (!this._componentRef) {
            return;
        }
        /** @type {?} */
        const componentRenderer = /** @type {?} */ (this._componentRef.instance);
        /** @type {?} */
        const control = Object.assign({}, this.control, { onAdd: this.onAdd });
        /** @type {?} */
        const previousControl = componentRenderer.control;
        componentRenderer.control = control;
        /** @type {?} */
        const onComponentChange = (/** @type {?} */ (this._componentRef.instance)).ngOnChanges;
        if (onComponentChange) {
            /** @type {?} */
            const change = {
                previousValue: previousControl,
                currentValue: control,
                firstChange: typeof previousControl === 'undefined',
                isFirstChange: () => change.firstChange
            };
            onComponentChange.call(componentRenderer, { control: change });
        }
    }
}
CollectionFieldHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-collection-field-host',
                template: `<ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
CollectionFieldHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
CollectionFieldHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputFieldHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this._componentRefs = [];
        this.onFocus = () => {
            this._valueOnFocus = this.form.root.get(this.formPath).value;
        };
        this.onBlur = () => {
            /** @type {?} */
            const newValue = this.form.root.get(this.formPath).value;
            if (this._valueOnFocus !== newValue) {
                this.stateService.onChange(this.formId, this.formPath, newValue, 'blur');
            }
        };
        this.onChange = (e) => {
            /** @type {?} */
            const newValue = this.form.root.get(this.formPath).value;
            this.stateService.onChange(this.formId, this.formPath, newValue, e ? 'change' : null);
        };
    }
    /**
     * @return {?}
     */
    get formPath() {
        /** @type {?} */
        let formPath = this.field.name;
        if (this.parentPath) {
            /** @type {?} */
            let parentPath = this.parentPath;
            if (this.parentForm instanceof FormArray) {
                /** @type {?} */
                const index = this.parentForm.controls.indexOf(this.form);
                parentPath += '.' + index;
            }
            formPath = `${parentPath}.${formPath}`;
        }
        return formPath;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        const fieldReference = this.state.blocks[`${this.struct}-${this.block}`].fields.find(x => x.field === this.field.name);
        this.fieldReference = fieldReference;
        this._submissionErrorsChangeSubscription = this.state.onSubmissionErrorsChange.subscribe(() => {
            this.updateInputs();
        });
        this._formChangeSubscription = this.form.valueChanges.subscribe(() => {
            if (!this.shouldRender()) {
                this.destroyRefs();
            }
            else if (!this._componentRefs.length) {
                this.render();
            }
            else {
                this.updateInputs();
            }
        });
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._submissionErrorsChangeSubscription) {
            this._submissionErrorsChangeSubscription.unsubscribe();
        }
        if (this._formChangeSubscription) {
            this._formChangeSubscription.unsubscribe();
        }
        this.destroyRefs();
    }
    /**
     * @return {?}
     */
    destroyRefs() {
        if (this._componentRefs.length) {
            this._componentRefs.forEach(x => x.destroy());
            this._componentRefs = [];
        }
    }
    /**
     * @return {?}
     */
    shouldRender() {
        return this.fieldReference && this.fieldReference.condition(this.form.value, this.state.form.root.value);
    }
    /**
     * @return {?}
     */
    render() {
        this.destroyRefs();
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        let controlComponent;
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
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
                console.error(`${this.field.type} control is not supported.`, JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.containerComponent);
        /** @type {?} */
        const controlComponentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        /** @type {?} */
        const controlComponentRef = viewContainerRef.createComponent(controlComponentFactory);
        /** @type {?} */
        const containerComponentRef = viewContainerRef.createComponent(containerComponentFactory, 0, undefined, [[controlComponentRef.location.nativeElement]]);
        this._componentRefs.push(controlComponentRef, containerComponentRef);
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    updateInputs() {
        if (this.shouldRender() && !this._componentRefs.length) {
            this.render();
            return;
        }
        if (!this._componentRefs.length) {
            return;
        }
        /** @type {?} */
        const formPath = this.formPath;
        /** @type {?} */
        const value = this.form.root.get(formPath);
        /** @type {?} */
        const control = {
            value,
            formPath,
            field: this.field,
            formId: this.formId,
            submissionErrors: (this.state.submissionErrors &&
                this.state.submissionErrors[formPath]) ||
                [],
            form: this.form,
            rendererType: this.mapType(this.field.type),
            htmlId: `${this.formId}-${formPath}`,
            onFocus: this.onFocus,
            onBlur: this.onBlur,
            onChange: this.onChange
        };
        switch (this.field.type) {
            case 'list':
            case 'foreignKey': {
                /** @type {?} */
                const listField = /** @type {?} */ (this.field);
                /** @type {?} */
                const selectControl = /** @type {?} */ (control);
                if (this.field.type === 'foreignKey') {
                    selectControl.options = () => [];
                }
                else {
                    selectControl.options = () => listField.options;
                }
                break;
            }
            case 'linkedStruct': {
                /** @type {?} */
                const collectionControl = /** @type {?} */ (control);
                /** @type {?} */
                const linkedStructField = /** @type {?} */ (this.field);
                const { reference } = linkedStructField;
                /** @type {?} */
                const blockFields = this.state.blocks[`${this.struct}-${this.block}`].fields;
                const { hints } = /** @type {?} */ (blockFields.find(x => x.field === linkedStructField.name));
                /** @type {?} */
                const referenceBlock = (hints && hints.block) || reference.block;
                /** @type {?} */
                const fieldReferences = /** @type {?} */ (this.state
                    .blocks[`${reference.struct}-${referenceBlock}`].fields);
                /** @type {?} */
                const nestedFields = [];
                for (const fieldReference of fieldReferences) {
                    /** @type {?} */
                    const field = this.state.fields[`${reference.struct}-${fieldReference.field}`];
                    nestedFields.push(field);
                }
                /** @type {?} */
                const nestedValues = [];
                for (const nestedValue of collectionControl.value.controls) {
                    nestedValues.push(/** @type {?} */ (nestedValue));
                }
                collectionControl.stamp = {
                    text: control.field.label,
                    headerSize: this.state.options.headerSize
                };
                collectionControl.canAdd = !linkedStructField.maxInstances || nestedValues.length < linkedStructField.maxInstances;
                collectionControl.nestedValues = nestedValues;
                collectionControl.nestedFields = nestedFields;
                collectionControl.layout = (hints && hints.layout) || 'inline';
                break;
            }
        }
        for (const componentRef of this._componentRefs) {
            /** @type {?} */
            const componentRenderer = /** @type {?} */ (componentRef.instance);
            /** @type {?} */
            const previousControl = componentRenderer.control;
            componentRenderer.control = control;
            /** @type {?} */
            const onComponentChange = (/** @type {?} */ (componentRef.instance)).ngOnChanges;
            if (onComponentChange) {
                /** @type {?} */
                const change = {
                    previousValue: previousControl,
                    currentValue: control,
                    firstChange: typeof previousControl === 'undefined',
                    isFirstChange: () => change.firstChange
                };
                onComponentChange.call(componentRenderer, { control: change });
            }
        }
    }
    /**
     * @param {?} type
     * @return {?}
     */
    mapType(type) {
        switch (type) {
            case 'integer':
                return 'number';
            default:
                return type;
        }
    }
}
InputFieldHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-input-field-host',
                template: `
    <ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
InputFieldHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ButtonHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
        this.click = new EventEmitter();
        this.onClick = (e) => {
            this.click.emit(e);
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    }
    /**
     * @return {?}
     */
    render() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(providerOptions.buttonComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    updateInputs() {
        if (!this._componentRef) {
            return;
        }
        const { options: { struct, submitButtonStyle, cancelButtonStyle }, structs } = this.state;
        /** @type {?} */
        const isSubmit = this.type === 'submit';
        /** @type {?} */
        let style = null;
        switch (this.type) {
            case 'submit':
                style = submitButtonStyle;
                break;
            case 'cancel':
                style = cancelButtonStyle;
                break;
        }
        /** @type {?} */
        let text = (style && style.text) || this.text;
        if (isSubmit &&
            submitButtonStyle &&
            submitButtonStyle.appendSchemaLabel) {
            text = `${text} ${structs[struct].label}`;
        }
        /** @type {?} */
        const extraClasses = [];
        if (this.state.options.extraButtonClasses) {
            extraClasses.push(...this.state.options.extraButtonClasses);
        }
        if (this.extraClasses) {
            if (typeof this.extraClasses === 'string') {
                extraClasses.push(...this.extraClasses.split(' '));
            }
            else {
                extraClasses.push(...this.extraClasses);
            }
        }
        /** @type {?} */
        const componentRenderer = /** @type {?} */ (this._componentRef.instance);
        componentRenderer.button = {
            text,
            extraClasses,
            type: isSubmit ? 'submit' : 'button',
            disabled: this.disabled,
            onClick: this.onClick,
            class: (style && style.class) || undefined
        };
    }
}
ButtonHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-button-host',
                template: `<ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
ButtonHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
ButtonHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    formId: [{ type: Input }],
    type: [{ type: Input }],
    extraClasses: [{ type: Input }],
    text: [{ type: Input }],
    disabled: [{ type: Input }],
    click: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StampFieldHostComponent {
    /**
     * @param {?} stateService
     * @param {?} componentFactoryResolver
     * @param {?} providerService
     */
    constructor(stateService, componentFactoryResolver, providerService) {
        this.stateService = stateService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.providerService = providerService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.state = this.stateService.get(this.formId);
        /** @type {?} */
        const fieldReference = this.state.blocks[`${this.struct}-${this.block}`].fields.find(x => x.field === this.field.name);
        this.fieldReference = fieldReference;
        this.render();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["formId"] && !changes["formId"].isFirstChange()) {
            this.ngOnDestroy();
            this.ngOnInit();
            return;
        }
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
    }
    /**
     * @return {?}
     */
    shouldRender() {
        return this.fieldReference.condition(this.form.value, this.state.form.root.value);
    }
    /**
     * @return {?}
     */
    render() {
        if (this._componentRef) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        if (!this.shouldRender()) {
            return;
        }
        /** @type {?} */
        let controlComponent;
        /** @type {?} */
        const providerOptions = this.providerService.get(this.state.options.provider);
        switch (this.field.type) {
            case 'stamp':
                controlComponent = providerOptions.stampComponent;
                break;
            default:
                console.error(`${this.field.type} control is not supported.`, JSON.stringify(this.field));
                return;
        }
        /** @type {?} */
        const viewContainerRef = this.componentHost.viewContainerRef;
        viewContainerRef.clear();
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(controlComponent);
        this._componentRef = viewContainerRef.createComponent(componentFactory);
        this.updateInputs();
    }
    /**
     * @return {?}
     */
    updateInputs() {
        if (!this._componentRef) {
            return;
        }
        /** @type {?} */
        const componentRenderer = /** @type {?} */ (this._componentRef.instance);
        /** @type {?} */
        const stampField = /** @type {?} */ (this.field);
        /** @type {?} */
        const stamp = {
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
        const previousStamp = componentRenderer.stamp;
        componentRenderer.stamp = stamp;
        /** @type {?} */
        const onComponentChange = (/** @type {?} */ (this._componentRef.instance))
            .ngOnChanges;
        if (onComponentChange) {
            /** @type {?} */
            const change = {
                previousValue: previousStamp,
                currentValue: stamp,
                firstChange: typeof previousStamp === 'undefined',
                isFirstChange: () => change.firstChange
            };
            onComponentChange.call(componentRenderer, { control: change });
        }
    }
}
StampFieldHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-stamp-field-host',
                template: `<ng-template deReCrudComponentHost></ng-template>`
            },] },
];
/** @nocollapse */
StampFieldHostComponent.ctorParameters = () => [
    { type: FormStateService },
    { type: ComponentFactoryResolver },
    { type: DeReCrudProviderService }
];
StampFieldHostComponent.propDecorators = {
    componentHost: [{ type: ViewChild, args: [ComponentHostDirective,] }],
    formId: [{ type: Input }],
    form: [{ type: Input }],
    struct: [{ type: Input }],
    block: [{ type: Input }],
    field: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormHostComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DeReCrudCoreModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DeReCrudFormsModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ValidationErrorHelper {
    /**
     * @param {?} control
     * @return {?}
     */
    static getFormControlIfErrorFound(control) {
        /** @type {?} */
        const formControl = control.form.get(control.field.name);
        if ((!formControl.errors || !formControl.touched) &&
            !control.submissionErrors.length) {
            return null;
        }
        return formControl;
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static hasError(control) {
        return !!this.getFormControlIfErrorFound(control);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    static getErrors(control) {
        /** @type {?} */
        const formControl = this.getFormControlIfErrorFound(control);
        if (!formControl) {
            return null;
        }
        /** @type {?} */
        const sortedErrors = [];
        /** @type {?} */
        const unsortedErrors = [];
        if (formControl.errors && formControl.touched) {
            for (const key of Object.keys(formControl.errors)) {
                /** @type {?} */
                const sort = this._errorSort[key];
                /** @type {?} */
                const metadata = formControl.errors[key];
                if (typeof sort === 'undefined') {
                    unsortedErrors.push({ key, metadata });
                }
                else {
                    sortedErrors.push({ key, metadata, sort });
                }
            }
        }
        return sortedErrors
            .sort(x => x.sort)
            .concat(unsortedErrors)
            .map(this.getErrorMessage)
            .concat(control.submissionErrors);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    static getErrorMessage(error) {
        switch (error.key) {
            case 'required':
                return 'This field is required.';
            case 'minlength':
                return `This field must have at least ${error.metadata.requiredLength} characters.`;
            case 'maxlength':
                return `This field can not exceed ${error.metadata.requiredLength} characters.`;
            default:
                return `Validation failed with error: ${error}`;
        }
    }
}
ValidationErrorHelper._errorSort = ['required'];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3ControlContainerRendererComponent {
    /**
     * @return {?}
     */
    getClasses() {
        /** @type {?} */
        const hasError = ValidationErrorHelper.hasError(this.control);
        return {
            'has-error': hasError,
            'has-feedback': hasError
        };
    }
}
Bootstrap3ControlContainerRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-control-container-renderer',
                template: `<div class="form-group" [ngClass]="getClasses()">
  <ng-content></ng-content>
</div>
`
            },] },
];
Bootstrap3ControlContainerRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DeReCrudProviderModule {
}
DeReCrudProviderModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                providers: [DeReCrudProviderService],
                declarations: []
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3InputRendererComponent {
}
Bootstrap3InputRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-input-renderer',
                template: `<ng-container [formGroup]="control.form">
  <de-re-crud-bootstrap3-label-renderer [control]="control">
  </de-re-crud-bootstrap3-label-renderer>
  <input class="form-control"
         [type]="control.rendererType"
         [id]="control.htmlId"
         [name]="control.field.name"
         [formControlName]="control.field.name"
         (focus)="control.onFocus($event)"
         (blur)="control.onBlur($event)"
         (input)="control.onChange($event)" />
  <de-re-crud-bootstrap3-help-renderer [control]="control">
  </de-re-crud-bootstrap3-help-renderer>
  <de-re-crud-bootstrap3-validation-errors-renderer [control]="control">
  </de-re-crud-bootstrap3-validation-errors-renderer>
</ng-container>
`
            },] },
];
Bootstrap3InputRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3SelectRendererComponent {
}
Bootstrap3SelectRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-select-renderer',
                template: `<ng-container [formGroup]="control.form">
  <de-re-crud-bootstrap3-label-renderer [control]="control"></de-re-crud-bootstrap3-label-renderer>
  <select class="form-control"
          [id]="control.htmlId"
          [name]="control.field.name"
          [formControlName]="control.field.name"
          (focus)="control.onFocus($event)"
          (blur)="control.onBlur($event)"
          (change)="control.onChange($event)">
    <option *ngFor="let option of control.options" [value]="option.value">{{option.label}}</option>
  </select>
  <de-re-crud-bootstrap3-help-renderer [control]="control">
  </de-re-crud-bootstrap3-help-renderer>
  <de-re-crud-bootstrap3-validation-errors-renderer [control]="control">
  </de-re-crud-bootstrap3-validation-errors-renderer>
</ng-container>
`
            },] },
];
Bootstrap3SelectRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3LabelRendererComponent {
}
Bootstrap3LabelRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-label-renderer',
                template: `<label class="control-label" [htmlFor]="control.htmlId">{{control.field.label}}</label>
`
            },] },
];
Bootstrap3LabelRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3ButtonRendererComponent {
    /**
     * @return {?}
     */
    get classes() {
        /** @type {?} */
        let classes;
        if (this._classes) {
            classes = this._classes;
        }
        if (this.button.extraClasses) {
            classes = (classes || []).concat(this.button.extraClasses);
        }
        return classes;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateClasses();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["button"]) {
            if (changes["button"].currentValue.type !==
                changes["button"].previousValue.type) {
                this.updateClasses();
            }
        }
    }
    /**
     * @return {?}
     */
    updateClasses() {
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
    }
}
Bootstrap3ButtonRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-button-renderer',
                template: `<button class="btn" [ngClass]="classes"
        [type]="button.type"
        [disabled]="button.disabled"
        (click)="button.onClick($event)">
  {{button.text}}
</button>
`
            },] },
];
Bootstrap3ButtonRendererComponent.propDecorators = {
    button: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3TableRendererComponent {
    /**
     * @param {?} field
     * @param {?} value
     * @return {?}
     */
    getValue(field, value) {
        /** @type {?} */
        const fieldValue = value[field.name];
        if (fieldValue == null || typeof fieldValue === 'undefined') {
            return '&nbsp;';
        }
        return fieldValue;
    }
}
Bootstrap3TableRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-table-renderer',
                template: `<div>
  <de-re-crud-stamp-renderer [stamp]="control.stamp">
  </de-re-crud-stamp-renderer>
  <de-re-crud-button-host
    [formId]="control.formId"
    extraClasses="btn-sm"
    text="Add"
    (click)="control.onAdd($event)">
  </de-re-crud-button-host>
</div>

<div class="table-control-container">
  <table class="table table-bordered table-condensed">
    <thead>
      <tr>
        <th *ngFor="let field of control.nestedFields">
          {{field.label}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr *ngIf="!control.nestedValues.length">
        <td colspan="100%">None</td>
      </tr>
      <tr *ngFor="let form of control.nestedValues">
        <td *ngFor="let field of control.nestedFields" [innerHtml]="getValue(field, form.value)"></td>
      </tr>
    </tbody>
  </table>
</div>
`,
                styles: [`.table-control-container{margin-top:10px}`]
            },] },
];
Bootstrap3TableRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3CheckboxRendererComponent {
}
Bootstrap3CheckboxRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-checkbox-renderer',
                template: `<ng-container [formGroup]="control.form">
  <div class="checkbox">
    <label [htmlFor]="control.htmlId">
      <input type="checkbox"
        [id]="control.htmlId"
        [name]="control.field.name"
        [formControlName]="control.field.name"
        (focus)="control.onFocus($event)"
        (blur)="control.onBlur($event)"
        (input)="control.onChange($event)" /> {{control.field.label}}
    </label>
  </div>
  <de-re-crud-bootstrap3-help-renderer [control]="control">
  </de-re-crud-bootstrap3-help-renderer>
  <de-re-crud-bootstrap3-validation-errors-renderer [control]="control">
  </de-re-crud-bootstrap3-validation-errors-renderer>
</ng-container>
`
            },] },
];
Bootstrap3CheckboxRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3HelpRendererComponent {
    /**
     * @return {?}
     */
    hasError() {
        return ValidationErrorHelper.hasError(this.control);
    }
}
Bootstrap3HelpRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-help-renderer',
                template: `<p *ngIf="control.field.help && !hasError()" class="help-block">{{control.field.help}}</p>
`
            },] },
];
Bootstrap3HelpRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3ValidationErrorsRendererComponent {
    /**
     * @return {?}
     */
    hasError() {
        return ValidationErrorHelper.hasError(this.control);
    }
    /**
     * @return {?}
     */
    getErrors() {
        return ValidationErrorHelper.getErrors(this.control);
    }
}
Bootstrap3ValidationErrorsRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-validation-errors-renderer',
                template: `<ng-container *ngIf="hasError()"
  [ngTemplateOutlet]="validationErrors"
  [ngTemplateOutletContext]="{ errors: getErrors() }">
</ng-container>

<ng-template #validationErrors let-errors="errors">
  <ng-container>
    <p *ngFor="let error of errors" class="help-block">
      {{error}}
    </p>
  </ng-container>
</ng-template>
`
            },] },
];
Bootstrap3ValidationErrorsRendererComponent.propDecorators = {
    control: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3InlineRendererComponent {
}
Bootstrap3InlineRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-bootstrap3-inline-renderer',
                template: `<div>
  <de-re-crud-stamp-renderer [stamp]="control.stamp">
  </de-re-crud-stamp-renderer>
  <de-re-crud-button-host
    *ngIf="control.canAdd"
    [formId]="control.formId"
    extraClasses="btn-sm"
    text="Add"
    (click)="control.onAdd($event)">
  </de-re-crud-button-host>
</div>

<div class="inline-control-container">
  <span *ngIf="!control.nestedValues.length">None</span>
  <div *ngFor="let value of control.nestedValues">
    <de-re-crud-form-host
      [formId]="control.formId"
      [form]="value"
      [parentPath]="control.formPath"
      [parentForm]="control.value"
      [fields]="control.nestedFields"
      [struct]="control.field.reference.struct"
      [block]="control.field.reference.block">
    </de-re-crud-form-host>
  </div>
</div>
`,
                styles: [`.inline-control-container{margin-top:10px;margin-bottom:10px}`]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3StampRendererComponent {
}
Bootstrap3StampRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'de-re-crud-stamp-renderer',
                template: `<ng-container [ngSwitch]="stamp.headerSize">
  <h1 *ngSwitchCase="1" [ngClass]="stamp.classes">{{stamp.text}}</h1>
  <h2 *ngSwitchCase="2" [ngClass]="stamp.classes">{{stamp.text}}</h2>
  <h3 *ngSwitchCase="3" [ngClass]="stamp.classes">{{stamp.text}}</h3>
  <h4 *ngSwitchCase="4" [ngClass]="stamp.classes">{{stamp.text}}</h4>
  <h5 *ngSwitchCase="5" [ngClass]="stamp.classes">{{stamp.text}}</h5>
  <h6 *ngSwitchCase="6" [ngClass]="stamp.classes">{{stamp.text}}</h6>
  <p *ngSwitchDefault [ngClass]="stamp.classes">{{stamp.text}}</p>
</ng-container>
`
            },] },
];
Bootstrap3StampRendererComponent.propDecorators = {
    stamp: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Bootstrap3DeReCrudProviderModule {
    /**
     * @param {?} providerService
     */
    constructor(providerService) {
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
Bootstrap3DeReCrudProviderModule.ctorParameters = () => [
    { type: DeReCrudProviderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { DeReCrudFormsModule, Bootstrap3DeReCrudProviderModule, DeReCrudCoreModule as ɵa, ButtonHostComponent as ɵh, CollectionFieldHostComponent as ɵi, ComponentHostDirective as ɵb, FormHostComponent as ɵj, InputFieldHostComponent as ɵc, StampFieldHostComponent as ɵg, FormBuilderService as ɵe, FormStateService as ɵd, FormComponent as ɵk, Bootstrap3ButtonRendererComponent as ɵq, Bootstrap3CheckboxRendererComponent as ɵt, Bootstrap3ControlContainerRendererComponent as ɵm, Bootstrap3HelpRendererComponent as ɵu, Bootstrap3InlineRendererComponent as ɵr, Bootstrap3InputRendererComponent as ɵn, Bootstrap3LabelRendererComponent as ɵp, Bootstrap3SelectRendererComponent as ɵo, Bootstrap3StampRendererComponent as ɵw, Bootstrap3TableRendererComponent as ɵs, Bootstrap3ValidationErrorsRendererComponent as ɵv, DeReCrudProviderModule as ɵl, DeReCrudProviderService as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUtcmUtY3J1ZC1uZ3guanMubWFwIiwic291cmNlcyI6WyJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL2NvcmUvaG9zdHMvY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS92YWxpZGF0b3JzL3doaXRlc3BhY2UtdmFsaWRhdG9yLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tYnVpbGRlci5zZXJ2aWNlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9jb2xsZWN0aW9uLWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2lucHV0LWZpZWxkLWhvc3QuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL2hvc3RzL2J1dHRvbi1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9zdGFtcC1maWVsZC1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9ob3N0cy9mb3JtLWhvc3QvZm9ybS1ob3N0LmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvY29yZS9jb3JlLm1vZHVsZS50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvZm9ybXMvZm9ybS9mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvZm9ybXMvZm9ybXMubW9kdWxlLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9jb3JlL3ZhbGlkYXRpb24tZXJyb3ItaGVscGVyLnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9wcm92aWRlci9wcm92aWRlci5tb2R1bGUudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2lucHV0LXJlbmRlcmVyL2lucHV0LXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2xhYmVsLXJlbmRlcmVyL2xhYmVsLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvYnV0dG9uLXJlbmRlcmVyL2J1dHRvbi1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL3RhYmxlLXJlbmRlcmVyL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGRlLXJlLWNydWQvbmd4L3NyYy9hcHAvcHJvdmlkZXJzL2Jvb3RzdHJhcDMvY2hlY2tib3gtcmVuZGVyZXIvY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9oZWxwLXJlbmRlcmVyL2hlbHAtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2lubGluZS1yZW5kZXJlci9pbmxpbmUtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvc3JjL2FwcC9wcm92aWRlcnMvYm9vdHN0cmFwMy9zdGFtcC1yZW5kZXJlci9zdGFtcC1yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL0BkZS1yZS1jcnVkL25neC9zcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2Jvb3RzdHJhcDMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxyXG4gIHNlbGVjdG9yOiAnW2RlUmVDcnVkQ29tcG9uZW50SG9zdF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyT3B0aW9ucyB9IGZyb20gJy4vcHJvdmlkZXItb3B0aW9ucyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfY2FjaGU6IHsgW25hbWU6IHN0cmluZ106IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zIH0gPSB7fTtcclxuXHJcbiAgcmVnaXN0ZXIobmFtZTogc3RyaW5nLCBvcHRpb25zOiBEZVJlQ3J1ZFByb3ZpZGVyT3B0aW9ucykge1xyXG4gICAgdGhpcy5fY2FjaGVbbmFtZV0gPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgZ2V0KG5hbWU6IHN0cmluZyk6IERlUmVDcnVkUHJvdmlkZXJPcHRpb25zIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9jYWNoZVtuYW1lXTtcclxuICAgIGlmICghb3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFByb3ZpZGVyICcke25hbWV9JyBpcyBub3QgcmVnaXN0ZXJlZC4gTWFrZSBzdXJlIHJlZ2lzdGVyKG5hbWUsIG9wdGlvbnMpIGlzIGNhbGxlZCBpbiB0aGUgYXBwbGljYXRpbyByb290LmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3Qgd2hpdGVzcGFjZVZhbGlkYXRvciA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpID0+IHtcclxuICBjb25zdCBpc1doaXRlU3BhY2UgPSAoY29udHJvbC52YWx1ZSB8fCAnJykudHJpbSgpLmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgcmV0dXJuICFpc1doaXRlU3BhY2UgPyBudWxsIDogeyByZXF1aXJlZDogdHJ1ZSB9O1xyXG59O1xyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQWJzdHJhY3RDb250cm9sLFxyXG4gIEZvcm1CdWlsZGVyLFxyXG4gIEZvcm1Hcm91cCxcclxuICBWYWxpZGF0b3JzLFxyXG4gIEZvcm1BcnJheVxyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICBJRmllbGQsXHJcbiAgSVRleHRGaWVsZCxcclxuICBJTGlua2VkU3RydWN0RmllbGQsXHJcbiAgSUJsb2NrLFxyXG4gIElJbnRlZ2VyRmllbGQsXHJcbiAgSUZpZWxkUmVmZXJlbmNlXHJcbn0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IHdoaXRlc3BhY2VWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL3doaXRlc3BhY2UtdmFsaWRhdG9yJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZvcm1CdWlsZGVyU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHt9XHJcblxyXG4gIGdyb3VwKFxyXG4gICAgc3RydWN0OiBzdHJpbmcsXHJcbiAgICBibG9ja05hbWU6IHN0cmluZyxcclxuICAgIGJsb2NrczogTWFwPHN0cmluZywgSUJsb2NrPixcclxuICAgIGZpZWxkczogTWFwPHN0cmluZywgSUZpZWxkPixcclxuICAgIHZhbHVlID0ge31cclxuICApOiBGb3JtR3JvdXAge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcclxuICAgIGNvbnN0IGJsb2NrID0gYmxvY2tzW2Ake3N0cnVjdH0tJHtibG9ja05hbWV9YF07XHJcblxyXG4gICAgZm9yIChjb25zdCBmaWVsZFJlZmVyZW5jZSBvZiBibG9jay5maWVsZHMpIHtcclxuICAgICAgY29uc3QgZmllbGQgPSBmaWVsZHNbYCR7c3RydWN0fS0ke2ZpZWxkUmVmZXJlbmNlLmZpZWxkfWBdO1xyXG5cclxuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdzdGFtcCcpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpZWxkLnR5cGUgPT09ICdsaW5rZWRTdHJ1Y3QnKSB7XHJcbiAgICAgICAgY29uc3QgbGlua2VkU3RydWN0RmllbGQgPSA8SUxpbmtlZFN0cnVjdEZpZWxkPmZpZWxkO1xyXG4gICAgICAgIGNvbnN0IHsgcmVmZXJlbmNlIH0gPSBsaW5rZWRTdHJ1Y3RGaWVsZDtcclxuXHJcbiAgICAgICAgY29uc3QgYXJyYXkgPSB0aGlzLmFycmF5KFxyXG4gICAgICAgICAgcmVmZXJlbmNlLnN0cnVjdCxcclxuICAgICAgICAgIHJlZmVyZW5jZS5ibG9jayxcclxuICAgICAgICAgIGJsb2NrcyxcclxuICAgICAgICAgIGZpZWxkcyxcclxuICAgICAgICAgIHZhbHVlW2ZpZWxkLm5hbWVdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcnJheS52YWx1ZS5sZW5ndGggJiYgbGlua2VkU3RydWN0RmllbGQubWluSW5zdGFuY2VzID4gMCkge1xyXG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWluY3JlbWVudC1kZWNyZW1lbnRcclxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlua2VkU3RydWN0RmllbGQubWluSW5zdGFuY2VzOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaCh0aGlzLmdyb3VwKHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jaywgYmxvY2tzLCBmaWVsZHMpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdyb3VwW2ZpZWxkLm5hbWVdID0gYXJyYXk7XHJcblxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gdGhpcy5nZXRWYWxpZGF0b3JzKGZpZWxkUmVmZXJlbmNlLCBmaWVsZCk7XHJcbiAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHZhbHVlW2ZpZWxkLm5hbWVdIHx8IGZpZWxkLmluaXRpYWxWYWx1ZTtcclxuXHJcbiAgICAgIGdyb3VwW2ZpZWxkLm5hbWVdID0gW2luaXRpYWxWYWx1ZSwgdmFsaWRhdG9yc107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5mYi5ncm91cChncm91cCk7XHJcblxyXG4gICAgaWYgKCFmb3JtR3JvdXAudmFsdWUpIHtcclxuICAgICAgZm9ybUdyb3VwLnBhdGNoVmFsdWUoe30pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtR3JvdXA7XHJcbiAgfVxyXG5cclxuICBhcnJheShcclxuICAgIHN0cnVjdDogc3RyaW5nLFxyXG4gICAgYmxvY2tOYW1lOiBzdHJpbmcsXHJcbiAgICBibG9ja3M6IE1hcDxzdHJpbmcsIElCbG9jaz4sXHJcbiAgICBmaWVsZHM6IE1hcDxzdHJpbmcsIElGaWVsZD4sXHJcbiAgICB2YWx1ZSA9IFtdXHJcbiAgKTogRm9ybUFycmF5IHtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcblxyXG4gICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCkge1xyXG4gICAgICB2YWx1ZS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmdyb3VwKHN0cnVjdCwgYmxvY2tOYW1lLCBibG9ja3MsIGZpZWxkcywgaXRlbSk7XHJcblxyXG4gICAgICAgIGFycmF5LnB1c2goZ3JvdXApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmZiLmFycmF5KGFycmF5KTtcclxuICAgIGlmICghZm9ybUFycmF5LnZhbHVlKSB7XHJcbiAgICAgIGZvcm1BcnJheS5zZXRWYWx1ZShbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZvcm1BcnJheTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgcHJpdmF0ZSBnZXRWYWxpZGF0b3JzKGZpZWxkUmVmZXJlbmNlOiBJRmllbGRSZWZlcmVuY2UsIGZpZWxkOiBJRmllbGQpIHtcclxuICAgIHJldHVybiAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRvcnMgPSBbXTtcclxuXHJcbiAgICAgIGNvbnN0IHJvb3QgPSBjb250cm9sLnJvb3Q7XHJcbiAgICAgIGNvbnN0IHBhcmVudCA9IGNvbnRyb2wucGFyZW50O1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHBhcmVudCBpbnN0YW5jZW9mIEZvcm1Hcm91cCAmJlxyXG4gICAgICAgICFmaWVsZFJlZmVyZW5jZS5jb25kaXRpb24ocGFyZW50LnZhbHVlLCByb290LnZhbHVlKVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZpZWxkLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQsIHdoaXRlc3BhY2VWYWxpZGF0b3IpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJVGV4dEZpZWxkPmZpZWxkKS5taW5MZW5ndGgpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoKDxJVGV4dEZpZWxkPmZpZWxkKS5taW5MZW5ndGgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SVRleHRGaWVsZD5maWVsZCkubWF4TGVuZ3RoKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKCg8SVRleHRGaWVsZD5maWVsZCkubWF4TGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoPElJbnRlZ2VyRmllbGQ+ZmllbGQpLm1pbikge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbigoPElJbnRlZ2VyRmllbGQ+ZmllbGQpLm1pbikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5tYXgpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5tYXgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF2YWxpZGF0b3JzLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKHZhbGlkYXRvcnMpKGNvbnRyb2wpO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGVSZUNydWRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL29wdGlvbnMnO1xyXG5pbXBvcnQgeyBJU3RydWN0LCBJRmllbGQsIElCbG9jayB9IGZyb20gJy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyBGb3JtU3VibWlzc2lvbkVycm9ycyB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN1Ym1pc3Npb24nO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlclNlcnZpY2UgfSBmcm9tICcuL2Zvcm0tYnVpbGRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRm9ybUNoYW5nZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLWNoYW5nZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuXHJcbmV4cG9ydCB0eXBlIEdldEtleUZ1bmN0aW9uPFQ+ID0gKGl0ZW06IFQpID0+IHN0cmluZztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIEZvcm1TdGF0ZVNlcnZpY2Uge1xyXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mdW5jdGlvbi1jb25zdHJ1Y3Rvci13aXRoLXN0cmluZy1hcmdzXHJcbiAgcHJpdmF0ZSBzdGF0aWMgZGVmYXVsdENvbmRpdGlvbkZ1bmMgPSBuZXcgRnVuY3Rpb24oJ3JldHVybiB0cnVlJyk7XHJcbiAgcHJpdmF0ZSBfY2FjaGU6IHsgW2lkOiBudW1iZXJdOiBGb3JtU3RhdGUgfSA9IHt9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlclNlcnZpY2UpIHt9XHJcblxyXG4gIHN0YXRpYyBnZW5lcmF0ZUlkKCkge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYXNzaWduRGVmYXVsdHMob3B0aW9uczogRGVSZUNydWRPcHRpb25zKSB7XHJcbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVyU2l6ZSkge1xyXG4gICAgICBvcHRpb25zLmhlYWRlclNpemUgPSAzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVE9ETzogVGhpcyBzaG91bGQgZXhwYW5kIHN0cmluZ3MgaW50byBhIGxhYmVsIG9iamVjdDsgdGhlIHJlbmRlcmVycyBzaG91bGQgaGFuZGxlIHdoaWNoIGxhYmVsIHRvIHNob3cgYmFzZWQgb24gc2NyZWVuIHNpemVcclxuICBzdGF0aWMgcGFyc2VMYWJlbChsYWJlbDogc3RyaW5nIHwgeyBzaG9ydDogc3RyaW5nIH0pIHtcclxuICAgIGlmICh0eXBlb2YgbGFiZWwgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBsYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFiZWwuc2hvcnQ7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcGFyc2VTY2hlbWEob3B0aW9uczogRGVSZUNydWRPcHRpb25zKSB7XHJcbiAgICBjb25zdCBzdHJ1Y3RzOiBJU3RydWN0W10gPSBbXTtcclxuICAgIGNvbnN0IGZpZWxkczogSUZpZWxkW10gPSBbXTtcclxuICAgIGNvbnN0IGJsb2NrczogSUJsb2NrW10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IHN0cnVjdFNjaGVtYSBvZiBvcHRpb25zLnNjaGVtYSkge1xyXG4gICAgICBjb25zdCBzdHJ1Y3QgPSB7XHJcbiAgICAgICAgLi4uc3RydWN0U2NoZW1hLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBhcnNlTGFiZWwoc3RydWN0U2NoZW1hLmxhYmVsKSxcclxuICAgICAgICBjb2xsZWN0aW9uTGFiZWw6IHRoaXMucGFyc2VMYWJlbChzdHJ1Y3RTY2hlbWEubGFiZWwpLFxyXG4gICAgICAgIGZpZWxkczogW10sXHJcbiAgICAgICAgYmxvY2tzOiBbXVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBmaWVsZFNjaGVtYSBvZiBzdHJ1Y3RTY2hlbWEuZmllbGRzKSB7XHJcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLnBhcnNlTGFiZWwoZmllbGRTY2hlbWEubGFiZWwpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWVsZCA9IHtcclxuICAgICAgICAgIC4uLmZpZWxkU2NoZW1hLFxyXG4gICAgICAgICAgbGFiZWwsXHJcbiAgICAgICAgICBwbGFjZWhvbGRlcjogZmllbGRTY2hlbWEucGxhY2Vob2xkZXIgfHwgbGFiZWwsXHJcbiAgICAgICAgICBzdHJ1Y3Q6IHN0cnVjdFNjaGVtYS5uYW1lXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkLnJlZmVyZW5jZSAmJiAhZmllbGQucmVmZXJlbmNlLmJsb2NrKSB7XHJcbiAgICAgICAgICBmaWVsZC5yZWZlcmVuY2UuYmxvY2sgPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmaWVsZHMucHVzaChmaWVsZCk7XHJcbiAgICAgICAgc3RydWN0LmZpZWxkcy5wdXNoKGZpZWxkLm5hbWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGNvbnN0IGJsb2NrU2NoZW1hIG9mIHN0cnVjdFNjaGVtYS5ibG9ja3MpIHtcclxuICAgICAgICBjb25zdCBibG9jayA9IHtcclxuICAgICAgICAgIC4uLmJsb2NrU2NoZW1hLFxyXG4gICAgICAgICAgZmllbGRzOiBbXSxcclxuICAgICAgICAgIHN0cnVjdDogc3RydWN0U2NoZW1hLm5hbWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IHJlZmVyZW5jZSBvZiBibG9ja1NjaGVtYS5maWVsZHMpIHtcclxuICAgICAgICAgIGlmICghcmVmZXJlbmNlKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlID0gcmVmZXJlbmNlLmZpZWxkXHJcbiAgICAgICAgICAgID8gcmVmZXJlbmNlXHJcbiAgICAgICAgICAgIDogeyBmaWVsZDogcmVmZXJlbmNlIH07XHJcblxyXG4gICAgICAgICAgbGV0IGNvbmRpdGlvbjtcclxuXHJcbiAgICAgICAgICBpZiAoZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHVyblZhbHVlID1cclxuICAgICAgICAgICAgICBmaWVsZFJlZmVyZW5jZS5jb25kaXRpb25bMF0gPT09ICd7J1xyXG4gICAgICAgICAgICAgICAgPyBmaWVsZFJlZmVyZW5jZS5jb25kaXRpb25cclxuICAgICAgICAgICAgICAgIDogYHJldHVybiAke2ZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbn1gO1xyXG5cclxuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZ1bmN0aW9uLWNvbnN0cnVjdG9yLXdpdGgtc3RyaW5nLWFyZ3NcclxuICAgICAgICAgICAgY29uZGl0aW9uID0gbmV3IEZ1bmN0aW9uKCd2YWx1ZScsICdyb290VmFsdWUnLCByZXR1cm5WYWx1ZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tY29uc3RydWN0b3Itd2l0aC1zdHJpbmctYXJnc1xyXG4gICAgICAgICAgICBjb25kaXRpb24gPSBGb3JtU3RhdGVTZXJ2aWNlLmRlZmF1bHRDb25kaXRpb25GdW5jO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZpZWxkUmVmZXJlbmNlLmNvbmRpdGlvbiA9IGNvbmRpdGlvbjtcclxuICAgICAgICAgIGJsb2NrLmZpZWxkcy5wdXNoKGZpZWxkUmVmZXJlbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrKTtcclxuICAgICAgICBzdHJ1Y3QuYmxvY2tzLnB1c2goYmxvY2submFtZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHN0cnVjdHMucHVzaChzdHJ1Y3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN0cnVjdHMsXHJcbiAgICAgIGZpZWxkcyxcclxuICAgICAgYmxvY2tzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0KGlkOiBudW1iZXIpOiBGb3JtU3RhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlW2lkXTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZShvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnMsIHZhbHVlOiBvYmplY3QsIGluaXRpYWxFcnJvcnM/OiBGb3JtU3VibWlzc2lvbkVycm9ycyk6IEZvcm1TdGF0ZSB7XHJcbiAgICBsZXQgaWQ6IG51bWJlcjtcclxuXHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBpZCA9IEZvcm1TdGF0ZVNlcnZpY2UuZ2VuZXJhdGVJZCgpO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBGb3JtU3RhdGVTZXJ2aWNlLmFzc2lnbkRlZmF1bHRzKG9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IHNjaGVtYSA9IEZvcm1TdGF0ZVNlcnZpY2UucGFyc2VTY2hlbWEob3B0aW9ucyk7XHJcbiAgICBjb25zdCBzdHJ1Y3RzID0gdGhpcy5hcnJheVRvTWFwKHN0cnVjdCA9PiBzdHJ1Y3QubmFtZSwgc2NoZW1hLnN0cnVjdHMpO1xyXG4gICAgY29uc3QgZmllbGRzID0gdGhpcy5hcnJheVRvTWFwKFxyXG4gICAgICBmaWVsZCA9PiBgJHtmaWVsZC5zdHJ1Y3R9LSR7ZmllbGQubmFtZX1gLFxyXG4gICAgICBzY2hlbWEuZmllbGRzXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGJsb2NrcyA9IHRoaXMuYXJyYXlUb01hcChcclxuICAgICAgYmxvY2sgPT4gYCR7YmxvY2suc3RydWN0fS0ke2Jsb2NrLm5hbWV9YCxcclxuICAgICAgc2NoZW1hLmJsb2Nrc1xyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBmb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cChcclxuICAgICAgb3B0aW9ucy5zdHJ1Y3QsXHJcbiAgICAgIG9wdGlvbnMuYmxvY2ssXHJcbiAgICAgIGJsb2NrcyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICB2YWx1ZVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBzdGF0ZTogRm9ybVN0YXRlID0ge1xyXG4gICAgICBpZCxcclxuICAgICAgb3B0aW9ucyxcclxuICAgICAgZm9ybSxcclxuICAgICAgc3RydWN0cyxcclxuICAgICAgZmllbGRzLFxyXG4gICAgICBibG9ja3MsXHJcbiAgICAgIHN1Ym1pc3Npb25FcnJvcnM6IGluaXRpYWxFcnJvcnMsXHJcbiAgICAgIG9uU3VibWlzc2lvbkVycm9yc0NoYW5nZTogbmV3IFN1YmplY3Q8Rm9ybVN1Ym1pc3Npb25FcnJvcnM+KCksXHJcbiAgICAgIG5hdmlnYXRpb25TdGFjazogW10sXHJcbiAgICAgIG9uTmF2aWdhdGlvbkNoYW5nZTogbmV3IFN1YmplY3Q8bnVtYmVyPigpLFxyXG4gICAgICBvblZhbHVlQ2hhbmdlOiBuZXcgU3ViamVjdDxGb3JtQ2hhbmdlPigpXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXSA9IHN0YXRlO1xyXG5cclxuICAgIHJldHVybiBzdGF0ZTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUZvcm0oZm9ybUlkOiBudW1iZXIsIHN0cnVjdDogc3RyaW5nLCBibG9jazogc3RyaW5nKTogRm9ybUdyb3VwIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbZm9ybUlkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBmaWVsZHMsIGJsb2NrcyB9ID0gdGhpcy5fY2FjaGVbZm9ybUlkXTtcclxuICAgIHJldHVybiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHN0cnVjdCwgYmxvY2ssIGJsb2NrcywgZmllbGRzKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShpZDogbnVtYmVyLCB2YWx1ZTogb2JqZWN0KSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBmb3JtIH0gPSB0aGlzLl9jYWNoZVtpZF07XHJcblxyXG4gICAgZm9ybS5wYXRjaFZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZShpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlIHRoaXMuX2NhY2hlW2lkXTtcclxuICB9XHJcblxyXG4gIGNsZWFyRXJyb3JzKGlkOiBudW1iZXIsIGZvcm1QYXRoPzogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZvcm1QYXRoKSB7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9jYWNoZVtpZF0uc3VibWlzc2lvbkVycm9yc1tmb3JtUGF0aF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9jYWNoZVtpZF0uc3VibWlzc2lvbkVycm9ycyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgc2V0RXJyb3JzKGlkOiBudW1iZXIsIGVycm9yczogRm9ybVN1Ym1pc3Npb25FcnJvcnMpIHtcclxuICAgIGlmICghdGhpcy5fY2FjaGVbaWRdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jYWNoZVtpZF0uc3VibWlzc2lvbkVycm9ycyA9IGVycm9ycztcclxuICAgIHRoaXMucHVzaFN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoaWQ6IG51bWJlciwgZm9ybVBhdGg6IHN0cmluZywgbmV3VmFsdWU6IGFueSwgZXZlbnQ6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY2FjaGVbaWRdO1xyXG4gICAgdGhpcy5jbGVhckVycm9ycyhpZCwgZm9ybVBhdGgpO1xyXG5cclxuICAgIGlmIChldmVudCAmJiBzdGF0ZS5vcHRpb25zLmNoYW5nZU5vdGlmaWNhdGlvblR5cGUgIT09IGV2ZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAoPFN1YmplY3Q8Rm9ybUNoYW5nZT4+c3RhdGUub25WYWx1ZUNoYW5nZSkubmV4dCh7XHJcbiAgICAgIGZpZWxkUGF0aDogZm9ybVBhdGgsXHJcbiAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcclxuICAgICAgZm9ybVZhbHVlOiBzdGF0ZS5mb3JtLnZhbHVlXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1c2hOYXZpZ2F0aW9uKGlkOiBudW1iZXIsIHN0cnVjdDogc3RyaW5nLCBibG9jazogc3RyaW5nLCBwYXRoOiBzdHJpbmcsIHBhcmVudFBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKCF0aGlzLl9jYWNoZVtpZF0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NhY2hlW2lkXS5uYXZpZ2F0aW9uU3RhY2sucHVzaCh7XHJcbiAgICAgIHN0cnVjdCxcclxuICAgICAgYmxvY2ssXHJcbiAgICAgIHBhdGgsXHJcbiAgICAgIHBhcmVudFBhdGhcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQpO1xyXG4gIH1cclxuXHJcbiAgcG9wTmF2aWdhdGlvbihpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2FjaGVbaWRdLm5hdmlnYXRpb25TdGFjay5wb3AoKTtcclxuXHJcbiAgICB0aGlzLnB1c2hOYXZpZ2F0aW9uQ2hhbmdlKGlkKTtcclxuICB9XHJcblxyXG4gIGNvbXBsZXRlTmF2aWdhdGlvbihpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NhY2hlW2lkXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb3BOYXZpZ2F0aW9uKGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcHVzaE5hdmlnYXRpb25DaGFuZ2UoaWQ6IG51bWJlciwgY2hpbGRJZD86IG51bWJlcikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9jYWNoZVtpZF07XHJcbiAgICAoPFN1YmplY3Q8bnVtYmVyPj5zdGF0ZS5vbk5hdmlnYXRpb25DaGFuZ2UpLm5leHQoY2hpbGRJZCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHB1c2hTdWJtaXNzaW9uRXJyb3JzQ2hhbmdlKGlkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5fY2FjaGVbaWRdO1xyXG4gICAgKDxTdWJqZWN0PEZvcm1TdWJtaXNzaW9uRXJyb3JzPj5zdGF0ZS5vblN1Ym1pc3Npb25FcnJvcnNDaGFuZ2UpLm5leHQoXHJcbiAgICAgIHN0YXRlLnN1Ym1pc3Npb25FcnJvcnNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFycmF5VG9NYXA8VD4oZ2V0S2V5OiBHZXRLZXlGdW5jdGlvbjxUPiwgYXJyYXk6IFRbXSkge1xyXG4gICAgcmV0dXJuIGFycmF5LnJlZHVjZTxNYXA8c3RyaW5nLCBUPj4oKGFjYywgY3VycmVudCkgPT4ge1xyXG4gICAgICBhY2NbZ2V0S2V5KGN1cnJlbnQpXSA9IGN1cnJlbnQ7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBuZXcgTWFwPHN0cmluZywgVD4oKSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIFZpZXdDaGlsZCxcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIsIElDb2xsZWN0aW9uQ29udHJvbCB9IGZyb20gJy4uL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgSVJlZmVyZW5jZUZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRIb3N0RGlyZWN0aXZlIH0gZnJvbSAnLi9jb21wb25lbnQtaG9zdC5kaXJlY3RpdmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWNvbGxlY3Rpb24tZmllbGQtaG9zdCcsXHJcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxuICBzdGF0ZTogRm9ybVN0YXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuY29udHJvbC5mb3JtSWQpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmNvbnRyb2wgJiYgIWNoYW5nZXMuY29udHJvbC5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xDb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBjb25zdCBwcm92aWRlck9wdGlvbnMgPSB0aGlzLnByb3ZpZGVyU2VydmljZS5nZXQoXHJcbiAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5wcm92aWRlclxyXG4gICAgKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuY29udHJvbC5sYXlvdXQpIHtcclxuICAgICAgY2FzZSAnaW5saW5lJzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLmlubGluZUNvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGFibGUnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMudGFibGVDb21wb25lbnQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgIGAke3RoaXMuY29udHJvbC5sYXlvdXR9IGxheW91dCBpcyBub3Qgc3VwcG9ydGVkLmAsXHJcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRyb2wuZmllbGQpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgY29udHJvbENvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXI+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbCA9IHtcclxuICAgICAgLi4udGhpcy5jb250cm9sLFxyXG4gICAgICBvbkFkZDogdGhpcy5vbkFkZFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmV2aW91c0NvbnRyb2wgPSBjb21wb25lbnRSZW5kZXJlci5jb250cm9sO1xyXG4gICAgY29tcG9uZW50UmVuZGVyZXIuY29udHJvbCA9IGNvbnRyb2w7XHJcblxyXG4gICAgY29uc3Qgb25Db21wb25lbnRDaGFuZ2UgPSAoPE9uQ2hhbmdlcz50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2UpLm5nT25DaGFuZ2VzO1xyXG5cclxuICAgIGlmIChvbkNvbXBvbmVudENoYW5nZSkge1xyXG4gICAgICBjb25zdCBjaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IHtcclxuICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c0NvbnRyb2wsXHJcbiAgICAgICAgY3VycmVudFZhbHVlOiBjb250cm9sLFxyXG4gICAgICAgIGZpcnN0Q2hhbmdlOiB0eXBlb2YgcHJldmlvdXNDb250cm9sID09PSAndW5kZWZpbmVkJyxcclxuICAgICAgICBpc0ZpcnN0Q2hhbmdlOiAoKSA9PiBjaGFuZ2UuZmlyc3RDaGFuZ2VcclxuICAgICAgfTtcclxuXHJcbiAgICAgIG9uQ29tcG9uZW50Q2hhbmdlLmNhbGwoY29tcG9uZW50UmVuZGVyZXIsIHsgY29udHJvbDogY2hhbmdlIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25BZGQgPSAoZSkgPT4ge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCByZWZlcmVuY2UgPSAoPElSZWZlcmVuY2VGaWVsZD50aGlzLmNvbnRyb2wuZmllbGQpLnJlZmVyZW5jZTtcclxuXHJcbiAgICBjb25zdCBmb3JtID0gdGhpcy5zdGF0ZVNlcnZpY2UuY3JlYXRlRm9ybSh0aGlzLmNvbnRyb2wuZm9ybUlkLCByZWZlcmVuY2Uuc3RydWN0LCByZWZlcmVuY2UuYmxvY2spO1xyXG4gICAgdGhpcy5jb250cm9sLnZhbHVlLnB1c2goZm9ybSk7XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNvbnRyb2wudmFsdWUuY29udHJvbHMuaW5kZXhPZihmb3JtKTtcclxuICAgIGNvbnN0IGNoaWxkUGF0aCA9IGAke3RoaXMuY29udHJvbC5mb3JtUGF0aH0uJHtpbmRleH1gO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbnRyb2wubGF5b3V0ID09PSAndGFibGUnKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnB1c2hOYXZpZ2F0aW9uKHRoaXMuY29udHJvbC5mb3JtSWQsIHJlZmVyZW5jZS5zdHJ1Y3QsIHJlZmVyZW5jZS5ibG9jaywgY2hpbGRQYXRoLCB0aGlzLmNvbnRyb2wuZm9ybVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29udHJvbC5vbkNoYW5nZShudWxsKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBPbkNoYW5nZXMsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBTaW1wbGVDaGFuZ2VcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIElGaWVsZCxcclxuICBJTGlzdEZpZWxkLFxyXG4gIElMaW5rZWRTdHJ1Y3RGaWVsZCxcclxuICBJTGlua2VkU3RydWN0RmllbGRSZWZlcmVuY2UsXHJcbiAgSUZpZWxkUmVmZXJlbmNlXHJcbn0gZnJvbSAnLi4vbW9kZWxzL3NjaGVtYSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5LCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29udHJvbFJlbmRlcmVyLFxyXG4gIElDb250cm9sLFxyXG4gIElTZWxlY3RDb250cm9sLFxyXG4gIElDb2xsZWN0aW9uQ29udHJvbFxyXG59IGZyb20gJy4uL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1maWVsZC1ob3N0LmNvbXBvbmVudCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWlucHV0LWZpZWxkLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8bmctdGVtcGxhdGUgZGVSZUNydWRDb21wb25lbnRIb3N0PjwvbmctdGVtcGxhdGU+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRGaWVsZEhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWZzOiBDb21wb25lbnRSZWY8YW55PltdID0gW107XHJcbiAgcHJpdmF0ZSBfc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF92YWx1ZU9uRm9jdXM6IGFueTtcclxuICBAVmlld0NoaWxkKENvbXBvbmVudEhvc3REaXJlY3RpdmUpIGNvbXBvbmVudEhvc3Q6IENvbXBvbmVudEhvc3REaXJlY3RpdmU7XHJcbiAgQElucHV0KCkgZm9ybUlkOiBudW1iZXI7XHJcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xyXG4gIEBJbnB1dCgpIHN0cnVjdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJsb2NrOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZmllbGQ6IElGaWVsZDtcclxuICBASW5wdXQoKSBwYXJlbnRGb3JtOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgQElucHV0KCkgcGFyZW50UGF0aDogc3RyaW5nO1xyXG4gIHN0YXRlOiBGb3JtU3RhdGU7XHJcbiAgZmllbGRSZWZlcmVuY2U6IElGaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHtcclxuICB9XHJcblxyXG4gIGdldCBmb3JtUGF0aCgpIHtcclxuICAgIGxldCBmb3JtUGF0aCA9IHRoaXMuZmllbGQubmFtZTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXJlbnRQYXRoKSB7XHJcbiAgICAgIGxldCBwYXJlbnRQYXRoID0gdGhpcy5wYXJlbnRQYXRoO1xyXG5cclxuICAgICAgaWYgKHRoaXMucGFyZW50Rm9ybSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJlbnRGb3JtLmNvbnRyb2xzLmluZGV4T2YodGhpcy5mb3JtKTtcclxuICAgICAgICBwYXJlbnRQYXRoICs9ICcuJyArIGluZGV4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3JtUGF0aCA9IGAke3BhcmVudFBhdGh9LiR7Zm9ybVBhdGh9YDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybVBhdGg7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlU2VydmljZS5nZXQodGhpcy5mb3JtSWQpO1xyXG5cclxuICAgIGNvbnN0IGZpZWxkUmVmZXJlbmNlID0gdGhpcy5zdGF0ZS5ibG9ja3NbYCR7dGhpcy5zdHJ1Y3R9LSR7dGhpcy5ibG9ja31gXS5maWVsZHMuZmluZChcclxuICAgICAgeCA9PiB4LmZpZWxkID09PSB0aGlzLmZpZWxkLm5hbWVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5maWVsZFJlZmVyZW5jZSA9IGZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICAgIHRoaXMuX3N1Ym1pc3Npb25FcnJvcnNDaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uU3VibWlzc2lvbkVycm9yc0NoYW5nZS5zdWJzY3JpYmUoXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLmZvcm0udmFsdWVDaGFuZ2VzLnN1YnNjcmliZShcclxuICAgICAgKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xyXG4gICAgICAgICAgdGhpcy5kZXN0cm95UmVmcygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fc3VibWlzc2lvbkVycm9yc0NoYW5nZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl9zdWJtaXNzaW9uRXJyb3JzQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fZm9ybUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVzdHJveVJlZnMoKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3lSZWZzKCkge1xyXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudFJlZnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZnMuZm9yRWFjaCh4ID0+IHguZGVzdHJveSgpKTtcclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmcyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdWxkUmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRSZWZlcmVuY2UgJiYgdGhpcy5maWVsZFJlZmVyZW5jZS5jb25kaXRpb24odGhpcy5mb3JtLnZhbHVlLCB0aGlzLnN0YXRlLmZvcm0ucm9vdC52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3lSZWZzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5maWVsZC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICBjYXNlICdpbnRlZ2VyJzpcclxuICAgICAgY2FzZSAnZGF0ZSc6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5pbnB1dENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm9vbGVhbic6XHJcbiAgICAgICAgY29udHJvbENvbXBvbmVudCA9IHByb3ZpZGVyT3B0aW9ucy5jaGVja2JveENvbXBvbmVudDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGlzdCc6XHJcbiAgICAgIGNhc2UgJ2ZvcmVpZ25LZXknOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBwcm92aWRlck9wdGlvbnMuc2VsZWN0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsaW5rZWRTdHJ1Y3QnOlxyXG4gICAgICAgIGNvbnRyb2xDb21wb25lbnQgPSBDb2xsZWN0aW9uRmllbGRIb3N0Q29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgJHt0aGlzLmZpZWxkLnR5cGV9IGNvbnRyb2wgaXMgbm90IHN1cHBvcnRlZC5gLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyQ29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBwcm92aWRlck9wdGlvbnMuY29udGFpbmVyQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xDb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXHJcbiAgICAgIGNvbnRyb2xDb21wb25lbnRcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgY29udHJvbENvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50RmFjdG9yeVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXJDb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcclxuICAgICAgY29udGFpbmVyQ29tcG9uZW50RmFjdG9yeSxcclxuICAgICAgMCxcclxuICAgICAgdW5kZWZpbmVkLFxyXG4gICAgICBbW2NvbnRyb2xDb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZnMucHVzaChjb250cm9sQ29tcG9uZW50UmVmLCBjb250YWluZXJDb21wb25lbnRSZWYpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAodGhpcy5zaG91bGRSZW5kZXIoKSAmJiAhdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1QYXRoID0gdGhpcy5mb3JtUGF0aDtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5mb3JtLnJvb3QuZ2V0KGZvcm1QYXRoKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sOiBJQ29udHJvbCA9IHtcclxuICAgICAgdmFsdWUsXHJcbiAgICAgIGZvcm1QYXRoLFxyXG4gICAgICBmaWVsZDogdGhpcy5maWVsZCxcclxuICAgICAgZm9ybUlkOiB0aGlzLmZvcm1JZCxcclxuICAgICAgc3VibWlzc2lvbkVycm9yczpcclxuICAgICAgICAodGhpcy5zdGF0ZS5zdWJtaXNzaW9uRXJyb3JzICYmXHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnN1Ym1pc3Npb25FcnJvcnNbZm9ybVBhdGhdKSB8fFxyXG4gICAgICAgIFtdLFxyXG4gICAgICBmb3JtOiB0aGlzLmZvcm0sXHJcbiAgICAgIHJlbmRlcmVyVHlwZTogdGhpcy5tYXBUeXBlKHRoaXMuZmllbGQudHlwZSksXHJcbiAgICAgIGh0bWxJZDogYCR7dGhpcy5mb3JtSWR9LSR7Zm9ybVBhdGh9YCxcclxuICAgICAgb25Gb2N1czogdGhpcy5vbkZvY3VzLFxyXG4gICAgICBvbkJsdXI6IHRoaXMub25CbHVyLFxyXG4gICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZVxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZmllbGQudHlwZSkge1xyXG4gICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgY2FzZSAnZm9yZWlnbktleSc6IHtcclxuICAgICAgICBjb25zdCBsaXN0RmllbGQgPSA8SUxpc3RGaWVsZD50aGlzLmZpZWxkO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RDb250cm9sID0gPElTZWxlY3RDb250cm9sPmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZpZWxkLnR5cGUgPT09ICdmb3JlaWduS2V5Jykge1xyXG4gICAgICAgICAgc2VsZWN0Q29udHJvbC5vcHRpb25zID0gKCkgPT4gW107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHNlbGVjdENvbnRyb2wub3B0aW9ucyA9ICgpID0+IGxpc3RGaWVsZC5vcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdsaW5rZWRTdHJ1Y3QnOiB7XHJcbiAgICAgICAgY29uc3QgY29sbGVjdGlvbkNvbnRyb2wgPSA8SUNvbGxlY3Rpb25Db250cm9sPmNvbnRyb2w7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmtlZFN0cnVjdEZpZWxkID0gPElMaW5rZWRTdHJ1Y3RGaWVsZD50aGlzLmZpZWxkO1xyXG4gICAgICAgIGNvbnN0IHsgcmVmZXJlbmNlIH0gPSBsaW5rZWRTdHJ1Y3RGaWVsZDtcclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tGaWVsZHMgPSB0aGlzLnN0YXRlLmJsb2Nrc1tgJHt0aGlzLnN0cnVjdH0tJHt0aGlzLmJsb2NrfWBdLmZpZWxkcztcclxuXHJcbiAgICAgICAgY29uc3QgeyBoaW50cyB9ID0gPElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZT5ibG9ja0ZpZWxkcy5maW5kKFxyXG4gICAgICAgICAgeCA9PiB4LmZpZWxkID09PSBsaW5rZWRTdHJ1Y3RGaWVsZC5uYW1lXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlQmxvY2sgPSAoaGludHMgJiYgaGludHMuYmxvY2spIHx8IHJlZmVyZW5jZS5ibG9jaztcclxuXHJcbiAgICAgICAgY29uc3QgZmllbGRSZWZlcmVuY2VzID0gPElMaW5rZWRTdHJ1Y3RGaWVsZFJlZmVyZW5jZVtdPnRoaXMuc3RhdGVcclxuICAgICAgICAgIC5ibG9ja3NbYCR7cmVmZXJlbmNlLnN0cnVjdH0tJHtyZWZlcmVuY2VCbG9ja31gXS5maWVsZHM7XHJcblxyXG4gICAgICAgIGNvbnN0IG5lc3RlZEZpZWxkcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGZpZWxkUmVmZXJlbmNlIG9mIGZpZWxkUmVmZXJlbmNlcykge1xyXG4gICAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnN0YXRlLmZpZWxkc1tgJHtyZWZlcmVuY2Uuc3RydWN0fS0ke2ZpZWxkUmVmZXJlbmNlLmZpZWxkfWBdO1xyXG4gICAgICAgICAgbmVzdGVkRmllbGRzLnB1c2goZmllbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmVzdGVkVmFsdWVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbmVzdGVkVmFsdWUgb2YgY29sbGVjdGlvbkNvbnRyb2wudmFsdWUuY29udHJvbHMpIHtcclxuICAgICAgICAgIG5lc3RlZFZhbHVlcy5wdXNoKDxGb3JtR3JvdXA+bmVzdGVkVmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wuc3RhbXAgPSB7XHJcbiAgICAgICAgICB0ZXh0OiBjb250cm9sLmZpZWxkLmxhYmVsLFxyXG4gICAgICAgICAgaGVhZGVyU2l6ZTogdGhpcy5zdGF0ZS5vcHRpb25zLmhlYWRlclNpemVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5jYW5BZGQgPSAhbGlua2VkU3RydWN0RmllbGQubWF4SW5zdGFuY2VzIHx8IG5lc3RlZFZhbHVlcy5sZW5ndGggPCBsaW5rZWRTdHJ1Y3RGaWVsZC5tYXhJbnN0YW5jZXM7XHJcbiAgICAgICAgY29sbGVjdGlvbkNvbnRyb2wubmVzdGVkVmFsdWVzID0gbmVzdGVkVmFsdWVzO1xyXG4gICAgICAgIGNvbGxlY3Rpb25Db250cm9sLm5lc3RlZEZpZWxkcyA9IG5lc3RlZEZpZWxkcztcclxuICAgICAgICBjb2xsZWN0aW9uQ29udHJvbC5sYXlvdXQgPSAoaGludHMgJiYgaGludHMubGF5b3V0KSB8fCAnaW5saW5lJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgY29tcG9uZW50UmVmIG9mIHRoaXMuX2NvbXBvbmVudFJlZnMpIHtcclxuICAgICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8Q29udHJvbFJlbmRlcmVyPmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuXHJcbiAgICAgIGNvbnN0IHByZXZpb3VzQ29udHJvbCA9IGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2w7XHJcbiAgICAgIGNvbXBvbmVudFJlbmRlcmVyLmNvbnRyb2wgPSBjb250cm9sO1xyXG5cclxuICAgICAgY29uc3Qgb25Db21wb25lbnRDaGFuZ2UgPSAoPE9uQ2hhbmdlcz5jb21wb25lbnRSZWYuaW5zdGFuY2UpLm5nT25DaGFuZ2VzO1xyXG4gICAgICBpZiAob25Db21wb25lbnRDaGFuZ2UpIHtcclxuICAgICAgICBjb25zdCBjaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IHtcclxuICAgICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzQ29udHJvbCxcclxuICAgICAgICAgIGN1cnJlbnRWYWx1ZTogY29udHJvbCxcclxuICAgICAgICAgIGZpcnN0Q2hhbmdlOiB0eXBlb2YgcHJldmlvdXNDb250cm9sID09PSAndW5kZWZpbmVkJyxcclxuICAgICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG9uQ29tcG9uZW50Q2hhbmdlLmNhbGwoY29tcG9uZW50UmVuZGVyZXIsIHsgY29udHJvbDogY2hhbmdlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5fdmFsdWVPbkZvY3VzID0gdGhpcy5mb3JtLnJvb3QuZ2V0KHRoaXMuZm9ybVBhdGgpLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgb25CbHVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmZvcm0ucm9vdC5nZXQodGhpcy5mb3JtUGF0aCkudmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX3ZhbHVlT25Gb2N1cyAhPT0gbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uub25DaGFuZ2UodGhpcy5mb3JtSWQsIHRoaXMuZm9ybVBhdGgsIG5ld1ZhbHVlLCAnYmx1cicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UgPSAoZTogYW55KSA9PiB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZm9ybS5yb290LmdldCh0aGlzLmZvcm1QYXRoKS52YWx1ZTtcclxuICAgIHRoaXMuc3RhdGVTZXJ2aWNlLm9uQ2hhbmdlKHRoaXMuZm9ybUlkLCB0aGlzLmZvcm1QYXRoLCBuZXdWYWx1ZSwgZSA/ICdjaGFuZ2UnIDogbnVsbCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1hcFR5cGUodHlwZTogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgY2FzZSAnaW50ZWdlcic6XHJcbiAgICAgICAgcmV0dXJuICdudW1iZXInO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgQnV0dG9uUmVuZGVyZXIgfSBmcm9tICcuLi9yZW5kZXJlcnMvYnV0dG9uLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudEhvc3REaXJlY3RpdmUgfSBmcm9tICcuL2NvbXBvbmVudC1ob3N0LmRpcmVjdGl2ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYnV0dG9uLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLXRlbXBsYXRlIGRlUmVDcnVkQ29tcG9uZW50SG9zdD48L25nLXRlbXBsYXRlPmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvbkhvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9jb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xyXG4gIEBWaWV3Q2hpbGQoQ29tcG9uZW50SG9zdERpcmVjdGl2ZSkgY29tcG9uZW50SG9zdDogQ29tcG9uZW50SG9zdERpcmVjdGl2ZTtcclxuICBASW5wdXQoKSBmb3JtSWQ6IG51bWJlcjtcclxuICBASW5wdXQoKSB0eXBlOiAnYnV0dG9uJyB8ICdzdWJtaXQnIHwgJ2NhbmNlbCc7XHJcbiAgQElucHV0KCkgZXh0cmFDbGFzc2VzOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIGNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuc3RhdGVTZXJ2aWNlLmdldCh0aGlzLmZvcm1JZCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJvdmlkZXJPcHRpb25zID0gdGhpcy5wcm92aWRlclNlcnZpY2UuZ2V0KFxyXG4gICAgICB0aGlzLnN0YXRlLm9wdGlvbnMucHJvdmlkZXJcclxuICAgICk7XHJcblxyXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lclJlZiA9IHRoaXMuY29tcG9uZW50SG9zdC52aWV3Q29udGFpbmVyUmVmO1xyXG4gICAgdmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcclxuICAgICAgcHJvdmlkZXJPcHRpb25zLmJ1dHRvbkNvbXBvbmVudFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jb21wb25lbnRSZWYgPSB2aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlSW5wdXRzKCkge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHtcclxuICAgICAgb3B0aW9uczogeyBzdHJ1Y3QsIHN1Ym1pdEJ1dHRvblN0eWxlLCBjYW5jZWxCdXR0b25TdHlsZSB9LFxyXG4gICAgICBzdHJ1Y3RzXHJcbiAgICB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBjb25zdCBpc1N1Ym1pdCA9IHRoaXMudHlwZSA9PT0gJ3N1Ym1pdCc7XHJcblxyXG4gICAgbGV0IHN0eWxlID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgIHN0eWxlID0gc3VibWl0QnV0dG9uU3R5bGU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NhbmNlbCc6XHJcbiAgICAgICAgc3R5bGUgPSBjYW5jZWxCdXR0b25TdHlsZTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGV4dCA9IChzdHlsZSAmJiBzdHlsZS50ZXh0KSB8fCB0aGlzLnRleHQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBpc1N1Ym1pdCAmJlxyXG4gICAgICBzdWJtaXRCdXR0b25TdHlsZSAmJlxyXG4gICAgICBzdWJtaXRCdXR0b25TdHlsZS5hcHBlbmRTY2hlbWFMYWJlbFxyXG4gICAgKSB7XHJcbiAgICAgIHRleHQgPSBgJHt0ZXh0fSAke3N0cnVjdHNbc3RydWN0XS5sYWJlbH1gO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGV4dHJhQ2xhc3NlcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLnN0YXRlLm9wdGlvbnMuZXh0cmFCdXR0b25DbGFzc2VzKSB7XHJcbiAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuc3RhdGUub3B0aW9ucy5leHRyYUJ1dHRvbkNsYXNzZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmV4dHJhQ2xhc3Nlcykge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMuZXh0cmFDbGFzc2VzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuZXh0cmFDbGFzc2VzLnNwbGl0KCcgJykpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGV4dHJhQ2xhc3Nlcy5wdXNoKC4uLnRoaXMuZXh0cmFDbGFzc2VzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvbXBvbmVudFJlbmRlcmVyID0gPEJ1dHRvblJlbmRlcmVyPnRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuICAgIGNvbXBvbmVudFJlbmRlcmVyLmJ1dHRvbiA9IHtcclxuICAgICAgdGV4dCxcclxuICAgICAgZXh0cmFDbGFzc2VzLFxyXG4gICAgICB0eXBlOiBpc1N1Ym1pdCA/ICdzdWJtaXQnIDogJ2J1dHRvbicsXHJcbiAgICAgIGRpc2FibGVkOiB0aGlzLmRpc2FibGVkLFxyXG4gICAgICBvbkNsaWNrOiB0aGlzLm9uQ2xpY2ssXHJcbiAgICAgIGNsYXNzOiAoc3R5bGUgJiYgc3R5bGUuY2xhc3MpIHx8IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uQ2xpY2sgPSAoZSkgPT4ge1xyXG4gICAgdGhpcy5jbGljay5lbWl0KGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFNpbXBsZUNoYW5nZVxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL3Byb3ZpZGVyL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJRmllbGQsIElGaWVsZFJlZmVyZW5jZSwgSVN0YW1wRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IFN0YW1wUmVuZGVyZXIsIElTdGFtcCB9IGZyb20gJy4uL3JlbmRlcmVycy9zdGFtcC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZSB9IGZyb20gJy4uL21vZGVscy9mb3JtLXN0YXRlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1zdGFtcC1maWVsZC1ob3N0JyxcclxuICB0ZW1wbGF0ZTogYDxuZy10ZW1wbGF0ZSBkZVJlQ3J1ZENvbXBvbmVudEhvc3Q+PC9uZy10ZW1wbGF0ZT5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGFtcEZpZWxkSG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XHJcbiAgQFZpZXdDaGlsZChDb21wb25lbnRIb3N0RGlyZWN0aXZlKSBjb21wb25lbnRIb3N0OiBDb21wb25lbnRIb3N0RGlyZWN0aXZlO1xyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcclxuICBASW5wdXQoKSBzdHJ1Y3Q6IHN0cmluZztcclxuICBASW5wdXQoKSBibG9jazogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZpZWxkOiBJRmllbGQ7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuICBmaWVsZFJlZmVyZW5jZTogSUZpZWxkUmVmZXJlbmNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3RhdGVTZXJ2aWNlOiBGb3JtU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgcHJvdmlkZXJTZXJ2aWNlOiBEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuXHJcbiAgICBjb25zdCBmaWVsZFJlZmVyZW5jZSA9IHRoaXMuc3RhdGUuYmxvY2tzW1xyXG4gICAgICBgJHt0aGlzLnN0cnVjdH0tJHt0aGlzLmJsb2NrfWBcclxuICAgIF0uZmllbGRzLmZpbmQoeCA9PiB4LmZpZWxkID09PSB0aGlzLmZpZWxkLm5hbWUpO1xyXG5cclxuICAgIHRoaXMuZmllbGRSZWZlcmVuY2UgPSBmaWVsZFJlZmVyZW5jZTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKGNoYW5nZXMuZm9ybUlkICYmICFjaGFuZ2VzLmZvcm1JZC5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgdGhpcy5uZ09uRGVzdHJveSgpO1xyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUlucHV0cygpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG91bGRSZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFJlZmVyZW5jZS5jb25kaXRpb24oXHJcbiAgICAgIHRoaXMuZm9ybS52YWx1ZSxcclxuICAgICAgdGhpcy5zdGF0ZS5mb3JtLnJvb3QudmFsdWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbENvbXBvbmVudDogYW55O1xyXG5cclxuICAgIGNvbnN0IHByb3ZpZGVyT3B0aW9ucyA9IHRoaXMucHJvdmlkZXJTZXJ2aWNlLmdldChcclxuICAgICAgdGhpcy5zdGF0ZS5vcHRpb25zLnByb3ZpZGVyXHJcbiAgICApO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5maWVsZC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3N0YW1wJzpcclxuICAgICAgICBjb250cm9sQ29tcG9uZW50ID0gcHJvdmlkZXJPcHRpb25zLnN0YW1wQ29tcG9uZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBgJHt0aGlzLmZpZWxkLnR5cGV9IGNvbnRyb2wgaXMgbm90IHN1cHBvcnRlZC5gLFxyXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5maWVsZClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5jb21wb25lbnRIb3N0LnZpZXdDb250YWluZXJSZWY7XHJcbiAgICB2aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICBjb250cm9sQ29tcG9uZW50XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuX2NvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlSW5wdXRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVJbnB1dHMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcG9uZW50UmVuZGVyZXIgPSA8U3RhbXBSZW5kZXJlcj50aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgICBjb25zdCBzdGFtcEZpZWxkID0gPElTdGFtcEZpZWxkPnRoaXMuZmllbGQ7XHJcblxyXG4gICAgY29uc3Qgc3RhbXA6IElTdGFtcCA9IHtcclxuICAgICAgdGV4dDogc3RhbXBGaWVsZC5sYWJlbCxcclxuICAgICAgaGVhZGVyU2l6ZTogdGhpcy5zdGF0ZS5vcHRpb25zLmhlYWRlclNpemVcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHN0YW1wRmllbGQuaGludHMpIHtcclxuICAgICAgaWYgKHN0YW1wRmllbGQuaGludHMuaGVhZGVyU2l6ZSkge1xyXG4gICAgICAgIHN0YW1wLmhlYWRlclNpemUgPSBzdGFtcEZpZWxkLmhpbnRzLmhlYWRlclNpemU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzdGFtcEZpZWxkLmhpbnRzLmRpc3BsYXlDbGFzc05hbWVzKSB7XHJcbiAgICAgICAgc3RhbXAuY2xhc3NlcyA9IHN0YW1wRmllbGQuaGludHMuZGlzcGxheUNsYXNzTmFtZXM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmV2aW91c1N0YW1wID0gY29tcG9uZW50UmVuZGVyZXIuc3RhbXA7XHJcbiAgICBjb21wb25lbnRSZW5kZXJlci5zdGFtcCA9IHN0YW1wO1xyXG5cclxuICAgIGNvbnN0IG9uQ29tcG9uZW50Q2hhbmdlID0gKDxPbkNoYW5nZXM+dGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlKVxyXG4gICAgICAubmdPbkNoYW5nZXM7XHJcblxyXG4gICAgaWYgKG9uQ29tcG9uZW50Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGNoYW5nZTogU2ltcGxlQ2hhbmdlID0ge1xyXG4gICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzU3RhbXAsXHJcbiAgICAgICAgY3VycmVudFZhbHVlOiBzdGFtcCxcclxuICAgICAgICBmaXJzdENoYW5nZTogdHlwZW9mIHByZXZpb3VzU3RhbXAgPT09ICd1bmRlZmluZWQnLFxyXG4gICAgICAgIGlzRmlyc3RDaGFuZ2U6ICgpID0+IGNoYW5nZS5maXJzdENoYW5nZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgb25Db21wb25lbnRDaGFuZ2UuY2FsbChjb21wb25lbnRSZW5kZXJlciwgeyBjb250cm9sOiBjaGFuZ2UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJRmllbGQgfSBmcm9tICcuLi8uLi9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Zvcm0tc3RhdGUnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS1zdGF0ZS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1mb3JtLWhvc3QnLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCI+XHJcbiAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZmllbGQudHlwZVwiPlxyXG4gICAgPGRlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdFxyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3N0YW1wJ1wiXHJcbiAgICAgIFtmb3JtSWRdPVwiZm9ybUlkXCJcclxuICAgICAgW2Zvcm1dPVwiZm9ybVwiXHJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiXHJcbiAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtc3RhbXAtZmllbGQtaG9zdD5cclxuICAgIDxkZS1yZS1jcnVkLWlucHV0LWZpZWxkLWhvc3RcclxuICAgICAgKm5nU3dpdGNoRGVmYXVsdFxyXG4gICAgICBbZm9ybUlkXT1cImZvcm1JZFwiXHJcbiAgICAgIFtmb3JtXT1cImZvcm1cIlxyXG4gICAgICBbcGFyZW50UGF0aF09XCJwYXJlbnRQYXRoXCJcclxuICAgICAgW3BhcmVudEZvcm1dPVwicGFyZW50Rm9ybVwiXHJcbiAgICAgIFtmaWVsZF09XCJmaWVsZFwiXHJcbiAgICAgIFtzdHJ1Y3RdPVwic3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtaW5wdXQtZmllbGQtaG9zdD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcm1Ib3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgX3N0cnVjdDogc3RyaW5nO1xyXG4gIHByaXZhdGUgX2Jsb2NrOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGZvcm1JZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcclxuICBASW5wdXQoKSBmaWVsZHM6IElGaWVsZFtdO1xyXG4gIEBJbnB1dCgpIHBhcmVudEZvcm06IEFic3RyYWN0Q29udHJvbDtcclxuICBASW5wdXQoKSBwYXJlbnRQYXRoOiBzdHJpbmc7XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgZ2V0IHN0cnVjdCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9zdHJ1Y3QgfHwgdGhpcy5zdGF0ZS5vcHRpb25zLnN0cnVjdDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IHN0cnVjdCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9zdHJ1Y3QgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBibG9jaygpIHtcclxuICAgIHJldHVybiB0aGlzLl9ibG9jayB8fCB0aGlzLnN0YXRlLm9wdGlvbnMuYmxvY2s7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBibG9jayh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9ibG9jayA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuZ2V0KHRoaXMuZm9ybUlkKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLmZvcm1JZCAmJiAhY2hhbmdlcy5mb3JtSWQuaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgIHRoaXMubmdPbkluaXQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50SG9zdERpcmVjdGl2ZSB9IGZyb20gJy4vaG9zdHMvY29tcG9uZW50LWhvc3QuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSW5wdXRGaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2hvc3RzL2lucHV0LWZpZWxkLWhvc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQnV0dG9uSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvYnV0dG9uLWhvc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9mb3JtLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEZvcm1TdGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Zvcm0tc3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQgfSBmcm9tICcuL2hvc3RzL2NvbGxlY3Rpb24tZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdGFtcEZpZWxkSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvc3RhbXAtZmllbGQtaG9zdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBGb3JtSG9zdENvbXBvbmVudCB9IGZyb20gJy4vaG9zdHMvZm9ybS1ob3N0L2Zvcm0taG9zdC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIENvbXBvbmVudEhvc3REaXJlY3RpdmUsXHJcbiAgICBJbnB1dEZpZWxkSG9zdENvbXBvbmVudCxcclxuICAgIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50LFxyXG4gICAgQnV0dG9uSG9zdENvbXBvbmVudCxcclxuICAgIENvbGxlY3Rpb25GaWVsZEhvc3RDb21wb25lbnQsXHJcbiAgICBGb3JtSG9zdENvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbRm9ybVN0YXRlU2VydmljZSwgRm9ybUJ1aWxkZXJTZXJ2aWNlXSxcclxuICBleHBvcnRzOiBbSW5wdXRGaWVsZEhvc3RDb21wb25lbnQsIFN0YW1wRmllbGRIb3N0Q29tcG9uZW50LCBCdXR0b25Ib3N0Q29tcG9uZW50LCBGb3JtSG9zdENvbXBvbmVudF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQ29sbGVjdGlvbkZpZWxkSG9zdENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkQ29yZU1vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGb3JtU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9mb3JtLXN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZE9wdGlvbnMgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9vcHRpb25zJztcclxuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvc2NoZW1hJztcclxuaW1wb3J0IHsgRm9ybVN1Ym1pc3Npb24sIEZvcm1TdWJtaXNzaW9uRXJyb3JzIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1zdWJtaXNzaW9uJztcclxuaW1wb3J0IHsgRm9ybUNoYW5nZSB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL2Zvcm0tY2hhbmdlJztcclxuaW1wb3J0IHsgRm9ybVN0YXRlIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvZm9ybS1zdGF0ZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8Zm9ybSAqbmdJZj1cInN0YXRlLmZvcm1cIiBbZm9ybUdyb3VwXT1cInN0YXRlLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1mb3JtLWhvc3QgW2Zvcm1JZF09XCJzdGF0ZS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtXT1cImZvcm1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3RydWN0XT1cInN0cnVjdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtibG9ja109XCJibG9ja1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRQYXRoXT1cInBhcmVudFBhdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcGFyZW50Rm9ybV09XCJwYXJlbnRGb3JtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZpZWxkc109XCJmaWVsZHNcIj5cclxuICA8L2RlLXJlLWNydWQtZm9ybS1ob3N0PlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0IHR5cGU9XCJzdWJtaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtmb3JtSWRdPVwic3RhdGUuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhc3VibWl0RW5hYmxlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dD1cIlN1Ym1pdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uU3VibWl0KCRldmVudClcIj5cclxuICA8L2RlLXJlLWNydWQtYnV0dG9uLWhvc3Q+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3QgKm5nSWY9XCJjYW5jZWxWaXNpYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2FuY2VsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUlkXT1cInN0YXRlLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIWNhbmNlbEVuYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ9XCJDYW5jZWxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgkZXZlbnQpXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJ1dHRvbi1ob3N0PlxyXG48L2Zvcm0+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9jYW5jZWxWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBvcHRpb25zOiBEZVJlQ3J1ZE9wdGlvbnM7XHJcbiAgQElucHV0KCkgdmFsdWU6IG9iamVjdDtcclxuICBASW5wdXQoKSBlcnJvcnM6IEZvcm1TdWJtaXNzaW9uRXJyb3JzO1xyXG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybUNoYW5nZT4oKTtcclxuICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxGb3JtU3VibWlzc2lvbj4oKTtcclxuICBAT3V0cHV0KCkgY2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGZpZWxkczogSUZpZWxkW107XHJcbiAgc3RhdGU6IEZvcm1TdGF0ZTtcclxuICBzdWJtaXR0aW5nOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0YXRlU2VydmljZTogRm9ybVN0YXRlU2VydmljZSkge31cclxuXHJcbiAgZ2V0IGNhbmNlbFZpc2libGUoKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLnN0YXRlLm5hdmlnYXRpb25TdGFjay5sZW5ndGggfHwgdGhpcy5fY2FuY2VsVmlzaWJsZTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGNhbmNlbFZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2NhbmNlbFZpc2libGUgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBzdWJtaXRFbmFibGVkKCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnN1Ym1pdHRpbmcgJiYgdGhpcy5mb3JtLnZhbGlkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbmNlbEVuYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMuc3VibWl0dGluZztcclxuICB9XHJcblxyXG4gIGdldCBzdHJ1Y3QoKSB7XHJcbiAgICBjb25zdCB7IG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IG5hdmlnYXRpb25TdGFja0NvdW50ID0gbmF2aWdhdGlvblN0YWNrLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gbmF2aWdhdGlvblN0YWNrQ291bnRcclxuICAgICAgPyBuYXZpZ2F0aW9uU3RhY2tbbmF2aWdhdGlvblN0YWNrQ291bnQgLSAxXS5zdHJ1Y3RcclxuICAgICAgOiB0aGlzLnN0YXRlLm9wdGlvbnMuc3RydWN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGJsb2NrKCkge1xyXG4gICAgY29uc3QgeyBuYXZpZ2F0aW9uU3RhY2sgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCBuYXZpZ2F0aW9uU3RhY2tDb3VudCA9IG5hdmlnYXRpb25TdGFjay5sZW5ndGg7XHJcblxyXG4gICAgcmV0dXJuIG5hdmlnYXRpb25TdGFja0NvdW50XHJcbiAgICAgID8gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0uYmxvY2tcclxuICAgICAgOiB0aGlzLnN0YXRlLm9wdGlvbnMuYmxvY2s7XHJcbiAgfVxyXG5cclxuICBnZXQgZm9ybSgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IHRoaXMuc3RhdGUuZm9ybS5nZXQobmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGF0aClcclxuICAgICAgOiB0aGlzLnN0YXRlLmZvcm07XHJcbiAgfVxyXG5cclxuICBnZXQgcGFyZW50UGF0aCgpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IG5hdmlnYXRpb25TdGFja1tuYXZpZ2F0aW9uU3RhY2tDb3VudCAtIDFdLnBhcmVudFBhdGhcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBhcmVudEZvcm0oKTogKEFic3RyYWN0Q29udHJvbCB8IG51bGwpIHtcclxuICAgIGNvbnN0IHsgbmF2aWdhdGlvblN0YWNrIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgY29uc3QgbmF2aWdhdGlvblN0YWNrQ291bnQgPSBuYXZpZ2F0aW9uU3RhY2subGVuZ3RoO1xyXG5cclxuICAgIHJldHVybiBuYXZpZ2F0aW9uU3RhY2tDb3VudFxyXG4gICAgICA/IHRoaXMuc3RhdGUuZm9ybS5nZXQobmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFja0NvdW50IC0gMV0ucGFyZW50UGF0aClcclxuICAgICAgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZVNlcnZpY2UuY3JlYXRlKHRoaXMub3B0aW9ucywgdGhpcy52YWx1ZSwgdGhpcy5lcnJvcnMpO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICB0aGlzLl9uYXZpZ2F0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy5zdGF0ZS5vbk5hdmlnYXRpb25DaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24gPSB0aGlzLnN0YXRlLm9uVmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKChjaGFuZ2UpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KGNoYW5nZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzLnZhbHVlICYmICFjaGFuZ2VzLnZhbHVlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLnVwZGF0ZSh0aGlzLnN0YXRlLmlkLCBjaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYW5nZXMuZXJyb3JzICYmICFjaGFuZ2VzLmVycm9ycy5maXJzdENoYW5nZSkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5zZXRFcnJvcnModGhpcy5zdGF0ZS5pZCwgY2hhbmdlcy5lcnJvcnMuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX25hdmlnYXRpb25DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fbmF2aWdhdGlvbkNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9mb3JtQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2Zvcm1DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlU2VydmljZS5yZW1vdmUodGhpcy5zdGF0ZS5pZCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCB7IG9wdGlvbnMsIG5hdmlnYXRpb25TdGFjayB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBsZXQgc3RydWN0O1xyXG4gICAgbGV0IGJsb2NrO1xyXG5cclxuICAgIGNvbnN0IGNoaWxkID0gbmF2aWdhdGlvblN0YWNrW25hdmlnYXRpb25TdGFjay5sZW5ndGggLSAxXTtcclxuICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAoeyBzdHJ1Y3QsIGJsb2NrIH0gPSBjaGlsZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAoeyBzdHJ1Y3QsIGJsb2NrIH0gPSBvcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBibG9ja0ZpZWxkcyA9IHRoaXMuZ2V0QmxvY2tGaWVsZHMoc3RydWN0LCBibG9jayk7XHJcblxyXG4gICAgdGhpcy5maWVsZHMgPSBibG9ja0ZpZWxkcztcclxuICB9XHJcblxyXG4gIGdldEJsb2NrRmllbGRzKHN0cnVjdDogc3RyaW5nLCBibG9ja05hbWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgeyBibG9ja3MsIGZpZWxkcyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmICghYmxvY2tzIHx8ICFmaWVsZHMpIHtcclxuICAgICAgIC8vIFRPRE86IExvZyBlcnJvclxyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmxvY2sgPSBibG9ja3NbYCR7c3RydWN0fS0ke2Jsb2NrTmFtZX1gXTtcclxuXHJcbiAgICBpZiAoIWJsb2NrKSB7XHJcbiAgICAgIC8vIFRPRE86IExvZyBlcnJvclxyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVmZXJlbmNlcyA9IGJsb2NrLmZpZWxkcztcclxuXHJcbiAgICBjb25zdCBibG9ja0ZpZWxkcyA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcmVmZXJlbmNlIG9mIHJlZmVyZW5jZXMpIHtcclxuICAgICAgYmxvY2tGaWVsZHMucHVzaChmaWVsZHNbYCR7c3RydWN0fS0ke3JlZmVyZW5jZS5maWVsZH1gXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJsb2NrRmllbGRzO1xyXG4gIH1cclxuXHJcbiAgb25DYW5jZWwoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY2FuY2VsRW5hYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUubmF2aWdhdGlvblN0YWNrLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnN0YXRlU2VydmljZS5wb3BOYXZpZ2F0aW9uKHRoaXMuc3RhdGUuaWQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYW5jZWwuZW1pdCgpO1xyXG4gICAgdGhpcy5zdGF0ZS5mb3JtLnJlc2V0KCk7XHJcbiAgfVxyXG5cclxuICBvblN1Ym1pdChlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5zdWJtaXRFbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZS5uYXZpZ2F0aW9uU3RhY2subGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuc3RhdGVTZXJ2aWNlLmNvbXBsZXRlTmF2aWdhdGlvbih0aGlzLnN0YXRlLmlkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VibWl0dGluZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5zdWJtaXQuZW1pdCh7XHJcbiAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLmZvcm0udmFsdWUsXHJcbiAgICAgIG9uQ29tcGxldGU6IChlcnJvcnMpID0+IHtcclxuICAgICAgICBpZiAoIWVycm9ycykge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVNlcnZpY2UuY2xlYXJFcnJvcnModGhpcy5zdGF0ZS5pZCk7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmZvcm0ucmVzZXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZVNlcnZpY2Uuc2V0RXJyb3JzKHRoaXMuc3RhdGUuaWQsIGVycm9ycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN1Ym1pdHRpbmcgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERlUmVDcnVkQ29yZU1vZHVsZSB9IGZyb20gJy4uL2NvcmUvY29yZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtL2Zvcm0uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRGVSZUNydWRDb3JlTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBGb3JtQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbRm9ybUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERlUmVDcnVkRm9ybXNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IElDb250cm9sIH0gZnJvbSAnLi9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkVycm9ySGVscGVyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfZXJyb3JTb3J0ID0gWydyZXF1aXJlZCddO1xyXG5cclxuICBwcml2YXRlIHN0YXRpYyBnZXRGb3JtQ29udHJvbElmRXJyb3JGb3VuZChjb250cm9sOiBJQ29udHJvbCkge1xyXG4gICAgY29uc3QgZm9ybUNvbnRyb2wgPSBjb250cm9sLmZvcm0uZ2V0KGNvbnRyb2wuZmllbGQubmFtZSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAoIWZvcm1Db250cm9sLmVycm9ycyB8fCAhZm9ybUNvbnRyb2wudG91Y2hlZCkgJiZcclxuICAgICAgIWNvbnRyb2wuc3VibWlzc2lvbkVycm9ycy5sZW5ndGhcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUNvbnRyb2w7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgaGFzRXJyb3IoY29udHJvbDogSUNvbnRyb2wpIHtcclxuICAgIHJldHVybiAhIXRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0RXJyb3JzKGNvbnRyb2w6IElDb250cm9sKSB7XHJcbiAgICBjb25zdCBmb3JtQ29udHJvbCA9IHRoaXMuZ2V0Rm9ybUNvbnRyb2xJZkVycm9yRm91bmQoY29udHJvbCk7XHJcbiAgICBpZiAoIWZvcm1Db250cm9sKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNvcnRlZEVycm9ycyA9IFtdO1xyXG4gICAgY29uc3QgdW5zb3J0ZWRFcnJvcnMgPSBbXTtcclxuXHJcbiAgICBpZiAoZm9ybUNvbnRyb2wuZXJyb3JzICYmIGZvcm1Db250cm9sLnRvdWNoZWQpIHtcclxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZm9ybUNvbnRyb2wuZXJyb3JzKSkge1xyXG4gICAgICAgIGNvbnN0IHNvcnQgPSB0aGlzLl9lcnJvclNvcnRba2V5XTtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGZvcm1Db250cm9sLmVycm9yc1trZXldO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHNvcnQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICB1bnNvcnRlZEVycm9ycy5wdXNoKHsga2V5LCBtZXRhZGF0YSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc29ydGVkRXJyb3JzLnB1c2goeyBrZXksIG1ldGFkYXRhLCBzb3J0IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0ZWRFcnJvcnNcclxuICAgICAgLnNvcnQoeCA9PiB4LnNvcnQpXHJcbiAgICAgIC5jb25jYXQodW5zb3J0ZWRFcnJvcnMpXHJcbiAgICAgIC5tYXAodGhpcy5nZXRFcnJvck1lc3NhZ2UpXHJcbiAgICAgIC5jb25jYXQoY29udHJvbC5zdWJtaXNzaW9uRXJyb3JzKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRFcnJvck1lc3NhZ2UoZXJyb3I6IHsga2V5OiBzdHJpbmc7IG1ldGFkYXRhOiBhbnkgfSkge1xyXG4gICAgc3dpdGNoIChlcnJvci5rZXkpIHtcclxuICAgICAgY2FzZSAncmVxdWlyZWQnOlxyXG4gICAgICAgIHJldHVybiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZC4nO1xyXG4gICAgICBjYXNlICdtaW5sZW5ndGgnOlxyXG4gICAgICAgIHJldHVybiBgVGhpcyBmaWVsZCBtdXN0IGhhdmUgYXQgbGVhc3QgJHtcclxuICAgICAgICAgIGVycm9yLm1ldGFkYXRhLnJlcXVpcmVkTGVuZ3RoXHJcbiAgICAgICAgfSBjaGFyYWN0ZXJzLmA7XHJcbiAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgcmV0dXJuIGBUaGlzIGZpZWxkIGNhbiBub3QgZXhjZWVkICR7XHJcbiAgICAgICAgICBlcnJvci5tZXRhZGF0YS5yZXF1aXJlZExlbmd0aFxyXG4gICAgICAgIH0gY2hhcmFjdGVycy5gO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBgVmFsaWRhdGlvbiBmYWlsZWQgd2l0aCBlcnJvcjogJHtlcnJvcn1gO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbkVycm9ySGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS92YWxpZGF0aW9uLWVycm9yLWhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cImdldENsYXNzZXMoKVwiPlxyXG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9kaXY+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb250cm9sO1xyXG5cclxuICBnZXRDbGFzc2VzKCkge1xyXG4gICAgY29uc3QgaGFzRXJyb3IgPSBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuaGFzRXJyb3IodGhpcy5jb250cm9sKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAnaGFzLWVycm9yJzogaGFzRXJyb3IsXHJcbiAgICAgICdoYXMtZmVlZGJhY2snOiBoYXNFcnJvclxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL3Byb3ZpZGVyLnNlcnZpY2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFtEZVJlQ3J1ZFByb3ZpZGVyU2VydmljZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVSZUNydWRQcm92aWRlck1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSUNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWlucHV0LXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJjb250cm9sLmZvcm1cIj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWxhYmVsLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlcj5cclxuICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICBbdHlwZV09XCJjb250cm9sLnJlbmRlcmVyVHlwZVwiXHJcbiAgICAgICAgIFtpZF09XCJjb250cm9sLmh0bWxJZFwiXHJcbiAgICAgICAgIFtuYW1lXT1cImNvbnRyb2wuZmllbGQubmFtZVwiXHJcbiAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgKGZvY3VzKT1cImNvbnRyb2wub25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgKGJsdXIpPVwiY29udHJvbC5vbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgIChpbnB1dCk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIiAvPlxyXG4gIDxkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLXZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyIFtjb250cm9sXT1cImNvbnRyb2xcIj5cclxuICA8L2RlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlcj5cclxuPC9uZy1jb250YWluZXI+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBjb250cm9sOiBJQ29udHJvbDtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xSZW5kZXJlciwgSVNlbGVjdENvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXNlbGVjdC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtmb3JtR3JvdXBdPVwiY29udHJvbC5mb3JtXCI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy1sYWJlbC1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+PC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXI+XHJcbiAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICBbaWRdPVwiY29udHJvbC5odG1sSWRcIlxyXG4gICAgICAgICAgW25hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAgIChmb2N1cyk9XCJjb250cm9sLm9uRm9jdXMoJGV2ZW50KVwiXHJcbiAgICAgICAgICAoYmx1cik9XCJjb250cm9sLm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgIChjaGFuZ2UpPVwiY29udHJvbC5vbkNoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY29udHJvbC5vcHRpb25zXCIgW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiPnt7b3B0aW9uLmxhYmVsfX08L29wdGlvbj5cclxuICA8L3NlbGVjdD5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElTZWxlY3RDb250cm9sO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFJlbmRlcmVyLCBJQ29udHJvbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcmVuZGVyZXJzL2NvbnRyb2wucmVuZGVyZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtbGFiZWwtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPGxhYmVsIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiIFtodG1sRm9yXT1cImNvbnRyb2wuaHRtbElkXCI+e3tjb250cm9sLmZpZWxkLmxhYmVsfX08L2xhYmVsPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzTGFiZWxSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBJbnB1dCxcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJ1dHRvblJlbmRlcmVyLCBJQnV0dG9uIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvYnV0dG9uLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWJ1dHRvbi1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgW25nQ2xhc3NdPVwiY2xhc3Nlc1wiXHJcbiAgICAgICAgW3R5cGVdPVwiYnV0dG9uLnR5cGVcIlxyXG4gICAgICAgIFtkaXNhYmxlZF09XCJidXR0b24uZGlzYWJsZWRcIlxyXG4gICAgICAgIChjbGljayk9XCJidXR0b24ub25DbGljaygkZXZlbnQpXCI+XHJcbiAge3tidXR0b24udGV4dH19XHJcbjwvYnV0dG9uPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzQnV0dG9uUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQnV0dG9uUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGJ1dHRvbjogSUJ1dHRvbjtcclxuICBfY2xhc3Nlczogc3RyaW5nW107XHJcblxyXG4gIGdldCBjbGFzc2VzKCkge1xyXG4gICAgbGV0IGNsYXNzZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGlmICh0aGlzLl9jbGFzc2VzKSB7XHJcbiAgICAgIGNsYXNzZXMgPSB0aGlzLl9jbGFzc2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmJ1dHRvbi5leHRyYUNsYXNzZXMpIHtcclxuICAgICAgY2xhc3NlcyA9IChjbGFzc2VzIHx8IFtdKS5jb25jYXQodGhpcy5idXR0b24uZXh0cmFDbGFzc2VzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xhc3NlcztcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5idXR0b24pIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNoYW5nZXMuYnV0dG9uLmN1cnJlbnRWYWx1ZS50eXBlICE9PVxyXG4gICAgICAgIGNoYW5nZXMuYnV0dG9uLnByZXZpb3VzVmFsdWUudHlwZVxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ2xhc3NlcygpIHtcclxuICAgIGlmICh0aGlzLmJ1dHRvbi5jbGFzcykge1xyXG4gICAgICB0aGlzLl9jbGFzc2VzID0gW3RoaXMuYnV0dG9uLmNsYXNzXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAodGhpcy5idXR0b24udHlwZSkge1xyXG4gICAgICBjYXNlICdzdWJtaXQnOlxyXG4gICAgICAgIHRoaXMuX2NsYXNzZXMgPSBbJ2J0bi1wcmltYXJ5J107XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5fY2xhc3NlcyA9IFsnYnRuLWRlZmF1bHQnXTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyLCBJQ29sbGVjdGlvbkNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuaW1wb3J0IHsgSUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9tb2RlbHMvc2NoZW1hJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLXRhYmxlLXJlbmRlcmVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXY+XHJcbiAgPGRlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXIgW3N0YW1wXT1cImNvbnRyb2wuc3RhbXBcIj5cclxuICA8L2RlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYnV0dG9uLWhvc3RcclxuICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgZXh0cmFDbGFzc2VzPVwiYnRuLXNtXCJcclxuICAgIHRleHQ9XCJBZGRcIlxyXG4gICAgKGNsaWNrKT1cImNvbnRyb2wub25BZGQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwidGFibGUtY29udHJvbC1jb250YWluZXJcIj5cclxuICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1ib3JkZXJlZCB0YWJsZS1jb25kZW5zZWRcIj5cclxuICAgIDx0aGVhZD5cclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29udHJvbC5uZXN0ZWRGaWVsZHNcIj5cclxuICAgICAgICAgIHt7ZmllbGQubGFiZWx9fVxyXG4gICAgICAgIDwvdGg+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3RoZWFkPlxyXG4gICAgPHRib2R5PlxyXG4gICAgICA8dHIgKm5nSWY9XCIhY29udHJvbC5uZXN0ZWRWYWx1ZXMubGVuZ3RoXCI+XHJcbiAgICAgICAgPHRkIGNvbHNwYW49XCIxMDAlXCI+Tm9uZTwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgZm9ybSBvZiBjb250cm9sLm5lc3RlZFZhbHVlc1wiPlxyXG4gICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZmllbGQgb2YgY29udHJvbC5uZXN0ZWRGaWVsZHNcIiBbaW5uZXJIdG1sXT1cImdldFZhbHVlKGZpZWxkLCBmb3JtLnZhbHVlKVwiPjwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICA8L3Rib2R5PlxyXG4gIDwvdGFibGU+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AudGFibGUtY29udHJvbC1jb250YWluZXJ7bWFyZ2luLXRvcDoxMHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbGxlY3Rpb25Db250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb2xsZWN0aW9uQ29udHJvbDtcclxuXHJcbiAgZ2V0VmFsdWUoZmllbGQ6IElGaWVsZCwgdmFsdWU6IGFueSkge1xyXG4gICAgY29uc3QgZmllbGRWYWx1ZSA9IHZhbHVlW2ZpZWxkLm5hbWVdO1xyXG5cclxuICAgIGlmIChmaWVsZFZhbHVlID09IG51bGwgfHwgdHlwZW9mIGZpZWxkVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIHJldHVybiAnJm5ic3A7JztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmllbGRWYWx1ZTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtYm9vdHN0cmFwMy1jaGVja2JveC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyIFtmb3JtR3JvdXBdPVwiY29udHJvbC5mb3JtXCI+XHJcbiAgPGRpdiBjbGFzcz1cImNoZWNrYm94XCI+XHJcbiAgICA8bGFiZWwgW2h0bWxGb3JdPVwiY29udHJvbC5odG1sSWRcIj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgW2lkXT1cImNvbnRyb2wuaHRtbElkXCJcclxuICAgICAgICBbbmFtZV09XCJjb250cm9sLmZpZWxkLm5hbWVcIlxyXG4gICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5maWVsZC5uYW1lXCJcclxuICAgICAgICAoZm9jdXMpPVwiY29udHJvbC5vbkZvY3VzKCRldmVudClcIlxyXG4gICAgICAgIChibHVyKT1cImNvbnRyb2wub25CbHVyKCRldmVudClcIlxyXG4gICAgICAgIChpbnB1dCk9XCJjb250cm9sLm9uQ2hhbmdlKCRldmVudClcIiAvPiB7e2NvbnRyb2wuZmllbGQubGFiZWx9fVxyXG4gICAgPC9sYWJlbD5cclxuICA8L2Rpdj5cclxuICA8ZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXIgW2NvbnRyb2xdPVwiY29udHJvbFwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1ib290c3RyYXAzLWhlbHAtcmVuZGVyZXI+XHJcbiAgPGRlLXJlLWNydWQtYm9vdHN0cmFwMy12YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlciBbY29udHJvbF09XCJjb250cm9sXCI+XHJcbiAgPC9kZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xSZW5kZXJlciB7XHJcbiAgQElucHV0KCkgY29udHJvbDogSUNvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3RDb250cm9sUmVuZGVyZXIsIElTZWxlY3RDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvckhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtaGVscC1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8cCAqbmdJZj1cImNvbnRyb2wuZmllbGQuaGVscCAmJiAhaGFzRXJyb3IoKVwiIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7Y29udHJvbC5maWVsZC5oZWxwfX08L3A+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNIZWxwUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBTZWxlY3RDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElTZWxlY3RDb250cm9sO1xyXG5cclxuICBoYXNFcnJvcigpIHtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuaGFzRXJyb3IodGhpcy5jb250cm9sKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sUmVuZGVyZXIsIElDb250cm9sIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9yZW5kZXJlcnMvY29udHJvbC5yZW5kZXJlcic7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25FcnJvckhlbHBlciB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdmFsaWRhdGlvbi1lcnJvci1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkZS1yZS1jcnVkLWJvb3RzdHJhcDMtdmFsaWRhdGlvbi1lcnJvcnMtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0Vycm9yKClcIlxyXG4gIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInZhbGlkYXRpb25FcnJvcnNcIlxyXG4gIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGVycm9yczogZ2V0RXJyb3JzKCkgfVwiPlxyXG48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjdmFsaWRhdGlvbkVycm9ycyBsZXQtZXJyb3JzPVwiZXJyb3JzXCI+XHJcbiAgPG5nLWNvbnRhaW5lcj5cclxuICAgIDxwICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvcnNcIiBjbGFzcz1cImhlbHAtYmxvY2tcIj5cclxuICAgICAge3tlcnJvcn19XHJcbiAgICA8L3A+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbmBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNWYWxpZGF0aW9uRXJyb3JzUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sUmVuZGVyZXIge1xyXG4gIEBJbnB1dCgpIGNvbnRyb2w6IElDb250cm9sO1xyXG5cclxuICBoYXNFcnJvcigpIHtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuaGFzRXJyb3IodGhpcy5jb250cm9sKTtcclxuICB9XHJcblxyXG4gIGdldEVycm9ycygpIHtcclxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3JIZWxwZXIuZ2V0RXJyb3JzKHRoaXMuY29udHJvbCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyLCBJQ29sbGVjdGlvbkNvbnRyb2wgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9jb250cm9sLnJlbmRlcmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGUtcmUtY3J1ZC1ib290c3RyYXAzLWlubGluZS1yZW5kZXJlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2PlxyXG4gIDxkZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyIFtzdGFtcF09XCJjb250cm9sLnN0YW1wXCI+XHJcbiAgPC9kZS1yZS1jcnVkLXN0YW1wLXJlbmRlcmVyPlxyXG4gIDxkZS1yZS1jcnVkLWJ1dHRvbi1ob3N0XHJcbiAgICAqbmdJZj1cImNvbnRyb2wuY2FuQWRkXCJcclxuICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgZXh0cmFDbGFzc2VzPVwiYnRuLXNtXCJcclxuICAgIHRleHQ9XCJBZGRcIlxyXG4gICAgKGNsaWNrKT1cImNvbnRyb2wub25BZGQoJGV2ZW50KVwiPlxyXG4gIDwvZGUtcmUtY3J1ZC1idXR0b24taG9zdD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiaW5saW5lLWNvbnRyb2wtY29udGFpbmVyXCI+XHJcbiAgPHNwYW4gKm5nSWY9XCIhY29udHJvbC5uZXN0ZWRWYWx1ZXMubGVuZ3RoXCI+Tm9uZTwvc3Bhbj5cclxuICA8ZGl2ICpuZ0Zvcj1cImxldCB2YWx1ZSBvZiBjb250cm9sLm5lc3RlZFZhbHVlc1wiPlxyXG4gICAgPGRlLXJlLWNydWQtZm9ybS1ob3N0XHJcbiAgICAgIFtmb3JtSWRdPVwiY29udHJvbC5mb3JtSWRcIlxyXG4gICAgICBbZm9ybV09XCJ2YWx1ZVwiXHJcbiAgICAgIFtwYXJlbnRQYXRoXT1cImNvbnRyb2wuZm9ybVBhdGhcIlxyXG4gICAgICBbcGFyZW50Rm9ybV09XCJjb250cm9sLnZhbHVlXCJcclxuICAgICAgW2ZpZWxkc109XCJjb250cm9sLm5lc3RlZEZpZWxkc1wiXHJcbiAgICAgIFtzdHJ1Y3RdPVwiY29udHJvbC5maWVsZC5yZWZlcmVuY2Uuc3RydWN0XCJcclxuICAgICAgW2Jsb2NrXT1cImNvbnRyb2wuZmllbGQucmVmZXJlbmNlLmJsb2NrXCI+XHJcbiAgICA8L2RlLXJlLWNydWQtZm9ybS1ob3N0PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLmlubGluZS1jb250cm9sLWNvbnRhaW5lcnttYXJnaW4tdG9wOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb2xsZWN0aW9uQ29udHJvbFJlbmRlcmVyIHtcclxuICBjb250cm9sOiBJQ29sbGVjdGlvbkNvbnRyb2w7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdGFtcFJlbmRlcmVyLCBJU3RhbXAgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3JlbmRlcmVycy9zdGFtcC5yZW5kZXJlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RlLXJlLWNydWQtc3RhbXAtcmVuZGVyZXInLFxyXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwic3RhbXAuaGVhZGVyU2l6ZVwiPlxyXG4gIDxoMSAqbmdTd2l0Y2hDYXNlPVwiMVwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDE+XHJcbiAgPGgyICpuZ1N3aXRjaENhc2U9XCIyXCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oMj5cclxuICA8aDMgKm5nU3dpdGNoQ2FzZT1cIjNcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2gzPlxyXG4gIDxoNCAqbmdTd2l0Y2hDYXNlPVwiNFwiIFtuZ0NsYXNzXT1cInN0YW1wLmNsYXNzZXNcIj57e3N0YW1wLnRleHR9fTwvaDQ+XHJcbiAgPGg1ICpuZ1N3aXRjaENhc2U9XCI1XCIgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9oNT5cclxuICA8aDYgKm5nU3dpdGNoQ2FzZT1cIjZcIiBbbmdDbGFzc109XCJzdGFtcC5jbGFzc2VzXCI+e3tzdGFtcC50ZXh0fX08L2g2PlxyXG4gIDxwICpuZ1N3aXRjaERlZmF1bHQgW25nQ2xhc3NdPVwic3RhbXAuY2xhc3Nlc1wiPnt7c3RhbXAudGV4dH19PC9wPlxyXG48L25nLWNvbnRhaW5lcj5cclxuYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnQgaW1wbGVtZW50cyBTdGFtcFJlbmRlcmVyIHtcclxuICBASW5wdXQoKSBzdGFtcDogSVN0YW1wO1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyL2NvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERlUmVDcnVkQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlIH0gZnJvbSAnLi4vcHJvdmlkZXIvcHJvdmlkZXIubW9kdWxlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2lucHV0LXJlbmRlcmVyL2lucHV0LXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzTGFiZWxSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vbGFiZWwtcmVuZGVyZXIvbGFiZWwtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24tcmVuZGVyZXIvYnV0dG9uLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yZW5kZXJlci90YWJsZS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gtcmVuZGVyZXIvY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0hlbHBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaGVscC1yZW5kZXJlci9oZWxwLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNWYWxpZGF0aW9uRXJyb3JzUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3ZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyL3ZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaW5saW5lLXJlbmRlcmVyL2lubGluZS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vc3RhbXAtcmVuZGVyZXIvc3RhbXAtcmVuZGVyZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRGVSZUNydWRDb3JlTW9kdWxlLCBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNMYWJlbFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNIZWxwUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzVmFsaWRhdGlvbkVycm9yc1JlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1NlbGVjdFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0RlUmVDcnVkUHJvdmlkZXJNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIHByb3ZpZGVyU2VydmljZS5yZWdpc3RlcignYm9vdHN0cmFwMycsIHtcclxuICAgICAgc3RhbXBDb21wb25lbnQ6IEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBjb250YWluZXJDb21wb25lbnQ6IEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGlucHV0Q29tcG9uZW50OiBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgc2VsZWN0Q29tcG9uZW50OiBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGJ1dHRvbkNvbXBvbmVudDogQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICB0YWJsZUNvbXBvbmVudDogQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGlubGluZUNvbXBvbmVudDogQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBjaGVja2JveENvbXBvbmVudDogQm9vdHN0cmFwM0NoZWNrYm94UmVuZGVyZXJDb21wb25lbnRcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7SUFPRSxZQUFtQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtLQUFJOzs7WUFMMUQsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUseUJBQXlCO2FBQ3BDOzs7O1lBTG1CLGdCQUFnQjs7Ozs7OztBQ0FwQzs7c0JBS2dFLEVBQUU7Ozs7Ozs7SUFFaEUsUUFBUSxDQUFDLElBQVksRUFBRSxPQUFnQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztLQUM3Qjs7Ozs7SUFFRCxHQUFHLENBQUMsSUFBWTs7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSwwRkFBMEYsQ0FBQyxDQUFDO1NBQzlIO1FBRUQsT0FBTyxPQUFPLENBQUM7S0FDaEI7OztZQWZGLFVBQVU7Ozs7Ozs7O0FDRFgsTUFBYSxtQkFBbUIsR0FBRyxDQUFDLE9BQXdCOztJQUMxRCxNQUFNLFlBQVksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7SUFFL0QsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDbEQsQ0FBQzs7Ozs7O0FDTkY7Ozs7SUFvQkUsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7S0FBSTs7Ozs7Ozs7O0lBRXZDLEtBQUssQ0FDSCxNQUFjLEVBQ2QsU0FBaUIsRUFDakIsTUFBMkIsRUFDM0IsTUFBMkIsRUFDM0IsS0FBSyxHQUFHLEVBQUU7O1FBRVYsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDOztRQUNqQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztRQUUvQyxLQUFLLE1BQU0sY0FBYyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7O1lBQ3pDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO2dCQUMxQixTQUFTO2FBQ1Y7WUFFRCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFOztnQkFDakMsTUFBTSxpQkFBaUIscUJBQXVCLEtBQUssRUFBQztnQkFDcEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLGlCQUFpQixDQUFDOztnQkFFeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDdEIsU0FBUyxDQUFDLE1BQU0sRUFDaEIsU0FBUyxDQUFDLEtBQUssRUFDZixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQ2xCLENBQUM7Z0JBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLGlCQUFpQixDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7O29CQUU3RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN2RCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUMzRTtpQkFDRjtnQkFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFMUIsU0FBUzthQUNWOztZQUVELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDOztZQUM3RCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFFN0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRDs7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNwQixTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTyxTQUFTLENBQUM7S0FDbEI7Ozs7Ozs7OztJQUVELEtBQUssQ0FDSCxNQUFjLEVBQ2QsU0FBaUIsRUFDakIsTUFBMkIsRUFDM0IsTUFBMkIsRUFDM0IsS0FBSyxHQUFHLEVBQUU7O1FBRVYsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUk7O2dCQUNqQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuQixDQUFDLENBQUM7U0FDSjs7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRTtZQUNwQixTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxTQUFTLENBQUM7S0FDbEI7Ozs7OztJQUlPLGFBQWEsQ0FBQyxjQUErQixFQUFFLEtBQWE7UUFDbEUsT0FBTyxDQUFDLE9BQXdCOztZQUM5QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7O1lBRXRCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7O1lBQzFCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFOUIsSUFDRSxNQUFNLFlBQVksU0FBUztnQkFDM0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNuRDtnQkFDQSxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNsQixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksbUJBQWEsS0FBSyxHQUFFLFNBQVMsRUFBRTtnQkFDakMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLG1CQUFhLEtBQUssR0FBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1lBRUQsSUFBSSxtQkFBYSxLQUFLLEdBQUUsU0FBUyxFQUFFO2dCQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQWEsS0FBSyxHQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDdEU7WUFFRCxJQUFJLG1CQUFnQixLQUFLLEdBQUUsR0FBRyxFQUFFO2dCQUM5QixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQWdCLEtBQUssR0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsSUFBSSxtQkFBZ0IsS0FBSyxHQUFFLEdBQUcsRUFBRTtnQkFDOUIsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFnQixLQUFLLEdBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3RDtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUN0QixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hELENBQUM7Ozs7WUE5SEwsVUFBVTs7OztZQWZULFdBQVc7Ozs7Ozs7QUNIYixBQVlBO0FBRUE7Ozs7SUFLRSxZQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7c0JBRkwsRUFBRTtLQUVPOzs7O0lBRXZELE9BQU8sVUFBVTtRQUNmLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3RCOzs7OztJQUVELE9BQU8sY0FBYyxDQUFDLE9BQXdCO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO0tBQ0Y7Ozs7O0lBR0QsT0FBTyxVQUFVLENBQUMsS0FBaUM7UUFDakQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztLQUNwQjs7Ozs7SUFFRCxPQUFPLFdBQVcsQ0FBQyxPQUF3Qjs7UUFDekMsTUFBTSxPQUFPLEdBQWMsRUFBRSxDQUFDOztRQUM5QixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7O1FBQzVCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUU1QixLQUFLLE1BQU0sWUFBWSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7O1lBQ3pDLE1BQU0sTUFBTSxxQkFDUCxZQUFZLElBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUMxQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQ3BELE1BQU0sRUFBRSxFQUFFLEVBQ1YsTUFBTSxFQUFFLEVBQUUsSUFDVjtZQUVGLEtBQUssTUFBTSxXQUFXLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTs7Z0JBQzdDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztnQkFFakQsTUFBTSxLQUFLLHFCQUNOLFdBQVcsSUFDZCxLQUFLLEVBQ0wsV0FBVyxFQUFFLFdBQVcsQ0FBQyxXQUFXLElBQUksS0FBSyxFQUM3QyxNQUFNLEVBQUUsWUFBWSxDQUFDLElBQUksSUFDekI7Z0JBRUYsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7b0JBQzdDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztpQkFDbkM7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFOztnQkFDN0MsTUFBTSxLQUFLLHFCQUNOLFdBQVcsSUFDZCxNQUFNLEVBQUUsRUFBRSxFQUNWLE1BQU0sRUFBRSxZQUFZLENBQUMsSUFBSSxJQUN6QjtnQkFFRixLQUFLLE1BQU0sU0FBUyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7b0JBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUU7d0JBQ2QsU0FBUztxQkFDVjs7b0JBRUQsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLEtBQUs7MEJBQ2xDLFNBQVM7MEJBQ1QsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUM7O29CQUV6QixJQUFJLFNBQVMsQ0FBQztvQkFFZCxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUU7O3dCQUM1QixNQUFNLFdBQVcsR0FDZixjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUc7OEJBQy9CLGNBQWMsQ0FBQyxTQUFTOzhCQUN4QixVQUFVLGNBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7d0JBRzNDLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUM3RDt5QkFBTTs7d0JBRUwsU0FBUyxHQUFHLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO3FCQUNuRDtvQkFFRCxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDckMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ25DO2dCQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQztZQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPO1lBQ0wsT0FBTztZQUNQLE1BQU07WUFDTixNQUFNO1NBQ1AsQ0FBQztLQUNIOzs7OztJQUVELEdBQUcsQ0FBQyxFQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQXdCLEVBQUUsS0FBYSxFQUFFLGFBQW9DOztRQUNsRixJQUFJLEVBQUUsQ0FBUztRQUVmLE9BQU8sSUFBSSxFQUFFO1lBQ1gsRUFBRSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRW5DLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbkIsU0FBUzthQUNWO1lBRUQsTUFBTTtTQUNQO1FBRUQsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUV6QyxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUN2RSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUM1QixLQUFLLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FDZCxDQUFDOztRQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQzVCLEtBQUssSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxFQUN4QyxNQUFNLENBQUMsTUFBTSxDQUNkLENBQUM7O1FBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQ2pDLE9BQU8sQ0FBQyxNQUFNLEVBQ2QsT0FBTyxDQUFDLEtBQUssRUFDYixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssQ0FDTixDQUFDOztRQUVGLE1BQU0sS0FBSyxHQUFjO1lBQ3ZCLEVBQUU7WUFDRixPQUFPO1lBQ1AsSUFBSTtZQUNKLE9BQU87WUFDUCxNQUFNO1lBQ04sTUFBTTtZQUNOLGdCQUFnQixFQUFFLGFBQWE7WUFDL0Isd0JBQXdCLEVBQUUsSUFBSSxPQUFPLEVBQXdCO1lBQzdELGVBQWUsRUFBRSxFQUFFO1lBQ25CLGtCQUFrQixFQUFFLElBQUksT0FBTyxFQUFVO1lBQ3pDLGFBQWEsRUFBRSxJQUFJLE9BQU8sRUFBYztTQUN6QyxDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFeEIsT0FBTyxLQUFLLENBQUM7S0FDZDs7Ozs7OztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBYyxFQUFFLEtBQWE7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBRUQsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDOUQ7Ozs7OztJQUVELE1BQU0sQ0FBQyxFQUFVLEVBQUUsS0FBYTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCOzs7OztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3hCOzs7Ozs7SUFFRCxXQUFXLENBQUMsRUFBVSxFQUFFLFFBQWlCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNyQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLEVBQVUsRUFBRSxNQUE0QjtRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNwQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztRQUMxQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDckM7Ozs7Ozs7O0lBRUQsUUFBUSxDQUFDLEVBQVUsRUFBRSxRQUFnQixFQUFFLFFBQWEsRUFBRSxLQUFhO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BCLE9BQU87U0FDUjs7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9CLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEtBQUssS0FBSyxFQUFFO1lBQzNELE9BQU87U0FDUjtRQUVELG1CQUFzQixLQUFLLENBQUMsYUFBYSxHQUFFLElBQUksQ0FBQztZQUM5QyxTQUFTLEVBQUUsUUFBUTtZQUNuQixLQUFLLEVBQUUsUUFBUTtZQUNmLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7U0FDNUIsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7OztJQUVELGNBQWMsQ0FBQyxFQUFVLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsVUFBa0I7UUFDeEYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ25DLE1BQU07WUFDTixLQUFLO1lBQ0wsSUFBSTtZQUNKLFVBQVU7U0FDWCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDL0I7Ozs7O0lBRUQsYUFBYSxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQy9COzs7OztJQUVELGtCQUFrQixDQUFDLEVBQVU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDcEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4Qjs7Ozs7O0lBRU8sb0JBQW9CLENBQUMsRUFBVSxFQUFFLE9BQWdCOztRQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLG1CQUFrQixLQUFLLENBQUMsa0JBQWtCLEdBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7SUFHcEQsMEJBQTBCLENBQUMsRUFBVTs7UUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixtQkFBZ0MsS0FBSyxDQUFDLHdCQUF3QixHQUFFLElBQUksQ0FDbEUsS0FBSyxDQUFDLGdCQUFnQixDQUN2QixDQUFDOzs7Ozs7OztJQUdJLFVBQVUsQ0FBSSxNQUF5QixFQUFFLEtBQVU7UUFDekQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFpQixDQUFDLEdBQUcsRUFBRSxPQUFPO1lBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7WUFDL0IsT0FBTyxHQUFHLENBQUM7U0FDWixFQUFFLElBQUksR0FBRyxFQUFhLENBQUMsQ0FBQzs7O3dDQXpSVyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUM7O1lBSmxFLFVBQVU7Ozs7WUFORixrQkFBa0I7Ozs7Ozs7QUNOM0I7Ozs7OztJQTZCRSxZQUNVLGNBQ0EsMEJBQ0E7UUFGQSxpQkFBWSxHQUFaLFlBQVk7UUFDWiw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZTtxQkF5RmpCLENBQUMsQ0FBQztZQUNSLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O1lBRW5CLE1BQU0sU0FBUyxHQUFHLG1CQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRSxTQUFTLENBQUM7O1lBRWxFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFFOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFDeEQsTUFBTSxTQUFTLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUV0RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVIO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7S0F6R0c7Ozs7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sZUFBWSxDQUFDLE9BQU8sWUFBUyxXQUFXLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0tBQ0Y7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7S0FDRjs7OztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUMzQjs7UUFFRCxJQUFJLGdCQUFnQixDQUFNOztRQUUxQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUM1QixDQUFDO1FBRUYsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDekIsS0FBSyxRQUFRO2dCQUNYLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxlQUFlLENBQUM7Z0JBQ25ELE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQztnQkFDbEQsTUFBTTtZQUNSO2dCQUNFLE9BQU8sQ0FBQyxLQUFLLENBQ1gsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sMkJBQTJCLEVBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDbkMsQ0FBQztnQkFDRixPQUFPO1NBQ1Y7O1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQzdELGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDOztRQUV6QixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDNUUsZ0JBQWdCLENBQ2pCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPO1NBQ1I7O1FBRUQsTUFBTSxpQkFBaUIscUJBQThCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDOztRQUVqRixNQUFNLE9BQU8scUJBQ1IsSUFBSSxDQUFDLE9BQU8sSUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFDakI7O1FBRUYsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQ2xELGlCQUFpQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O1FBRXBDLE1BQU0saUJBQWlCLEdBQUcsbUJBQVksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUUsV0FBVyxDQUFDO1FBRS9FLElBQUksaUJBQWlCLEVBQUU7O1lBQ3JCLE1BQU0sTUFBTSxHQUFpQjtnQkFDM0IsYUFBYSxFQUFFLGVBQWU7Z0JBQzlCLFlBQVksRUFBRSxPQUFPO2dCQUNyQixXQUFXLEVBQUUsT0FBTyxlQUFlLEtBQUssV0FBVztnQkFDbkQsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDLFdBQVc7YUFDeEMsQ0FBQztZQUVGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO0tBQ0Y7OztZQXBHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsUUFBUSxFQUFFLG1EQUFtRDthQUM5RDs7OztZQVBRLGdCQUFnQjtZQVh2Qix3QkFBd0I7WUFZakIsdUJBQXVCOzs7NEJBUzdCLFNBQVMsU0FBQyxzQkFBc0I7c0JBQ2hDLEtBQUs7Ozs7Ozs7QUMxQlI7Ozs7OztJQXVERSxZQUNVLGNBQ0EsMEJBQ0E7UUFGQSxpQkFBWSxHQUFaLFlBQVk7UUFDWiw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLG9CQUFlLEdBQWYsZUFBZTs4QkFsQnFCLEVBQUU7dUJBaVJ0QztZQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDOUQ7c0JBRVE7O1lBQ1AsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFekQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUMxRTtTQUNGO3dCQUVVLENBQUMsQ0FBTTs7WUFDaEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3ZGO0tBNVFBOzs7O0lBRUQsSUFBSSxRQUFROztRQUNWLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRS9CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTs7WUFDbkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUVqQyxJQUFJLElBQUksQ0FBQyxVQUFVLFlBQVksU0FBUyxFQUFFOztnQkFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsVUFBVSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFFRCxRQUFRLEdBQUcsR0FBRyxVQUFVLElBQUksUUFBUSxFQUFFLENBQUM7U0FDeEM7UUFFRCxPQUFPLFFBQVEsQ0FBQztLQUNqQjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFFaEQsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2xGLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNqQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUN0RjtZQUNFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQixDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUM3RDtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtpQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNmOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sY0FBVyxDQUFDLE9BQU8sV0FBUSxhQUFhLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxtQ0FBbUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsbUNBQW1DLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDeEQ7UUFFRCxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUM7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7U0FDMUI7S0FDRjs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFHOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3hCLE9BQU87U0FDUjs7UUFFRCxJQUFJLGdCQUFnQixDQUFNOztRQUUxQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUM1QixDQUFDO1FBRUYsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDckIsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssTUFBTTtnQkFDVCxnQkFBZ0IsR0FBRyxlQUFlLENBQUMsY0FBYyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDckQsTUFBTTtZQUNSLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxZQUFZO2dCQUNmLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxlQUFlLENBQUM7Z0JBQ25ELE1BQU07WUFDUixLQUFLLGNBQWM7Z0JBQ2pCLGdCQUFnQixHQUFHLDRCQUE0QixDQUFDO2dCQUNoRCxNQUFNO1lBQ1I7Z0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FDWCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSw0QkFBNEIsRUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQzNCLENBQUM7Z0JBQ0YsT0FBTztTQUNWOztRQUVELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFFekIsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQ3JGLGVBQWUsQ0FBQyxrQkFBa0IsQ0FDbkMsQ0FBQzs7UUFFRixNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDbkYsZ0JBQWdCLENBQ2pCLENBQUM7O1FBRUYsTUFBTSxtQkFBbUIsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQzFELHVCQUF1QixDQUN4QixDQUFDOztRQUVGLE1BQU0scUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxDQUM1RCx5QkFBeUIsRUFDekIsQ0FBQyxFQUNELFNBQVMsRUFDVCxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQy9DLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUMvQixPQUFPO1NBQ1I7O1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7UUFDL0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztRQUUzQyxNQUFNLE9BQU8sR0FBYTtZQUN4QixLQUFLO1lBQ0wsUUFBUTtZQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsZ0JBQWdCLEVBQ2QsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLEVBQUU7WUFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUMzQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNwQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN4QixDQUFDO1FBRUYsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDckIsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLFlBQVksRUFBRTs7Z0JBQ2pCLE1BQU0sU0FBUyxxQkFBZSxJQUFJLENBQUMsS0FBSyxFQUFDOztnQkFFekMsTUFBTSxhQUFhLHFCQUFtQixPQUFPLEVBQUM7Z0JBRTlDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFO29CQUNwQyxhQUFhLENBQUMsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDO2lCQUNsQztxQkFBTTtvQkFDTCxhQUFhLENBQUMsT0FBTyxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQztpQkFDakQ7Z0JBQ0QsTUFBTTthQUNQO1lBQ0QsS0FBSyxjQUFjLEVBQUU7O2dCQUNuQixNQUFNLGlCQUFpQixxQkFBdUIsT0FBTyxFQUFDOztnQkFFdEQsTUFBTSxpQkFBaUIscUJBQXVCLElBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBQ3pELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQzs7Z0JBRXhDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBRTdFLE1BQU0sRUFBRSxLQUFLLEVBQUUscUJBQWdDLFdBQVcsQ0FBQyxJQUFJLENBQzdELENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLGlCQUFpQixDQUFDLElBQUksQ0FDeEMsRUFBQzs7Z0JBRUYsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDOztnQkFFakUsTUFBTSxlQUFlLHFCQUFrQyxJQUFJLENBQUMsS0FBSztxQkFDOUQsTUFBTSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBQzs7Z0JBRTFELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFFeEIsS0FBSyxNQUFNLGNBQWMsSUFBSSxlQUFlLEVBQUU7O29CQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQy9FLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFCOztnQkFFRCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7Z0JBRXhCLEtBQUssTUFBTSxXQUFXLElBQUksaUJBQWlCLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtvQkFDMUQsWUFBWSxDQUFDLElBQUksbUJBQVksV0FBVyxFQUFDLENBQUM7aUJBQzNDO2dCQUVELGlCQUFpQixDQUFDLEtBQUssR0FBRztvQkFDeEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVU7aUJBQzFDLENBQUM7Z0JBRUYsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsaUJBQWlCLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDO2dCQUNuSCxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2dCQUM5QyxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2dCQUM5QyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUM7Z0JBQy9ELE1BQU07YUFDUDtTQUNGO1FBRUQsS0FBSyxNQUFNLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFOztZQUM5QyxNQUFNLGlCQUFpQixxQkFBb0IsWUFBWSxDQUFDLFFBQVEsRUFBQzs7WUFFakUsTUFBTSxlQUFlLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ2xELGlCQUFpQixDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O1lBRXBDLE1BQU0saUJBQWlCLEdBQUcsbUJBQVksWUFBWSxDQUFDLFFBQVEsR0FBRSxXQUFXLENBQUM7WUFDekUsSUFBSSxpQkFBaUIsRUFBRTs7Z0JBQ3JCLE1BQU0sTUFBTSxHQUFpQjtvQkFDM0IsYUFBYSxFQUFFLGVBQWU7b0JBQzlCLFlBQVksRUFBRSxPQUFPO29CQUNyQixXQUFXLEVBQUUsT0FBTyxlQUFlLEtBQUssV0FBVztvQkFDbkQsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDLFdBQVc7aUJBQ3hDLENBQUM7Z0JBRUYsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDaEU7U0FDRjtLQUNGOzs7OztJQW1CTyxPQUFPLENBQUMsSUFBWTtRQUMxQixRQUFRLElBQUk7WUFDVixLQUFLLFNBQVM7Z0JBQ1osT0FBTyxRQUFRLENBQUM7WUFDbEI7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7U0FDZjs7OztZQTlTSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFO3NEQUMwQzthQUNyRDs7OztZQWZRLGdCQUFnQjtZQWpCdkIsd0JBQXdCO1lBT2pCLHVCQUF1Qjs7OzRCQStCN0IsU0FBUyxTQUFDLHNCQUFzQjtxQkFDaEMsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs7Ozs7OztBQ25EUjs7Ozs7O0lBa0NFLFlBQ1UsY0FDQSwwQkFDQTtRQUZBLGlCQUFZLEdBQVosWUFBWTtRQUNaLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsb0JBQWUsR0FBZixlQUFlO3FCQU5QLElBQUksWUFBWSxFQUFPO3VCQStHL0IsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7S0ExR0c7Ozs7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2Y7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxjQUFXLENBQUMsT0FBTyxXQUFRLGFBQWEsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3JCOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzNCO0tBQ0Y7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7O1FBRUQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDNUIsQ0FBQzs7UUFFRixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7UUFDN0QsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBRXpCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUM1RSxlQUFlLENBQUMsZUFBZSxDQUNoQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBRUQsTUFBTSxFQUNKLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxFQUN6RCxPQUFPLEVBQ1IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztRQUVmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDOztRQUV4QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFakIsUUFBUSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssUUFBUTtnQkFDWCxLQUFLLEdBQUcsaUJBQWlCLENBQUM7Z0JBQzFCLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsS0FBSyxHQUFHLGlCQUFpQixDQUFDO2dCQUMxQixNQUFNO1NBQ1Q7O1FBRUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRTlDLElBQ0UsUUFBUTtZQUNSLGlCQUFpQjtZQUNqQixpQkFBaUIsQ0FBQyxpQkFBaUIsRUFDbkM7WUFDQSxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNDOztRQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFO1lBQ3pDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtnQkFDekMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QztTQUNGOztRQUVELE1BQU0saUJBQWlCLHFCQUFtQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQztRQUN0RSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUc7WUFDekIsSUFBSTtZQUNKLFlBQVk7WUFDWixJQUFJLEVBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRO1lBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsS0FBSyxFQUFFLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUztTQUMzQyxDQUFDO0tBQ0g7OztZQXpIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLG1EQUFtRDthQUM5RDs7OztZQU5RLGdCQUFnQjtZQVR2Qix3QkFBd0I7WUFNakIsdUJBQXVCOzs7NEJBWTdCLFNBQVMsU0FBQyxzQkFBc0I7cUJBQ2hDLEtBQUs7bUJBQ0wsS0FBSzsyQkFDTCxLQUFLO21CQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxNQUFNOzs7Ozs7O0FDL0JUOzs7Ozs7SUFtQ0UsWUFDVSxjQUNBLDBCQUNBO1FBRkEsaUJBQVksR0FBWixZQUFZO1FBQ1osNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixvQkFBZSxHQUFmLGVBQWU7S0FDckI7Ozs7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRWhELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUN0QyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUMvQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUVyQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDckI7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7S0FDRjs7OztJQUVELFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUMzQixDQUFDO0tBQ0g7Ozs7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3hCLE9BQU87U0FDUjs7UUFFRCxJQUFJLGdCQUFnQixDQUFNOztRQUUxQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUM1QixDQUFDO1FBRUYsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDckIsS0FBSyxPQUFPO2dCQUNWLGdCQUFnQixHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUM7Z0JBQ2xELE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsS0FBSyxDQUNYLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLDRCQUE0QixFQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDM0IsQ0FBQztnQkFDRixPQUFPO1NBQ1Y7O1FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1FBQzdELGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDOztRQUV6QixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDNUUsZ0JBQWdCLENBQ2pCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNyQjs7OztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPO1NBQ1I7O1FBRUQsTUFBTSxpQkFBaUIscUJBQWtCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDOztRQUNyRSxNQUFNLFVBQVUscUJBQWdCLElBQUksQ0FBQyxLQUFLLEVBQUM7O1FBRTNDLE1BQU0sS0FBSyxHQUFXO1lBQ3BCLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSztZQUN0QixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVTtTQUMxQyxDQUFDO1FBRUYsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ3BCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7Z0JBQy9CLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDaEQ7WUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3RDLEtBQUssQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzthQUNwRDtTQUNGOztRQUVELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztRQUM5QyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztRQUVoQyxNQUFNLGlCQUFpQixHQUFHLG1CQUFZLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUTthQUM5RCxXQUFXLENBQUM7UUFFZixJQUFJLGlCQUFpQixFQUFFOztZQUNyQixNQUFNLE1BQU0sR0FBaUI7Z0JBQzNCLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsV0FBVyxFQUFFLE9BQU8sYUFBYSxLQUFLLFdBQVc7Z0JBQ2pELGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQyxXQUFXO2FBQ3hDLENBQUM7WUFFRixpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNoRTtLQUNGOzs7WUF4SUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFFBQVEsRUFBRSxtREFBbUQ7YUFDOUQ7Ozs7WUFSUSxnQkFBZ0I7WUFQdkIsd0JBQXdCO1lBS2pCLHVCQUF1Qjs7OzRCQWE3QixTQUFTLFNBQUMsc0JBQXNCO3FCQUNoQyxLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7Ozs7Ozs7QUMvQlI7Ozs7SUEyQ0UsWUFDVTtRQUFBLGlCQUFZLEdBQVosWUFBWTtLQUNsQjs7OztJQUVKLElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDbEQ7Ozs7O0lBRUQsSUFDSSxNQUFNLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztLQUN0Qjs7OztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDaEQ7Ozs7O0lBRUQsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUNyQjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNqRDs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsYUFBYSxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDUjtLQUNGOzs7WUFwRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNCWDthQUNBOzs7O1lBM0JRLGdCQUFnQjs7O3FCQWdDdEIsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3FCQVdMLEtBQUs7b0JBU0wsS0FBSzs7Ozs7OztBQzVEUjs7O1lBYUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2Qix1QkFBdUI7b0JBQ3ZCLG1CQUFtQjtvQkFDbkIsNEJBQTRCO29CQUM1QixpQkFBaUI7aUJBQ2xCO2dCQUNELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDO2dCQUNqRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztnQkFDbkcsZUFBZSxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDaEQ7Ozs7Ozs7QUM3QkQ7Ozs7SUErREUsWUFBb0IsWUFBOEI7UUFBOUIsaUJBQVksR0FBWixZQUFZLENBQWtCOzJCQVIxQixJQUFJLFlBQVksRUFBYztzQkFDbkMsSUFBSSxZQUFZLEVBQWtCO3NCQUNsQyxJQUFJLFlBQVksRUFBTztLQU1ZOzs7O0lBRXRELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQ25FOzs7OztJQUVELElBQ0ksYUFBYSxDQUFDLEtBQWM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7S0FDN0I7Ozs7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1Qzs7OztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3pCOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxFQUFFLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBQ3ZDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUVwRCxPQUFPLG9CQUFvQjtjQUN2QixlQUFlLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtjQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7S0FDL0I7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7UUFDdkMsTUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRXBELE9BQU8sb0JBQW9CO2NBQ3ZCLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLO2NBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUM5Qjs7OztJQUVELElBQUksSUFBSTtRQUNOLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztRQUN2QyxNQUFNLG9CQUFvQixHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUM7UUFFcEQsT0FBTyxvQkFBb0I7Y0FDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Y0FDbkUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7S0FDckI7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixNQUFNLEVBQUUsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7UUFDdkMsTUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1FBRXBELE9BQU8sb0JBQW9CO2NBQ3ZCLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVO2NBQ3BELElBQUksQ0FBQztLQUNWOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxFQUFFLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBQ3ZDLE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztRQUVwRCxPQUFPLG9CQUFvQjtjQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztjQUN6RSxJQUFJLENBQUM7S0FDVjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWQsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDO1lBQzNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNO1lBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sYUFBVSxDQUFDLE9BQU8sVUFBTyxXQUFXLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFPLFlBQVksQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsSUFBSSxPQUFPLGNBQVcsQ0FBQyxPQUFPLFdBQVEsV0FBVyxFQUFFO1lBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sV0FBUSxZQUFZLENBQUMsQ0FBQztTQUN6RTtLQUNGOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRDtRQUVELElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekM7Ozs7SUFFRCxNQUFNO1FBQ0osTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztRQUVoRCxJQUFJLE1BQU0sQ0FBQzs7UUFDWCxJQUFJLEtBQUssQ0FBQzs7UUFFVixNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLEtBQUssRUFBRTtZQUNULENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSyxFQUFFO1NBQzdCO2FBQU07WUFDTCxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sRUFBRTtTQUMvQjs7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztLQUMzQjs7Ozs7O0lBRUQsY0FBYyxDQUFDLE1BQWMsRUFBRSxTQUFpQjtRQUM5QyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRTs7WUFFdEIsT0FBTyxFQUFFLENBQUM7U0FDWDs7UUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsS0FBSyxFQUFFOztZQUVWLE9BQU8sRUFBRSxDQUFDO1NBQ1g7O1FBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7UUFFaEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXZCLEtBQUssTUFBTSxTQUFTLElBQUksVUFBVSxFQUFFO1lBQ2xDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxPQUFPLFdBQVcsQ0FBQztLQUNwQjs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3pCOzs7OztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRTtZQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEQsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztZQUM1QixVQUFVLEVBQUUsQ0FBQyxNQUFNO2dCQUNqQixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN6QjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDekI7U0FDRixDQUFDLENBQUM7S0FDSjs7O1lBdk9GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBdUJYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBbENRLGdCQUFnQjs7O3NCQXdDdEIsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7MEJBQ0wsTUFBTTtxQkFDTixNQUFNO3FCQUNOLE1BQU07NEJBWU4sS0FBSzs7Ozs7OztBQ3JFUjs7O1lBTUMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGtCQUFrQjtvQkFDbEIsbUJBQW1CO2lCQUNwQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osYUFBYTtpQkFDZDtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDekI7Ozs7Ozs7QUNiRDs7Ozs7SUFHVSxPQUFPLDBCQUEwQixDQUFDLE9BQWlCOztRQUN6RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpELElBQ0UsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTztZQUM1QyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQ2hDO1lBQ0EsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sV0FBVyxDQUFDOzs7Ozs7SUFHckIsT0FBTyxRQUFRLENBQUMsT0FBaUI7UUFDL0IsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVELE9BQU8sU0FBUyxDQUFDLE9BQWlCOztRQUNoQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiOztRQUVELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQzs7UUFDeEIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBRTFCLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzdDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDbEMsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFekMsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7b0JBQy9CLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDNUM7YUFDRjtTQUNGO1FBRUQsT0FBTyxZQUFZO2FBQ2hCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNqQixNQUFNLENBQUMsY0FBYyxDQUFDO2FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFFRCxPQUFPLGVBQWUsQ0FBQyxLQUFxQztRQUMxRCxRQUFRLEtBQUssQ0FBQyxHQUFHO1lBQ2YsS0FBSyxVQUFVO2dCQUNiLE9BQU8seUJBQXlCLENBQUM7WUFDbkMsS0FBSyxXQUFXO2dCQUNkLE9BQU8saUNBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUNqQixjQUFjLENBQUM7WUFDakIsS0FBSyxXQUFXO2dCQUNkLE9BQU8sNkJBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUNqQixjQUFjLENBQUM7WUFDakI7Z0JBQ0UsT0FBTyxpQ0FBaUMsS0FBSyxFQUFFLENBQUM7U0FDbkQ7S0FDRjs7bUNBL0QyQixDQUFDLFVBQVUsQ0FBQzs7Ozs7O0FDSjFDOzs7O0lBY0UsVUFBVTs7UUFDUixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlELE9BQU87WUFDTCxXQUFXLEVBQUUsUUFBUTtZQUNyQixjQUFjLEVBQUUsUUFBUTtTQUN6QixDQUFDO0tBQ0g7OztZQWpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtEQUFrRDtnQkFDNUQsUUFBUSxFQUFFOzs7Q0FHWDthQUNBOzs7c0JBRUUsS0FBSzs7Ozs7OztBQ1pSOzs7WUFJQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDcEMsWUFBWSxFQUFFLEVBQUU7YUFDakI7Ozs7Ozs7QUNSRDs7O1lBR0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztDQWdCWDthQUNBOzs7c0JBRUUsS0FBSzs7Ozs7OztBQ3hCUjs7O1lBR0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztDQWdCWDthQUNBOzs7c0JBRUUsS0FBSzs7Ozs7OztBQ3hCUjs7O1lBR0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFFBQVEsRUFBRTtDQUNYO2FBQ0E7OztzQkFFRSxLQUFLOzs7Ozs7O0FDVFI7Ozs7SUF1QkUsSUFBSSxPQUFPOztRQUNULElBQUksT0FBTyxDQUFXO1FBRXRCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN6QjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDNUIsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM1RDtRQUVELE9BQU8sT0FBTyxDQUFDO0tBQ2hCOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLFlBQVM7WUFDbEIsSUFDRSxPQUFPLFdBQVEsWUFBWSxDQUFDLElBQUk7Z0JBQ2hDLE9BQU8sV0FBUSxhQUFhLENBQUMsSUFBSSxFQUNqQztnQkFDQSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7U0FDRjtLQUNGOzs7O0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsT0FBTztTQUNSO1FBRUQsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDdEIsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNSO2dCQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtTQUNUO0tBQ0Y7OztZQXpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsUUFBUSxFQUFFOzs7Ozs7Q0FNWDthQUNBOzs7cUJBRUUsS0FBSzs7Ozs7OztBQ3BCUjs7Ozs7O0lBMENFLFFBQVEsQ0FBQyxLQUFhLEVBQUUsS0FBVTs7UUFDaEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksT0FBTyxVQUFVLEtBQUssV0FBVyxFQUFFO1lBQzNELE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBRUQsT0FBTyxVQUFVLENBQUM7S0FDbkI7OztZQTlDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E4Qlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsMkNBQTJDLENBQUM7YUFDdEQ7OztzQkFFRSxLQUFLOzs7Ozs7O0FDeENSOzs7WUFHQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlDQUF5QztnQkFDbkQsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztDQWlCWDthQUNBOzs7c0JBRUUsS0FBSzs7Ozs7OztBQ3pCUjs7OztJQVlFLFFBQVE7UUFDTixPQUFPLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckQ7OztZQVZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUNBQXFDO2dCQUMvQyxRQUFRLEVBQUU7Q0FDWDthQUNBOzs7c0JBRUUsS0FBSzs7Ozs7OztBQ1ZSOzs7O0lBdUJFLFFBQVE7UUFDTixPQUFPLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckQ7Ozs7SUFFRCxTQUFTO1FBQ1AsT0FBTyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3REOzs7WUF6QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrREFBa0Q7Z0JBQzVELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7O0NBWVg7YUFDQTs7O3NCQUVFLEtBQUs7Ozs7Ozs7QUNyQlI7OztZQUdDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMEJYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLCtEQUErRCxDQUFDO2FBQzFFOzs7Ozs7O0FDakNEOzs7WUFHQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Q0FTWDthQUNBOzs7b0JBRUUsS0FBSzs7Ozs7OztBQ2pCUjs7OztJQTZDRSxZQUFZLGVBQXdDO1FBQ2xELGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JDLGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsa0JBQWtCLEVBQUUsMkNBQTJDO1lBQy9ELGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsZUFBZSxFQUFFLGlDQUFpQztZQUNsRCxlQUFlLEVBQUUsaUNBQWlDO1lBQ2xELGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsZUFBZSxFQUFFLGlDQUFpQztZQUNsRCxpQkFBaUIsRUFBRSxtQ0FBbUM7U0FDdkQsQ0FBQyxDQUFDO0tBQ0o7OztZQXRDRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDO2dCQUN4RixZQUFZLEVBQUU7b0JBQ1osMkNBQTJDO29CQUMzQyxnQ0FBZ0M7b0JBQ2hDLGlDQUFpQztvQkFDakMsZ0NBQWdDO29CQUNoQyxpQ0FBaUM7b0JBQ2pDLGlDQUFpQztvQkFDakMsZ0NBQWdDO29CQUNoQyxtQ0FBbUM7b0JBQ25DLCtCQUErQjtvQkFDL0IsMkNBQTJDO29CQUMzQyxnQ0FBZ0M7aUJBQ2pDO2dCQUNELGVBQWUsRUFBRTtvQkFDZiwyQ0FBMkM7b0JBQzNDLGdDQUFnQztvQkFDaEMsaUNBQWlDO29CQUNqQyxpQ0FBaUM7b0JBQ2pDLGlDQUFpQztvQkFDakMsZ0NBQWdDO29CQUNoQyxtQ0FBbUM7b0JBQ25DLGdDQUFnQztpQkFDakM7YUFDRjs7OztZQXJDUSx1QkFBdUI7Ozs7Ozs7Ozs7Ozs7OzsifQ==