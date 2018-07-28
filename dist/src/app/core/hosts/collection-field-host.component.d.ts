import { OnInit, ComponentFactoryResolver, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import { CollectionControlRenderer, ICollectionControl } from '../renderers/control.renderer';
import { FormState } from '../models/form-state';
import { FormStateService } from '../services/form-state.service';
import { DeReCrudProviderService } from '../../providers/provider/provider.service';
import { ComponentHostDirective } from './component-host.directive';
export declare class CollectionFieldHostComponent implements OnInit, OnChanges, OnDestroy, CollectionControlRenderer {
    private stateService;
    private componentFactoryResolver;
    private providerService;
    private _componentRef;
    componentHost: ComponentHostDirective;
    control: ICollectionControl;
    state: FormState;
    constructor(stateService: FormStateService, componentFactoryResolver: ComponentFactoryResolver, providerService: DeReCrudProviderService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    render(): void;
    updateInputs(): void;
    onAdd: (e: any) => void;
}
