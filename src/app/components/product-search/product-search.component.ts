import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Subject } from 'rxjs/internal/Subject';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((value) => {
      this.search.emit(value?.trim().toLowerCase() || '');
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
