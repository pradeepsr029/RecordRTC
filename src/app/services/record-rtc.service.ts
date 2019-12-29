import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class RecordRTCService {
  /**
   * NOTE: if your are upload the file on server then you change your according
   * UPLOAD ON SERVER @function stopRTC write your code
   */

  blobUrl: any;
  interval; recordingTimer: string; recordWebRTC: any; mediaRecordStream: any;
  options: any = {
    type: 'audio',
    mimeType: 'audio/webm'
  }

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  /**
   * @function toggleRecord
   * check recording base on `recordingTimer`
   * getting permission on `mediaDevices` audio
   */
  toggleRecord() {
    if (this.recordingTimer) {
      this.stopRTC();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.startRTC(stream);
      }).catch(error => {
        alert(error)
      })
    }
  }

  /**
   * @param stream 
   * @name recordWebRTC set recording `stream` and `options`
   * @var blobUrl set null UI update
   * @see startCountdown()
   */
  startRTC(stream: any) {
    this.recordWebRTC = new RecordRTC.StereoAudioRecorder(stream, this.options);
    this.mediaRecordStream = stream;
    this.blobUrl = null;
    this.recordWebRTC.record();
    this.startCountdown();
  }

  /**
   * @function stopRTC
   * after `stop` recordWebRTC function getting blob
   * blob file making to blob url `blobUrl`
   * @name startCountdown stop counting with stream
   */
  stopRTC() {
    this.recordWebRTC.stop((blob) => {
      //NOTE: upload on server
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      this.startCountdown(true);
    })
  }

  /**
   * @param clearTime default value `false` 
   * `false` miens recording start if getting `true` then we are stop counting `clearStream`
   * Maximum Recoding time `10`Minutes @see minutes == 10
   */
  startCountdown(clearTime = false) {
    if (clearTime) {
      this.clearStream(this.mediaRecordStream);
      this.recordWebRTC = null;
      this.recordingTimer = null;
      this.mediaRecordStream = null;
      clearInterval(this.interval);
      return
    } else {
      this.recordingTimer = `00:00`;
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      let timer: any = this.recordingTimer;
      timer = timer.split(':');
      let minutes = +timer[0];
      let seconds = +timer[1];

      if (minutes == 10) {
        this.recordWebRTC.stopRecording();
        clearInterval(this.interval);
        return
      }
      ++seconds;
      if (seconds >= 59) {
        ++minutes;
        seconds = 0;
      }

      if (seconds < 10) {
        this.recordingTimer = `0${minutes}:0${seconds}`;
      } else {
        this.recordingTimer = `0${minutes}:${seconds}`;
      }
    }, 1000);
  }

  /**
   * @param stream clear stream Audio also video
   */
  clearStream(stream: any) {
    try {
      stream.getAudioTracks().forEach(track => track.stop());
      stream.getVideoTracks().forEach(track => track.stop());
    } catch (error) {
      //stream error
    }
  }

}
