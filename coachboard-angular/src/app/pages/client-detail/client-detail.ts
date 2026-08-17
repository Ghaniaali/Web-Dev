import {
  Component, inject, signal,
  OnInit, AfterViewInit,
  OnDestroy, ViewChild, ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgStyle }  from '@angular/common';
import { ClientService, Clients } from '../../services/client';
import { OpenAiService, MealPlan } from '../../services/open-ai';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector:    'app-client-detail',
  standalone:  true,
  imports:     [NgStyle],
  templateUrl: './client-detail.html',
  styleUrl:    './client-detail.css'
})
export class ClientDetail implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('miniChart') miniChartRef!: ElementRef<HTMLCanvasElement>;

  private route         = inject(ActivatedRoute);
  private router        = inject(Router);
  private clientService = inject(ClientService);
  private openAiService = inject(OpenAiService);

  client      = signal<Clients | null>(null);
  mealPlan    = signal<MealPlan | null>(null);
  isLoading   = signal(false);
  aiError     = signal<string | null>(null);
  activeTab   = signal<'overview' | 'meals' | 'notes'>('overview');

  private chart: Chart | null = null;

  weekLabels = ['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.clientService.getClientById(id);
    if (!found) {
      this.router.navigate(['/clients']);
      return;
    }
    this.client.set(found);
  }

  ngAfterViewInit() {
    setTimeout(() => this.buildChart(), 100);
  }

  setTab(tab: 'overview' | 'meals' | 'notes') {
    this.activeTab.set(tab);
    if (tab === 'overview') {
      setTimeout(() => this.buildChart(), 100);
    }
  }

  goBack() {
    this.router.navigate(['/clients']);
  }

  generateMeal() {
    const c = this.client();
    if (!c) return;

    this.isLoading.set(true);
    this.aiError.set(null);
    this.mealPlan.set(null);
    this.activeTab.set('meals');

    this.openAiService.generateMealPlan(
      c.name, c.goal, c.calories, c.restrictions
    ).subscribe({
      next: (plan: MealPlan) => {
        this.mealPlan.set(plan);
        this.isLoading.set(false);
      },
      error: (err: unknown) => {
        const message = err instanceof Error ? err.message : 'Failed to generate meal plan.';
        this.aiError.set(message);
        this.isLoading.set(false);
      }
    });
  }

  private buildChart() {
    const c = this.client();
    if (!c || !this.miniChartRef) return;
    this.chart?.destroy();

    this.chart = new Chart(this.miniChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.weekLabels,
        datasets: [{
          data:            c.weeklyAdherence,
          borderColor:     '#00E096',
          backgroundColor: 'rgba(0,224,150,0.08)',
          borderWidth:     2,
          pointRadius:     4,
          pointBackgroundColor: '#00E096',
          fill:    true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(42,45,62,0.6)' }, ticks: { color: '#8B8FA8', font: { size: 10 } } },
          y: { min: 0, max: 100, grid: { color: 'rgba(42,45,62,0.6)' }, ticks: { color: '#8B8FA8', font: { size: 10 }, callback: v => `${v}%` } }
        }
      }
    });
  }

  get mainMeals() {
    const plan = this.mealPlan();
    if (!plan) return [];
    return [
      { key: 'breakfast', icon: '🌅', label: 'Breakfast', data: plan.breakfast },
      { key: 'lunch',     icon: '☀️', label: 'Lunch',     data: plan.lunch     },
      { key: 'dinner',    icon: '🌙', label: 'Dinner',    data: plan.dinner    },
    ];
  }

  get weightChange() {
    const c = this.client();
    if (!c) return '0';
    const diff = c.weeklyWeight[7] - c.weeklyWeight[0];
    return diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
  }

  ngOnDestroy() { this.chart?.destroy(); }
}