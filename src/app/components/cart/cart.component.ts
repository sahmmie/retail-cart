import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '@/app/interfaces/cart-item.interface';
import { CartService } from '@/app/services/cart.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CartListComponent } from './cart-list/cart-list.component';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public cartItems: CartItem[] = [];

  public total = 0;
  public discountTotal = 0;

  public quantityForms: { [key: number]: FormControl } = {};
  public discountCodeForm = new FormControl<string>('', [Validators.required, Validators.minLength(3)]);

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.initializeCartSubscriptions();
    this.handleDiscountCodeChanges();
  }

  private initializeCartSubscriptions(): void {
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.cartTotals.total;
      this.discountTotal = this.cartService.cartTotals.newTotal;

      // Initialize form controls for each item
      this.initializeQuantityForms()
    });
  }

  private initializeQuantityForms(): void {
    this.cartItems.forEach((item) => {
      if (!this.quantityForms[item.product.id]) {
        this.quantityForms[item.product.id] = new FormControl(item.quantity);
      } else {
        this.quantityForms[item.product.id].setValue(item.quantity, { emitEvent: false });
      }

      // Listen for changes in the form control
      this.handleQuantityChanges(item)
    });
  }

  private handleQuantityChanges(item: CartItem): void {
    this.quantityForms[item.product.id].valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(100))
      .subscribe((newQuantity) => {
        if (newQuantity >= 0) {
          this.cartService.updateQuantity(item.product.id, newQuantity);
        }
      });
  }

  private handleDiscountCodeChanges(): void {
    this.discountCodeForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((code) => {
      if (this.cartService.discountError$.value) {
        this.cartService.discountError$.next('');
      }
    });
  }

  public removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    delete this.quantityForms[productId];
  }

  public applyDiscount() {
    this.cartService.applyDiscountCode(this.discountCodeForm.value as string);
    if (!this.cartService.discountError$.value) {
      this.discountCodeForm.reset();
    }
  }

  public clearDicountCode() {
    this.cartService.applyDiscountCode('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
