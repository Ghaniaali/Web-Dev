import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { AuthService } from './services/auth.service/auth.service';
import { CommonModule } from '@angular/common';
import { Sidebar } from './components/sidebar/sidebar';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, CommonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Library-Management');
  Showsidebar: boolean = false;
  sidebaropen: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router){
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.Showsidebar = !event.url.includes('/login') && !event.url.includes('/signup');
      });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  


}