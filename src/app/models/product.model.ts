export type ProductCategory = 'feeding' | 'sleep' | 'bath' | 'diapering' | 'play';
export type ProductIcon = 'bottle' | 'sleep' | 'bath' | 'diaper' | 'play' | 'onesie';

export interface Product {
  id: number;
  name: string;
  cat: ProductCategory;
  price: number;
  icon: ProductIcon;
  desc: string;
  stock: number;
}
