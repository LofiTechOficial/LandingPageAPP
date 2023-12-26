import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  public getPercentage(
    value: number,
    max: number,
    fixPercentage: boolean = true
  ): number {
    let percentage: number = (value * 100) / max;

    if (fixPercentage) {
      if (percentage > 100) percentage = 100;
      if (percentage < 0) percentage = 0;
    }

    return percentage;
  }
}
