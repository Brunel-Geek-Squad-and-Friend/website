import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { Socket } from 'ngx-socket-io';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  @ViewChild('video') video: any;

  private stream: MediaStream;

  private recordRTC: any;

  public timeRemaining = 10;

  constructor(
    private socket: Socket,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.socket.connect();
    this.auth.authState
      .subscribe((authState) => {
        if (authState) {
          console.log(authState);
          this.socket.emit('uid', authState.uid);
        } else {
          this.socket.emit('uid', 'undefined');
        }
      });
    this.socket.on('message', (message) => console.log(message));
    this.socket.on('disconnect', () => this.router.navigate(['']));
    this.startRecording();
  }

  ngAfterViewInit() {
    // set the initial state of the video
    const video: HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = false;
    video.autoplay = true;
  }

  toggleControls() {
    const video: HTMLVideoElement = this.video.nativeElement;
    // video.muted = !video.muted;
    // video.controls = !video.controls;
    // video.autoplay = !video.autoplay;
  }


  startRecording() {
    const mediaConstraints: MediaStreamConstraints = {
      video: {
        height: 720,
        width: 1280
      }, audio: false
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    const timer = setInterval(() => {
      this.timeRemaining = this.timeRemaining - 1;
      if (this.timeRemaining === 0) {
        clearInterval(timer);
        this.stopRecording();
      }
    }, 1000);
  }

  successCallback(stream: MediaStream) {
    const options = {
      mimeType: 'video/webm;codes=h264', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      bitsPerSecond: 500000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    const video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    // handle error here
  }


  stopRecording() {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  processVideo(audioVideoWebMURL) {
    const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    this.socket.emit('video', recordedBlob);
    recordRTC.getDataURL(function (dataURL) { });
  }

  download() {
    this.recordRTC.save('video.webm');
  }

}
