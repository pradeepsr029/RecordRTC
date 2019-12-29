import { Component } from '@angular/core';
import { RecordRTCService } from './services/record-rtc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public _recordRTC:RecordRTCService
  ){}


  startVoiceRecord(){
    this._recordRTC.toggleRecord();
  }
}
