import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './components/header/header';
import { ProductList } from "./pages/product-list/product-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class App {}
