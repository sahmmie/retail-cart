import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CartService } from '@/app/services/cart.service';
import { RouterModule } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let cartServiceMock: Partial<CartService>;

  beforeEach(async () => {
    cartServiceMock = {
      cart$: new BehaviorSubject([{ product: { id: 1, name: 'Item 1', price: 100 }, quantity: 1 }])
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterModule.forRoot([])], // Replaced RouterTestingModule
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct cart item count', () => {
    const cartCountElement = fixture.debugElement.query(By.css('.bg-red-500')).nativeElement;
    expect(cartCountElement.textContent.trim()).toBe('1');
  });

  it('should update cart count when items change', () => {
    (cartServiceMock.cart$ as BehaviorSubject<any[]>).next([
      { product: { id: 2, name: 'Item 2' }, quantity: 2 }
    ]);
    fixture.detectChanges();

    const cartCountElement = fixture.debugElement.query(By.css('.bg-red-500')).nativeElement;
    expect(cartCountElement.textContent.trim()).toBe('1');
  });

  it('should navigate to products and cart pages', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links[0].nativeElement.getAttribute('href')).toBe('/');
    expect(links[1].nativeElement.getAttribute('href')).toBe('/products');
    expect(links[2].nativeElement.getAttribute('href')).toBe('/cart');
  });
});
