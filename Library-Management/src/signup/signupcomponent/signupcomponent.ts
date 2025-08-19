import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupcomponent',
   standalone: true,  
  imports: [],
  templateUrl: './signupcomponent.html',
  styleUrl: './signupcomponent.scss'
})
export class Signupcomponent {
email: string = '';     
username: string = '';   
password: string = '';   

constructor(private router: Router) {}

signup() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const existingUser = users.find(
    (u: any) => u.email === this.email || u.username === this.username
  );

  if (existingUser) {
    alert('Email or Username already exists ');
    return;
  }

  users.push({ email: this.email, username: this.username, password: this.password });

  localStorage.setItem('users', JSON.stringify(users));

  alert('Sign up successful! You can now login.');
  this.router.navigate(['/login']);
}

goToLogin() {
  this.router.navigate(['/login']);
}
}
