"use strict";

const products = [];

function getProducts(){
	return products;
}

function getProductById(uuid){

}

function createProduct(product){
	products.push(Product.createFromObject(product));
}