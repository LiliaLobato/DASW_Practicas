"use strict";

//Este es el equivalente a nuestro servidor.
const serverHabit = [];
const serverDaily = [];
const serverTodo = [];
const serverTag = [];
const serverRewards = [];
const filter = [];

//Tags
function getTags(){
	return serverTag;
}
function createTag(tag){
	serverTag.push(Tag.createFromObject(tag));
}
function deleteTag(uuid){
    for (let tag in serverTag){ 
    	if(uuid == serverTag[tag].uuid){
        	serverTag.splice(tag,1);
        	break;
		}
    }
}


function getProductById(uuid){
    for (let prod in serverProducts){ 
    	if(uuid == serverProducts[prod].uuid){
        	return serverProducts[prod];
		}
    }
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