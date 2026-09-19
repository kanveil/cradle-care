import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products';
import { loadJSON, saveJSON } from './storage.util';

const KEY = 'cc_products';
const LOW_STOCK_THRESHOLD = 10;

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly _products = signal<Product[]>(loadJSON<Product[]>(KEY, PRODUCTS));
  readonly products = this._products.asReadonly();

  readonly lowStock = computed(() => this._products().filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD));
  readonly outOfStock = computed(() => this._products().filter((p) => p.stock === 0));
  readonly totalStockValue = computed(() => this._products().reduce((sum, p) => sum + p.price * p.stock, 0));

  readonly lowStockThreshold = LOW_STOCK_THRESHOLD;

  private persist(list: Product[]): void {
    saveJSON(KEY, list);
  }

  byId(id: number): Product | undefined {
    return this._products().find((p) => p.id === id);
  }

  add(product: Omit<Product, 'id'>): Product {
    const nextId = Math.max(0, ...this._products().map((p) => p.id)) + 1;
    const created: Product = { ...product, id: nextId };
    this._products.update((list) => {
      const next = [...list, created];
      this.persist(next);
      return next;
    });
    return created;
  }

  update(id: number, patch: Partial<Omit<Product, 'id'>>): void {
    this._products.update((list) => {
      const next = list.map((p) => (p.id === id ? { ...p, ...patch } : p));
      this.persist(next);
      return next;
    });
  }

  remove(id: number): void {
    this._products.update((list) => {
      const next = list.filter((p) => p.id !== id);
      this.persist(next);
      return next;
    });
  }

  adjustStock(id: number, delta: number): void {
    this._products.update((list) => {
      const next = list.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
      this.persist(next);
      return next;
    });
  }

  setStock(id: number, stock: number): void {
    this._products.update((list) => {
      const next = list.map((p) => (p.id === id ? { ...p, stock: Math.max(0, stock) } : p));
      this.persist(next);
      return next;
    });
  }
}
