import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LibModule } from './lib/lib.module';
import { AppComponent } from './app.component';
import { Bootstrap3Module } from './providers/bootstrap3/bootstrap3.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LibModule, Bootstrap3Module],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
