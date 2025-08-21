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

signup() {
  // Get users from localStorage, or start with an empty array
  let users: { username: string; email: string; password: string }[] = 
    JSON.parse(localStorage.getItem('users') || '[]');

  // Check for duplicates
  const existingUser = users.find(
    (u) =>
      u.email.toLowerCase() === this.email.trim().toLowerCase() ||
      u.username.toLowerCase() === this.username.trim().toLowerCase()
  );

  if (existingUser) {
    alert('❌ Email or Username already exists!');
    return;
  }

  // Create new user object
  const newUser = {
    username: this.username.trim(),
    email: this.email.trim(),
    password: this.password
  };

  // Add user to array
  users.push(newUser);

  // Save array back to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  alert('✅ Signup successful! Please login.');

  // Reset form fields
  this.username = '';
  this.email = '';
  this.password = '';

  // Navigate to login
  this.router.navigate(['/login']);
}

goToLogin() {
  this.router.navigate(['/login']);
  }
}
