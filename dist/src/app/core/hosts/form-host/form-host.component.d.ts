import { SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { IField } from '../../models/schema';
import { FormState } from '../../models/form-state';
import { FormStateService } from '../../services/form-state.service';
export declare class FormHostComponent implements OnInit, OnChanges {
    private stateService;
    private _struct;
    private _block;
    formId: number;
    form: FormGroup;
    fields: IField[];
    parentForm: AbstractControl;
    parentPath: string;
    state: FormState;
    constructor(stateService: FormStateService);
    struct: string;
    block: string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
