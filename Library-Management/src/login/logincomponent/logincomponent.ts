import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../app/services/auth.service/auth.service';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.scss'
})
export class Logincomponent {
  usernameOrEmail: string = '';  
  password: string = '';          

  constructor(
    private router: Router,
    private authService: AuthService
  ) {} 

  login() {
    // Use the AuthService login method
    const loginSuccess = this.authService.login(this.usernameOrEmail, this.password);
    
    if (loginSuccess) {
      // Navigation is handled by AuthService, but we can also navigate here
      this.router.navigate(['/dashboard']);
    }
    // Error handling is done in AuthService with alerts
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}