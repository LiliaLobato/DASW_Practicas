"use strict";

const productsUrl = 'http://localhost:8080/products'
const cartUrl = productsUrl + '/cart'

function initShoppingCart(){
	if(sessionStorage.getItem('shoppingCart')==null){
		let cart = new ShoppingCart();
		writeShoppingCart(cart);
	}
}

function readShoppingCart(){
	let cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
	return new ShoppingCart(cart._products, cart._productProxies);
}

function writeShoppingCart(cart){
	sessionStorage.setItem('shoppingCart',JSON.stringify(cart));
}

initShoppingCart();