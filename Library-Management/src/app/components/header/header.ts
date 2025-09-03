import { Component,Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

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
      this.isDashboardRoute = this.shouldShowSidebarButton(event.url);
    });
    
    this.isDashboardRoute = this.shouldShowSidebarButton(this.router.url);
  }

  private shouldShowSidebarButton(url: string): boolean {
    const pagesWithSidebar = ['/dashboard', '/roles', '/books', '/users', '/reports'];
    return pagesWithSidebar.some(page => url === page || url.startsWith(page + '/'));
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