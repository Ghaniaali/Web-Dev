import { Component } from '@angular/core';

interface Stat {
  label: string;
  value: string;
  sub: string;
  subColor: string;
}

interface Client {
  name: string;
  goal: string;
  lastCheckin: string;
  adherence: number;
  status: string;
  statusColor: string;
}

interface Meal {
  time: string;
  name: string;
  macros: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // =========================
  // STAT CARDS
  // =========================

  stats: Stat[] = [
    {
      label: 'ACTIVE CLIENTS',
      value: '24',
      sub: '↑ 3 this week',
      subColor: '#00E096'
    },
    {
      label: 'AVG ADHERENCE',
      value: '78%',
      sub: '↑ 5% vs last week',
      subColor: '#00E096'
    },
    {
      label: 'CHECK-INS TODAY',
      value: '9',
      sub: '3 pending review',
      subColor: '#FFD32A'
    },
    {
      label: 'AT RISK CLIENTS',
      value: '2',
      sub: 'Missed 3+ days',
      subColor: '#FF4757'
    }
  ];


  // =========================
  // CLIENT TABLE
  // =========================

  clients: Client[] = [
    {
      name: 'Sarah M.',
      goal: 'Weight Loss',
      lastCheckin: 'Today, 9am',
      adherence: 92,
      status: 'On Track',
      statusColor: '#00E096'
    },
    {
      name: 'James K.',
      goal: 'Muscle Gain',
      lastCheckin: 'Yesterday',
      adherence: 67,
      status: 'At Risk',
      statusColor: '#FFD32A'
    },
    {
      name: 'Priya S.',
      goal: 'Endurance',
      lastCheckin: 'Today, 7am',
      adherence: 88,
      status: 'On Track',
      statusColor: '#00E096'
    },
    {
      name: 'Tom R.',
      goal: 'Weight Loss',
      lastCheckin: '3 days ago',
      adherence: 41,
      status: 'Off Track',
      statusColor: '#FF4757'
    },
    {
      name: 'Emma L.',
      goal: 'Toning',
      lastCheckin: 'Today, 11am',
      adherence: 95,
      status: 'On Track',
      statusColor: '#00E096'
    }
  ];


  // =========================
  // AI MEAL PLAN
  // =========================

  meals: Meal[] = [
    {
      time: '🌅 Breakfast',
      name: 'Oats + banana + almond butter',
      macros: '487 cal · 32g protein'
    },
    {
      time: '☀️ Lunch',
      name: 'Grilled chicken + brown rice + broccoli',
      macros: '612 cal · 48g protein'
    },
    {
      time: '🌙 Dinner',
      name: 'Salmon + sweet potato + spinach',
      macros: '544 cal · 41g protein'
    }
  ];


  // =========================
  // REGENERATE MEAL PLAN
  // =========================

  regenerateMeal(): void {
    alert('AI regenerating meal plan for Sarah M...');

    // Later:
    // OpenAI API call will go here.
  }
  
}