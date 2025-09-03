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
   
    const loginSuccess = this.authService.login(this.usernameOrEmail, this.password);
    
    if (loginSuccess) {
      this.router.navigate(['/dashboard']);
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}