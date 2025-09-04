import { Component} from '@angular/core';
import { AuthService } from '../../services/auth.service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header{
  constructor(
    public authService: AuthService,
  ) {

  }
  logout(): void {
    this.authService.logout();
  }

  getCurrentUser(): any {
    return this.authService.getCurrentUser();
  }

}