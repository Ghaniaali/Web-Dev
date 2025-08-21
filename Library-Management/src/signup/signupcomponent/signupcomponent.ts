import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signupcomponent',
   standalone: true,
  imports: [FormsModule],
  templateUrl: './signupcomponent.html',
  styleUrl: './signupcomponent.scss'
})
export class Signupcomponent {
email: string = '';     
username: string = '';   
password: string = '';   

constructor(private router: Router) {}

signup()
{
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find(
      (u: any) => u.email === this.email.trim() || u.username === this.username.trim()
    );

    if (existingUser) {
      alert(' Email or Username already exists');
      return;
    }

    users.push({
      username: this.username.trim(),
      email: this.email.trim(),
      password: this.password
    });

    localStorage.setItem('users', JSON.stringify(users));

    alert(' Signup successful! Please login.');
    this.router.navigate(['/login']);
  }

goToLogin() {
  this.router.navigate(['/login']);
}
}
