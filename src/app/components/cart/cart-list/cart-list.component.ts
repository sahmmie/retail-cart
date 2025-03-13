import { CartItem } from '@/app/interfaces/cart-item.interface';
import { SubtotalPipe } from '@/app/pipes/subtotal.pipe';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, SubtotalPipe, ReactiveFormsModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent {
  @Input()
  public cartItem!: CartItem;
  @Input()
  public quantityForm!: { [key: number]: FormControl };
  @Output()
  public removeItem = new EventEmitter<number>();

  constructor() { }
}
