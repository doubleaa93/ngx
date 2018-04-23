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
import { Bootstrap3HeadingRendererComponent } from './heading-renderer/heading-renderer.component';

@NgModule({
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
    Bootstrap3HeadingRendererComponent
  ],
  entryComponents: [
    Bootstrap3ControlContainerRendererComponent,
    Bootstrap3InputRendererComponent,
    Bootstrap3SelectRendererComponent,
    Bootstrap3ButtonRendererComponent,
    Bootstrap3InlineRendererComponent,
    Bootstrap3TableRendererComponent,
    Bootstrap3CheckboxRendererComponent,
    Bootstrap3HeadingRendererComponent
  ]
})
export class Bootstrap3DeReCrudProviderModule {
  constructor(providerService: DeReCrudProviderService) {
    providerService.register('bootstrap3', {
      headingComponent: Bootstrap3HeadingRendererComponent,
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
