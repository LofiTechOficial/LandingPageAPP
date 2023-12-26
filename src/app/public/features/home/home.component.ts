import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

// Partials
import { IntroducingComponent } from './partials/introducing/introducing.component';
import { CarouselComponent } from './partials/carousel/carousel.component';
import { MetricsComponent } from './partials/metrics/metrics.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IntroducingComponent, CarouselComponent, MetricsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public isMobile: boolean = false;

  constructor(@Inject(PLATFORM_ID) private plataformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.plataformId)) return;
    this.onWindowResize();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.isMobile = window.innerWidth > 992;
  }
}
