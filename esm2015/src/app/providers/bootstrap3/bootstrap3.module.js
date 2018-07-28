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
export class Bootstrap3DeReCrudProviderModule {
    /**
     * @param {?} providerService
     */
    constructor(providerService) {
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
Bootstrap3DeReCrudProviderModule.ctorParameters = () => [
    { type: DeReCrudProviderService }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwMy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZGUtcmUtY3J1ZC9uZ3gvIiwic291cmNlcyI6WyJzcmMvYXBwL3Byb3ZpZGVycy9ib290c3RyYXAzL2Jvb3RzdHJhcDMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRixPQUFPLEVBQUUsMkNBQTJDLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUNoSSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQTRCN0YsTUFBTTs7OztJQUNKLFlBQVksZUFBd0M7UUFDbEQsZUFBZSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDckMsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxrQkFBa0IsRUFBRSwyQ0FBMkM7WUFDL0QsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxlQUFlLEVBQUUsaUNBQWlDO1lBQ2xELGVBQWUsRUFBRSxpQ0FBaUM7WUFDbEQsY0FBYyxFQUFFLGdDQUFnQztZQUNoRCxlQUFlLEVBQUUsaUNBQWlDO1lBQ2xELGlCQUFpQixFQUFFLG1DQUFtQztTQUN2RCxDQUFDLENBQUM7S0FDSjs7O1lBdENGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUM7Z0JBQ3hGLFlBQVksRUFBRTtvQkFDWiwyQ0FBMkM7b0JBQzNDLGdDQUFnQztvQkFDaEMsaUNBQWlDO29CQUNqQyxnQ0FBZ0M7b0JBQ2hDLGlDQUFpQztvQkFDakMsaUNBQWlDO29CQUNqQyxnQ0FBZ0M7b0JBQ2hDLG1DQUFtQztvQkFDbkMsK0JBQStCO29CQUMvQiwyQ0FBMkM7b0JBQzNDLGdDQUFnQztpQkFDakM7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLDJDQUEyQztvQkFDM0MsZ0NBQWdDO29CQUNoQyxpQ0FBaUM7b0JBQ2pDLGlDQUFpQztvQkFDakMsaUNBQWlDO29CQUNqQyxnQ0FBZ0M7b0JBQ2hDLG1DQUFtQztvQkFDbkMsZ0NBQWdDO2lCQUNqQzthQUNGOzs7O1lBckNRLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyL2NvbnRyb2wtY29udGFpbmVyLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERlUmVDcnVkQ29yZU1vZHVsZSB9IGZyb20gJy4uLy4uL2NvcmUvY29yZS5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlIH0gZnJvbSAnLi4vcHJvdmlkZXIvcHJvdmlkZXIubW9kdWxlJztcclxuaW1wb3J0IHsgRGVSZUNydWRQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuLi9wcm92aWRlci9wcm92aWRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0lucHV0UmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL2lucHV0LXJlbmRlcmVyL2lucHV0LXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXJlbmRlcmVyL3NlbGVjdC1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzTGFiZWxSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vbGFiZWwtcmVuZGVyZXIvbGFiZWwtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9idXR0b24tcmVuZGVyZXIvYnV0dG9uLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNUYWJsZVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yZW5kZXJlci90YWJsZS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vY2hlY2tib3gtcmVuZGVyZXIvY2hlY2tib3gtcmVuZGVyZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQm9vdHN0cmFwM0hlbHBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaGVscC1yZW5kZXJlci9oZWxwLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNWYWxpZGF0aW9uRXJyb3JzUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3ZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyL3ZhbGlkYXRpb24tZXJyb3JzLXJlbmRlcmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEJvb3RzdHJhcDNJbmxpbmVSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vaW5saW5lLXJlbmRlcmVyL2lubGluZS1yZW5kZXJlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBCb290c3RyYXAzU3RhbXBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vc3RhbXAtcmVuZGVyZXIvc3RhbXAtcmVuZGVyZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRGVSZUNydWRDb3JlTW9kdWxlLCBEZVJlQ3J1ZFByb3ZpZGVyTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTZWxlY3RSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNMYWJlbFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNIZWxwUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzVmFsaWRhdGlvbkVycm9yc1JlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1N0YW1wUmVuZGVyZXJDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgQm9vdHN0cmFwM0NvbnRyb2xDb250YWluZXJSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNJbnB1dFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1NlbGVjdFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICBCb290c3RyYXAzQ2hlY2tib3hSZW5kZXJlckNvbXBvbmVudCxcclxuICAgIEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwM0RlUmVDcnVkUHJvdmlkZXJNb2R1bGUge1xyXG4gIGNvbnN0cnVjdG9yKHByb3ZpZGVyU2VydmljZTogRGVSZUNydWRQcm92aWRlclNlcnZpY2UpIHtcclxuICAgIHByb3ZpZGVyU2VydmljZS5yZWdpc3RlcignYm9vdHN0cmFwMycsIHtcclxuICAgICAgc3RhbXBDb21wb25lbnQ6IEJvb3RzdHJhcDNTdGFtcFJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBjb250YWluZXJDb21wb25lbnQ6IEJvb3RzdHJhcDNDb250cm9sQ29udGFpbmVyUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGlucHV0Q29tcG9uZW50OiBCb290c3RyYXAzSW5wdXRSZW5kZXJlckNvbXBvbmVudCxcclxuICAgICAgc2VsZWN0Q29tcG9uZW50OiBCb290c3RyYXAzU2VsZWN0UmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGJ1dHRvbkNvbXBvbmVudDogQm9vdHN0cmFwM0J1dHRvblJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICB0YWJsZUNvbXBvbmVudDogQm9vdHN0cmFwM1RhYmxlUmVuZGVyZXJDb21wb25lbnQsXHJcbiAgICAgIGlubGluZUNvbXBvbmVudDogQm9vdHN0cmFwM0lubGluZVJlbmRlcmVyQ29tcG9uZW50LFxyXG4gICAgICBjaGVja2JveENvbXBvbmVudDogQm9vdHN0cmFwM0NoZWNrYm94UmVuZGVyZXJDb21wb25lbnRcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=