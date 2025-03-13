import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.interface';

@Pipe({
  name: 'subtotal',
  standalone: true,
  pure: false
})
export class SubtotalPipe implements PipeTransform {

  transform(item: CartItem): number {
    return item.product.price * item.quantity;
  }

}
