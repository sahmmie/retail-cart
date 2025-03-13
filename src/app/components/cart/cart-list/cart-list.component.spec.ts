import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartListComponent } from './cart-list.component';
import { SubtotalPipe } from '@/app/pipes/subtotal.pipe';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CartItem } from '@/app/interfaces/cart-item.interface';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let cartItem: CartItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListComponent, SubtotalPipe, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;

    cartItem = { product: { id: 1, name: 'Test Product', price: 20, image: '' }, quantity: 2 };
    component.cartItem = cartItem;
    component.quantityForm = { [cartItem.product.id]: new FormControl(cartItem.quantity) };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct product name and price', () => {
    const productName = fixture.nativeElement.querySelector('h3').textContent;
    const productPrice = fixture.nativeElement.querySelector('p.text-gray-600').textContent;

    expect(productName).toContain('Test Product');
    expect(productPrice).toContain('20');
  });

  it('should update quantity form control when input changes', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = '3';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.quantityForm[cartItem.product.id].value).toBe(3);
  });

  it('should emit remove event when remove button is clicked', () => {
    spyOn(component.removeItem, 'emit');
    const button: DebugElement = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(component.removeItem.emit).toHaveBeenCalledWith(cartItem.product.id);
  });
});
