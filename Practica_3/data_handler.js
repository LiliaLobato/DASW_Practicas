"use strict";

//Este es el equivalente a nuestro servidor.
const serverProducts = [];
const filter = [];

function getProducts(){
	return serverProducts;
}

function getAleatorioUUID(){
	let al = random(0, serverProducts.length);
	return serverProducts[al].uuid;
}

function getProductById(uuid){
    for (let prod in serverProducts){ 
    	if(uuid == serverProducts[prod].uuid){
        	return serverProducts[prod];
		}
    }
}

function createProduct(product){
	serverProducts.push(Product.createFromObject(product));
}

function updateProduct(uuid,updatedProduct){
    for (let prod in serverProducts){ 
    	if(uuid == serverProducts[prod].uuid){
    		serverProducts[prod]=Product.createFromObject(updatedProduct);
        	return serverProducts[prod];
		}
    }
}

function deleteProduct(uuid){
    for (let prod in serverProducts){ 
    	if(uuid == serverProducts[prod].uuid){
        	serverProducts.splice(prod,1);
        	break;
		}
    }
}

function findProduct(query){
	var fields = String(query).split(':');
	filter.length=0;
	if(fields.length==2){
		findTittle(fields[1]);
		findCategory(fields[0]);
	}else{
		findTittle(fields[0]);
	}
	return filter;
}

function findTittle(tittle){
	if(tittle=="") return;
    for (let prod in serverProducts){ 
    	let titlePod = serverProducts[prod]._title;
    	if(titlePod.includes(tittle)){
        	filter.push(serverProducts[prod]);
		}
    }
}

function findCategory(category){
	if(category=="") return;
	if(filter.length!=0){
	    for (let prod in filter){ 
	    	let categPod = filter[prod]._category;
	    	if(!categPod.includes(category)){
	        	filter.splice(prod,1);
			}
	    }
	}else{
		for (let prod in serverProducts){ 
	    	let categPod = serverProducts[prod]._category;
	    	if(categPod.includes(category)){
	        	filter.push(serverProducts[prod]);
			}
    	}
	}
}