import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { products } from '@/app/shared/constants/products.data';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all products', () => {
    expect(component.filteredProducts.length).toBe(products.length);
  });

  it('should filter products based on search term', () => {
    const searchTerm = products[0].name.substring(0, 3).toLowerCase(); // Get first few letters of a product
    component.onSearch(searchTerm);
    fixture.detectChanges();

    expect(component.filteredProducts.length).toBeGreaterThan(0);
    expect(component.filteredProducts.every(p => p.name.toLowerCase().includes(searchTerm))).toBeTrue();
  });

  it('should show all products when search term is empty', () => {
    component.onSearch('');
    fixture.detectChanges();

    expect(component.filteredProducts.length).toBe(products.length);
  });

  it('should show no products if no match is found', () => {
    component.onSearch('nonexistent');
    fixture.detectChanges();

    expect(component.filteredProducts.length).toBe(0);
  });
});
