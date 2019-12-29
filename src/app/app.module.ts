import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RecordRTCService } from './services/record-rtc.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RecordRTCService],
  bootstrap: [AppComponent]
})
export class AppModule { }
