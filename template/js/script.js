
// JAVASCRIPT //
// SITE HEADER MENU //
const siteHeader__left = document.querySelector('.site-header__left .menu');
const siteHeader__right = document.querySelector('.site-header__right .menu');
const siteMenu = [
  {'menu':'All Products', 'link':'all-products'},
  {'menu':'Sofa',         'link':'sofa'},
  {'menu':'Chair',        'link':'chair'},
  {'menu':'Table',        'link':'table'},
  {'menu':'About Us',     'link':'about-us'},
  {'menu':'My Account',   'link':'my-account'}
];
var getMenuLeft = '';
var getMenuRight = '';
for (const item in siteMenu) {
  if(item < 4){
    getMenuLeft += `
      <li class="menu-item"><a class="menu-link" href="${siteMenu[item].link}.html" onclick="route()">${siteMenu[item].menu}</a></li>
    `;
    siteHeader__left.innerHTML = getMenuLeft;
  } else {
    getMenuRight += `
      <li class="menu-item"><a class="menu-link" href="${siteMenu[item].link}.html" onclick="route()">${siteMenu[item].menu}</a></li>
    `;
    siteHeader__right.innerHTML = getMenuRight;
  }
}
// SITE HEADER TOGGLE MENU //
const toggleBtn = document.querySelector('.toggle-btn');
const toggleBtnHide = document.querySelectorAll('.toggle-btn.btn-hide');
const mobile = document.querySelector('.mobile-inner');
const mobile__toggleMenu = document.querySelector('.mobile .menu');
const bg_overlay = document.querySelector('.bg-overlay');
const cartDrawer = document.querySelector('.cart-drawer');
const siteHeaderCart = document.querySelector('.site-header__cart');
const body = document.querySelector('body');

// function remove active from element
function removeActive(){
  mobile.classList.remove('active');
  cartDrawer.classList.remove('active');
  bg_overlay.classList.remove('active');
  body.style.overflow = 'visible';
}
function addActive(){
  bg_overlay.classList.add('active');
  body.style.overflow = 'hidden';
}
// get menu from array
function getMenuItem(){
  var getMenu = '';
  siteMenu.forEach(item => {
    getMenu += `
      <li class="menu-item"><a href="${item.link}.html" class="menu-link">${item.menu}</a></li>
    `;
    mobile__toggleMenu.innerHTML = getMenu;
  });
}
// toggle btn on top site
toggleBtn.addEventListener('click', function(){
  mobile.classList.add('active');
  addActive();
  getMenuItem();
});
siteHeaderCart.addEventListener('click', function(){
  cartDrawer.classList.add('active');
  addActive();
});

toggleBtnHide.forEach(element => {
  element.addEventListener('click', function(){
    removeActive();
  });
});
// background overlay on toggle btn
bg_overlay.addEventListener('click', function(){
  removeActive();
});
window.onresize = () => removeActive();

// QUALITY //
function quality(){
  const quality = document.querySelector('.quality');
  const qualityList = [
    {
      'image':'certificate-icon-p3wgqj83iftdfzntt865n2pg6gyhr6ui9h6ri1cwns.png',
      'title':'10 Years Experience'
    },
    {
      'image':'truck-p3wgmo3zeyixpp9wdk1de1t89g063zi8ecmwh3368o.png',
      'title':'Flexible Delivery'
    },
    {
      'image':'setup-p3wgmyg7i4x39euvp6i9nh7asol7gnna3rt8r4nuc8.png',
      'title':'Free Installation'
    },
    {
      'image':'support-p3wgt0irjp7m2y24bsrppy68m2qd2fp09r5w3boi8o.png',
      'title':'After Sales Support'
    },
    {
      'image':'warranty-p3wgnefgqbiyqs7o3vexbv64w8eg3ieptywhwu05eg.png',
      'title':'5 Years Warranty'
    }
  ];
  var getQuality = '';
  qualityList.forEach(qualityItem => {
    getQuality += `
      <div class="quality-item">
        <img src="data/assets/${qualityItem.image}">
        <div class="title">${qualityItem.title}</div>
      </div>
    `;
    quality.innerHTML = getQuality;
  });
}

// LIST OF PRODUCT //
async function productList(){
  // const productList = [
  //   {
  //     'productID':'1',
  //     'productImage':'wooden-rocking-chair-400x400.jpg',
  //     'productCategory':'Armchair',
  //     'productName':'Wooden Rocking Chair',
  //     'productPrice':'99.00',
  //     'productDecription':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dolore.',
  //     'productType':'chair'
  //   },
  //   {
  //     'productID':'2',
  //     'productImage':'round-stool-400x400.jpg',
  //     'productCategory':'Chair',
  //     'productName':'Round Short Leg Stool/Chair',
  //     'productPrice':'299.00',
  //     'productDecription':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dolore.',
  //     'productType':'chair'
  //   },
  //   {
  //     'productID':'3',
  //     'productImage':'study-table-768x768.jpg',
  //     'productCategory':'Computer table',
  //     'productName':'Desktop Table with Drawers',
  //     'productPrice':'529.00',
  //     'productDecription':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dolore.',
  //     'productType':'table'
  //   },
  //   {
  //     'productID':'4',
  //     'productImage':'pic53-free-img-300x300.jpg',
  //     'productCategory':'Chair',
  //     'productName':'Orange Recliner with Leg Rest',
  //     'productPrice':'419.00',
  //     'productDecription':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dolore.',
  //     'productType':'chair'
  //   },
  // ];
  const apiData = await fetch('https://fakestoreapi.com/products');
  const productList = await apiData.json();
  const products = document.querySelector('.products');
  var getProducts = '';
  productList.forEach(productListEl => {
    getProducts += `
      <li class="products-item">
        <a href="#" class="products-item__link">
          <div class="products-item__thumbnail">
            <img src="${productListEl.image}" class="scale">
            <a href="#" class="add-to-cart">
              <i class="fa-solid fa-cart-shopping"></i>
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
            <span class="products-item__category">${productListEl.category}</span>
            <h2 class="products-item__title">${productListEl.title}</h2>
            <span class="products-item__price">$${productListEl.price}</span>
          </div>
        </a>
      </li>
    `;
    products.innerHTML = getProducts;
  });
}
// TESTIMONIALS //
function testimonial(){
  const tml = document.querySelector('.testimonials-wrap');
  const testimonial = [
    {
      'content':'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo"',
      'profile':'clients01-free-img.png',
      'name':'Patricia Warran'
    },
    {
      'content':'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo"',
      'profile':'pic19-free-img.png',
      'name':'Lauren Lane'
    },
    {
      'content':'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo"',
      'profile':'pic20-free-img.png',
      'name':'Paul Smitten'
    },
  ];
  var getTestimonial = '';
  testimonial.forEach(testimonialEl => {
    getTestimonial += `
      <div class="col-4 col-12 testimonials-wrap-inner">
      <div class="testimonials-content">
        <span>${testimonialEl.content}</span>
      </div>
      <div class="testimonials-profile">
        <div class="profile-img">
          <img src="data/profile/${testimonialEl.profile}" alt="">
        </div>
        <div class="profile-name">${testimonialEl.name}</div>
      </div>
    </div>
    `;
    tml.innerHTML = getTestimonial;
  });
}

// WIDGET //
function widget(){
  const widgetInner = document.querySelector('.widget-inner');
  const widget = [
    {
      'title':'Product Links',
      'link':['All Products', 'Sofa', 'Chairs', 'Table']
    },
    {
      'title':'Chairs',
      'link':['Chair', 'Armchair', 'Recliner', 'Stool']
    },
    {
      'title':'Table',
      'link':['Study table', 'Table', 'Computer Table']
    },
    {
      'title':'Have Question?',
      'link':['Contact Us']
    },
  ];

  var getWidget = '';
  widget.forEach(widgetEl => {
    const widgetLink = widgetEl.link;
    var getWidgetLink = '';
    widgetLink.forEach(widgetLinkItem => {
      getWidgetLink += `
        <li class="widget__menu-item"><a href="">${widgetLinkItem}</a></li>
      `;
      if(widgetEl.title == 'Have Question?'){
        getWidgetLink = `<div class="site-btn"><a href="#">${widgetLinkItem}</a>`;
      }
    });
    getWidget += `
      <div class="widget-inner__wrap">
        <div class="widget__title">${widgetEl.title}</div>
        <ul class="widget__menu">
          ${getWidgetLink}
        </ul>
      </div>  
    `;
    widgetInner.innerHTML = getWidget;
  });
}

// CALL FUNCTION //
widget();
productList();
testimonial();
quality();
