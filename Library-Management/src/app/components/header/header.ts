import { Component,Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter

 } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header{
@Output() sidebarToggle = new EventEmitter<void>();
  isDashboardRoute: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isDashboardRoute = event.url === '/dashboard' || event.url.startsWith('/dashboard');
    });
    
    this.isDashboardRoute = this.router.url === '/dashboard' || this.router.url.startsWith('/dashboard');
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  logout(): void {
    this.authService.logout();
  }

  getCurrentUser(): any {
    return this.authService.getCurrentUser();
  }
}