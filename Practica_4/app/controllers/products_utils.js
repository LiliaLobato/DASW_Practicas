"use strict";

const productsUrl = 'http://localhost:8080/products'
let productcontainer = document.getElementById('mainList');

function productToHtml(product){
	return `	
    <div class="col mb-4">
    	<span> </span>
      <div class="card">
        <img src="${product._imageUrl}" class="card-img-top" alt="${product._title}">
        <div class="card-body">
          <h5 class="product-title">${product._title}</h5>
          <p class="product-description">${product._description}</p>
          <p class="product-price">1 ${product._unit} x $${product._pricePerUnit}</p>
        </div>
      </div>
    </div>
	`;
}

function productListToHtml(productList){
	productcontainer.innerHTML =  productList.map(productToHtml).join('\n');
}

loadProducts(productsUrl).then(products => {
	productListToHtml(products);
})
