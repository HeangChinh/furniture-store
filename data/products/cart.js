export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = []
}


// SAVE TO STORAGE
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
// ADD TO CART
export function addToCart(productId){
  let matchingItem;
  cart.forEach(cartItem => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  if(matchingItem){
    matchingItem.quantity++;
  } else{
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
  saveToStorage();
}

// REMOVE FROM CART
export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

// cart quantity
export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-value').innerHTML = cartQuantity;
}
// update new cart quantity
export function updateQuantity(productId, newQuantity){
  let matchingProduct;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingProduct = cartItem;
    }
  });
  matchingProduct.quantity = newQuantity;
  saveToStorage();
}