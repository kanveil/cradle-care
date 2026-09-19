export interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  icon: string;
}

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  country: string;
}

export interface Order {
  id: string;
  tracking: string;
  createdAt: string;
  payment: string;
  shipping: ShippingInfo;
  items: OrderItem[];
  total: number;
  manualStatusIndex?: number;
  customerEmail?: string;
}

export interface OrderStatusInfo {
  index: number;
  label: string;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  text: string;
  time: string;
  read: boolean;
}
