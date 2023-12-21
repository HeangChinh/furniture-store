import { cart, removeFromCart, updateCartQuantity } from "../../data/products/cart.js";
import { products } from "../../data/products/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartAmounts } from "./siteheader-cart.js";

updateCartAmounts(renderCheckOut);
updateCartQuantity();
function cartCurrentlyEmpty(){
  if(cart.length === 0){
    document.querySelector('.site-content__inner').innerHTML = `
      <div class="product-list-empty">
        <div class="product-currenty-empty">
          Your cart is currently empty.
        </div>
        <div class="site-btn">
          <a href="all-products.html">Return To Shop</a>
        </div>
      </div>
    `;
  }
}
function renderCheckOut(){
  let cartItemHtml = '';
  let subtotal = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    
    products.forEach((productItem) => {
      if(productItem.id === productId){
        matchingProduct = productItem;
      } 
    });

    cartItemHtml += `
      <tr class="js-product-${matchingProduct.id} product-item-inner product-list-widget">
        <td class="product-thumbnail">
          <a href=""><img src="../../data/assets/${matchingProduct.image}"></a>
        </td>
        <td class="product-name">${matchingProduct.name}</td>
        <td class="product-price">$${formatCurrency(matchingProduct.priceCents, 1)}</td>
        <td class="product-quantity">
          <div class="cart-quantity">
            <a class="cart-quantity-btn__minus js-minus-btn" data-product-id="${cartItem.productId}">-</a>
            <input type="text" value="${cartItem.quantity}" class="cart-quantity-count js-save-link js-quantity-input-${matchingProduct.id}" data-product-id="${cartItem.productId}">
            <a class="cart-quantity-btn__add js-add-btn" data-product-id="${cartItem.productId}">+</a>
          </div>
        </td>
        <td class="product-subtotal">$${formatCurrency(matchingProduct.priceCents, cartItem.quantity)}</td>
        <td class="product-remove js-remove" data-product-id="${cartItem.productId}"><i class="fa-regular fa-circle-xmark"></i></td>
      </tr>
    `;
    document.querySelector('.product-item').innerHTML = cartItemHtml;

    document.querySelectorAll('.js-remove').forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-product-${productId}`);
        container.remove();
        if(cart.length === 0){
          document.querySelector('.subtotal-price').innerHTML = '$0.00';
        }
        renderCheckOut();
        updateCartQuantity();
      });
    });
    subtotal += Number(formatCurrency(matchingProduct.priceCents, cartItem.quantity));
    document.querySelectorAll('.subtotal-price').forEach((subtotalPrice) => {
      subtotalPrice.innerHTML = `$${subtotal.toFixed(2)}`;
    });
  });
  cartCurrentlyEmpty();
  updateCartAmounts(renderCheckOut);
}
renderCheckOut();