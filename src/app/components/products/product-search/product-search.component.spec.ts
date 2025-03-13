import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSearchComponent } from './product-search.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when input changes', (done) => {
    spyOn(component.search, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Simulate user typing in the search box
    inputElement.value = 'Laptop';
    inputElement.dispatchEvent(new Event('input'));

    setTimeout(() => {
      expect(component.search.emit).toHaveBeenCalledWith('laptop'); // Trimmed & lowercased
      done();
    }, 400); // Ensure it accounts for debounceTime(300ms)
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
