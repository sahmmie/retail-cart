import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.interface';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'inCart',
  standalone: true,
  pure: false
})
export class InCartPipe implements PipeTransform {

  transform(item: Product, cart: CartItem[]): boolean {
    return cart.find(ci => ci.product.id === item.id) !== undefined;
  }

}
