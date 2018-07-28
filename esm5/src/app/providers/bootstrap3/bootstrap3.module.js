/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Bootstrap3ControlContainerRendererComponent } from './control-container-renderer/control-container-renderer.component';
import { DeReCrudCoreModule } from '../../core/core.module';
import { DeReCrudProviderModule } from '../provider/provider.module';
import { DeReCrudProviderService } from '../provider/provider.service';
import { Bootstrap3InputRendererComponent } from './input-renderer/input-renderer.component';
import { Bootstrap3SelectRendererComponent } from './select-renderer/select-renderer.component';
import { Bootstrap3LabelRendererComponent } from './label-renderer/label-renderer.component';
import { Bootstrap3ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { Bootstrap3TableRendererComponent } from './table-renderer/table-renderer.component';
import { Bootstrap3CheckboxRendererComponent } from './checkbox-renderer/checkbox-renderer.component';
import { Bootstrap3HelpRendererComponent } from './help-renderer/help-renderer.component';
import { Bootstrap3ValidationErrorsRendererComponent } from './validation-errors-renderer/validation-errors-renderer.component';
import { Bootstrap3InlineRendererComponent } from './inline-renderer/inline-renderer.component';
import { Bootstrap3StampRendererComponent } from './stamp-renderer/stamp-renderer.component';
var Bootstrap3DeReCrudProviderModule = /** @class */ (function () {
    function Bootstrap3DeReCrudProviderModule(providerService) {
        providerService.register('bootstrap3', {
            stampComponent: Bootstrap3StampRendererComponent,
            containerComponent: Bootstrap3ControlContainerRendererComponent,
            inputComponent: Bootstrap3InputRendererComponent,
            selectComponent: Bootstrap3SelectRendererComponent,
            buttonComponent: Bootstrap3ButtonRendererComponent,
            tableComponent: Bootstrap3TableRendererComponent,
            inlineComponent: Bootstrap3InlineRendererComponent,
            checkboxComponent: Bootstrap3CheckboxRendererComponent
        });
    }
    Bootstrap3DeReCrudProviderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, ReactiveFormsModule, DeReCrudCoreModule, DeReCrudProviderModule],
                    declarations: [
                        Bootstrap3ControlContainerRendererComponent,
                        Bootstrap3InputRendererComponent,
                        Bootstrap3SelectRendererComponent,
                        Bootstrap3LabelRendererComponent,
                        Bootstrap3ButtonRendererComponent,
                        Bootstrap3InlineRendererComponent,
                        Bootstrap3TableRendererComponent,
                        Bootstrap3CheckboxRendererComponent,
                        Bootstrap3HelpRendererComponent,
                        Bootstrap3ValidationErrorsRendererComponent,
                        Bootstrap3StampRendererComponent
                    ],
                    entryComponents: [
                        Bootstrap3ControlContainerRendererComponent,
                        Bootstrap3InputRendererComponent,
                        Bootstrap3SelectRendererComponent,
                        Bootstrap3ButtonRendererComponent,
                        Bootstrap3InlineRendererComponent,
                        Bootstrap3TableRendererComponent,
                        Bootstrap3CheckboxRendererComponent,
                        Bootstrap3StampRendererComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    Bootstrap3DeReCrudProviderModule.ctorParameters = function () { return [
        { type: DeReCrudProviderService }
    ]; };
    return Bootstrap3DeReCrudProviderModule;
}());
export { Bootstrap3DeReCrudProviderModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2Jvb3RzdHJhcDMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7SUE2QjNGLDBDQUFZLGVBQXdDO1FBQ2xELGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JDLGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsa0JBQWtCLEVBQUUsMkNBQTJDO1lBQy9ELGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsZUFBZSxFQUFFLGlDQUFpQztZQUNsRCxlQUFlLEVBQUUsaUNBQWlDO1lBQ2xELGNBQWMsRUFBRSxnQ0FBZ0M7WUFDaEQsZUFBZSxFQUFFLGlDQUFpQztZQUNsRCxpQkFBaUIsRUFBRSxtQ0FBbUM7U0FDdkQsQ0FBQyxDQUFDO0tBQ0o7O2dCQXRDRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDO29CQUN4RixZQUFZLEVBQUU7d0JBQ1osMkNBQTJDO3dCQUMzQyxnQ0FBZ0M7d0JBQ2hDLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3dCQUNoQyxpQ0FBaUM7d0JBQ2pDLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3dCQUNoQyxtQ0FBbUM7d0JBQ25DLCtCQUErQjt3QkFDL0IsMkNBQTJDO3dCQUMzQyxnQ0FBZ0M7cUJBQ2pDO29CQUNELGVBQWUsRUFBRTt3QkFDZiwyQ0FBMkM7d0JBQzNDLGdDQUFnQzt3QkFDaEMsaUNBQWlDO3dCQUNqQyxpQ0FBaUM7d0JBQ2pDLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3dCQUNoQyxtQ0FBbUM7d0JBQ25DLGdDQUFnQztxQkFDakM7aUJBQ0Y7Ozs7Z0JBckNRLHVCQUF1Qjs7MkNBTmhDOztTQTRDYSxnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzQ29udHJvbENvbnRhaW5lclJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci9jb250cm9sLWNvbnRhaW5lci1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZENvcmVNb2R1bGUgfSBmcm9tICcuLi8uLi9jb3JlL2NvcmUubW9kdWxlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlck1vZHVsZSB9IGZyb20gJy4uL3Byb3ZpZGVyL3Byb3ZpZGVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvdmlkZXIvcHJvdmlkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9pbnB1dC1yZW5kZXJlci9pbnB1dC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1yZW5kZXJlci9zZWxlY3QtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0xhYmVsUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2xhYmVsLXJlbmRlcmVyL2xhYmVsLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNCdXR0b25SZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vYnV0dG9uLXJlbmRlcmVyL2J1dHRvbi1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzVGFibGVSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcmVuZGVyZXIvdGFibGUtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0NoZWNrYm94UmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94LXJlbmRlcmVyL2NoZWNrYm94LXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNIZWxwUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2hlbHAtcmVuZGVyZXIvaGVscC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzVmFsaWRhdGlvbkVycm9yc1JlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci92YWxpZGF0aW9uLWVycm9ycy1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzSW5saW5lUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2lubGluZS1yZW5kZXJlci9pbmxpbmUtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3N0YW1wLXJlbmRlcmVyL3N0YW1wLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUsIERlUmVDcnVkQ29yZU1vZHVsZSwgRGVSZUNydWRQcm92aWRlck1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBCb290c3RyYXAzQ29udHJvbENvbnRhaW5lclJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzTGFiZWxSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNCdXR0b25SZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0NoZWNrYm94UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSGVscFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1ZhbGlkYXRpb25FcnJvcnNSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNCdXR0b25SZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0NoZWNrYm94UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcDNEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlIHtcclxuICBjb25zdHJ1Y3Rvcihwcm92aWRlclNlcnZpY2U6IERlUmVDcnVkUHJvdmlkZXJTZXJ2aWNlKSB7XHJcbiAgICBwcm92aWRlclNlcnZpY2UucmVnaXN0ZXIoJ2Jvb3RzdHJhcDMnLCB7XHJcbiAgICAgIHN0YW1wQ29tcG9uZW50OiBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgY29udGFpbmVyQ29tcG9uZW50OiBCb290c3RyYXAzQ29udHJvbENvbnRhaW5lclJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBpbnB1dENvbXBvbmVudDogQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIHNlbGVjdENvbXBvbmVudDogQm9vdHN0cmFwM1NlbGVjdFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBidXR0b25Db21wb25lbnQ6IEJvb3RzdHJhcDNCdXR0b25SZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgdGFibGVDb21wb25lbnQ6IEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBpbmxpbmVDb21wb25lbnQ6IEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgY2hlY2tib3hDb21wb25lbnQ6IEJvb3RzdHJhcDNDaGVja2JveFJlbmRlcmVyQ29tcG9uZW50XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19