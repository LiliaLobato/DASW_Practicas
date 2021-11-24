"use strict";

let rewardcontainer = document.getElementById('rewardList');

function rewardToHtml(product){
	return `	
    <div class = "col m-0 p-0">
      <div class="card reward mb-2" >
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
    </div>
	`;
}

function rewardListToHtml(productList){
  rewardcontainer.innerHTML =  productList.map(rewardToHtml).join('\n');
}

loadCards(rewardsUrl).then(rewards => {
	rewardListToHtml(rewards);
})
