import { Component, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductCard } from "../products-list/product-card/product-card";

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

   async ngOnInit() {

    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    this.products.set(data);

  }
  products = signal<Product[]>([

// {
//  id: 1,
//  name: 'Product 1',
//  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//  price: 100,
//  stock: 10,
// },
// {
//  id: 2,
//  name: 'Product 2',
//  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//  price: 150,
//  stock: 20,

// }

  ]);

}
