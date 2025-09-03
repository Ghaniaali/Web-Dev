import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

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
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser !== null;
  }

  login(usernameOrEmail: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const enteredUser = (usernameOrEmail || '').trim();
    const enteredPass = (password || '').trim();

    const existingUser = users.find(
      (user: any) =>
        user.username === enteredUser || user.email === enteredUser
    );

    if (!existingUser) {
      alert("User not found. Please sign up first.");
      return false;
    } else if (existingUser.password !== enteredPass) {
      alert("Incorrect password. Please try again.");
      return false;
    } else {
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