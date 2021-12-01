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

function calculatePoints(difficulty){
  let points = 0;
  if (difficulty == 'trivial'){
    points = 1;
  }
  else if (difficulty == 'easy'){
    points = 2;
  }
  else if (difficulty == 'intermediate'){
    points = 3;
  }
  else {
    points = 4;
  }
  return points;
}


function addCoins(amount){
  currentUser = readUserData();
  let addCoins = amount; 
  currentUser._avatarCoins = currentUser._avatarCoins + addCoins;
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();
}

function reduceCoins(amount){
  currentUser = readUserData();
  let reducedCoins = amount; 
  if(currentUser._avatarCoins - reducedCoins < 0){
    alert('Nice, you triggered this alert message!', 'success')
    return 1;
  }
  else{
    currentUser._avatarCoins = currentUser._avatarCoins - reducedCoins;
  }
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();
}


function addExperience(amount){
  currentUser = readUserData();
  let addExperience = amount; 
  //revisamos si sobrepasa de experiencia 
  if(currentUser._avatarExp + addExperience >= 100){
    currentUser._avatarExp = currentUser._avatarExp + addExperience - 100;
    currentUser._avatarLevel = currentUser._avatarLevel + 1;
  }
  else{
    currentUser._avatarExp = currentUser._avatarExp + addExperience;
  }
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();

}

function reduceExperience(amount){
  currentUser = readUserData();
  let reducedExperience = amount; 
  //revisamos si sobrepasa de experiencia 
  if(currentUser._avatarExp - reducedExperience <= 0){
    if(currentUser._avatarLevel > 1)
      currentUser._avatarLevel = currentUser._avatarLevel - 1;
    else{
      currentUser._avatarLevel = 1;
    }
  currentUser._avatarExperience = currentUser._avatarExp - reducedExperience + 100;
  }
  else{
    currentUser._avatarExp = currentUser._avatarExp - reducedExperience;
  }
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();

}

function addHealth(amount){
  currentUser = readUserData();
  let addHealth = amount; 
  if(currentUser._avatarHealth + addHealth >= 100 ){
    currentUser._avatarHealth = 100;
  }
  else{
    currentUser._avatarHealth = currentUser._avatarHealth + addHealth;
  }
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();

}

function reduceHealth(amount){
  currentUser = readUserData();
  let reducedHealth = amount; 
  if(currentUser._avatarHealth - reducedHealth <= 0){
    if(currentUser._avatarLevel > 1)
      currentUser._avatarLevel = currentUser._avatarLevel - 1;
    else{
      currentUser._avatarLevel = 1;
    }
    currentUser._avatarHealth = 100;
  }
  else{
    currentUser._avatarHealth = currentUser._avatarHealth - reducedHealth;
  }
  writeUserData(currentUser);
  updateUser(currentUser);
  updateAvatar();

}
function redeem(category, price, points){
  currentUser = readUserData();
    reduceCoins(price);
    if(category == 'exp'){
      addExperience(points);
    }
    else{
      addHealth(points);
    }

}


updateAvatar();

