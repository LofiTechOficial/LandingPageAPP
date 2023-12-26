import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Core Components
import { HeaderComponent } from 'core/components/header/header.component';

@Component({
  selector: 'app-public',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {}
