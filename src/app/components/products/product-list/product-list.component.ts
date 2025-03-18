import { CartItem } from '@/app/interfaces/cart-item.interface';
import { Product } from '@/app/interfaces/product.interface';
import { InCartPipe } from '@/app/pipes/inCart.pipe';
import { CartService } from '@/app/services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, InCartPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = [];

  public cart: CartItem[] = [];

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartService.cart$.pipe(takeUntil(this.destroyed$)).subscribe(cart => this.cart = cart);
  }

  public addToCart(product: Product) {
    this.cartService.addToCart(product).pipe(takeUntil(this.destroyed$)).subscribe(
      {
        next: () => {
          this.toastr.success(`${product.name}`, 'Added to Cart');
        },
        error: () => {
          this.toastr.error('Error adding to cart', 'Error');
        }
      }
    );
  }

  public removeFromCart(product: Product) {
    this.cartService.removeFromCart(product.id).pipe(takeUntil(this.destroyed$)).subscribe(
      {
        next: () => {
          this.toastr.warning(`${product.name}`, 'Removed from Cart');
        },
        error: () => {
          this.toastr.error('Error removing from cart', 'Error');
        }
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
