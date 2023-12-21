import { addToCart, updateCartQuantity} from "../../data/products/cart.js";
import { products } from "../../data/products/products.js";
import { formatCurrency } from "./utils/money.js";
import { addToCartList, cartDrawer } from "./siteheader-cart.js";

addToCartList();
cartDrawer();
updateCartQuantity();
let html = '';
products.forEach((productItem, index) => {
  html += `
    <li class="products-item">
      <a href="#" class="products-item__link">
        <div class="products-item__thumbnail">
          <img src="data/assets/${productItem.image}" class="scale product-img">
          <a class="add-to-cart" data-product-id="${productItem.id}">
            <i class="fa-solid fa-cart-shopping js-add-to-cart"></i>
            <div class="thumbnail__text">
              <span class="thumbnail__text-wrap">Add to cart</span>
              <div class="traingle"></div>
            </div>
          </a>
          <span class="quick-view">
            <i class="fa-solid fa-eye"></i>
            <div class="thumbnail__text">
              <span class="thumbnail__text-wrap">Quick View</span>
              <div class="traingle"></div>
            </div>
          </span>
        </div>
        <div class="products-item__summary">
          <span class="products-item__category">${productItem.category}</span>
          <h2 class="products-item__title">${productItem.name}</h2>
          <span class="product-rating">
            <img src="data/star/ratings/rating-${productItem.rating.stars * 10}.png" class="product-rating-star">
            <div class="product-rating-count">${productItem.rating.count}</div>
          </span>
          <span class="products-item__price">
            <div class="product-discount">$${formatCurrency(productItem.discountCents, 1)}</div>
            <div class="product-price">$${formatCurrency(productItem.priceCents, 1)}</div>
          </span>
        </div>
      </a>
    </li>
  `;
  if(index < 4) document.querySelector('.js-products').innerHTML = html;
});

const addToCartBtn = document.querySelectorAll('.add-to-cart');
addToCartBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    
    addToCart(productId);
    cartDrawer();
    updateCartQuantity();
    const shoppingBtn = document.querySelectorAll('.js-add-to-cart');

    let timeoutId;
    shoppingBtn.forEach(() => {
      shoppingBtn[index].classList.remove('fa-cart-shopping');
      shoppingBtn[index].classList.add('fa-circle');
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        shoppingBtn[index].classList.remove('fa-circle');
        shoppingBtn[index].classList.add('fa-cart-shopping');
      }, 800);
    });
  });
});


