import { OnInit, OnChanges, OnDestroy, ComponentFactoryResolver, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { IField, IFieldReference } from '../models/schema';
import { FormStateService } from '../services/form-state.service';
import { FormState } from '../models/form-state';
import { ComponentHostDirective } from './component-host.directive';
export declare class StampFieldHostComponent implements OnInit, OnChanges, OnDestroy {
    private stateService;
    private componentFactoryResolver;
    private providerService;
    private _componentRef;
    componentHost: ComponentHostDirective;
    formId: number;
    form: FormGroup;
    struct: string;
    block: string;
    field: IField;
    state: FormState;
    fieldReference: IFieldReference;
    constructor(stateService: FormStateService, componentFactoryResolver: ComponentFactoryResolver, providerService: DeReCrudProviderService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    shouldRender(): boolean;
    render(): void;
    updateInputs(): void;
}
