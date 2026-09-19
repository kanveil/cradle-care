/* ---------------- Icon set (inline SVG strings, reused per category) ---------------- */
const ICONS = {
  bottle: `<svg viewBox="0 0 64 64" fill="none" stroke="#2E2A4D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="6" width="10" height="8" rx="2" fill="#FF6F81" stroke="none"/><path d="M20 16h14l3 6v30a4 4 0 0 1-4 4H21a4 4 0 0 1-4-4V22z" fill="#FFF1E4"/><line x1="17" y1="34" x2="31" y2="34"/><line x1="17" y1="42" x2="31" y2="42"/></svg>`,
  sleep: `<svg viewBox="0 0 64 64" fill="none" stroke="#2E2A4D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M40 8c-11 0-19 8-19 19s8 19 19 19c4 0 7.6-1.1 10.6-3-6-3-10-9-10-16.5S44.6 12.5 50.6 11c-3-1.9-6.6-3-10.6-3z" fill="#FFD374" stroke="none"/><circle cx="16" cy="44" r="3" fill="#8FCFB0" stroke="none"/></svg>`,
  bath: `<svg viewBox="0 0 64 64" fill="none" stroke="#2E2A4D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 36h44v6a10 10 0 0 1-10 10H20A10 10 0 0 1 10 42z" fill="#8FCFB0"/><path d="M14 36V20a6 6 0 0 1 6-6" /><circle cx="44" cy="18" r="4" fill="#FFF1E4"/><path d="M6 44c2 2 4 2 6 0s4-2 6 0 4 2 6 0"/></svg>`,
  diaper: `<svg viewBox="0 0 64 64" fill="none" stroke="#2E2A4D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 20h48v8c0 14-10 24-24 28-14-4-24-14-24-28z" fill="#FFF1E4"/><path d="M8 20c6 4 12 6 24 6s18-2 24-6"/><circle cx="32" cy="30" r="3" fill="#FF6F81" stroke="none"/></svg>`,
  play: `<svg viewBox="0 0 64 64" fill="none" stroke="#2E2A4D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="22" fill="#FFD374"/><circle cx="24" cy="28" r="3" fill="#2E2A4D" stroke="none"/><circle cx="40" cy="28" r="3" fill="#2E2A4D" stroke="none"/><path d="M22 38c4 5 16 5 20 0"/></svg>`,
  onesie: `<svg viewBox="0 0 64 64" fill="none" stroke="#2E2A4D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 8h20l2 10-6 4v6h-12v-6l-6-4z" fill="#FF6F81"/><path d="M18 22l-6 8 6 6 4-4v22a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4V32l4 4 6-6-6-8" fill="#FFF1E4"/></svg>`
};

/* ---------------- Product data ---------------- */
const PRODUCTS = [
  { id:1, name:'Anti-Colic Baby Bottle Set', cat:'feeding', price:24.00, icon:'bottle', desc:'Set of 3, wide-neck, vented base to reduce gas and fussing.' },
  { id:2, name:'Silicone Weaning Spoon Trio', cat:'feeding', price:14.50, icon:'bottle', desc:'Soft-tip spoons sized for tiny mouths, heat-sensing tip.' },
  { id:3, name:'Bamboo Feeding Bowl Set', cat:'feeding', price:19.00, icon:'bottle', desc:'Suction base, splash guard, dishwasher safe.' },
  { id:4, name:'Weighted Sleep Sack 0-6m', cat:'sleep', price:38.00, icon:'sleep', desc:'TOG 2.5, organic cotton, gentle weighted center panel.' },
  { id:5, name:'White Noise Sound Machine', cat:'sleep', price:42.00, icon:'sleep', desc:'12 soothing sounds, auto-off timer, soft night light.' },
  { id:6, name:'Breathable Crib Liner', cat:'sleep', price:29.00, icon:'sleep', desc:'Mesh weave, machine washable, fits standard cribs.' },
  { id:7, name:'Hooded Bath Towel Set', cat:'bath', price:22.00, icon:'bath', desc:'Ultra-soft organic cotton, set of 2 with washcloths.' },
  { id:8, name:'Bath Thermometer + Toy', cat:'bath', price:11.00, icon:'bath', desc:'Floats in the tub, glows if water runs too hot.' },
  { id:9, name:'Tear-Free Wash & Shampoo', cat:'bath', price:9.50, icon:'bath', desc:'Fragrance-light, dermatologist tested, 2-in-1 formula.' },
  { id:10, name:'Overnight Diaper Pack (Size 2)', cat:'diapering', price:26.00, icon:'diaper', desc:'12-hour absorbency, hypoallergenic liner, 44 count.' },
  { id:11, name:'Sensitive Skin Wipes 6-Pack', cat:'diapering', price:17.00, icon:'diaper', desc:'99% water, unscented, thick enough for one-wipe cleanups.' },
  { id:12, name:'Changing Pad + Cover', cat:'diapering', price:31.00, icon:'diaper', desc:'Wipeable core, quilted cotton cover, safety strap.' },
  { id:13, name:'Wooden Rattle & Grasp Set', cat:'play', price:16.00, icon:'play', desc:'Untreated maple, rounded edges, set of 3 shapes.' },
  { id:14, name:'High-Contrast Board Books', cat:'play', price:13.00, icon:'play', desc:'Set of 3, black-and-white pages for early focus.' },
  { id:15, name:'Soft Stacking Cups', cat:'play', price:12.00, icon:'play', desc:'Food-grade silicone, nests for easy storage, 8 pieces.' },
  { id:16, name:'Organic Cotton Onesie 3-Pack', cat:'diapering', price:27.00, icon:'onesie', desc:'Envelope neck, snap closures, sizes NB–12m.' }
];

let cart = {}; // id -> qty
let wishlist = JSON.parse(localStorage.getItem('cc_wishlist') || '[]').map(Number);
let notifications = JSON.parse(localStorage.getItem('cc_notifications') || '[]');
let currentUser = JSON.parse(localStorage.getItem('cc_current_user') || 'null');
let authMode = 'login';

/* ---------------- Render products ---------------- */
const grid = document.getElementById('productGrid');
function renderProducts(filter){
  grid.innerHTML = '';
  const items = PRODUCTS.filter(p => filter === 'all' || p.cat === filter);
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-art-wrap">
        <div class="card-art">${ICONS[p.icon]}</div>
        <button class="wish-btn ${wishlist.includes(p.id) ? 'active' : ''}" data-action="wishlist" data-id="${p.id}" aria-label="${wishlist.includes(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}" aria-pressed="${wishlist.includes(p.id)}">
          <svg viewBox="0 0 24 24" fill="${wishlist.includes(p.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 8 4a5 5 0 0 1 4 2.2A5 5 0 0 1 16 4a4.8 4.8 0 0 1 4.8 4.8z"></path></svg>
        </button>
      </div>
      <div class="cat-tag">${p.cat}</div>
      <h3>${p.name}</h3>
      <div class="desc">${p.desc}</div>
      <div class="card-footer">
        <span class="price">$${p.price.toFixed(2)}</span>
        <button class="add-btn" data-action="cart" data-id="${p.id}">Add
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>`;
    grid.appendChild(card);
  });
}
renderProducts('all');

document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if(!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(btn.dataset.filter);
});

grid.addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]');
  if(!btn) return;
  const id = Number(btn.dataset.id);

  if(btn.dataset.action === 'wishlist'){
    toggleWishlist(id);
    return;
  }

  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  showToast('Added to cart');
  btn.classList.add('added');
  const original = btn.innerHTML;
  btn.innerHTML = 'Added ✓';
  setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = original; }, 900);
});

/* ---------------- Cart drawer ---------------- */
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const cartItemsEl = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartSubtotalEl = document.getElementById('cartSubtotal');

function openCart(){ cartDrawer.classList.add('open'); overlay.classList.add('open'); }
function closeCartFn(){ cartDrawer.classList.remove('open'); overlay.classList.remove('open'); }

document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCartFn);
overlay.addEventListener('click', closeCartFn);

function renderCart(){
  const ids = Object.keys(cart).filter(id => cart[id] > 0);
  const totalCount = ids.reduce((sum, id) => sum + cart[id], 0);
  cartCountEl.textContent = totalCount;

  if(ids.length === 0){
    cartItemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Go find something soft.</div>';
    cartSubtotalEl.textContent = '$0.00';
    return;
  }

  let subtotal = 0;
  cartItemsEl.innerHTML = '';
  ids.forEach(id => {
    const p = PRODUCTS.find(x => x.id === Number(id));
    const qty = cart[id];
    subtotal += p.price * qty;
    const line = document.createElement('div');
    line.className = 'cart-line';
    line.innerHTML = `
      <div class="ci-art">${ICONS[p.icon]}</div>
      <div class="ci-info">
        <h4>${p.name}</h4>
        <div class="ci-price">$${p.price.toFixed(2)} each</div>
        <div class="qty-stepper">
          <button data-action="dec" data-id="${p.id}">−</button>
          <span>${qty}</span>
          <button data-action="inc" data-id="${p.id}">+</button>
        </div>
        <button class="ci-remove" data-action="remove" data-id="${p.id}">Remove</button>
      </div>`;
    cartItemsEl.appendChild(line);
  });
  cartSubtotalEl.textContent = '$' + subtotal.toFixed(2);
}

cartItemsEl.addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]');
  if(!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if(action === 'inc') cart[id] += 1;
  if(action === 'dec') { cart[id] -= 1; if(cart[id] <= 0) delete cart[id]; }
  if(action === 'remove') delete cart[id];
  renderCart();
});

const checkoutModal=document.getElementById('checkoutModal'),checkoutForm=document.getElementById('checkoutForm'),checkoutSuccess=document.getElementById('checkoutSuccess'),stepPanels=[...document.querySelectorAll('.checkout-step-panel')],stepIndicators=[...document.querySelectorAll('[data-step-indicator]')];let checkoutStep=1,paymentMethod='card',paypalApproved=false;
function getCartSubtotal(){return Object.keys(cart).reduce((sum,id)=>{const p=PRODUCTS.find(x=>x.id===+id);return p?sum+p.price*cart[id]:sum},0)}
function updateCheckoutStep(){stepPanels.forEach(p=>p.classList.toggle('active',+p.dataset.step===checkoutStep));stepIndicators.forEach(i=>{const n=+i.dataset.stepIndicator;i.classList.toggle('active',n===checkoutStep);i.classList.toggle('complete',n<checkoutStep)});if(checkoutStep===3)buildReview()}
function openCheckout(){if(!Object.keys(cart).length){showToast('Your cart is empty');return}closeCartFn();checkoutStep=1;checkoutSuccess.classList.remove('show');checkoutModal.classList.add('open');checkoutModal.setAttribute('aria-hidden','false');updateCheckoutStep()}
function closeCheckoutFn(){checkoutModal.classList.remove('open');checkoutModal.setAttribute('aria-hidden','true')}
function markField(input,valid){input.closest('.field').classList.toggle('invalid',!valid);return valid}function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())}function validPostal(v){return /^\d{5}$/.test(v.trim())}function validCard(v){const d=v.replace(/\D/g,'');if(d.length<13||d.length>19)return false;let sum=0,dbl=false;for(let i=d.length-1;i>=0;i--){let n=+d[i];if(dbl){n*=2;if(n>9)n-=9}sum+=n;dbl=!dbl}return sum%10===0}function validExpiry(v){const m=v.match(/^(\d{2})\/(\d{2})$/);if(!m)return false;const mo=+m[1],yr=2000+(+m[2]);if(mo<1||mo>12)return false;const now=new Date();return new Date(yr,mo,0)>=new Date(now.getFullYear(),now.getMonth(),1)}
function validateShipping(){let ok=true;['shipFirst','shipLast','shipAddress','shipCity','shipState','shipCountry'].forEach(id=>{const e=document.getElementById(id);ok=markField(e,e.value.trim().length>=2)&&ok});const e=document.getElementById('shipEmail'),p=document.getElementById('shipPostal');ok=markField(e,validEmail(e.value))&&ok;ok=markField(p,validPostal(p.value))&&ok;return ok}
function validatePayment(){if(paymentMethod==='paypal')return paypalApproved;let ok=true;const n=document.getElementById('cardName'),no=document.getElementById('cardNumber'),ex=document.getElementById('cardExpiry'),cv=document.getElementById('cardCvv');ok=markField(n,n.value.trim().length>=2)&&ok;ok=markField(no,validCard(no.value))&&ok;ok=markField(ex,validExpiry(ex.value))&&ok;ok=markField(cv,/^\d{3,4}$/.test(cv.value.trim()))&&ok;return ok}
document.getElementById('checkoutBtn').addEventListener('click',openCheckout);document.getElementById('closeCheckout').addEventListener('click',closeCheckoutFn);checkoutModal.addEventListener('click',e=>{if(e.target===checkoutModal)closeCheckoutFn()});document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{const n=+b.dataset.next;if(checkoutStep===1&&!validateShipping())return;if(checkoutStep===2&&!validatePayment()){if(paymentMethod==='paypal')showToast('Approve the PayPal demo first');return}checkoutStep=n;updateCheckoutStep()}));document.querySelectorAll('[data-prev]').forEach(b=>b.addEventListener('click',()=>{checkoutStep=+b.dataset.prev;updateCheckoutStep()}));document.querySelectorAll('.payment-method').forEach(b=>b.addEventListener('click',()=>{paymentMethod=b.dataset.payment;paypalApproved=false;document.querySelectorAll('.payment-method').forEach(x=>x.classList.toggle('active',x===b));document.getElementById('cardPaymentFields').hidden=paymentMethod!=='card';document.getElementById('paypalPaymentFields').hidden=paymentMethod!=='paypal';document.getElementById('paypalApproved').classList.remove('show')}));document.getElementById('paypalApprove').addEventListener('click',()=>{paypalApproved=true;document.getElementById('paypalApproved').classList.add('show');showToast('PayPal demo approved')});document.getElementById('shipPostal').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,5));document.getElementById('cardNumber').addEventListener('input',e=>{const d=e.target.value.replace(/\D/g,'').slice(0,19);e.target.value=d.replace(/(.{4})/g,'$1 ').trim()});document.getElementById('cardExpiry').addEventListener('input',e=>{const d=e.target.value.replace(/\D/g,'').slice(0,4);e.target.value=d.length>2?d.slice(0,2)+'/'+d.slice(2):d});document.getElementById('cardCvv').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,4));
function buildReview(){const v=id=>document.getElementById(id).value.trim();document.getElementById('reviewShipping').innerHTML=`${v('shipFirst')} ${v('shipLast')}<br>${v('shipAddress')}<br>${v('shipCity')}, ${v('shipState')} ${v('shipPostal')}<br>${v('shipCountry')}`;document.getElementById('reviewPayment').textContent=paymentMethod==='paypal'?'PayPal sandbox — approved':`Card ending in ${v('cardNumber').replace(/\D/g,'').slice(-4)}`;document.getElementById('reviewItems').innerHTML=Object.keys(cart).filter(id=>cart[id]>0).map(id=>{const p=PRODUCTS.find(x=>x.id===+id);return `<div><span>${p.name} × ${cart[id]}</span><strong>$${(p.price*cart[id]).toFixed(2)}</strong></div>`}).join('');document.getElementById('reviewTotal').textContent='$'+getCartSubtotal().toFixed(2)}
function saveOrder(){
  const v=id=>document.getElementById(id).value.trim();
  const orderId='CC-'+Math.floor(100000+Math.random()*900000);
  const tracking='CCX'+Math.floor(100000000+Math.random()*900000000);
  const items=Object.keys(cart).filter(id=>cart[id]>0).map(id=>{const p=PRODUCTS.find(x=>x.id===+id);return {id:p.id,name:p.name,price:p.price,qty:cart[id],icon:p.icon}});
  const total=items.reduce((sum,i)=>sum+i.price*i.qty,0);
  const now=new Date();
  const order={id:orderId,tracking,status:'Order placed',createdAt:now.toISOString(),payment:paymentMethod==='paypal'?'PayPal sandbox':'Card ending in '+v('cardNumber').replace(/\D/g,'').slice(-4),shipping:{name:`${v('shipFirst')} ${v('shipLast')}`,email:v('shipEmail'),address:v('shipAddress'),city:v('shipCity'),state:v('shipState'),postal:v('shipPostal'),country:v('shipCountry')},items,total};
  const orders=JSON.parse(localStorage.getItem('cc_orders')||'[]');orders.unshift(order);localStorage.setItem('cc_orders',JSON.stringify(orders));
  if(typeof addNotification==='function') addNotification('Order placed',`${order.id} is confirmed. Tracking number ${order.tracking}.`,true);
  return order;
}
checkoutForm.addEventListener('submit',e=>{e.preventDefault();if(!document.getElementById('checkoutTerms').checked){showToast('Please accept the demo checkout terms');return}if(!validateShipping()||!validatePayment())return;const order=saveOrder();checkoutSuccess.textContent=`✓ Order ${order.id} placed successfully — $${order.total.toFixed(2)} demo payment approved.`;checkoutSuccess.classList.add('show');cart={};renderCart();renderOrders();document.getElementById('checkoutTerms').checked=false;setTimeout(closeCheckoutFn,2600)});

function getOrders(){return JSON.parse(localStorage.getItem('cc_orders')||'[]')}
function orderStatusInfo(order){
  const placed=new Date(order.createdAt), now=new Date(), age=(now-placed)/86400000;
  let index=0;
  if(age>=3) index=3; else if(age>=2) index=2; else if(age>=1) index=1;
  const labels=['Order placed','Processing','Shipped','Delivered'];
  const descriptions=['We received your order and payment.','Your items are being packed for shipment.','Your package is on the way.','Your order has been delivered.'];
  return {index,label:labels[index],description:descriptions[index]};
}
function renderOrders(){
  const list=document.getElementById('ordersList'),count=document.getElementById('ordersCount'); if(!list)return;
  const orders=getOrders(); count.textContent=`${orders.length} ${orders.length===1?'order':'orders'}`;
  if(!orders.length){list.innerHTML='<div class="orders-empty">No orders yet.<br>Your completed purchases will appear here.</div>';return}
  list.innerHTML=orders.map(o=>{const st=orderStatusInfo(o);const qty=o.items.reduce((a,i)=>a+i.qty,0);return `<article class="order-card"><div class="order-card-top"><div><div class="order-id">${o.id}</div><div class="order-date">${new Date(o.createdAt).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})} · ${qty} item${qty===1?'':'s'}</div></div><span class="order-status">${st.label}</span></div><div class="order-card-summary"><span>${o.items.slice(0,2).map(i=>i.name).join(', ')}${o.items.length>2?'…':''}</span><strong>$${o.total.toFixed(2)}</strong></div><div class="order-actions"><button class="btn btn-primary" data-order-view="${o.id}">View details</button><button class="btn btn-outline" data-order-track="${o.id}">Track order</button></div></article>`}).join('');
}
function openOrderModal(orderId){const o=getOrders().find(x=>x.id===orderId);if(!o)return;const st=orderStatusInfo(o),body=document.getElementById('orderDetailBody');document.getElementById('orderModalTitle').textContent=o.id;const steps=['Order placed','Processing','Shipped','Delivered'];const desc=['We received your order and payment.','Your order is being prepared.','Your package is on the way.','Your package has been delivered.'];body.innerHTML=`<div class="tracking-header"><div><div class="tracking-label">Tracking number</div><div class="tracking-number">${o.tracking}</div></div><div class="tracking-current"><strong>${st.label}</strong><span>Current status</span></div></div><div class="tracking-timeline">${steps.map((label,i)=>`<div class="tracking-step ${i<st.index?'done ':''}${i===st.index?'current':''}"><span class="tracking-dot"></span><h4>${label}</h4><p>${i===st.index?desc[i]:(i<st.index?'Completed':'Not reached yet')}</p></div>`).join('')}</div><div class="order-section"><h4>Items purchased</h4><div class="order-items">${o.items.map(i=>`<div class="order-item"><span>${i.name} × ${i.qty}</span><strong>$${(i.price*i.qty).toFixed(2)}</strong></div>`).join('')}</div><div class="order-total-row"><span>Total</span><span>$${o.total.toFixed(2)}</span></div></div><div class="order-section"><h4>Shipping to</h4><div class="order-address"><strong>${o.shipping.name}</strong><br>${o.shipping.address}<br>${o.shipping.city}, ${o.shipping.state} ${o.shipping.postal}<br>${o.shipping.country}</div></div><div class="order-section"><h4>Payment</h4><div class="order-address">${o.payment}</div></div>`;const modal=document.getElementById('orderModal');modal.classList.add('open');modal.setAttribute('aria-hidden','false')}
function closeOrderModal(){const m=document.getElementById('orderModal');m.classList.remove('open');m.setAttribute('aria-hidden','true')}
document.getElementById('ordersList').addEventListener('click',e=>{const view=e.target.closest('[data-order-view]'),track=e.target.closest('[data-order-track]');if(view)openOrderModal(view.dataset.orderView);if(track)openOrderModal(track.dataset.orderTrack)});
document.getElementById('closeOrderModal').addEventListener('click',closeOrderModal);document.getElementById('orderModal').addEventListener('click',e=>{if(e.target.id==='orderModal')closeOrderModal()});
renderCart();


/* ---------------- Toast ---------------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ---------------- Mobile menu ---------------- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ---------------- Newsletter validation ---------------- */
const nlForm = document.getElementById('nlForm');
const nlMsg = document.getElementById('nlMsg');
nlForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if(!valid){
    nlMsg.textContent = 'Please enter a valid email address.';
    nlMsg.className = 'nl-msg err';
    return;
  }
  nlMsg.textContent = 'You\'re subscribed — welcome to the list!';
  nlMsg.className = 'nl-msg ok';
  nlForm.reset();
});

/* ---------------- Contact form validation ---------------- */
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('cName');
  const nameField = document.getElementById('fName');
  if(name.value.trim().length < 2){ nameField.classList.add('invalid'); valid = false; } else nameField.classList.remove('invalid');

  const email = document.getElementById('cEmail');
  const emailField = document.getElementById('fEmail');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){ emailField.classList.add('invalid'); valid = false; } else emailField.classList.remove('invalid');

  const msg = document.getElementById('cMsg');
  const msgField = document.getElementById('fMsg');
  if(msg.value.trim().length < 5){ msgField.classList.add('invalid'); valid = false; } else msgField.classList.remove('invalid');

  if(!valid){ contactMsg.classList.remove('show'); return; }

  contactMsg.classList.add('show');
  contactForm.reset();
  setTimeout(() => contactMsg.classList.remove('show'), 5000);
});

/* ---------------- Wishlist ---------------- */
const wishlistCountEl = document.getElementById('wishlistCount');
const wishlistDrawer = document.getElementById('wishlistDrawer');
const drawerWishlistList = document.getElementById('drawerWishlistList');

function saveWishlist(){
  localStorage.setItem('cc_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}
function updateWishlistCount(){
  wishlistCountEl.textContent = wishlist.length;
}
function toggleWishlist(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  const exists = wishlist.includes(id);
  wishlist = exists ? wishlist.filter(x => x !== id) : [...wishlist, id];
  saveWishlist();
  renderProducts(document.querySelector('.filter-btn.active')?.dataset.filter || 'all');
  renderWishlistLists();
  showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist ♥');
}
function wishlistMarkup(p){
  return `<div class="wish-line">
    <div class="wish-art">${ICONS[p.icon]}</div>
    <div class="wish-info">
      <h4>${p.name}</h4>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div class="wish-actions">
        <button data-wish-action="cart" data-id="${p.id}">Add to cart</button>
        <button data-wish-action="remove" data-id="${p.id}">Remove</button>
      </div>
    </div>
  </div>`;
}
function renderWishlistLists(){
  const products = wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const markup = products.length ? products.map(wishlistMarkup).join('') : '<div class="wishlist-empty">Nothing saved yet.<br>Tap the heart on a product to keep it here.</div>';
  drawerWishlistList.innerHTML = markup;
  const profileList = document.getElementById('wishlistList');
  if(profileList) profileList.innerHTML = markup;
  updateWishlistCount();
}
function openWishlist(){
  closeAccountFn();
  closeNotificationsFn();
  wishlistDrawer.classList.add('open');
  overlay.classList.add('open');
  renderWishlistLists();
}
function closeWishlistFn(){ wishlistDrawer.classList.remove('open'); }
document.getElementById('wishlistToggle').addEventListener('click', openWishlist);
document.getElementById('closeWishlist').addEventListener('click', () => { closeWishlistFn(); overlay.classList.remove('open'); });
drawerWishlistList.addEventListener('click', e => {
  const btn = e.target.closest('button[data-wish-action]');
  if(!btn) return;
  const id = Number(btn.dataset.id);
  if(btn.dataset.wishAction === 'remove') toggleWishlist(id);
  if(btn.dataset.wishAction === 'cart'){
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    showToast('Added to cart');
  }
});
updateWishlistCount();
renderWishlistLists();

/* ---------------- Notifications ---------------- */
const notificationDrawer = document.getElementById('notificationDrawer');
const notificationList = document.getElementById('notificationList');
const notificationCountEl = document.getElementById('notificationCount');
const notificationSummary = document.getElementById('notificationSummary');

const starterNotifications = [
  {id:'welcome', title:'Welcome to Cradle & Care', text:'Save your favorite baby essentials and keep your account details ready for checkout.', time:'Just now', read:false},
  {id:'shipping', title:'Free shipping reminder', text:'Orders over $50 ship free within 24 hours.', time:'Today', read:false},
  {id:'promo', title:'10% off your first order', text:'Subscribe to restock alerts in the newsletter section to receive your welcome offer.', time:'Today', read:false}
];
if(!notifications.length) {
  notifications = starterNotifications;
  saveNotifications();
}
function saveNotifications(){ localStorage.setItem('cc_notifications', JSON.stringify(notifications)); }
function addNotification(title, text, unread=true){
  notifications.unshift({id:'n-' + Date.now(), title, text, time:'Just now', read:!unread});
  notifications = notifications.slice(0, 20);
  saveNotifications();
  renderNotifications();
}
function renderNotifications(){
  const unread = notifications.filter(n => !n.read).length;
  notificationCountEl.textContent = unread;
  notificationCountEl.style.display = unread ? 'flex' : 'none';
  notificationSummary.textContent = unread ? `${unread} unread update${unread === 1 ? '' : 's'}` : "You're all caught up.";
  notificationList.innerHTML = notifications.length ? notifications.map(n => `
    <div class="notification-item ${n.read ? 'read' : 'unread'}" data-notification-id="${n.id}">
      <span class="notification-dot"></span>
      <div>
        <h4>${n.title}</h4>
        <p>${n.text}</p>
        <span class="notification-time">${n.time}</span>
      </div>
    </div>`).join('') : '<div class="notification-empty">No notifications yet.</div>';
}
function openNotifications(){
  closeAccountFn();
  closeWishlistFn();
  notificationDrawer.classList.add('open');
  overlay.classList.add('open');
  renderNotifications();
}
function closeNotificationsFn(){ notificationDrawer.classList.remove('open'); }
document.getElementById('notificationToggle').addEventListener('click', openNotifications);
document.getElementById('closeNotifications').addEventListener('click', () => { closeNotificationsFn(); overlay.classList.remove('open'); });
notificationList.addEventListener('click', e => {
  const item = e.target.closest('.notification-item');
  if(!item) return;
  const n = notifications.find(x => x.id === item.dataset.notificationId);
  if(n){ n.read = true; saveNotifications(); renderNotifications(); }
});
document.getElementById('markAllRead').addEventListener('click', () => {
  notifications.forEach(n => n.read = true);
  saveNotifications();
  renderNotifications();
});
renderNotifications();

/* ---------------- Account / authentication ---------------- */
const accountModal = document.getElementById('accountModal');
const authView = document.getElementById('authView');
const profileView = document.getElementById('profileView');
const authForm = document.getElementById('authForm');
const authNameField = document.getElementById('authNameField');
const authName = document.getElementById('authName');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authSubmit = document.getElementById('authSubmit');
const authMsg = document.getElementById('authMsg');

function closeAccountFn(){ accountModal.classList.remove('open'); accountModal.setAttribute('aria-hidden','true'); }
function openAccount(){
  closeWishlistFn();
  closeNotificationsFn();
  accountModal.classList.add('open');
  accountModal.setAttribute('aria-hidden','false');
  renderAccount();
}
document.getElementById('accountToggle').addEventListener('click', openAccount);
document.getElementById('closeAccount').addEventListener('click', closeAccountFn);
accountModal.addEventListener('click', e => { if(e.target === accountModal) closeAccountFn(); });

function setAuthMode(mode){
  authMode = mode;
  document.querySelectorAll('.auth-tab').forEach(b => b.classList.toggle('active', b.dataset.authTab === mode));
  authNameField.style.display = mode === 'signup' ? 'block' : 'none';
  authSubmit.textContent = mode === 'signup' ? 'Create account' : 'Log in';
  authPassword.autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
  authMsg.className = 'form-msg ok';
  authMsg.textContent = '';
}
document.querySelectorAll('.auth-tab').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.authTab)));

async function hashPassword(password){
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,'0')).join('');
}
function getStoredUser(){ return JSON.parse(localStorage.getItem('cc_user') || 'null'); }

authForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = authEmail.value.trim().toLowerCase();
  const password = authPassword.value;
  let valid = true;
  authNameField.classList.remove('invalid'); authEmail.closest('.field').classList.remove('invalid'); authPassword.closest('.field').classList.remove('invalid');

  if(authMode === 'signup' && authName.value.trim().length < 2){ authNameField.classList.add('invalid'); valid=false; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ authEmail.closest('.field').classList.add('invalid'); valid=false; }
  if(password.length < 6){ authPassword.closest('.field').classList.add('invalid'); valid=false; }
  if(!valid) return;

  const stored = getStoredUser();
  const passwordHash = await hashPassword(password);

  if(authMode === 'signup'){
    if(stored && stored.email === email){
      authMsg.textContent = 'An account with that email already exists.';
      authMsg.className = 'form-msg ok show';
      return;
    }
    const user = {
      name: authName.value.trim(), email, passwordHash, phone:'', zip:'', address:'', billing:''
    };
    localStorage.setItem('cc_user', JSON.stringify(user));
    currentUser = {name:user.name,email:user.email};
    localStorage.setItem('cc_current_user', JSON.stringify(currentUser));
    addNotification('Account created', 'Your Cradle & Care account is ready.', true);
    authForm.reset();
    renderAccount();
    showToast('Account created');
    return;
  }

  if(!stored || stored.email !== email || stored.passwordHash !== passwordHash){
    authMsg.textContent = 'Email or password is incorrect.';
    authMsg.className = 'form-msg ok show';
    return;
  }
  currentUser = {name:stored.name,email:stored.email};
  localStorage.setItem('cc_current_user', JSON.stringify(currentUser));
  authForm.reset();
  renderAccount();
  showToast('Welcome back');
});

function renderAccount(){
  const loggedIn = !!currentUser && !!getStoredUser();
  authView.hidden = loggedIn;
  profileView.hidden = !loggedIn;
  if(!loggedIn){ setAuthMode('login'); return; }

  const user = getStoredUser();
  document.getElementById('profileTitle').textContent = `Hi, ${user.name.split(' ')[0]}`;
  document.getElementById('profileName').value = user.name || '';
  document.getElementById('profileEmail').value = user.email || '';
  document.getElementById('profilePhone').value = user.phone || '';
  document.getElementById('profileZip').value = user.zip || '';
  document.getElementById('profileAddress').value = user.address || '';
  document.getElementById('profileBilling').value = user.billing || '';
  renderWishlistLists();
  renderOrders();
}
document.getElementById('logoutBtn').addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('cc_current_user');
  renderAccount();
  showToast('You have been logged out');
});

function validateProfilePhone(value){const digits=value.replace(/\D/g,'');return digits.length===10||(digits.length===11&&digits.startsWith('1'))}function validateProfilePostal(value){return /^\d{5}$/.test(value.trim())}const profilePhone=document.getElementById('profilePhone'),profileZip=document.getElementById('profileZip');profilePhone.addEventListener('input',()=>{let d=profilePhone.value.replace(/\D/g,'').slice(0,10);profilePhone.value=d.length>6?`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`:d;profilePhone.closest('.field').classList.remove('invalid')});profileZip.addEventListener('input',()=>{profileZip.value=profileZip.value.replace(/\D/g,'').slice(0,5);profileZip.closest('.field').classList.remove('invalid')});
document.getElementById('profileForm').addEventListener('submit', e => {
  e.preventDefault();
  const user = getStoredUser();
  if(!user) return;
  user.name = document.getElementById('profileName').value.trim() || user.name;
  const phoneValue = document.getElementById('profilePhone').value.trim();
  const zipValue = document.getElementById('profileZip').value.trim();
  const phoneValid = !phoneValue || validateProfilePhone(phoneValue);
  const zipValid = !zipValue || validateProfilePostal(zipValue);
  profilePhone.closest('.field').classList.toggle('invalid', !phoneValid);
  profileZip.closest('.field').classList.toggle('invalid', !zipValid);
  if(!phoneValid || !zipValid){ showToast(!phoneValid ? 'Please fix the phone number' : 'Please fix the postal code'); return; }
  user.phone = phoneValue;
  user.zip = zipValue;
  user.address = document.getElementById('profileAddress').value.trim();
  user.billing = document.getElementById('profileBilling').value.trim();
  localStorage.setItem('cc_user', JSON.stringify(user));
  currentUser = {name:user.name,email:user.email};
  localStorage.setItem('cc_current_user', JSON.stringify(currentUser));
  document.getElementById('profileTitle').textContent = `Hi, ${user.name.split(' ')[0]}`;
  const msg = document.getElementById('profileMsg');
  msg.classList.add('show');
  setTimeout(() => msg.classList.remove('show'), 2500);
});

document.querySelectorAll('.profile-tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.profile-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.profile-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const target = btn.dataset.profileTab === 'details' ? 'profileDetailsPanel' : btn.dataset.profileTab === 'wishlist' ? 'profileWishlistPanel' : 'profileOrdersPanel';
  document.getElementById(target).classList.add('active');
  renderWishlistLists();
  if(btn.dataset.profileTab === 'orders') renderOrders();
}));

overlay.addEventListener('click', () => {
  closeNotificationsFn();
  closeWishlistFn();
  closeAccountFn();
  closeOrderModal();
});

/* Escape closes any open panel */
document.addEventListener('keydown', e => {
  if(e.key !== 'Escape') return;
  closeCartFn();
  closeNotificationsFn();
  closeWishlistFn();
  closeAccountFn();
  closeOrderModal();
});

renderAccount();
