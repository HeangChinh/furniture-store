// site menu link
export function siteMenuLink(){
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
        <li class="menu-item"><a class="menu-link" href="${siteMenu[item].link}.html">${siteMenu[item].menu}</a></li>
      `;
      siteHeader__left.innerHTML = getMenuLeft;
    } else {
      getMenuRight += `
        <li class="menu-item"><a class="menu-link" href="${siteMenu[item].link}.html">${siteMenu[item].menu}</a></li>
      `;
      siteHeader__right.innerHTML = getMenuRight;
    }
  }
}