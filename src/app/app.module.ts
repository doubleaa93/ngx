import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LibModule } from './lib/lib.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LibModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
