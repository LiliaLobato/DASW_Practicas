"use strict";

const products = [];

function getProducts(){
	return products;
}

function getProductByIs(uuid){

}

function createProduct(product){
	products.push(Product.createFromObject(product));
}