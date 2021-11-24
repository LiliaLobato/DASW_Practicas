"use strict";

const utils = require('./utils');

class userDataException{
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class User{
    constructor(avatarEmail, avatarImg, avatarName,avatarPassword, avatarLevel, avatarCoins, avatarHealth, avatarExp){
        this._id = utils.generateId('user'); //al iniciar mando {avatarImg,avatarName,avatarPassword}
        this.avatarEmail = avatarEmail
        this.avatarImg = avatarImg //guarda num
        this.avatarName = avatarName
        this.avatarPassword = avatarPassword
        this.avatarLevel = avatarLevel //default 1
        this.avatarCoins = avatarCoins //default 1000
        this.avatarHealth = avatarHealth //default 1000
        this.avatarExp = avatarExp //default 0
    }
    //id
    get id() {
        return this._id;
    }
    set id(val) {
        throw new userDataException('id have to be autogenerated.');
    }
    //avatarImg
    get avatarImg() {
        return this._avatarImg;
    }
    set avatarImg(val) {
        if(val === undefined){
            this._avatarImg = 1;
        } else {
            if(typeof val !== "number" || val < 1 || val > 4){
            throw new userDataException('image has to be 1,2,3 or 4');
            }
            this._avatarImg = val;
        }
    }
    //avatarName
    get avatarName() {
        return this._avatarName;
    }
    set avatarName(val) {
        if(typeof val !== "string" || val == ''){
            throw new userDataException('Daily avatarName cannot be empty.');
        }
        this._avatarName = val;
    }
    //avatarEmail
    get avatarEmail() {
        return this._avatarEmail;
    }
    set avatarEmail(val) {
        if(typeof val !== "string" || val == ''){
            throw new userDataException('Daily avatarEmail cannot be empty.');
        }
        this._avatarEmail = val;
    }
    //avatarPassword
    get avatarPassword() {
        return this._avatarPassword;
    }
    set avatarPassword(val) {
        if(typeof val !== "string" || val == ''){
            throw new userDataException('Daily avatarPassword cannot be empty.');
        }
        this._avatarPassword = val;
    }
    //avatarLevel
    get avatarLevel() {
        return this._avatarLevel;
    }
    set avatarLevel(val) {
        if(val === undefined){
            this._avatarLevel = 1;
        } else {
            if(typeof val !== "number" || val < 1){
            throw new userDataException('level cannot be less than 1 or not number.');
            }
            this._avatarLevel = val;
        }
    }
    //avatarCoins
    get avatarCoins() {
        return this._avatarCoins;
    }
    set avatarCoins(val) {
        if(val === undefined){
            this._avatarCoins = 1000;
        } else {
            if(typeof val !== "number" || val < 1){
            throw new userDataException('level cannot be less than 1 or not number.');
            }
            this._avatarCoins = val;
        }
    }
    //avatarHealth
    get avatarHealth() {
        return this._avatarHealth;
    }
    set avatarHealth(val) {
        if(val === undefined){
            this._avatarHealth = 100;
        } else {
            if(typeof val !== "number" || val < 1){
            throw new userDataException('level cannot be less than 1 or not number.');
            }
            this._avatarHealth = val;
        }
    }
    //avatarExp
    get avatarExp() {
        return this._avatarExp;
    }
    set avatarExp(val) {
        if(val === undefined){
            this._avatarExp = 10;
        } else {
            if(typeof val !== "number" || val < 0){
            throw new userDataException('level cannot be less than 1 or not number.');
            }
            this._avatarExp = val;
        }
    }
    
    //Convertimos el String de JSON recibido 
    //en una nueva instancia de User
    static createFromJson(jsonValue){
        let obj = JSON.parse(jsonValue);
        return User.createFromObject(obj);
    }

    //Convertimos el objeto recibido en una
    //nueva instancia de User

    //le entra algo como let a = {'bntCnt': 15};
    static createFromObject(obj){
        let newUser = {};
        Object.assign(newUser, obj); //clone object and handle
        if(newUser instanceof User){
            return newUser;
        } else {
            User.cleanObject(newUser);
            //Falta ir pasando los valores a un User que pertenezca a la clase
            let user = new User(newUser['avatarEmail'], newUser['avatarImg'], 
                                newUser['avatarName'], newUser['avatarPassword'],
                                newUser['avatarLevel'], newUser['avatarCoins'],
                                newUser['avatarHealth'], newUser['avatarExp']);
            return user;
        }
    }

    //Limpiamos el objeto recibido de todos
    //aquellos valores ajenos a la clase User
    static cleanObject(obj){
        const UserProperties = ['avatarEmail','avatarImg', 'avatarName', 'avatarPassword', 'avatarLevel', 'avatarCoins', 'avatarHealth', 'avatarExp'];
        
        for (let prop in obj){
            //if prop not in UserProperties
            let prop_clean = prop.replace(/_/g, "");
            Object.defineProperty(obj, prop_clean,
                Object.getOwnPropertyDescriptor(obj, prop));
            if(UserProperties.indexOf(prop) == -1){
                delete obj[prop];
            }
        }
    }

}

module.exports = User;