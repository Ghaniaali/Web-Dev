import { Component, Input, Output, EventEmitter, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterModule  } from '@angular/router';
import { AuthService} from '../../services/auth.service/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  @Output() sidebarhover = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    public authService: AuthService){}

    navigateTo(route: string) {
      this.router.navigate([route]);
    }

    onMouseEnter() {
      this.sidebarhover.emit(true);
    }

    onMouseLeave() {
      this.sidebarhover.emit(false);
    }
 
    logout(): void {
        this.authService.logout();
      }
    
  }