import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { AuthService } from './services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, CommonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Library-Management');
  isSidebarOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check authentication status on app initialization
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  onSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSidebarClose(): void {
    this.isSidebarOpen = false;
  }
}