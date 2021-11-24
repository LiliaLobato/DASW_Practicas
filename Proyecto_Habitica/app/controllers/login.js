"use strict";


let create = document.getElementById('create');
let registerForm = document.getElementById('register-form');
let loginForm = document.getElementById('login-form');

document.getElementById('ingresar').onclick = function(){
   //console.log("ingresar");
   loginForm.style.display = "block";
   registerForm.style.display = "none";
}

document.getElementById('createAccount').onclick = function(){
   //console.log("createAccount");
   registerForm.style.display = "block";
   loginForm.style.display = "none";
}

