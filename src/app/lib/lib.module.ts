import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { FieldHostComponent } from './hosts/field-host.component';
import { ButtonHostComponent } from './hosts/button-host.component';
import { FormBuilderService } from './services/form-builder.service';
import { ComponentHostDirective } from './hosts/component-host.directive';
import { DeReCrudProviderModule } from '../providers/provider/provider.module';
import { FormStateService } from './services/form-state.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DeReCrudProviderModule
  ],
  declarations: [
    FormComponent,
    FieldHostComponent,
    ButtonHostComponent,
    ComponentHostDirective
  ],
  providers: [FormStateService, FormBuilderService],
  exports: [FormComponent]
})
export class DeReCrudModule {}
