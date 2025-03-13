import { Product } from '@/app/interfaces/product.interface';
import { CartService } from '@/app/services/cart.service';
import { products } from '@/app/shared/constants/products.data';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  constructor(private cartService: CartService) { }

  public addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
