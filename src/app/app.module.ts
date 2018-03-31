import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeReCrudModule } from './lib/lib.module';
import { AppComponent } from './app.component';
import { Bootstrap3DeReCrudProviderModule } from './providers/bootstrap3/bootstrap3.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Bootstrap3DeReCrudProviderModule, DeReCrudModule],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
