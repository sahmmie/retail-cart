import { SubtotalPipe } from './subtotal.pipe';

describe('SubtotalPipe', () => {
  it('create an instance', () => {
    const pipe = new SubtotalPipe();
    expect(pipe).toBeTruthy();
  });

  it('should correctly calculate the subtotal for a cart item', () => {
    const pipe = new SubtotalPipe();
    const cartItem = { product: { id: 1, name: 'Product 1', price: 50 }, quantity: 3 };

    const subtotal = pipe.transform(cartItem);

    expect(subtotal).toBe(150); // 50 * 3
  });

});
