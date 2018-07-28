import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IField, IBlock } from '../models/schema';
export declare class FormBuilderService {
    private fb;
    constructor(fb: FormBuilder);
    group(struct: string, blockName: string, blocks: Map<string, IBlock>, fields: Map<string, IField>, value?: {}): FormGroup;
    array(struct: string, blockName: string, blocks: Map<string, IBlock>, fields: Map<string, IField>, value?: any[]): FormArray;
    private getValidators;
}
