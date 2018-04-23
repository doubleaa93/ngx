import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentHostDirective } from './hosts/component-host.directive';
import { InputFieldHostComponent } from './hosts/input-field-host.component';
import { ButtonHostComponent } from './hosts/button-host.component';
import { FormBuilderService } from './services/form-builder.service';
import { FormStateService } from './services/form-state.service';
import { CollectionFieldHostComponent } from './hosts/collection-field-host.component';
import { HeadingFieldHostComponent } from './hosts/heading-field-host.component';
import { FormHostComponent } from './hosts/form-host/form-host.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComponentHostDirective,
    InputFieldHostComponent,
    HeadingFieldHostComponent,
    ButtonHostComponent,
    CollectionFieldHostComponent,
    FormHostComponent
  ],
  providers: [FormStateService, FormBuilderService],
  exports: [InputFieldHostComponent, HeadingFieldHostComponent, ButtonHostComponent, FormHostComponent],
  entryComponents: [CollectionFieldHostComponent]
})
export class DeReCrudCoreModule { }
