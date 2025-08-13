import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButton } from "../../../components/primary-button/primary-button";
import { CartService } from '../../../services/cart';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButton],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {


  cartservice = inject(CartService);
  product = input.required<Product>();

}
