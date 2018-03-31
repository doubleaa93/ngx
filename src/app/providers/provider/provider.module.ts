import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeReCrudProviderService } from './provider.service';

@NgModule({
  imports: [CommonModule],
  providers: [DeReCrudProviderService],
  declarations: []
})
export class DeReCrudProviderModule {}
