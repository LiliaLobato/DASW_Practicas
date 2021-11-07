"use strict";

let productcontainer = document.getElementById('mainList');

function productToHtml(product){
	return `	
    <div class="col mb-4">
    	<span class="d-none"> ${product._uuid}</span>
      <div class="card">
        <img src="${product._imageUrl}" class="card-img-top" alt="${product._title}">
        <div class="card-body">
          	<h5 class="product-title">${product._title}</h5>
          	<p class="product-description">${product._description}</p>
          	<p class="product-price">1 ${product._unit} x $${product._pricePerUnit}</p>
            <a onclick="preloadAddToCartModal('${product._uuid}')" class="btn btn-dark" 
            type="button" data-toggle="modal" data-target="#addCart"> Agregar al carrito </a>
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
  console.log("ADDTOCART")
  let productUUID = document.getElementById('uuidToCart').value;
  let amount = Number(document.getElementById('itemsToCart').value);
  let cart = readShoppingCart();
  cart.addItem(productUUID, amount);
  document.getElementById("proxySize").innerText 
          = cart._productProxies.length;
  writeShoppingCart(cart)
}

loadProducts(productsUrl).then(products => {
	productListToHtml(products);
})
