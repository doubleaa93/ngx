import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormStateService } from '../../core/services/form-state.service';
import { DeReCrudOptions } from '../../core/models/options';
import { IField } from '../../core/models/schema';
import { FormSubmission, FormSubmissionErrors } from '../../core/models/form-submission';
import { FormChange } from '../../core/models/form-change';
import { FormState } from '../../core/models/form-state';
export declare class FormComponent implements OnInit, OnChanges, OnDestroy {
    private stateService;
    private _navigationChangeSubscription;
    private _formChangeSubscription;
    private _cancelVisible;
    options: DeReCrudOptions;
    value: object;
    errors: FormSubmissionErrors;
    valueChange: EventEmitter<FormChange>;
    submit: EventEmitter<FormSubmission>;
    cancel: EventEmitter<any>;
    fields: IField[];
    state: FormState;
    submitting: boolean;
    constructor(stateService: FormStateService);
    cancelVisible: boolean;
    readonly submitEnabled: boolean;
    readonly cancelEnabled: boolean;
    readonly struct: string;
    readonly block: string;
    readonly form: AbstractControl;
    readonly parentPath: string;
    readonly parentForm: (AbstractControl | null);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    update(): void;
    getBlockFields(struct: string, blockName: string): any[];
    onCancel(e: any): void;
    onSubmit(e: any): void;
}