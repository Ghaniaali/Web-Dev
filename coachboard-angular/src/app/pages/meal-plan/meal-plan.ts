import { Component, signal, inject } from '@angular/core';
import { NgStyle} from '@angular/common';
import { ClientService, Clients } from '../../services/client';
import { OpenAiService, MealPlan } from '../../services/open-ai';

@Component({
  selector:    'app-meal-plan',
  standalone:  true,
  imports:     [NgStyle],
  templateUrl: './meal-plan.html',
  styleUrl:    './meal-plan.css'
})
export class mealplan {

  private clientService = inject(ClientService);
  private openAiService = inject(OpenAiService);

  clients        = this.clientService.clients;
  selectedClient = signal<Clients>(this.clientService.clients()[0]);
  mealPlan       = signal<MealPlan | null>(null);
  isLoading      = signal(false);
  error          = signal<string | null>(null);
  hasGenerated   = signal(false);

  // History of generated plans per session
  history = signal<{ client: string; plan: MealPlan; time: string }[]>([]);

  selectClient(client: Clients) {
    this.selectedClient.set(client);
    this.mealPlan.set(null);
    this.hasGenerated.set(false);
    this.error.set(null);
  }

  generateMealPlan() {
    const client = this.selectedClient();
    this.isLoading.set(true);
    this.error.set(null);
    this.mealPlan.set(null);

    this.openAiService.generateMealPlan(
      client.name,
      client.goal,
      client.calories,
      client.restrictions
    ).subscribe({
      next: (plan) => {
        this.mealPlan.set(plan);
        this.isLoading.set(false);
        this.hasGenerated.set(true);
        // Save to history
        this.history.update(h => [{
          client: client.name,
          plan,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }, ...h].slice(0, 5));
      },
      error: (err: unknown) => {
        const message = err instanceof Error ? err.message : 'Something went wrong while generating the meal plan.';
        this.error.set(message);
        this.isLoading.set(false);
      }
    });
  }

  loadFromHistory(item: { client: string; plan: MealPlan; time: string }) {
    this.mealPlan.set(item.plan);
    this.hasGenerated.set(true);
    this.error.set(null);
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

  get proteinPercent() {
    const plan = this.mealPlan();
    const client = this.selectedClient();
    if (!plan) return 0;
    return Math.round((plan.totalCalories / client.calories) * 100);
  }
}