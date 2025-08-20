import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Logincomponent } from "../login/logincomponent/logincomponent";
import { Signupcomponent } from '../signup/signupcomponent/signupcomponent';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('Library-Management');
}
