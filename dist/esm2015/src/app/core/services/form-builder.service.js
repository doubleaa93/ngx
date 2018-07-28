/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { whitespaceValidator } from '../validators/whitespace-validator';
export class FormBuilderService {
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
function FormBuilderService_tsickle_Closure_declarations() {
    /** @type {?} */
    FormBuilderService.prototype.fb;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvc2VydmljZXMvZm9ybS1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUVMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsVUFBVSxFQUVYLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFHekUsTUFBTTs7OztJQUNKLFlBQW9CLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO0tBQUk7Ozs7Ozs7OztJQUV2QyxLQUFLLENBQ0gsTUFBYyxFQUNkLFNBQWlCLEVBQ2pCLE1BQTJCLEVBQzNCLE1BQTJCLEVBQzNCLEtBQUssR0FBRyxFQUFFOztRQUVWLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQzs7UUFDakIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsTUFBTSxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFL0MsS0FBSyxNQUFNLGNBQWMsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFOztZQUN6QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFMUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDMUIsU0FBUzthQUNWO1lBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTs7Z0JBQ2pDLE1BQU0saUJBQWlCLHFCQUF1QixLQUFLLEVBQUM7Z0JBQ3BELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQzs7Z0JBRXhDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFL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LENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksbUJBQWEsS0FBSyxFQUFDLENBQUMsU0FBUyxFQUFFO2dCQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQWEsS0FBSyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUVELElBQUksbUJBQWEsS0FBSyxFQUFDLENBQUMsU0FBUyxFQUFFO2dCQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQWEsS0FBSyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUN0RTtZQUVELElBQUksbUJBQWdCLEtBQUssRUFBQyxDQUFDLEdBQUcsRUFBRTtnQkFDOUIsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFnQixLQUFLLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsSUFBSSxtQkFBZ0IsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFFO2dCQUM5QixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQWdCLEtBQUssRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0Q7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELE9BQU8sVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoRCxDQUFDOzs7O1lBOUhMLFVBQVU7Ozs7WUFmVCxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBGb3JtQnVpbGRlcixcclxuICBGb3JtR3JvdXAsXHJcbiAgVmFsaWRhdG9ycyxcclxuICBGb3JtQXJyYXlcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgSUZpZWxkLFxyXG4gIElUZXh0RmllbGQsXHJcbiAgSUxpbmtlZFN0cnVjdEZpZWxkLFxyXG4gIElCbG9jayxcclxuICBJSW50ZWdlckZpZWxkLFxyXG4gIElGaWVsZFJlZmVyZW5jZVxyXG59IGZyb20gJy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyB3aGl0ZXNwYWNlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy93aGl0ZXNwYWNlLXZhbGlkYXRvcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtQnVpbGRlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7fVxyXG5cclxuICBncm91cChcclxuICAgIHN0cnVjdDogc3RyaW5nLFxyXG4gICAgYmxvY2tOYW1lOiBzdHJpbmcsXHJcbiAgICBibG9ja3M6IE1hcDxzdHJpbmcsIElCbG9jaz4sXHJcbiAgICBmaWVsZHM6IE1hcDxzdHJpbmcsIElGaWVsZD4sXHJcbiAgICB2YWx1ZSA9IHt9XHJcbiAgKTogRm9ybUdyb3VwIHtcclxuICAgIGNvbnN0IGdyb3VwID0ge307XHJcbiAgICBjb25zdCBibG9jayA9IGJsb2Nrc1tgJHtzdHJ1Y3R9LSR7YmxvY2tOYW1lfWBdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZmllbGRSZWZlcmVuY2Ugb2YgYmxvY2suZmllbGRzKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzW2Ake3N0cnVjdH0tJHtmaWVsZFJlZmVyZW5jZS5maWVsZH1gXTtcclxuXHJcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSAnc3RhbXAnKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSAnbGlua2VkU3RydWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZFN0cnVjdEZpZWxkID0gPElMaW5rZWRTdHJ1Y3RGaWVsZD5maWVsZDtcclxuICAgICAgICBjb25zdCB7IHJlZmVyZW5jZSB9ID0gbGlua2VkU3RydWN0RmllbGQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5hcnJheShcclxuICAgICAgICAgIHJlZmVyZW5jZS5zdHJ1Y3QsXHJcbiAgICAgICAgICByZWZlcmVuY2UuYmxvY2ssXHJcbiAgICAgICAgICBibG9ja3MsXHJcbiAgICAgICAgICBmaWVsZHMsXHJcbiAgICAgICAgICB2YWx1ZVtmaWVsZC5uYW1lXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghYXJyYXkudmFsdWUubGVuZ3RoICYmIGxpbmtlZFN0cnVjdEZpZWxkLm1pbkluc3RhbmNlcyA+IDApIHtcclxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbmNyZW1lbnQtZGVjcmVtZW50XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtlZFN0cnVjdEZpZWxkLm1pbkluc3RhbmNlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2godGhpcy5ncm91cChyZWZlcmVuY2Uuc3RydWN0LCByZWZlcmVuY2UuYmxvY2ssIGJsb2NrcywgZmllbGRzKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBncm91cFtmaWVsZC5uYW1lXSA9IGFycmF5O1xyXG5cclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZ2V0VmFsaWRhdG9ycyhmaWVsZFJlZmVyZW5jZSwgZmllbGQpO1xyXG4gICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB2YWx1ZVtmaWVsZC5uYW1lXSB8fCBmaWVsZC5pbml0aWFsVmFsdWU7XHJcblxyXG4gICAgICBncm91cFtmaWVsZC5uYW1lXSA9IFtpbml0aWFsVmFsdWUsIHZhbGlkYXRvcnNdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuZmIuZ3JvdXAoZ3JvdXApO1xyXG5cclxuICAgIGlmICghZm9ybUdyb3VwLnZhbHVlKSB7XHJcbiAgICAgIGZvcm1Hcm91cC5wYXRjaFZhbHVlKHt9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUdyb3VwO1xyXG4gIH1cclxuXHJcbiAgYXJyYXkoXHJcbiAgICBzdHJ1Y3Q6IHN0cmluZyxcclxuICAgIGJsb2NrTmFtZTogc3RyaW5nLFxyXG4gICAgYmxvY2tzOiBNYXA8c3RyaW5nLCBJQmxvY2s+LFxyXG4gICAgZmllbGRzOiBNYXA8c3RyaW5nLCBJRmllbGQ+LFxyXG4gICAgdmFsdWUgPSBbXVxyXG4gICk6IEZvcm1BcnJheSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ncm91cChzdHJ1Y3QsIGJsb2NrTmFtZSwgYmxvY2tzLCBmaWVsZHMsIGl0ZW0pO1xyXG5cclxuICAgICAgICBhcnJheS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5mYi5hcnJheShhcnJheSk7XHJcbiAgICBpZiAoIWZvcm1BcnJheS52YWx1ZSkge1xyXG4gICAgICBmb3JtQXJyYXkuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtQXJyYXk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0VmFsaWRhdG9ycyhmaWVsZFJlZmVyZW5jZTogSUZpZWxkUmVmZXJlbmNlLCBmaWVsZDogSUZpZWxkKSB7XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gW107XHJcblxyXG4gICAgICBjb25zdCByb290ID0gY29udHJvbC5yb290O1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSBjb250cm9sLnBhcmVudDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBwYXJlbnQgaW5zdGFuY2VvZiBGb3JtR3JvdXAgJiZcclxuICAgICAgICAhZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uKHBhcmVudC52YWx1ZSwgcm9vdC52YWx1ZSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWVsZC5yZXF1aXJlZCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkLCB3aGl0ZXNwYWNlVmFsaWRhdG9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SVRleHRGaWVsZD5maWVsZCkubWluTGVuZ3RoKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKCg8SVRleHRGaWVsZD5maWVsZCkubWluTGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoPElUZXh0RmllbGQ+ZmllbGQpLm1heExlbmd0aCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCgoPElUZXh0RmllbGQ+ZmllbGQpLm1heExlbmd0aCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5taW4pIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5taW4pKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SUludGVnZXJGaWVsZD5maWVsZCkubWF4KSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KCg8SUludGVnZXJGaWVsZD5maWVsZCkubWF4KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdmFsaWRhdG9ycy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZGF0b3JzKShjb250cm9sKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==