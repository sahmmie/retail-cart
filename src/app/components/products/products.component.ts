import { Component } from '@angular/core';
import { ProductListComponent } from "../product-list/product-list.component";
import { ProductSearchComponent } from "../product-search/product-search.component";
import { Product } from '@/app/interfaces/product.interface';
import { products } from '@/app/shared/constants/products.data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent, ProductSearchComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public allProducts: Product[] = products;
  public filteredProducts: Product[] = products;

  onSearch(term: string) {
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

}
