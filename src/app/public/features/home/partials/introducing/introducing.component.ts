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

import { throttle } from 'lodash';

// Services
import { MathService } from 'core/services/math.service';
import { TypingService } from 'core/services/typing.service';

@Component({
  selector: 'home-introducing',
  standalone: true,
  templateUrl: './introducing.component.html',
  styleUrl: './introducing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroducingComponent implements AfterViewInit {
  @ViewChild('container') private container!: ElementRef<HTMLDivElement>;
  @ViewChild('logoSymbol') private logoSymbol!: ElementRef<HTMLImageElement>;
  @ViewChild('logoText') private logoText!: ElementRef<HTMLImageElement>;
  @ViewChild('sloganText') private sloganText!: ElementRef<HTMLTitleElement>;
  @ViewChild('typingText') private typingText!: ElementRef<HTMLTitleElement>;

  constructor(
    @Inject(PLATFORM_ID) private plataformId: object,
    private mathService: MathService,
    private typingService: TypingService
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.plataformId)) return;
    this.initiateTyping();
    this.animate();

    ['scroll', 'resize'].map((event) => {
      window.addEventListener(
        event,
        throttle(() => this.animate(), 20)
      );
    });
  }

  private animate(): void {
    const scrollTop: number = window.scrollY;

    this.animateSymbol(scrollTop);
    this.animateLogoText(scrollTop);
    this.animateSloganText(scrollTop);
    this.animateContainer(scrollTop);
    this.animateTypingText(scrollTop);
  }

  private initiateTyping(): void {
    const words: string[] = ['Inovação', 'Tecnologia', 'Criatividade'];
    let index: number = 0;
    this.typingService.type('typing-element', words[index]);

    setInterval(() => {
      this.typingService.type('typing-element', words[index]);
      index = index + 1 >= words.length ? 0 : index + 1;
    }, 3000);
  }

  private animateSymbol(scrollTop: number): void {
    if (scrollTop < 1250) {
      requestAnimationFrame(() => {
        this.logoSymbol.nativeElement.style.transform = `rotateZ(-${
          45 * (1 - scrollTop / 1250)
        }deg)`;
        this.logoSymbol.nativeElement.style.marginRight = `${
          -22 * (1 - scrollTop / 1250)
        }vw`;
      });
    }

    if (scrollTop > 1400) {
      const scrollTopDiff = scrollTop - 1400;
      requestAnimationFrame(() => {
        this.logoSymbol.nativeElement.style.scale = `${
          1 + scrollTopDiff / 300
        }`;
        this.logoSymbol.nativeElement.style.transform = `rotateZ(${
          scrollTopDiff / 30
        }deg)`;

        this.logoSymbol.nativeElement.style.opacity = `${
          (90 - (scrollTopDiff * 100) / 3000) / 100
        }`;
      });
    }
  }

  private animateLogoText(scrollTop: number): void {
    if (scrollTop < 1250)
      requestAnimationFrame(() => {
        this.logoText.nativeElement.style.opacity = `${scrollTop / 1250}`;
      });

    if (scrollTop > 1400) {
      let percentage = this.mathService.getPercentage(scrollTop - 1400, 625);
      percentage = 100 - percentage;
      requestAnimationFrame(() => {
        this.logoText.nativeElement.style.marginLeft = `${
          (-22 * (100 - percentage)) / 100
        }vw`;
        this.logoText.nativeElement.style.opacity = `${percentage / 100}`;
      });
    }
  }

  private animateTypingText(scrollTop: number): void {
    if (scrollTop > 500) {
      let percentage = this.mathService.getPercentage(scrollTop - 500, 850);
      requestAnimationFrame(() => {
        this.typingText.nativeElement.style.bottom = `${
          (-24 * (100 - percentage)) / 100
        }px`;
        this.typingText.nativeElement.style.opacity = `${percentage / 100}`;
        this.typingText.nativeElement.style.display = `initial`;
      });
    } else {
      requestAnimationFrame(() => {
        this.typingText.nativeElement.style.display = `none`;
      });
    }

    if (scrollTop > 1000) {
      let percentage = this.mathService.getPercentage(scrollTop - 1000, 1100);
      requestAnimationFrame(() => {
        this.typingText.nativeElement.style.opacity = `${1 - percentage / 100}`;
      });
    }
  }

  private animateContainer(scrollTop: number): void {
    requestAnimationFrame(() => {
      this.container.nativeElement.style.filter = 'none';
    });

    if (scrollTop < 800 && scrollTop > 10)
      requestAnimationFrame(() => {
        this.container.nativeElement.style.filter = 'blur(8px)';
      });

    if (scrollTop < 2400 && scrollTop > 1500)
      requestAnimationFrame(() => {
        this.container.nativeElement.style.filter = 'blur(8px)';
      });
  }

  private animateSloganText(scrollTop: number): void {
    if (scrollTop > 1850) {
      let percentage = this.mathService.getPercentage(scrollTop - 1850, 2250);
      requestAnimationFrame(() => {
        this.sloganText.nativeElement.style.opacity = `${percentage / 100}`;
        this.sloganText.nativeElement.style.scale = `${0.5 + percentage / 100}`;
      });
    } else {
      requestAnimationFrame(() => {
        this.sloganText.nativeElement.style.opacity = `0`;
      });
    }

    if (scrollTop > 4050) {
      let percentage = this.mathService.getPercentage(scrollTop - 4050, 1250);
      requestAnimationFrame(() => {
        this.sloganText.nativeElement.style.bottom = `${percentage / 1.55}vh`;
      });
    }
  }
}
