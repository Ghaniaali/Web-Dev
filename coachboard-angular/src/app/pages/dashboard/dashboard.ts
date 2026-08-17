import { Component, signal, inject } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client';
import { OpenAiService, MealPlan } from '../../services/open-ai';

@Component({
  selector:    'app-dashboard',
  standalone:  true,
  imports:     [NgStyle],
  templateUrl: './dashboard.html',
  styleUrl:    './dashboard.css'
})
export class Dashboard {

  private router        = inject(Router);
  private clientService = inject(ClientService);
  private openAiService = inject(OpenAiService);

  clients = this.clientService.clients;

  stats = [
    { label: 'ACTIVE CLIENTS',  value: '—', sub: '—',                  subColor: '#00E096' },
    { label: 'AVG ADHERENCE',   value: '—', sub: '—',                  subColor: '#00E096' },
    { label: 'CHECK-INS TODAY', value: '9', sub: '3 pending review',   subColor: '#FFD32A' },
    { label: 'AT RISK CLIENTS', value: '—', sub: 'Missed 3+ days',     subColor: '#FF4757' },
  ];

  // Dynamic stats from service
  get totalClients()    { return this.clients().length; }
  get avgAdherence()    { return Math.round(this.clients().reduce((a, c) => a + c.adherence, 0) / this.clients().length); }
  get atRiskCount()     { return this.clients().filter(c => c.status !== 'On Track').length; }
  get recentClients()   { return this.clients().slice(0, 5); }

  // Meal generator state
  selectedClientId = signal<number>(1);
  mealPlan         = signal<MealPlan | null>(null);
  isGenerating     = signal(false);
  mealError        = signal<string | null>(null);

  get selectedClient() {
    return this.clients().find(c => c.id === this.selectedClientId()) ?? this.clients()[0];
  }

  viewClient(id: number) {
    this.router.navigate(['/clients', id]);
  }

  generateDashboardMeal() {
    const client = this.selectedClient;
    if (!client) return;

    this.isGenerating.set(true);
    this.mealError.set(null);
    this.mealPlan.set(null);

    this.openAiService.generateMealPlan(
      client.name,
      client.goal,
      client.calories,
      client.restrictions
    ).subscribe({
      next:  plan => { this.mealPlan.set(plan);          this.isGenerating.set(false); },
      error: err  => { this.mealError.set(err.message);  this.isGenerating.set(false); }
    });
  }

  selectMealClient(id: number) {
    this.selectedClientId.set(id);
    this.mealPlan.set(null);
    this.mealError.set(null);
  }
}