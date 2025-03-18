import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '@/app/services/cart.service';
import { CartItem } from '@/app/interfaces/cart-item.interface';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: Partial<CartService>;

  beforeEach(async () => {
    cartServiceMock = {
      cart$: new BehaviorSubject<CartItem[]>([
        { product: { id: 1, name: 'Item 1', price: 10, image: '' }, quantity: 1 }
      ]),
      cartTotals: { total: 10, newTotal: 8 },
      discountCode$: new BehaviorSubject('SAVE10'),
      discountError$: new BehaviorSubject<string>(''),
      updateQuantity: jasmine.createSpy('updateQuantity'),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      applyDiscountCode: jasmine.createSpy('applyDiscountCode')
    };

    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items correctly', () => {
    const productName = fixture.nativeElement.querySelector('h3').textContent;
    expect(productName).toContain('Item 1');
  });

  it('should update total and discountTotal correctly', () => {
    expect(component.total).toBe(10);
    expect(component.discountTotal).toBe(8);
  });

  it('should update quantity when input changes', fakeAsync(() => {
    const input = fixture.debugElement.query(By.css('input[type="number"]')).nativeElement;
    input.value = '2';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick(100); // Simulates time passing to trigger debounceTime

    expect(cartServiceMock.updateQuantity).toHaveBeenCalledWith(1, 2);
  }));

  it('should apply discount code when button is clicked', () => {
    component.discountCodeForm.setValue('DISCOUNT20');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[disabled]'));
    expect(button).toBeFalsy(); // Button should be enabled

    component.applyDiscount();
    expect(cartServiceMock.applyDiscountCode).toHaveBeenCalledWith('DISCOUNT20');
  });

  it('should remove item when remove button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button.bg-red-500')).nativeElement;
    button.click();

    expect(cartServiceMock.removeFromCart).toHaveBeenCalledWith(1);
  });
});
