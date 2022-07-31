import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  private window: Window;
  private voice: SpeechSynthesisVoice;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
    const voices = this.window.speechSynthesis.getVoices();
    this.voice = voices.find(voice => voice.name === 'Microsoft Yaoyao - Chinese (Simplified, PRC)');
  }
  // speak
  speak(text: string) {
    if (this.window.speechSynthesis.speaking) {
      this.window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    this.window.speechSynthesis.speak(utterance);
  }
  // countdown
  countdown(seconds: number) {
    for (let i = seconds; i > 0; i--) {
      setTimeout(() => {
        this.speak(i.toString());
      }, (seconds - i) * 1000);
    }
  }
}
