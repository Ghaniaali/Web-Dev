import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart';
import { CartItem } from "./cart-item/cart-item";
import { OrderSummary } from "./order-summary/order-summary";

@Component({
  selector: 'app-cart',
  imports: [CartItem, OrderSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {

cartService = inject(CartService);

}

