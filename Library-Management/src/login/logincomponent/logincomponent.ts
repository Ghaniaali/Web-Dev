import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincomponent',
  standalone: true,  
  imports: [],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.scss'
})
export class Logincomponent {
usernameOrEmail: string = '';  
password: string = '';          

constructor(private router: Router) {} 

login() {
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  console.log("Stored users:", users); // Debugging log
  console.log("Entered:", this.usernameOrEmail, this.password);

  const validUser = users.find((user: any) =>
    (user.username === this.usernameOrEmail || user.email === this.usernameOrEmail) &&
    user.password === this.password
  );

  if (validUser) {
    alert(`Welcome back, ${validUser.username}!`);
    localStorage.setItem('loggedInUser', JSON.stringify(validUser)); 
  } 
  else {
    alert('Credentials not Found');
  }
}

  goToSignup() {
  this.router.navigate(['/signup']);
}

}
