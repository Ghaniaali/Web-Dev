import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart';
import { ProductCard } from "../../products-list/product-card/product-card";
import { PrimaryButton } from "../../../components/primary-button/primary-button";

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButton],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss'
})
export class OrderSummary {

  cartservice = inject(CartService);

  total = computed(() => {
    let total = 0;
    for (const item of this.cartservice.cart()) {
          total += item.price;
    }

    return total;


})

}