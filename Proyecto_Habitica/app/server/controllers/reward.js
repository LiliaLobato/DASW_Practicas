"use strict";

class RewardException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}

class Reward{
	constructor(title, rewardImg, price, category, points) {
        this._id = generateId('reward');
        this.title = title
        this.rewardImg = rewardImg
        this.price = price
        this.category = category
        this.points = points
    }
    //id
    get id() {
        return this._id;
    }
    set id(val) {
    	throw new RewardException('id have to be autogenerated.');
    }
    //title
    get title() {
        return this._title;
    }
    set title(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new RewardException('Reward title cannot be empty.');
    	}
        this._title = val;
    }
    //rewardImg
    get rewardImg() {
        return this._rewardImg;
    }
    set rewardImg(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new RewardException('rewardImg cannot be empty.');
    	}
        this._rewardImg = val;
    }
    //price
    get price() {
        return this._price;
    }
    set price(val) {
        if(typeof val !== "number" || val < 0){
            throw new RewardException('streak cannot be negative or not number.');
        }
        this._streak = val;
    }
    //category
    get category() {
        return this._category;
    }
    set category(val) {
        if (val !== "health" && val !== "experience"){
            throw new RewardException('category not valid.');
        }
    	if(typeof val !== "string" || val == ''){
    		throw new RewardException('category cannot be empty.');
    	}
        this._category = val;
    }
    //points
    get points() {
        return this._points;
    }
    set points(val) {
        if(typeof val !== "number" || val < 0){
            throw new RewardException('streak cannot be negative or not number.');
        }
        this._streak = val;
    }

    //Convertimos el String de JSON recibido 
    //en una nueva instancia de Rewardo
    static createFromJson(jsonValue){
    	let obj = JSON.parse(jsonValue);
    	return Reward.createFromObject(obj);
    }

    //Convertimos el objeto recibido en una
    //nueva instancia de Rewardo

    //le entra algo como let a = {'points': 15};
    static createFromObject(obj){
    	let newReward = {};
    	Object.assign(newReward, obj); //clone object and handle
    	Reward.cleanObject(newReward);
    	//Falta ir pasando los valores a un Rewardo que pertenezca a la clase
    	let reward = new Reward(newReward['title'], newReward['rewardImg'], newReward['price'], newReward['category'], newReward['points']);
    	return reward;
    }

    //Limpiamos el objeto recibido de todos
    //aquellos valores ajenos a la clase Reward
    static cleanObject(obj){
    	const RewardProperties = ['title', 'rewardImg', 'price', 'category', 'points'];
    	for (let prop in obj){
    		//if prop not in RewardProperties
    		if(RewardProperties.indexOf(prop) == -1){
            	delete obj[prop];
            }
    	}
    }


}
