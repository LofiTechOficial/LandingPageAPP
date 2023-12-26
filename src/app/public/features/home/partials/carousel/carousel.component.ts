import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

@Component({
  selector: 'home-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  slider: KeenSliderInstance | null = null;

  constructor(@Inject(PLATFORM_ID) public plataformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.plataformId)) return;

    const ref = document.getElementById('introducing-carousel');
    if (!ref) throw 'Reference';
    this.slider = new KeenSlider(
      ref,
      {
        loop: true,
      },
      [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
          function clearNextTimeout() {
            clearTimeout(timeout);
          }
          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 3000);
          }
          slider.on('created', () => {
            slider.container.addEventListener('mouseover', () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener('mouseout', () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });
          slider.on('dragStarted', clearNextTimeout);
          slider.on('animationEnded', nextTimeout);
          slider.on('updated', nextTimeout);
        },
      ]
    );
  }

  ngOnDestroy() {
    if (!this.slider) return;
    this.slider.destroy();
  }
}
