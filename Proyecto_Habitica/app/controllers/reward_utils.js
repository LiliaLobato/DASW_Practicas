"use strict";

let productcontainer = document.getElementById('rewardList');

function productToHtml(product){
	return `	
    <div class = "col m-0 p-0">
      <div class="card reward mb-2" >
        <span class="d-none"> ${product._id}</span>
        <img class="card-img-top reward_img" src="${product._rewardImg}" alt="Card image cap">
        <div class="card-body reward_body">
          <p class="card-title text-center" style="font-weight: bold;">${product._title}</p>
          <span class=" card-text text-muted">
            <p class="m-0 p-0" id="reward_coins">${product._price} coins</p>
            <p class="m-0 p-0" id="reward_salud">+ ${product._points} ${product._category}</p>
          </span>
        </div>
      </div>
    </div>
	`;
}

function productListToHtml(productList){
  productcontainer.innerHTML =  productList.map(productToHtml).join('\n');
}

function preloadAddToCartModal(uuid){
  document.getElementById('uuidToCart').value = uuid;
  document.getElementById('itemsToCart').value = 1;
}

function addProductToCart(){
  let productUUID = document.getElementById('uuidToCart').value;
  let amount = Number(document.getElementById('itemsToCart').value);
  let cart = readShoppingCart();
  cart.addItem(productUUID, amount);
  document.getElementById("proxySize").innerText 
          = cart._productProxies.length;
  writeShoppingCart(cart)
}

loadCards(rewardsUrl).then(products => {
	productListToHtml(products);
})
