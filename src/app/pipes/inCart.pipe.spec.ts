import { Product } from './../interfaces/product.interface';
import { CartItem } from '@/app/interfaces/cart-item.interface';
import { InCartPipe } from './inCart.pipe';

describe('InCartPipe', () => {
  let pipe: InCartPipe;
  let mockProduct: Product;
  let mockCart: CartItem[];

  beforeEach(() => {
    pipe = new InCartPipe();
    mockProduct = { id: 1, name: 'Product 1', price: 10, image: 'assets/image1.jpg' };
    mockCart = [{ product: mockProduct, quantity: 1 }];
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if product is in cart', () => {
    expect(pipe.transform(mockProduct, mockCart)).toBeTrue();
  });

  it('should return false if product is not in cart', () => {
    const otherProduct: Product = { id: 2, name: 'Product 2', price: 20, image: 'assets/image2.jpg' };
    expect(pipe.transform(otherProduct, mockCart)).toBeFalse();
  });

  it('should return false if cart is empty', () => {
    expect(pipe.transform(mockProduct, [])).toBeFalse();
  });
});
