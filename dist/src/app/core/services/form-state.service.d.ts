import { FormGroup } from '@angular/forms';
import { DeReCrudOptions } from '../models/options';
import { IStruct, IField, IBlock } from '../models/schema';
import { FormSubmissionErrors } from '../models/form-submission';
import { FormBuilderService } from './form-builder.service';
import { FormState } from '../models/form-state';
export declare type GetKeyFunction<T> = (item: T) => string;
export declare class FormStateService {
    private formBuilder;
    private static defaultConditionFunc;
    private _cache;
    constructor(formBuilder: FormBuilderService);
    static generateId(): number;
    static assignDefaults(options: DeReCrudOptions): void;
    static parseLabel(label: string | {
        short: string;
    }): string;
    static parseSchema(options: DeReCrudOptions): {
        structs: IStruct[];
        fields: IField[];
        blocks: IBlock[];
    };
    get(id: number): FormState;
    create(options: DeReCrudOptions, value: object, initialErrors?: FormSubmissionErrors): FormState;
    createForm(formId: number, struct: string, block: string): FormGroup;
    update(id: number, value: object): void;
    remove(id: number): void;
    clearErrors(id: number, formPath?: string): void;
    setErrors(id: number, errors: FormSubmissionErrors): void;
    onChange(id: number, formPath: string, newValue: any, event: string): void;
    pushNavigation(id: number, struct: string, block: string, path: string, parentPath: string): void;
    popNavigation(id: number): void;
    completeNavigation(id: number): void;
    private pushNavigationChange;
    private pushSubmissionErrorsChange;
    private arrayToMap;
}
