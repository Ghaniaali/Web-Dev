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

    const validUser = users.find(
      (user: any) =>
        (user.username === enteredUser || user.email === enteredUser) &&
        user.password === enteredPass
    );

    if (validUser) {
      alert(` Welcome back, ${validUser.username}!`);
      localStorage.setItem('loggedInUser', JSON.stringify(validUser));
      this.router.navigate(['/dashboard']);
    } else {
      alert(" Credentials not found. Please sign up first.");
    }
  }

   goToSignup() {
    this.router.navigate(['/signup']);
  }
}