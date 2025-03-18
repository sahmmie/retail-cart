import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { CartService } from '@/app/services/cart.service';
import { By } from '@angular/platform-browser';
import { Product } from '@/app/interfaces/product.interface';
import { ToastrModule } from 'ngx-toastr';
import { InCartPipe } from '@/app/pipes/inCart.pipe';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CartItem } from '@/app/interfaces/cart-item.interface';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let cartServiceMock: Partial<CartService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10, image: 'assets/image1.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: 'assets/image2.jpg' }
  ];

  beforeEach(async () => {
    cartServiceMock = {
      cart$: new BehaviorSubject<CartItem[]>([]), // ✅ Mock cart$ as a BehaviorSubject
      addToCart: jasmine.createSpy('addToCart').and.returnValue(new BehaviorSubject(null)), // ✅ Simulate observable return
      removeFromCart: jasmine.createSpy('removeFromCart').and.returnValue(new BehaviorSubject(null)), // ✅ Simulate observable return
    };

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, ToastrModule.forRoot(), InCartPipe],
      providers: [{ provide: CartService, useValue: cartServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    component.products = mockProducts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products correctly', () => {
    const productElements = fixture.debugElement.queryAll(By.css('.bg-white'));
    expect(productElements.length).toBe(mockProducts.length);

    productElements.forEach((productElement, index) => {
      const name = productElement.query(By.css('h3')).nativeElement.textContent.trim();
      const price = productElement.query(By.css('p')).nativeElement.textContent.trim();
      expect(name).toBe(mockProducts[index].name);
      expect(price).toBe(`$${mockProducts[index].price}`);
    });
  });

  it('should call addToCart when button is clicked', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();

    expect(cartServiceMock.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should call removeFromCart when button is clicked', () => {
    component.cart = [{ product: mockProducts[0], quantity: 1 }]; // Simulate product in cart
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.bg-red-500')).nativeElement;
    button.click();

    expect(cartServiceMock.removeFromCart).toHaveBeenCalledWith(mockProducts[0].id);
  });

});
