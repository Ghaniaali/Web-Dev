import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

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

constructor(private router: Router) {} 

login(){

const users = JSON.parse(localStorage.getItem('users') || '[]');

const enteredUser = (this.usernameOrEmail || '').trim();
const enteredPass = (this.password || '').trim();


const existingUser = users.find(
  (user: any) =>
    user.username === enteredUser || user.email === enteredUser
);

if (!existingUser) {
  alert("User not found. Please sign up first.");
} else if (existingUser.password !== enteredPass) {
  alert("Incorrect password. Please try again.");
} else {
  alert(`Welcome back, ${existingUser.username}!`);
  localStorage.setItem('loggedInUser', JSON.stringify(existingUser));
  this.router.navigate(['/dashboard']);
}
}

goToSignup() {
  this.router.navigate(['/signup']);
}

}