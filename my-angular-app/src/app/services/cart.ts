import { Injectable, signal } from '@angular/core';
import { ProductCard } from '../pages/products-list/product-card/product-card';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Product[]>([
{
 id: 1,
 title: 'Product 1',
 image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
 price: 100,
 stock: 10,
},
{
 id: 2,
 title: 'Product 2',
 image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
 price: 150,
 stock: 20,

}]); 

  addToCart(product: Product) {
    this.cart.set([...this.cart(), product])
  }

  removeFromCart(id: number) {
    this.cart.set(this.cart().filter((p) => p.id !== id));

}
}
