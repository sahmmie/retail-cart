import { CartItem } from '@/app/interfaces/cart-item.interface';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubtotalPipe } from "../../pipes/subtotal.pipe";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
