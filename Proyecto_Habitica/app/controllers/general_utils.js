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

function cleanUserData(){
	sessionStorage.removeItem('userData');
}

function updateUser(user) {
    putUser(usersUrl+'/'+user._avatarEmail, user, (msg) => console.log(msg), (err) => console.log(err));
}

function helloWorld(){
	console.log("Hello World")
}