"use strict";

class ShoppingCartException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}


class ProductProxy{
	constructor(productUUID, amount){
		this.productUUID = productUUID;
		this.amount = amount;
	}
}

class ShoppingCart{
	constructor(){
		this.product = []; //real value 
		this.productProxies = []; //UUID, amount
	}

	//productProxies
    get productProxies() {
        return this._productProxies;
    }
    set productProxies(val) {
    	throw new ProductException('Product Proxies can not be set manually.');
    }

	//product
    get product() {
        return this._product;
    }
    set product(val) {
    	//creamos arreglo vacio
    	if(typeof val === 'String'){
    		val = JSON.parse(val);
    	}
    	//if val is array? 
    		//for product of val
    			//Product.createFromObject();
    	//else
    		//Product.createFromObject();
    }

    addItem(productUUID, amount){
    	if (newAmount == 0) return; //ignore empty items
    	if (newAmount < 0) throw new ShoppingCartException('Number of items to add must be a positive number');
    	//check if the item is already in productProxies[], if it is, update accordingly
    	//if not, create item in productProxies[] 
    }

    updateItem(productUUID, newAmount){
    	if (newAmount == 0) this. removeItem(productUUID);
    	if (newAmount < 0) throw new ShoppingCartException('Number of items to add must be a positive number');
    }
    
    removeItem(productUUID){
    	//remove _productUUID from productProxies[]
    }
    
    calculateTotal(){
    	let total = 0;
    	return total;
    }
}