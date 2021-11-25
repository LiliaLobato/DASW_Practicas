"use strict";

let create = document.getElementById('create');
let registerForm = document.getElementById('register-form');
let loginForm = document.getElementById('login-form');
let ExistAlert = document.getElementById('userExistAlert');
let NotExistAlert = document.getElementById('userNotExistAlert');
let wrongPswAlert = document.getElementById('wrongPswAlert');

document.getElementById('ingresar').onclick = function(){
   console.log("ingresar");
   loginForm.style.display = "block";
   registerForm.style.display = "none";
   NotExistAlert.style.display="none";
   ExistAlert.style.display="none";
   wrongPswAlert.style.display="none";
}

document.getElementById('createAccount').onclick = function(){
   console.log("createAccount");
   registerForm.style.display = "block";
   loginForm.style.display = "none";
   NotExistAlert.style.display="none";
   ExistAlert.style.display="none";
   wrongPswAlert.style.display="none";
}

document.getElementById('createAccount_bnt').onclick = function(){
   let userCA = document.getElementById('createAccount_name').value;
   let pswdCA = document.getElementById('createAccount_pswd').value;
   let emailCA = document.getElementById('createAccount_email').value;

   if(userCA != '' && pswdCA != '' && emailCA != '') {
      let newUser = new User(emailCA, getRandomAvatar(1,5), userCA, pswdCA);
      //Check is user has already been created
      loadCards(usersUrl+'/'+emailCA).then(user => {
         if(user.length !=0){
            //user already exist, send an alert and ask for a sign in!
            console.log("usuario existe")
            //regreso a la pantalla de signin
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            ExistAlert.style.display="block";
            document.getElementById('login_email').value = emailCA;
            document.getElementById('login_pswd').value = "";
         } else {
            //There is no user with that email
            console.log("usuario no existe")
            addUser(newUser);
            //TODO save email on sessionServer and go to home!!!!
            console.log("go to home")
            goToHome(newUser)
         }
      })
   } 
}

document.getElementById('login_bnt').onclick = function(){
   let pswdSI = document.getElementById('login_pswd').value;
   let emailSI = document.getElementById('login_email').value;

   if(pswdSI != '' && emailSI != '') {
      //Check if user has already been created
      loadCards(usersUrl+'/'+emailSI).then(user => {
         if(user.length !=0){
            //user already exist!
            console.log("usuario existe")
            //Check credentials
            if(user._avatarPassword == pswdSI){
               //YES! we are in! 
               //TODO save email on sessionServer and go to home!!!!
               console.log("go to home")
               console.log(user)
               goToHome(user)
            } else {
               //password is not valid!!!
               wrongPswAlert.style.display="block";
               ExistAlert.style.display="none";
            }
            //regreso a la pantalla de signin
            //TODO save email on sessionServer and go to home!!!!
         } else {
            //There is no user with that email, lets try to create an account
            console.log("usuario no existe")
            registerForm.style.display = "block";
            loginForm.style.display = "none";
            NotExistAlert.style.display="block";
            document.getElementById('createAccount_email').value = emailSI;
         }
      })
   } 
}

function getRandomAvatar(min, max) {
  return  Math.floor(Math.random() * (max - min) + min);
}


function addUser(user) {
    storeUser(usersUrl, user, (msg) => {
        console.log(msg);
    }, (err) => console.log(err));
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

function goToHome(user){
   writeUserData(user);
   readUserData();
   window.location.href = "habitica"
}