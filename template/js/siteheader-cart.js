import { cart, removeFromCart, updateCartQuantity, updateQuantity } from "../../data/products/cart.js";
import { products } from "../../data/products/products.js";
import { formatCurrency } from "./utils/money.js";

export function addToCartList(){
  // SITE HEADER TOGGLE MENU //
  const toggleBtn = document.querySelector('.toggle-btn');
  const toggleBtnHide = document.querySelectorAll('.toggle-btn.btn-hide');
  const mobile = document.querySelector('.mobile-inner');
  const mobile__toggleMenu = document.querySelector('.mobile .menu');
  const bg_overlay = document.querySelector('.bg-overlay');
  const cartdrawer = document.querySelector('.cart-drawer');
  const siteHeaderCart = document.querySelector('.site-header__cart');
  const body = document.querySelector('body');
  // onscroll
  function menuBar(){
    const siteHeader = document.querySelector('.site-header');
    window.scrollY > 100 ? siteHeader.classList.add('scroll-change') : siteHeader.classList.remove('scroll-change');
  }
  window.addEventListener('scroll', menuBar, false);
  // function remove active from element
  function removeActive(){
    mobile.classList.remove('active');
    cartdrawer.classList.remove('active');
    bg_overlay.classList.remove('active');
    body.style.overflow = 'visible';
  }
  function addActive(){
    bg_overlay.classList.add('active');
    body.style.overflow = 'hidden';
  }

  // toggle btn on top site
  toggleBtn.addEventListener('click', () => {
    mobile.classList.add('active');
    addActive();
  });
  siteHeaderCart.addEventListener('click', () => {
    cartdrawer.classList.add('active');
    addActive();
  });

  toggleBtnHide.forEach(element => {
    element.addEventListener('click', () => {
      removeActive();
    });
  });
  // background overlay on toggle btn
  bg_overlay.addEventListener('click', () => {
    removeActive();
  });
  // window.onresize = () => removeActive();
  ////////////////////////
}
// UPDATE CART QUANTITY
function checkOut(){
  return '';
}
export function updateCartAmounts(checkOut){
  const cartValue = document.querySelectorAll('.js-save-link');
  const cartAddBtn = document.querySelectorAll('.js-add-btn');
  const cartMinusBtn = document.querySelectorAll('.js-minus-btn');
  const bgWidgetOverlay = document.querySelector('.product-list-widget');
  let setTimeoutId;
  // input 
  cartValue.forEach((amounts) => {
    amounts.addEventListener('input', () => {
      const productId = amounts.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);
      if(quantityInput.value === ''){
        quantityInput.value = '';
      } else {
        clearTimeout(setTimeoutId);
        setTimeoutId = setTimeout(() => {
          bgWidgetOverlay.classList.add('bg-widget-overlay');
        }, 2000);
        setTimeoutId = setTimeout(() => {
          if(newQuantity === 0){
            removeFromCart(productId);
            const container = document.querySelector(`.js-product-${productId}`);
            container.remove();
            document.querySelectorAll('.subtotal-price').forEach((subtotal) => {
              subtotal.innerHTML = '$0.00';
            });
          }
          cartDrawer();
          checkOut();
          updateCartQuantity();
        }, 4000);
      }
    });
  });
  // add
  cartAddBtn.forEach((button) => {
    button.addEventListener('click', () => {
      bgWidgetOverlay.classList.add('bg-widget-overlay');
      const productId = button.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      
      let newQuantity = Number(quantityInput.value);
      newQuantity++;
      quantityInput.value = newQuantity;
      updateQuantity(productId, newQuantity);
      clearTimeout(setTimeoutId);
      setTimeoutId = setTimeout(() => {
        cartDrawer();
        checkOut();
        updateCartQuantity();
      }, 1500);
      
    });
  });
  // minus
  cartMinusBtn.forEach((button) => {
    button.addEventListener('click', () => {
      bgWidgetOverlay.classList.add('bg-widget-overlay');
      const productId = button.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      
      let newQuantity = Number(quantityInput.value);
      newQuantity--;
      quantityInput.value = newQuantity;
      updateQuantity(productId, newQuantity);
      clearTimeout(setTimeoutId);
      setTimeoutId = setTimeout(() => {
        if(newQuantity === 0){
          removeFromCart(productId);
          const container = document.querySelector(`.js-product-${productId}`);
          container.remove();
          document.querySelectorAll('.subtotal-price').forEach((subtotal) => {
            subtotal.innerHTML = '$0.00';
          });
        }
        cartDrawer();
        checkOut();
        updateCartQuantity();
      }, 1500);
    });
  });
}

// if cart is empty //
function isEmptyCart(){
  let cartHtml = '';
  if(cart.length === 0){
    cartHtml = `
      <div class="shopping-cart__empty">
        <div class="shopping-cart__message">
          <p class="shopping-cart__empty-message">No products in the cart.</p>
        </div>
        <div class="shopping-cart-button">
          <div class="shopping-cart-button__con"><a href="../../all-products.html">Continue Shopping</a></div>
        </div>
      </div>
    `;
    document.querySelector('.cart-drawer-content').innerHTML = cartHtml;
  }
}
// CART DRAWER //
export function cartDrawer(){
  let cartItemHtml = '';
  let cartHtml = '';
  let subtotal = 0;
  isEmptyCart();
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    
    products.forEach((productItem) => {
      if(productItem.id === productId){
        matchingProduct = productItem;
      } 
    });
    
    if(matchingProduct.length !== 0 || matchingProduct.length > 0){
      cartHtml = `
        <div class="shopping-cart__product-list">
          <ul class="product-list-widget">
            ${cartItemHtml += `
              <li class="mini-cart-item js-product-${matchingProduct.id}">
                <a class="item-remove js-remove" data-product-id="${cartItem.productId}"><i class="fa-regular fa-circle-xmark"></i></a>
                <a href="" class="mini-cart-item__img">
                  <img src="data/assets/${matchingProduct.image}" alt="">
                  ${matchingProduct.name}
                </a>
                <div class="cart-quantity">
                  <a class="cart-quantity-btn__minus js-minus-btn" data-product-id="${cartItem.productId}">-</a>
                  <input type="text" value="${cartItem.quantity}" class="cart-quantity-count js-save-link js-quantity-input-${matchingProduct.id}" data-product-id="${cartItem.productId}">
                  <a class="cart-quantity-btn__add js-add-btn" data-product-id="${cartItem.productId}">+</a>
                </div>
                <div class="mini-cart__price js-subtotal-price">$${formatCurrency(matchingProduct.priceCents, cartItem.quantity)}</div>
              </li>
            `}
          </ul>
          <p class="mini-cart__total">
            <strong>Subtotal:</strong>
            <span class="subtotal-price">$</span>
          </p>
          <div class="shopping-cart-button">
            <div class="shopping-cart-button__view-cart"><a href="checkout.html">Check Out</a></div>
          </div>
        </div>
      `;
    }
    document.querySelector('.cart-drawer-content').innerHTML = cartHtml;
    document.querySelector('.product-list-widget').innerHTML = cartItemHtml;
    document.querySelectorAll('.js-remove').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-product-${productId}`);
        container.remove();
        if(cart.length === 0){
          document.querySelector('.subtotal-price').innerHTML = '$0.00';
        }
        isEmptyCart();
        cartDrawer();
        updateCartQuantity();
      });
    });
    subtotal += Number(formatCurrency(matchingProduct.priceCents, cartItem.quantity));
    document.querySelectorAll('.subtotal-price').forEach((subtotalPrice) => {
      subtotalPrice.innerHTML = `$${subtotal.toFixed(2)}`;
    });
  });
  updateCartAmounts(checkOut);
}