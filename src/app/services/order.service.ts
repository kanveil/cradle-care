import { Injectable, signal } from '@angular/core';
import { Order, OrderItem, OrderStatusInfo, ShippingInfo } from '../models/order.model';
import { loadJSON, saveJSON } from './storage.util';
import { NotificationService } from './notification.service';

const KEY = 'cc_orders';
const STATUS_LABELS = ['Order placed', 'Processing', 'Shipped', 'Delivered'];
const STATUS_DESCRIPTIONS = [
  'We received your order and payment.',
  'Your items are being packed for shipment.',
  'Your package is on the way.',
  'Your order has been delivered.',
];

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

/* Seed demo history so Orders / Dashboard / Inventory aren't empty on first run */
const SEED_ORDERS: Order[] = [
  { id: 'CC-482910', tracking: 'CCX918273645', createdAt: daysAgo(6), payment: 'Card ending in 4242',
    shipping: { name: 'Ana Reyes', email: 'ana.reyes@example.com', address: '14 Willow Ave', city: 'Brooklyn', state: 'NY', postal: '11201', country: 'United States' },
    items: [{ id: 4, name: 'Weighted Sleep Sack 0-6m', price: 38, qty: 1, icon: 'sleep' }, { id: 10, name: 'Overnight Diaper Pack (Size 2)', price: 26, qty: 2, icon: 'diaper' }],
    total: 90, customerEmail: 'ana.reyes@example.com' },
  { id: 'CC-482933', tracking: 'CCX918273701', createdAt: daysAgo(5), payment: 'PayPal sandbox — approved',
    shipping: { name: 'Marco DeLuca', email: 'marco.deluca@example.com', address: '92 Cedar St', city: 'Queens', state: 'NY', postal: '11375', country: 'United States' },
    items: [{ id: 1, name: 'Anti-Colic Baby Bottle Set', price: 24, qty: 2, icon: 'bottle' }],
    total: 48, customerEmail: 'marco.deluca@example.com' },
  { id: 'CC-483005', tracking: 'CCX918273988', createdAt: daysAgo(4), payment: 'Card ending in 1881',
    shipping: { name: 'Priya Shah', email: 'priya.shah@example.com', address: '5 Harbor Ln', city: 'Jersey City', state: 'NJ', postal: '07302', country: 'United States' },
    items: [{ id: 13, name: 'Wooden Rattle & Grasp Set', price: 16, qty: 1, icon: 'play' }, { id: 14, name: 'High-Contrast Board Books', price: 13, qty: 1, icon: 'play' }, { id: 16, name: 'Organic Cotton Onesie 3-Pack', price: 27, qty: 1, icon: 'onesie' }],
    total: 56, customerEmail: 'priya.shah@example.com' },
  { id: 'CC-483090', tracking: 'CCX918274120', createdAt: daysAgo(3), payment: 'Card ending in 0099',
    shipping: { name: 'Sofia Nakamura', email: 'sofia.nakamura@example.com', address: '210 Maple Dr', city: 'Astoria', state: 'NY', postal: '11105', country: 'United States' },
    items: [{ id: 7, name: 'Hooded Bath Towel Set', price: 22, qty: 2, icon: 'bath' }],
    total: 44, manualStatusIndex: 2, customerEmail: 'sofia.nakamura@example.com' },
  { id: 'CC-483151', tracking: 'CCX918274355', createdAt: daysAgo(2), payment: 'Card ending in 5522',
    shipping: { name: 'Devon Carter', email: 'devon.carter@example.com', address: '77 River Rd', city: 'Hoboken', state: 'NJ', postal: '07030', country: 'United States' },
    items: [{ id: 5, name: 'White Noise Sound Machine', price: 42, qty: 1, icon: 'sleep' }, { id: 8, name: 'Bath Thermometer + Toy', price: 11, qty: 1, icon: 'bath' }],
    total: 53, customerEmail: 'devon.carter@example.com' },
  { id: 'CC-483210', tracking: 'CCX918274590', createdAt: daysAgo(1), payment: 'Card ending in 7744',
    shipping: { name: 'Tomás Herrera', email: 'tomas.herrera@example.com', address: '3 Elm Ct', city: 'Bronx', state: 'NY', postal: '10451', country: 'United States' },
    items: [{ id: 11, name: 'Sensitive Skin Wipes 6-Pack', price: 17, qty: 2, icon: 'diaper' }, { id: 3, name: 'Bamboo Feeding Bowl Set', price: 19, qty: 1, icon: 'bottle' }],
    total: 53, customerEmail: 'tomas.herrera@example.com' },
  { id: 'CC-483266', tracking: 'CCX918274811', createdAt: daysAgo(0), payment: 'Card ending in 3390',
    shipping: { name: 'Jamie Lee', email: 'jamie.lee@example.com', address: '18 Bay St', city: 'Staten Island', state: 'NY', postal: '10301', country: 'United States' },
    items: [{ id: 15, name: 'Soft Stacking Cups', price: 12, qty: 1, icon: 'play' }, { id: 2, name: 'Silicone Weaning Spoon Trio', price: 14.5, qty: 2, icon: 'bottle' }],
    total: 41, customerEmail: 'jamie.lee@example.com' },
];

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly _orders = signal<Order[]>(loadJSON<Order[]>(KEY, SEED_ORDERS));
  readonly orders = this._orders.asReadonly();

  constructor(private notifications: NotificationService) {}

  private persist(list: Order[]): void {
    saveJSON(KEY, list);
  }

  placeOrder(items: OrderItem[], shipping: ShippingInfo, payment: string): Order {
    const id = 'CC-' + Math.floor(100000 + Math.random() * 900000);
    const tracking = 'CCX' + Math.floor(100000000 + Math.random() * 900000000);
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const order: Order = { id, tracking, createdAt: new Date().toISOString(), payment, shipping, items, total, customerEmail: shipping.email };
    this._orders.update((list) => {
      const next = [order, ...list];
      this.persist(next);
      return next;
    });
    this.notifications.add('Order placed', `${order.id} is confirmed. Tracking number ${order.tracking}.`, true);
    return order;
  }

  statusInfo(order: Order): OrderStatusInfo {
    let index: number;
    if (order.manualStatusIndex !== undefined) {
      index = order.manualStatusIndex;
    } else {
      const placed = new Date(order.createdAt);
      const now = new Date();
      const ageDays = (now.getTime() - placed.getTime()) / 86400000;
      index = 0;
      if (ageDays >= 3) index = 3;
      else if (ageDays >= 2) index = 2;
      else if (ageDays >= 1) index = 1;
    }
    return { index, label: STATUS_LABELS[index], description: STATUS_DESCRIPTIONS[index] };
  }

  setManualStatus(orderId: string, index: number): void {
    this._orders.update((list) => {
      const next = list.map((o) => (o.id === orderId ? { ...o, manualStatusIndex: index } : o));
      this.persist(next);
      return next;
    });
  }

  readonly statusLabels = STATUS_LABELS;
}
