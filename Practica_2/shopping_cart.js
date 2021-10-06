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
		this._productProxies = []; //UUID, amount
	}

	//productProxies
    get productProxies() {
        return this._productProxies;
    }
    set productProxies(val) {
    	throw new ShoppingCartException('Proxies can not be set manually.');
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
        this._product="try";
    	//if val is array? 
    		//for product of val
    			//Product.createFromObject();
    	//else
    		//Product.createFromObject();
    }

    addItem(productUUID, newAmount){
        if (newAmount == 0) return; //ignore empty items
    	if (newAmount < 0) throw new ShoppingCartException('Amount of items to add must be a positive number');
    	let agregado = false;

        //check if the item is already in productProxies[]
        for (let prox in this._productProxies){
            //if it is, update accordingly
            if(productUUID == this._productProxies[prox].productUUID){
                this._productProxies[prox].amount = this._productProxies[prox].amount + newAmount;
                agregado = true;
                break;
            }
        }
        //if not, create item in productProxies[]
        if(!agregado){
            let proxie = new ProductProxy(productUUID,newAmount);
            this._productProxies.push(proxie);
        }
    }

    updateItem(productUUID, newAmount){
    	if (newAmount == 0) this. removeItem(productUUID);
    	if (newAmount < 0) throw new ShoppingCartException('Amount of items to update must be a positive number');
        let agregado = false;

        //check if the item is in productProxies[]
        for (let prox in this._productProxies){
            //if it is, update accordingly
            if(productUUID == this._productProxies[prox].productUUID){
                this._productProxies[prox].amount = newAmount;
                agregado = true;
                break;
            }
        }
        //if not, throw exception indicating to use addItem
        if(!agregado){
            throw new ShoppingCartException('No product with given UUID, please use addItem()');
        }
    }
    
    removeItem(productUUID){
    	//remove _productUUID from productProxies[]
        for (let prox in this._productProxies){ 
            if(productUUID == this._productProxies[prox].productUUID){
                this._productProxies.splice(prox,1);
            }
        }
    }
    
    calculateTotal(){
    	let total = 0;        
    	return total;
    }
}

//TEST
let cart = new ShoppingCart;
cart.addItem(6789,1);
cart.addItem(1234,2);
cart.addItem(6789,3);
cart.addItem(54321,4);
console.log(cart.productProxies);
cart.updateItem(54321,100000);
//cart.updateItem(9876,100000); //return exception
cart.removeItem(1234);