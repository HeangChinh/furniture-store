import { products } from "../../data/products/products.js";
import { formatCurrency } from "./utils/money.js";

// This function is display all products to all webpages
function product(productItem){
  return `
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
            <div class="product-price">$${formatCurrency(productItem.priceCents, 1)}</div>
          </span>
        </div>
      </a>
    </li>
  `;
}
export function renderAllProducts(type){
  let html = '';
  if(type == 'all'){
    products.forEach((productItem) => {
      html += product(productItem);
    });
  } else if(type == 'chair'){
    products.filter((productItem) => {
      if(productItem.type == 'chair'){
        html += product(productItem);
      }
    });
  } else if(type == 'sofa'){
    products.filter((productItem) => {
      if(productItem.type == 'sofa'){
        html += product(productItem);
      }
    });
  } else if(type == 'table'){
    products.filter((productItem) => {
      if(productItem.type == 'table'){
        html += product(productItem);
      }
    });
  } else if(type == 'latest'){
    products.filter((productItem, index) => {
      if(index < 4){
        html += product(productItem);
      }
    });
  } 
  document.querySelector('.js-products').innerHTML = html;
}