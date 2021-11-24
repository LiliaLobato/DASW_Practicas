"use strict";

const productsUrl = 'http://localhost:8080/products'
const rewardsUrl = 'http://localhost:8080/reward'
const usersUrl = 'http://localhost:8080/user'

function readUserData(){
	let user = JSON.parse(sessionStorage.getItem('userData'));
	let i = User.createFromObject(user);
	return i;
}

function writeUserData(user){
	sessionStorage.setItem('userData',JSON.stringify(user));
}

function addUser(user) {
    storeUser(usersUrl, user, (msg) => {
        console.log(msg);
    }, (err) => console.log(err));
}

function updateUser(user) {
    putUser(usersUrl+'/'+user._avatarEmail, user, (msg) => console.log(msg), (err) => console.log(err));
}


let status;
function validateUser(email){
    loadCards(usersUrl+'/'+email).then(rewards => {
	if(rewards.length !=0){
		status = true;
		console.log("usuario existe")
		//console.log(status)
		status = true;
	} else {
		status = false;
		console.log("usuario no existe")
	}
})
    return status;
}

function reloadCart(){
  	let cart = readUserData();
  	postCart(cartUrl, cart._productProxies, 
      	(msg) => {
	        cart.products = JSON.parse(msg)
	        writeUserData(cart)
    		loadCart();
	      } 
	      , (err) => {
	      	sessionStorage.removeItem('userData');
			let cart = new UserData();
			writeUserData(cart); 
  			document.getElementById("proxySize").innerText 
          		= cart._productProxies.length;
    		loadCart();
			console.log("Server + UUID Refresh = " + err);
      	});
}

function helloWorld(){
	console.log("Hello World")
}
//initUserData();