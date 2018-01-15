import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DeReCrudModule } from './lib.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DeReCrudModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
