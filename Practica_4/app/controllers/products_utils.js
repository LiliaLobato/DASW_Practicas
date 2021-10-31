"use strict";

let productcontainer = document.getElementById('mainList');

function productToHtml(product){
	return '
	<div class = "card">
		<img class = "card-img-top"
			src="${product.imageUrl}" alt="">
		<div class="card-body">
			<p class="card-text">TEMPORAL</p>
			<p><span> 1x12000.00</span></p>
		</div>
	</div>
	';
}

function productListToHtml(productList){
	productcontainer.innerHtml = '<div class="row">\n' + productList.map(productListToHtml).join(\n) + '</div>'
}

loadProducts().then(products => {


})