import { updateCartQuantity} from "../../data/products/cart.js";
import { addToCartList, cartDrawer } from "./siteheader-cart.js";
import { renderAllProducts } from "./render-products.js";
import { siteMenuLink } from "../js/siteMenu/site-menu-link.js";
import { addToCartBtn } from "../../data/products/add-to-cart.js";

siteMenuLink();
addToCartList();
cartDrawer();
renderAllProducts('table');
updateCartQuantity();
addToCartBtn();