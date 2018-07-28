import { OnInit, OnChanges, OnDestroy, ComponentFactoryResolver, SimpleChanges, EventEmitter } from '@angular/core';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { FormState } from '../models/form-state';
import { FormStateService } from '../services/form-state.service';
import { ComponentHostDirective } from './component-host.directive';
export declare class ButtonHostComponent implements OnInit, OnChanges, OnDestroy {
    private stateService;
    private componentFactoryResolver;
    private providerService;
    private _componentRef;
    componentHost: ComponentHostDirective;
    formId: number;
    type: 'button' | 'submit' | 'cancel';
    extraClasses: string | string[];
    text: string;
    disabled: boolean;
    click: EventEmitter<any>;
    state: FormState;
    constructor(stateService: FormStateService, componentFactoryResolver: ComponentFactoryResolver, providerService: DeReCrudProviderService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    render(): void;
    updateInputs(): void;
    onClick: (e: any) => void;
}
