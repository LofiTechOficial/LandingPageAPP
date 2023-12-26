import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'core-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header') private headerContainer!: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private plataformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.plataformId)) return;

    this.setHeaderBackground();
    ['scroll', 'resize'].map((event) => {
      window.addEventListener(event, () => this.setHeaderBackground());
    });
  }

  private setHeaderBackground(): void {
    if (window.innerWidth < 992 || window.scrollY > 4620) this.showHeader();
    else this.hideHeader();
  }

  private showHeader(): void {
    this.headerContainer.nativeElement.style.backgroundColor = '#101010de';
    this.headerContainer.nativeElement.style.backdropFilter = 'blur(8px)';
  }

  private hideHeader(): void {
    this.headerContainer.nativeElement.style.backgroundColor = '#00000000';
    this.headerContainer.nativeElement.style.backdropFilter = 'blur(0px)';
  }
}
