"use strict";

let rewardcontainer = document.getElementById('rewardList');
let allRewardsTab = document.getElementById('allRewardsTab');
let lifeRewardsTab = document.getElementById('lifeRewardsTab');
let expRewardsTab = document.getElementById('expRewardsTab');

function rewardToHtml(product){
	return `	
    <div class = "col m-0 p-0">
      <a  href = "#" id="${product._id}" onclick="buyReward(this.id);event.preventDefault();">
        <div class="card reward mb-2">
          <span class="d-none"> ${product._id}</span>
          <img class="card-img-top reward_img" src="${product._rewardImg}" alt="Card image cap">
          <div class="card-body reward_body">
            <p class="card-title text-center" style="font-weight: bold;">${product._title}</p>
            <span class=" card-text text-muted">
              <p class="m-0 p-0" id="reward_coins">${product._price} coins</p>
              <p class="m-0 p-0" id="reward_salud">+ ${product._points} ${product._category}</p>
            </span>
          </div>
        </div>
      </a>
    </div>
	`;
}

function rewardListToHtml(productList){
  rewardcontainer.innerHTML =  productList.map(rewardToHtml).join('\n');
}

function updateRewardListByType(type){
  loadCards(rewardsUrl + '/' + type).then(rewards => {
    rewardListToHtml(rewards);
  })

  if(type=="life"){
    lifeRewardsTab.classList.add("active");
    expRewardsTab.classList.remove("active");
    allRewardsTab.classList.remove("active");
  } else {
    expRewardsTab.classList.add("active");
    lifeRewardsTab.classList.remove("active");
    allRewardsTab.classList.remove("active");
  }
}

function buyReward(id){
  loadCards(rewardsUrl + '/ById/' + id).then(reward => {
    console.log(reward)
    let price = reward._price;
    let category = reward._category;
    let points = reward._points;
    //TODO NARDA
    currentUser = readUserData();
    console.log(currentUser);
    if(currentUser._avatarCoins - price < 0){
      alert('you do not have enough coins ');
    }else if(currentUser._avatarHealth == 100 && category =='life'){
      alert('your life is full');
    }else{
      redeem(category, price, points);
    }
    
    //obtenemos precio y puntos que gana
    //dependiendo del type, lo agregamos como life o como exp
    //quitamos modenas y putnos del usuario

  })

}

function updateRewardList(){
  
  loadCards(rewardsUrl).then(rewards => {
    rewardListToHtml(rewards);
  })

  allRewardsTab.classList.add("active");
  lifeRewardsTab.classList.remove("active");
  expRewardsTab.classList.remove("active");
}

function alert(message) {
  var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' + message + ' <button type="button" class="btn-close" data-dismiss="alert" aria-label="Close">x</button></div>'
  
  alertPlaceholder.append(wrapper)
}

updateRewardList(); 