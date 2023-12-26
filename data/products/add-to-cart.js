import { addToCart, updateCartQuantity} from "./cart.js";
import { cartDrawer } from "../../template/js/siteheader-cart.js";

// add to cart button
export function addToCartBtn(){
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
}