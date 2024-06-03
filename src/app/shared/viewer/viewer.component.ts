import { Component, OnInit, inject } from '@angular/core';
import { AudioService } from '../../core/audio/audio.service';
import { LyricsService } from '../../core/lyrics/lyrics.service';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-viewer',
  standalone: true,
  imports: [FormsModule, NgbTooltipModule, NgStyle],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent implements OnInit {
  audioService = inject(AudioService);
  lyricsService = inject(LyricsService);

  elapsed: number = 0;
  duration: number = 0;
  lyricsFile: File = null!;
  fontSize = 1;
  isFullscreen = false;

  ngOnInit() {
    this.audioService.timeupdate$.subscribe(() => {
      this.elapsed = this.audioService.audio.currentTime;
      this.duration = this.audioService.audio.duration;
    });
  }

  onLyricsFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.onload = (e) => {
        try {
          this.lyricsService.set(JSON.parse(reader.result as string));
        } catch (ex) {
          console.warn(ex);
        }
      };
      reader.readAsText(file);
    }
  }

  fullscreen() {
    const elem = document.getElementById('viewer-fullscreen')!;
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.isFullscreen = false;
    } else {
      elem.requestFullscreen();
      this.isFullscreen = true;
    }
  }

  reset() {
    this.lyricsService.reset();
  }

  bigger() {
    this.fontSize++;
  }

  smaller() {
    this.fontSize--;
  }
}
