import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../interfaces/product.interface';

describe('CartService', () => {
  let service: CartService;
  const testProduct: Product = { id: 1, name: 'Test Product', price: 100 };

  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', (done) => {
    service.addToCart(testProduct);
    service.cart$.subscribe(cart => {
      expect(cart.length).toBe(1);
      expect(cart[0].product.id).toBe(testProduct.id);
      expect(cart[0].quantity).toBe(1);
      done();
    });
  });

  it('should increase quantity when adding the same product again', (done) => {
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    service.cart$.subscribe(cart => {
      expect(cart.length).toBe(1);
      expect(cart[0].quantity).toBe(2);
      done();
    });
  });

  it('should update the quantity of a product', (done) => {
    service.addToCart(testProduct);
    service.updateQuantity(testProduct.id, 5);
    service.cart$.subscribe(cart => {
      expect(cart[0].quantity).toBe(5);
      done();
    });
  });

  it('should remove a product from the cart', (done) => {
    service.addToCart(testProduct);
    service.removeFromCart(testProduct.id);
    service.cart$.subscribe(cart => {
      expect(cart.length).toBe(0);
      done();
    });
  });

  it('should apply valid discount code SAVE10', () => {
    service.addToCart(testProduct);
    const totalBeforeDiscount = service.cartTotals.total;
    service.applyDiscountCode('SAVE10');
    expect(service.discountError$.value).toBe('');
    const totals = service.cartTotals;
    expect(totals.newTotal).toBeCloseTo(totalBeforeDiscount * 0.9, 2);
  });

  it('should apply valid discount code SAVE5', () => {
    service.addToCart(testProduct);
    const totalBeforeDiscount = service.cartTotals.total;
    service.applyDiscountCode('SAVE5');
    expect(service.discountError$.value).toBe('');
    const totals = service.cartTotals;
    expect(totals.newTotal).toBe(Math.max(0, totalBeforeDiscount - 5));
  });

  it('should return error for an invalid discount code', () => {
    service.applyDiscountCode('INVALID');
    expect(service.discountError$.value).toBe('Invalid discount code');
    const totals = service.cartTotals;
    expect(totals.newTotal).toBe(totals.total); // no discount applied
  });

  it('should persist the cart in localStorage', (done) => {
    service.addToCart(testProduct);
    // Create a new instance to simulate a page reload
    const newService = new CartService();
    newService.cart$.subscribe(cart => {
      expect(cart.length).toBeGreaterThan(0);
      expect(cart[0].product.id).toBe(testProduct.id);
      done();
    });
  });

  it('should correctly calculate the total cart price', () => {
    service.addToCart({ id: 1, name: 'Product 1', price: 100 });
    service.addToCart({ id: 2, name: 'Product 2', price: 200 });

    expect(service['calcTotal']).toBe(300); // 100 + 200
  });

  it('should correctly calculate the discount amount', () => {
    service.addToCart({ id: 1, name: 'Product 1', price: 100 });
    service.applyDiscountCode('SAVE10'); // Assuming SAVE10 gives a 10% discount

    expect(service['calcDiscountAmount']).toBeCloseTo(10, 2); // 10% of 100
  });

  it('should return correct cartTotals', () => {
    service.addToCart({ id: 1, name: 'Product 1', price: 100 });
    service.addToCart({ id: 2, name: 'Product 2', price: 200 });
    service.applyDiscountCode('SAVE10'); // 10% discount

    const totals = service.cartTotals;
    expect(totals.total).toBe(300); // 100 + 200
    expect(totals.newTotal).toBeCloseTo(270, 2); // 10% discount applied (300 - 30)
  });
});
