import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audio = new Audio();
  audioName = '';
  timeupdate$: Observable<Event>;

  constructor() {
    this.timeupdate$ = fromEvent(this.audio, 'timeupdate');

    const context = new AudioContext();
    const processor: ScriptProcessorNode = context.createScriptProcessor(
      2048,
      2,
      2,
    );
    this.audio.addEventListener(
      'canplaythrough',
      () => {
        const sourceNode = context.createMediaElementSource(this.audio);
        sourceNode.connect(processor);
        processor.connect(context.destination);
        this.audio.play();
      },
      false,
    );

    processor.addEventListener('audioprocess', (evt) => {
      const inputL = evt.inputBuffer.getChannelData(0);
      const inputR = evt.inputBuffer.getChannelData(1);
      const output = evt.outputBuffer.getChannelData(0);
      const output2 = evt.outputBuffer.getChannelData(1);
      const len = inputL.length;
      for (let i = 0; i < len; i++) {
        output[i] = inputL[i] - inputR[i];
        output2[i] = inputR[i] - inputL[i];
      }
    });
  }

  set(src: string, name: string) {
    this.audio.src = src;
    this.audioName = name;
    this.audio.load();
  }

  reset() {
    this.audio = new Audio();
    this.audioName = null!;
  }

  play() {
    this.audio.play();
  }

  toggle() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
