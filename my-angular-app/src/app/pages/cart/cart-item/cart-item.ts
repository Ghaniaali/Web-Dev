import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { Button } from "../../../components/button/button";
import { CartService } from '../../../services/cart';

@Component({
  selector: 'app-cart-item',
  imports: [Button],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss'
})
export class CartItem {

  cartservice = inject(CartService);
  
  item = input.required<Product>();

}
