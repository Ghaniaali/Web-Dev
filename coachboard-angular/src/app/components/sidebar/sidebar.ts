import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path : string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  navItems: NavItem[] = [
    { 
label: 'Dashboard',
path: '/dashboard',
icon: '🏠'
},
{
  label: 'Clients',
  path: '/clients',
  icon: '👥'
},
{
  label: 'AI Meal Plan',
  path: '/meal-plan',
  icon: '🥗'
},
{
  label: 'Progress',
  path: '/progress',
  icon: '📊'
},
  ];
}


