import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Bootstrap3DeReCrudProviderModule } from './providers/bootstrap3/bootstrap3.module';
import { DeReCrudFormsModule } from './forms/forms.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Bootstrap3DeReCrudProviderModule, DeReCrudFormsModule],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
