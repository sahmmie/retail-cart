import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from '../interfaces/cart-item.interface';
import { Product } from '../interfaces/product.interface';
import { validDiscounts } from '../shared/constants/discount.data';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = this.loadCartFromStorage();

  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  private discountSubject = new BehaviorSubject<number>(this.calcDiscountAmount);

  public cart$ = this.cartSubject.asObservable();
  public discountError$ = new BehaviorSubject<string>('');
  public discountCode$ = new BehaviorSubject<string>(this.loadDiscountFromStorage());

  constructor() {
    this.updateCart();
  }

  private get calcDiscountAmount(): number {
    return this.discountCode$?.getValue() ? validDiscounts[this.discountCode$.getValue()]?.(this.calcTotal) || 0 : 0;
  }

  private get calcTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  public get cartTotals(): { total: number; newTotal: number } {
    return {
      total: this.calcTotal,
      newTotal: Math.max(0, this.calcTotal - this.calcDiscountAmount)
    };
  }

  public addToCart(product: Product): Observable<boolean> {
    const item = this.cart.find(ci => ci.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.updateCart();
    return of(true);
  }

  public removeFromCart(productId: number): Observable<boolean> {
    this.cart = this.cart.filter(ci => ci.product.id !== productId);
    this.updateCart();
    return of(true);
  }

  public updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find(ci => ci.product.id === productId);
    if (item && quantity >= 0) {
      item.quantity = quantity;
    }
    else {
      this.removeFromCart(productId);
    }
    this.updateCart();
  }

  public applyDiscountCode(code: string) {
    if (!code) {
      this.discountCode$.next('');
      this.discountError$.next('');
    }

    const trimmedCode = code.trim().toUpperCase();
    if (validDiscounts[trimmedCode]) {
      this.discountCode$.next(trimmedCode);
      this.discountError$.next('');
    } else {
      this.discountCode$.next('');
      this.discountError$.next('Invalid discount code');
    }
    this.updateCart();
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('discountCode', this.discountCode$.value);

    this.cartSubject.next(this.cart);
    this.discountSubject.next(this.calcDiscountAmount);
  }

  private loadCartFromStorage(): CartItem[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  private loadDiscountFromStorage(): string {
    return localStorage.getItem('discountCode') || '';
  }
}
