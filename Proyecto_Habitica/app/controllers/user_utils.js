"use strict";

let usercontainer = document.getElementById('userInfo');
let currentUser = readUserData();
let modalCurrentAvatar = 0;

let avatarName = document.getElementById('avatarName');
let avatarLevel = document.getElementById('avatarLevel');
let avatarCoins = document.getElementById('avatarCoins');
let HealthBar = document.getElementById('avatarHealthBar');
let HealthIndicator = document.getElementById('avatarHealthIndicator');
let ExpBar = document.getElementById('avatarExpBar');
let ExpIndicator = document.getElementById('avatarExpIndicator');
let avatarImg = document.getElementById('avatarImg');
let avatarImgModal = document.getElementById('avatarImgModal');
let avatarNameModal = document.getElementById('avatarNameModal');
let avatarLevelModal = document.getElementById('avatarLevelModal');

function updateAvatar(){
  currentUser = readUserData();
  let exp = currentUser._avatarExp;
  let health = currentUser._avatarHealth;
  let imageNum = currentUser._avatarImg;

  avatarName.innerText = currentUser._avatarName;
  avatarLevel.innerText = 'Level '+currentUser._avatarLevel;
  avatarCoins.innerText = currentUser._avatarCoins;
  HealthBar.style.width = health.toString()+'%'
  HealthIndicator.innerText = health.toString()+'/100';
  ExpBar.style.width = exp.toString()+'%'
  ExpIndicator.innerText = exp.toString()+'/100';
  avatarImg.src = "avatar/"+imageNum.toString()+".png";
}

function preloadUserModal(){
  let currentUser = readUserData();
  let imageNum = currentUser._avatarImg;
  modalCurrentAvatar = imageNum;

  avatarImgModal.src = "avatar/"+imageNum.toString()+".png";
  avatarNameModal.value = currentUser._avatarName;
  avatarLevelModal.innerText = 'Level '+currentUser._avatarLevel;
}

function prevAvatar(){
  if(modalCurrentAvatar - 1 <= 0){
    modalCurrentAvatar = 4;
  } else {
    modalCurrentAvatar = modalCurrentAvatar -1;
  }
  avatarImgModal.src = "avatar/"+modalCurrentAvatar.toString()+".png";
}

function nextAvatar(){
  if(modalCurrentAvatar + 1 >= 5){
    modalCurrentAvatar = 1;
  } else {
    modalCurrentAvatar = modalCurrentAvatar +1;
  }
  avatarImgModal.src = "avatar/"+modalCurrentAvatar.toString()+".png";
}

function saveModal(){
  currentUser = readUserData();
  currentUser._avatarName =  avatarNameModal.value;
  currentUser._avatarImg =  modalCurrentAvatar;
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();
}

function logout(){
  cleanUserData();
  window.location.href = "login"
}

updateAvatar();