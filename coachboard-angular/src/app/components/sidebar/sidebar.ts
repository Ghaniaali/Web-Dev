import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector:   'app-sidebar',
  standalone: true,
  imports:    [RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar">
      <h2 class="sidebar-logo">CoachBoard</h2>

      <a routerLink="/"
         routerLinkActive="active"
         [routerLinkActiveOptions]="{ exact: true }"
         class="nav-item">
        <span class="nav-icon">🏠</span>
        <span>Dashboard</span>
      </a>

      <a routerLink="/clients"
         routerLinkActive="active"
         class="nav-item">
        <span class="nav-icon">👥</span>
        <span>Clients</span>
      </a>

      <a routerLink="/meals"
         routerLinkActive="active"
         class="nav-item">
        <span class="nav-icon">🤖</span>
        <span>AI Meal Plan</span>
      </a>

      <a routerLink="/progress"
         routerLinkActive="active"
         class="nav-item">
        <span class="nav-icon">📈</span>
        <span>Progress</span>
      </a>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 240px;
      min-height: 100vh;
      background: var(--bg-card);
      padding: 32px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      position: fixed;
      top: 0; left: 0; bottom: 0;
      z-index: 50;
    }
    .sidebar-logo {
      color: var(--accent-green);
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 40px;
      letter-spacing: -0.5px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 400;
      transition: all 0.2s ease;
    }
    .nav-item:hover {
      background: rgba(0,224,150,0.05);
      color: #fff;
    }
    .nav-item.active {
      background: rgba(0,224,150,0.10);
      color: var(--accent-green);
      font-weight: 600;
    }
    .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  `]
})
export class Sidebar{}