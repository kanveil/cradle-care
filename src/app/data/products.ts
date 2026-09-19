import { Product } from '../models/product.model';

/* Ported from the original script.js PRODUCTS array, plus a stock field for inventory control */
export const PRODUCTS: Product[] = [
  { id: 1,  name: 'Anti-Colic Baby Bottle Set',      cat: 'feeding',   price: 24.00, icon: 'bottle', desc: 'Set of 3, wide-neck, vented base to reduce gas and fussing.', stock: 42 },
  { id: 2,  name: 'Silicone Weaning Spoon Trio',      cat: 'feeding',   price: 14.50, icon: 'bottle', desc: 'Soft-tip spoons sized for tiny mouths, heat-sensing tip.', stock: 65 },
  { id: 3,  name: 'Bamboo Feeding Bowl Set',          cat: 'feeding',   price: 19.00, icon: 'bottle', desc: 'Suction base, splash guard, dishwasher safe.', stock: 8 },
  { id: 4,  name: 'Weighted Sleep Sack 0-6m',         cat: 'sleep',     price: 38.00, icon: 'sleep',  desc: 'TOG 2.5, organic cotton, gentle weighted center panel.', stock: 30 },
  { id: 5,  name: 'White Noise Sound Machine',        cat: 'sleep',     price: 42.00, icon: 'sleep',  desc: '12 soothing sounds, auto-off timer, soft night light.', stock: 5 },
  { id: 6,  name: 'Breathable Crib Liner',            cat: 'sleep',     price: 29.00, icon: 'sleep',  desc: 'Mesh weave, machine washable, fits standard cribs.', stock: 24 },
  { id: 7,  name: 'Hooded Bath Towel Set',            cat: 'bath',      price: 22.00, icon: 'bath',   desc: 'Ultra-soft organic cotton, set of 2 with washcloths.', stock: 51 },
  { id: 8,  name: 'Bath Thermometer + Toy',           cat: 'bath',      price: 11.00, icon: 'bath',   desc: 'Floats in the tub, glows if water runs too hot.', stock: 3 },
  { id: 9,  name: 'Tear-Free Wash & Shampoo',         cat: 'bath',      price: 9.50,  icon: 'bath',   desc: 'Fragrance-light, dermatologist tested, 2-in-1 formula.', stock: 88 },
  { id: 10, name: 'Overnight Diaper Pack (Size 2)',   cat: 'diapering', price: 26.00, icon: 'diaper', desc: '12-hour absorbency, hypoallergenic liner, 44 count.', stock: 60 },
  { id: 11, name: 'Sensitive Skin Wipes 6-Pack',      cat: 'diapering', price: 17.00, icon: 'diaper', desc: '99% water, unscented, thick enough for one-wipe cleanups.', stock: 4 },
  { id: 12, name: 'Changing Pad + Cover',             cat: 'diapering', price: 31.00, icon: 'diaper', desc: 'Wipeable core, quilted cotton cover, safety strap.', stock: 18 },
  { id: 13, name: 'Wooden Rattle & Grasp Set',        cat: 'play',      price: 16.00, icon: 'play',   desc: 'Untreated maple, rounded edges, set of 3 shapes.', stock: 37 },
  { id: 14, name: 'High-Contrast Board Books',        cat: 'play',      price: 13.00, icon: 'play',   desc: 'Set of 3, black-and-white pages for early focus.', stock: 0 },
  { id: 15, name: 'Soft Stacking Cups',               cat: 'play',      price: 12.00, icon: 'play',   desc: 'Food-grade silicone, nests for easy storage, 8 pieces.', stock: 45 },
  { id: 16, name: 'Organic Cotton Onesie 3-Pack',     cat: 'diapering', price: 27.00, icon: 'onesie', desc: 'Envelope neck, snap closures, sizes NB–12m.', stock: 22 },
];

export const CATEGORY_FILTERS: { value: string; label: string }[] = [
  { value: 'all',        label: 'All' },
  { value: 'feeding',    label: 'Feeding' },
  { value: 'sleep',      label: 'Sleep' },
  { value: 'bath',       label: 'Bath' },
  { value: 'diapering',  label: 'Diapering' },
  { value: 'play',       label: 'Playtime' },
];

export const CATEGORY_OPTIONS: { value: Product['cat']; label: string }[] = [
  { value: 'feeding',    label: 'Feeding' },
  { value: 'sleep',      label: 'Sleep' },
  { value: 'bath',       label: 'Bath' },
  { value: 'diapering',  label: 'Diapering' },
  { value: 'play',       label: 'Playtime' },
];

export const ICON_OPTIONS: Product['icon'][] = ['bottle', 'sleep', 'bath', 'diaper', 'play', 'onesie'];

/* Ionicons name + tint per category, standing in for the site's hand-drawn SVGs */
export const ICON_MAP: Record<string, { icon: string; bg: string; tint: string }> = {
  bottle: { icon: 'nutrition-outline',   bg: '#FFF1E4', tint: '#E85569' },
  sleep:  { icon: 'moon-outline',        bg: '#FFF1E4', tint: '#FFD374' },
  bath:   { icon: 'water-outline',       bg: '#FFF1E4', tint: '#5FAE87' },
  diaper: { icon: 'shield-checkmark-outline', bg: '#FFF1E4', tint: '#FF6F81' },
  play:   { icon: 'happy-outline',       bg: '#FFF1E4', tint: '#FFD374' },
  onesie: { icon: 'shirt-outline',       bg: '#FFF1E4', tint: '#FF6F81' },
};
