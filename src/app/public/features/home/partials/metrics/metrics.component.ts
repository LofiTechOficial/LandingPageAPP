import { Component } from '@angular/core';
import Metric from 'core/models/metric.model';

@Component({
  selector: 'home-metrics',
  standalone: true,
  imports: [],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.scss',
})
export class MetricsComponent {
  public metrics: Metric[] = [
    {
      label: '+3',
      description: 'Anos de experiência',
    },
    {
      label: '3',
      description: 'Clientes ativos',
    },
    {
      label: '+3000',
      description: 'Visitas',
    },
    {
      label: '+300',
      description: 'Cliques',
    },
  ];
}
