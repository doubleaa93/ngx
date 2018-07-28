import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonRenderer, IButton } from '../../../core/renderers/button.renderer';
export declare class Bootstrap3ButtonRendererComponent implements OnInit, OnChanges, ButtonRenderer {
    button: IButton;
    _classes: string[];
    readonly classes: string[];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateClasses(): void;
}
