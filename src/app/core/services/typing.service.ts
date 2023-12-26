import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  public type(
    elementId: string,
    word: string,
    typingDuration: number = 500
  ): void {
    const element = document.getElementById(elementId);
    if (!element) throw `Element not found by id ${elementId}`;

    element.innerHTML = '';

    const letters = word.split('');
    const durationPerLetter = typingDuration / letters.length;
    let index = 0;

    setInterval(() => {
      if (index === letters.length) return;
      element.innerHTML = element.innerHTML + letters[index];
      index++;
    }, durationPerLetter);
  }

  private write(): void {}
}
