import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { InputRendererComponent } from './renderers/input-renderer/input-renderer.component';
import { SelectRendererComponent } from './renderers/select-renderer/select-renderer.component';
import { LabelRendererComponent } from './renderers/label-renderer/label-renderer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FormComponent,
    InputRendererComponent,
    SelectRendererComponent,
    LabelRendererComponent
  ],
  exports: [FormComponent]
})
export class LibModule {}
