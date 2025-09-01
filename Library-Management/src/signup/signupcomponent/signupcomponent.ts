// src/signup/signupcomponent/signupcomponent.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../app/services/auth.service/auth.service';

@Component({
  selector: 'app-signupcomponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signupcomponent.html',
  styleUrl: './signupcomponent.scss'
})
export class Signupcomponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  signup() {
  
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const existingUser = users.find((user: any) => 
      user.username === this.username || user.email === this.email
    );

    if (existingUser) {
      alert("User already exists!");
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Account created successfully!");
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}