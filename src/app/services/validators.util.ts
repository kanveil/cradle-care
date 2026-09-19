/** Validation helpers, ported directly from the original script.js */
export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
export function isValidPostal(v: string): boolean {
  return /^\d{5}$/.test(v.trim());
}
export function isValidPhone(v: string): boolean {
  const digits = v.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}
export function isValidCard(v: string): boolean {
  const d = v.replace(/\D/g, '');
  if (d.length < 13 || d.length > 19) return false;
  let sum = 0;
  let dbl = false;
  for (let i = d.length - 1; i >= 0; i--) {
    let n = +d[i];
    if (dbl) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}
export function isValidExpiry(v: string): boolean {
  const m = v.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return false;
  const mo = +m[1];
  const yr = 2000 + +m[2];
  if (mo < 1 || mo > 12) return false;
  const now = new Date();
  return new Date(yr, mo, 0) >= new Date(now.getFullYear(), now.getMonth(), 1);
}
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 10);
  return d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d;
}
export function formatCardNumber(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 19);
  return d.replace(/(.{4})/g, '$1 ').trim();
}
export function formatExpiry(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}
