/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { whitespaceValidator } from '../validators/whitespace-validator';
var FormBuilderService = /** @class */ (function () {
    function FormBuilderService(fb) {
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
    FormBuilderService.prototype.group = /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    function (struct, blockName, blocks, fields, value) {
        if (value === void 0) { value = {}; }
        var e_1, _a;
        /** @type {?} */
        var group = {};
        /** @type {?} */
        var block = blocks[struct + "-" + blockName];
        try {
            for (var _b = tslib_1.__values(block.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fieldReference = _c.value;
                /** @type {?} */
                var field = fields[struct + "-" + fieldReference.field];
                if (field.type === 'stamp') {
                    continue;
                }
                if (field.type === 'linkedStruct') {
                    /** @type {?} */
                    var linkedStructField = /** @type {?} */ (field);
                    var reference = linkedStructField.reference;
                    /** @type {?} */
                    var array = this.array(reference.struct, reference.block, blocks, fields, value[field.name]);
                    if (!array.value.length && linkedStructField.minInstances > 0) {
                        // tslint:disable-next-line:no-increment-decrement
                        for (var i = 0; i < linkedStructField.minInstances; i++) {
                            array.push(this.group(reference.struct, reference.block, blocks, fields));
                        }
                    }
                    group[field.name] = array;
                    continue;
                }
                /** @type {?} */
                var validators = this.getValidators(fieldReference, field);
                /** @type {?} */
                var initialValue = value[field.name] || field.initialValue;
                group[field.name] = [initialValue, validators];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /** @type {?} */
        var formGroup = this.fb.group(group);
        if (!formGroup.value) {
            formGroup.patchValue({});
        }
        return formGroup;
    };
    /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    FormBuilderService.prototype.array = /**
     * @param {?} struct
     * @param {?} blockName
     * @param {?} blocks
     * @param {?} fields
     * @param {?=} value
     * @return {?}
     */
    function (struct, blockName, blocks, fields, value) {
        var _this = this;
        if (value === void 0) { value = []; }
        /** @type {?} */
        var array = [];
        if (value && value.length) {
            value.forEach(function (item) {
                /** @type {?} */
                var group = _this.group(struct, blockName, blocks, fields, item);
                array.push(group);
            });
        }
        /** @type {?} */
        var formArray = this.fb.array(array);
        if (!formArray.value) {
            formArray.setValue([]);
        }
        return formArray;
    };
    /**
     * @param {?} fieldReference
     * @param {?} field
     * @return {?}
     */
    FormBuilderService.prototype.getValidators = /**
     * @param {?} fieldReference
     * @param {?} field
     * @return {?}
     */
    function (fieldReference, field) {
        return function (control) {
            /** @type {?} */
            var validators = [];
            /** @type {?} */
            var root = control.root;
            /** @type {?} */
            var parent = control.parent;
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
    };
    FormBuilderService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FormBuilderService.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    return FormBuilderService;
}());
export { FormBuilderService };
function FormBuilderService_tsickle_Closure_declarations() {
    /** @type {?} */
    FormBuilderService.prototype.fb;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL2NvcmUvc2VydmljZXMvZm9ybS1idWlsZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNULFVBQVUsRUFFWCxNQUFNLGdCQUFnQixDQUFDO0FBU3hCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztJQUl2RSw0QkFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7S0FBSTs7Ozs7Ozs7O0lBRXZDLGtDQUFLOzs7Ozs7OztJQUFMLFVBQ0UsTUFBYyxFQUNkLFNBQWlCLEVBQ2pCLE1BQTJCLEVBQzNCLE1BQTJCLEVBQzNCLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7OztRQUVWLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQzs7UUFDakIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFJLE1BQU0sU0FBSSxTQUFXLENBQUMsQ0FBQzs7WUFFL0MsS0FBNkIsSUFBQSxLQUFBLGlCQUFBLEtBQUssQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQXRDLElBQU0sY0FBYyxXQUFBOztnQkFDdkIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFJLE1BQU0sU0FBSSxjQUFjLENBQUMsS0FBTyxDQUFDLENBQUM7Z0JBRTFELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7b0JBQzFCLFNBQVM7aUJBQ1Y7Z0JBRUQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTs7b0JBQ2pDLElBQU0saUJBQWlCLHFCQUF1QixLQUFLLEVBQUM7b0JBQzVDLElBQUEsdUNBQVMsQ0FBdUI7O29CQUV4QyxJQUFNLEtBQUssR0FB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Q2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2FBQzNEO1lBRUQsSUFBSSxtQkFBYSxLQUFLLEVBQUMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxtQkFBYSxLQUFLLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1lBRUQsSUFBSSxtQkFBYSxLQUFLLEVBQUMsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxtQkFBYSxLQUFLLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1lBRUQsSUFBSSxtQkFBZ0IsS0FBSyxFQUFDLENBQUMsR0FBRyxFQUFFO2dCQUM5QixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsbUJBQWdCLEtBQUssRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0Q7WUFFRCxJQUFJLG1CQUFnQixLQUFLLEVBQUMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzlCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBZ0IsS0FBSyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3RDtZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUN0QixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hELENBQUM7OztnQkE5SEwsVUFBVTs7OztnQkFmVCxXQUFXOzs2QkFIYjs7U0FtQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBGb3JtQnVpbGRlcixcclxuICBGb3JtR3JvdXAsXHJcbiAgVmFsaWRhdG9ycyxcclxuICBGb3JtQXJyYXlcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7XHJcbiAgSUZpZWxkLFxyXG4gIElUZXh0RmllbGQsXHJcbiAgSUxpbmtlZFN0cnVjdEZpZWxkLFxyXG4gIElCbG9jayxcclxuICBJSW50ZWdlckZpZWxkLFxyXG4gIElGaWVsZFJlZmVyZW5jZVxyXG59IGZyb20gJy4uL21vZGVscy9zY2hlbWEnO1xyXG5pbXBvcnQgeyB3aGl0ZXNwYWNlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy93aGl0ZXNwYWNlLXZhbGlkYXRvcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGb3JtQnVpbGRlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7fVxyXG5cclxuICBncm91cChcclxuICAgIHN0cnVjdDogc3RyaW5nLFxyXG4gICAgYmxvY2tOYW1lOiBzdHJpbmcsXHJcbiAgICBibG9ja3M6IE1hcDxzdHJpbmcsIElCbG9jaz4sXHJcbiAgICBmaWVsZHM6IE1hcDxzdHJpbmcsIElGaWVsZD4sXHJcbiAgICB2YWx1ZSA9IHt9XHJcbiAgKTogRm9ybUdyb3VwIHtcclxuICAgIGNvbnN0IGdyb3VwID0ge307XHJcbiAgICBjb25zdCBibG9jayA9IGJsb2Nrc1tgJHtzdHJ1Y3R9LSR7YmxvY2tOYW1lfWBdO1xyXG5cclxuICAgIGZvciAoY29uc3QgZmllbGRSZWZlcmVuY2Ugb2YgYmxvY2suZmllbGRzKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gZmllbGRzW2Ake3N0cnVjdH0tJHtmaWVsZFJlZmVyZW5jZS5maWVsZH1gXTtcclxuXHJcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSAnc3RhbXAnKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWVsZC50eXBlID09PSAnbGlua2VkU3RydWN0Jykge1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZFN0cnVjdEZpZWxkID0gPElMaW5rZWRTdHJ1Y3RGaWVsZD5maWVsZDtcclxuICAgICAgICBjb25zdCB7IHJlZmVyZW5jZSB9ID0gbGlua2VkU3RydWN0RmllbGQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gdGhpcy5hcnJheShcclxuICAgICAgICAgIHJlZmVyZW5jZS5zdHJ1Y3QsXHJcbiAgICAgICAgICByZWZlcmVuY2UuYmxvY2ssXHJcbiAgICAgICAgICBibG9ja3MsXHJcbiAgICAgICAgICBmaWVsZHMsXHJcbiAgICAgICAgICB2YWx1ZVtmaWVsZC5uYW1lXVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghYXJyYXkudmFsdWUubGVuZ3RoICYmIGxpbmtlZFN0cnVjdEZpZWxkLm1pbkluc3RhbmNlcyA+IDApIHtcclxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbmNyZW1lbnQtZGVjcmVtZW50XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtlZFN0cnVjdEZpZWxkLm1pbkluc3RhbmNlczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2godGhpcy5ncm91cChyZWZlcmVuY2Uuc3RydWN0LCByZWZlcmVuY2UuYmxvY2ssIGJsb2NrcywgZmllbGRzKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBncm91cFtmaWVsZC5uYW1lXSA9IGFycmF5O1xyXG5cclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMuZ2V0VmFsaWRhdG9ycyhmaWVsZFJlZmVyZW5jZSwgZmllbGQpO1xyXG4gICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSB2YWx1ZVtmaWVsZC5uYW1lXSB8fCBmaWVsZC5pbml0aWFsVmFsdWU7XHJcblxyXG4gICAgICBncm91cFtmaWVsZC5uYW1lXSA9IFtpbml0aWFsVmFsdWUsIHZhbGlkYXRvcnNdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuZmIuZ3JvdXAoZ3JvdXApO1xyXG5cclxuICAgIGlmICghZm9ybUdyb3VwLnZhbHVlKSB7XHJcbiAgICAgIGZvcm1Hcm91cC5wYXRjaFZhbHVlKHt9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9ybUdyb3VwO1xyXG4gIH1cclxuXHJcbiAgYXJyYXkoXHJcbiAgICBzdHJ1Y3Q6IHN0cmluZyxcclxuICAgIGJsb2NrTmFtZTogc3RyaW5nLFxyXG4gICAgYmxvY2tzOiBNYXA8c3RyaW5nLCBJQmxvY2s+LFxyXG4gICAgZmllbGRzOiBNYXA8c3RyaW5nLCBJRmllbGQ+LFxyXG4gICAgdmFsdWUgPSBbXVxyXG4gICk6IEZvcm1BcnJheSB7XHJcbiAgICBjb25zdCBhcnJheSA9IFtdO1xyXG5cclxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ncm91cChzdHJ1Y3QsIGJsb2NrTmFtZSwgYmxvY2tzLCBmaWVsZHMsIGl0ZW0pO1xyXG5cclxuICAgICAgICBhcnJheS5wdXNoKGdyb3VwKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5mYi5hcnJheShhcnJheSk7XHJcbiAgICBpZiAoIWZvcm1BcnJheS52YWx1ZSkge1xyXG4gICAgICBmb3JtQXJyYXkuc2V0VmFsdWUoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmb3JtQXJyYXk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHByaXZhdGUgZ2V0VmFsaWRhdG9ycyhmaWVsZFJlZmVyZW5jZTogSUZpZWxkUmVmZXJlbmNlLCBmaWVsZDogSUZpZWxkKSB7XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCkgPT4ge1xyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzID0gW107XHJcblxyXG4gICAgICBjb25zdCByb290ID0gY29udHJvbC5yb290O1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSBjb250cm9sLnBhcmVudDtcclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICBwYXJlbnQgaW5zdGFuY2VvZiBGb3JtR3JvdXAgJiZcclxuICAgICAgICAhZmllbGRSZWZlcmVuY2UuY29uZGl0aW9uKHBhcmVudC52YWx1ZSwgcm9vdC52YWx1ZSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmaWVsZC5yZXF1aXJlZCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkLCB3aGl0ZXNwYWNlVmFsaWRhdG9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SVRleHRGaWVsZD5maWVsZCkubWluTGVuZ3RoKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKCg8SVRleHRGaWVsZD5maWVsZCkubWluTGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgoPElUZXh0RmllbGQ+ZmllbGQpLm1heExlbmd0aCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aCgoPElUZXh0RmllbGQ+ZmllbGQpLm1heExlbmd0aCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5taW4pIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oKDxJSW50ZWdlckZpZWxkPmZpZWxkKS5taW4pKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCg8SUludGVnZXJGaWVsZD5maWVsZCkubWF4KSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KCg8SUludGVnZXJGaWVsZD5maWVsZCkubWF4KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghdmFsaWRhdG9ycy5sZW5ndGgpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZSh2YWxpZGF0b3JzKShjb250cm9sKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==