import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Bootstrap3ControlContainerRendererComponent } from './control-container-renderer/control-container-renderer.component';
import { DeReCrudProviderModule } from '../provider/provider.module';
import { DeReCrudProviderService } from '../provider/provider.service';
import { Bootstrap3InputRendererComponent } from './input-renderer/input-renderer.component';
import { Bootstrap3SelectRendererComponent } from './select-renderer/select-renderer.component';
import { Bootstrap3LabelRendererComponent } from './label-renderer/label-renderer.component';
import { Bootstrap3ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { Bootstrap3ValidationErrorRendererComponent } from './validation-error-renderer/validation-error-renderer.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, DeReCrudProviderModule],
  declarations: [
    Bootstrap3ControlContainerRendererComponent,
    Bootstrap3InputRendererComponent,
    Bootstrap3SelectRendererComponent,
    Bootstrap3LabelRendererComponent,
    Bootstrap3ButtonRendererComponent,
    Bootstrap3ValidationErrorRendererComponent
  ],
  entryComponents: [
    Bootstrap3ControlContainerRendererComponent,
    Bootstrap3InputRendererComponent,
    Bootstrap3SelectRendererComponent,
    Bootstrap3ButtonRendererComponent
  ]
})
export class Bootstrap3DeReCrudProviderModule {
  constructor(providerService: DeReCrudProviderService) {
    providerService.register('bootstrap3', {
      containerComponent: Bootstrap3ControlContainerRendererComponent,
      inputComponent: Bootstrap3InputRendererComponent,
      selectComponent: Bootstrap3SelectRendererComponent,
      buttonComponent: Bootstrap3ButtonRendererComponent
    });
  }
}
