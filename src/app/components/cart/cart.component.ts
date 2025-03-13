import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '@/app/interfaces/cart-item.interface';
import { CartService } from '@/app/services/cart.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SubtotalPipe } from "../../pipes/subtotal.pipe";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SubtotalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public cartItems: CartItem[] = [];

  public total = 0;
  public discountTotal = 0;

  public quantityForms: { [key: number]: FormControl } = {};
  public discountCode = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.cartTotals.total;
      this.discountTotal = this.cartService.cartTotals.newTotal;

      // Initialize form controls for each item
      this.cartItems.forEach((item) => {
        if (!this.quantityForms[item.product.id]) {
          this.quantityForms[item.product.id] = new FormControl(item.quantity);
        } else {
          this.quantityForms[item.product.id].setValue(item.quantity, { emitEvent: false });
        }

        // Listen for changes in the form control
        this.quantityForms[item.product.id].valueChanges.pipe(takeUntil(this.destroy$)).subscribe((newQuantity) => {
          if (newQuantity >= 0) {
            this.cartService.updateQuantity(item.product.id, newQuantity);
          }
        });
      });
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    delete this.quantityForms[productId];
  }

  applyDiscount() {
    this.cartService.applyDiscountCode(this.discountCode.value as string);
    if (!this.cartService.discountError$.value) {
      this.discountCode.reset();
    }
  }

  clearDicountCode() {
    this.cartService.applyDiscountCode('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
