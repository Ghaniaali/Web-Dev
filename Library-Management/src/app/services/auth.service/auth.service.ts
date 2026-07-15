import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
  joinDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasLoggedInUser());
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  private hasLoggedInUser(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }

  login(usernameOrEmail: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    
    const enteredUser = (usernameOrEmail || '').trim().toLowerCase();
    const enteredPass = (password || '').trim();

    const existingUser = users.find(
      (user: User) =>
        user.username.toLowerCase() === enteredUser || 
        user.email.toLowerCase() === enteredUser
    );

    if (!existingUser) {
      alert("User not found. Please sign up first.");
      return false;
    } 
     else if (existingUser.password !== enteredPass) {
      alert("Incorrect password. Please try again.");
      return false;
    } 
     else {
      alert(`Welcome back, ${existingUser.username}!`);
      localStorage.setItem('loggedInUser', JSON.stringify(existingUser));
      this.isLoggedInSubject.next(true);
      return true;
    }
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.hasLoggedInUser();
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }

  private checkAuthStatus(): void {
    const isLoggedIn = this.hasLoggedInUser();
    this.isLoggedInSubject.next(isLoggedIn);
  }
}