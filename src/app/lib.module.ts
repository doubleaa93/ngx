import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableRendererComponent } from './table-renderer/table-renderer.component';
import { FormRendererComponent } from './form-renderer/form-renderer.component';
import { FormComponent } from './form/form.component';
import { BlockRendererComponent } from './block-renderer/block-renderer.component';
import { ControlRendererComponent } from './control-renderer/control-renderer.component';
import { FormattedLabelPipe } from './formatted-label.pipe';
import { FormBuilderService } from './form-builder.service';

@NgModule({
  declarations: [
    TableRendererComponent,
    FormRendererComponent,
    FormComponent,
    BlockRendererComponent,
    ControlRendererComponent,
    FormattedLabelPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent
  ],
  providers: [FormBuilderService, FormattedLabelPipe]
})
export class DeReCrudModule { }
