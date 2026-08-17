import {
  Component, signal, inject,
  AfterViewInit, OnDestroy, ViewChild,
  ElementRef, effect
} from '@angular/core';
import { NgStyle } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ClientService, Clients } from '../../services/client';

Chart.register(...registerables);

@Component({
  selector:    'app-progress',
  standalone:  true,
  imports:     [NgStyle ],
  templateUrl: './progress.html',
  styleUrl:    './progress.css'
})
export class Progress implements AfterViewInit, OnDestroy {

  @ViewChild('adherenceCanvas') adherenceCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('weightCanvas')    weightCanvas!:    ElementRef<HTMLCanvasElement>;
  @ViewChild('sessionsCanvas')  sessionsCanvas!:  ElementRef<HTMLCanvasElement>;

  private clientService = inject(ClientService);

  clients        = this.clientService.clients;
  selectedClient = signal<Clients>(this.clientService.clients()[0] as Clients);

  private adherenceChart: Chart | null = null;
  private weightChart:    Chart | null = null;
  private sessionsChart:  Chart | null = null;

  weekLabels = ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6','Week 7','Week 8'];

  constructor() {
    // Rebuild charts every time client changes
    effect(() => {
      const client = this.selectedClient();
      if (client) {
        // Slight delay so DOM updates first
        setTimeout(() => this.buildAllCharts(client), 50);
      }
    });
  }

  ngAfterViewInit() {
    this.buildAllCharts(this.selectedClient());
  }

  selectClient(client: Clients) {
    this.selectedClient.set(client);
  }

  private destroyCharts() {
    this.adherenceChart?.destroy();
    this.weightChart?.destroy();
    this.sessionsChart?.destroy();
  }

  private buildAllCharts(client: Clients) {
    this.destroyCharts();
    this.buildAdherenceChart(client);
    this.buildWeightChart(client);
    this.buildSessionsChart(client);
  }

  private buildAdherenceChart(client: Clients) {
    if (!this.adherenceCanvas) return;
    this.adherenceChart = new Chart(this.adherenceCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.weekLabels,
        datasets: [{
          label:           'Adherence %',
          data:            client.weeklyAdherence,
          borderColor:     '#00E096',
          backgroundColor: 'rgba(0, 224, 150, 0.08)',
          borderWidth:     2.5,
          pointBackgroundColor: '#00E096',
          pointRadius:     5,
          pointHoverRadius:7,
          fill:            true,
          tension:         0.4,
        }]
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1A1D27',
            borderColor:     '#2A2D3E',
            borderWidth:     1,
            titleColor:      '#FFFFFF',
            bodyColor:       '#8B8FA8',
            callbacks: {
              label: ctx => ` ${ctx.parsed.y}% adherence`
            }
          }
        },
        scales: {
          x: {
            grid:  { color: 'rgba(42,45,62,0.8)' },
            ticks: { color: '#8B8FA8', font: { size: 11 } }
          },
          y: {
            min:   0,
            max:   100,
            grid:  { color: 'rgba(42,45,62,0.8)' },
            ticks: {
              color:    '#8B8FA8',
              font:     { size: 11 },
              callback: (val) => `${val}%`
            }
          }
        }
      }
    });
  }

  private buildWeightChart(client: Clients) {
    if (!this.weightCanvas) return;
    this.weightChart = new Chart(this.weightCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.weekLabels,
        datasets: [{
          label:           'Weight',
          data:            client.weeklyWeight,
          borderColor:     '#7B61FF',
          backgroundColor: 'rgba(123, 97, 255, 0.08)',
          borderWidth:     2.5,
          pointBackgroundColor: '#7B61FF',
          pointRadius:     5,
          pointHoverRadius:7,
          fill:            true,
          tension:         0.4,
        }]
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1A1D27',
            borderColor:     '#2A2D3E',
            borderWidth:     1,
            titleColor:      '#FFFFFF',
            bodyColor:       '#8B8FA8',
            callbacks: {
              label: ctx => ` ${ctx.parsed.y} ${client.weightUnit}`
            }
          }
        },
        scales: {
          x: {
            grid:  { color: 'rgba(42,45,62,0.8)' },
            ticks: { color: '#8B8FA8', font: { size: 11 } }
          },
          y: {
            grid:  { color: 'rgba(42,45,62,0.8)' },
            ticks: {
              color:    '#8B8FA8',
              font:     { size: 11 },
              callback: (val) => `${val}${client.weightUnit}`
            }
          }
        }
      }
    });
  }

  private buildSessionsChart(client: Clients) {
    if (!this.sessionsCanvas) return;
    this.sessionsChart = new Chart(this.sessionsCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.weekLabels,
        datasets: [{
          label:           'Sessions',
          data:            client.weeklySessions,
          backgroundColor: client.weeklySessions.map((v: number) =>
            v >= 5 ? 'rgba(0,224,150,0.7)'  :
            v >= 3 ? 'rgba(255,211,42,0.7)' :
                     'rgba(255,71,87,0.7)'
          ),
          borderColor: client.weeklySessions.map((v: number) =>
            v >= 5 ? '#00E096' :
            v >= 3 ? '#FFD32A' :
                     '#FF4757'
          ),
          borderWidth:  1.5,
          borderRadius: 6,
        }]
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1A1D27',
            borderColor:     '#2A2D3E',
            borderWidth:     1,
            titleColor:      '#FFFFFF',
            bodyColor:       '#8B8FA8',
            callbacks: {
              label: ctx => ` ${ctx.parsed.y} sessions`
            }
          }
        },
        scales: {
          x: {
            grid:  { display: false },
            ticks: { color: '#8B8FA8', font: { size: 11 } }
          },
          y: {
            min:   0,
            grid:  { color: 'rgba(42,45,62,0.8)' },
            ticks: {
              color:     '#8B8FA8',
              font:      { size: 11 },
              stepSize:  1
            }
          }
        }
      }
    });
  }

  get weightChange(): string {
    const client = this.selectedClient();
    const diff   = client.weeklyWeight[7] - client.weeklyWeight[0];
    return diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
  }

  get weightChangeColor(): string {
    const client = this.selectedClient();
    const diff   = client.weeklyWeight[7] - client.weeklyWeight[0];
    if (client.goal === 'Muscle Gain') {
      return diff > 0 ? '#00E096' : '#FF4757';
    }
    return diff < 0 ? '#00E096' : '#FF4757';
  }

  get adherenceChange(): string {
    const client = this.selectedClient();
    const diff   = client.weeklyAdherence[7] - client.weeklyAdherence[0];
    return diff > 0 ? `+${diff}%` : `${diff}%`;
  }

  ngOnDestroy() {
    this.destroyCharts();
  }
}