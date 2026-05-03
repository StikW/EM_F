import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly auth = inject(AuthService);

  user = this.auth.user;
  isAuth = this.auth.isAuthenticated;

  products: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'Todas';
  search: string = '';
  loading = true;
  error = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: res => {
        this.products = res.products;
        this.categories = ['Todas', ...new Set(res.products.map(p => p.category))];
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos. Verifica que el backend esté corriendo.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const q = this.search.trim().toLowerCase();
    this.filtered = this.products.filter(p => {
      const matchCat = this.selectedCategory === 'Todas' || p.category === this.selectedCategory;
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  starsArray(rating: number): number[] {
    return Array.from({ length: Math.round(rating) }, (_, i) => i);
  }
}
