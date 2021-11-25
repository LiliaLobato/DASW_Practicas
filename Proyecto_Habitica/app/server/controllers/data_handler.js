"use strict";
const fs = require('fs');
const Rewardjs = require('./reward');
const Userjs = require('./user');
const Habitjs = require('./habit');

const User = require ('../../model/user');
const Habit = require ('../../model/habit');


let contentReward = fs.readFileSync('./app/server/data/rewards.js');
let contentHabit = fs.readFileSync('./app/server/data/habits.js');

//Este es el equivalente a nuestro servidor.
const serverDaily = [];
const serverTodo = [];
const serverTag = [];
//const serverReward = [];
let serverReward = JSON.parse(contentReward).map(Rewardjs.createFromObject);
let serverHabit = JSON.parse(contentHabit).map(Habitjs.createFromObject);
const filter = [];


//Reward
function getRewards(){
	return serverReward;
}

function getTypeRewards(type){
	filter.length=0;
    for (let reward in serverReward){ 
    	if(type == serverReward[reward].category){
        	filter.push(serverReward[reward]);
		}
    }
	return filter;
}
function createReward(reward){
	serverReward.push(Rewardjs.createFromObject(reward));
    fs.writeFileSync('./app/server/data/rewards.js', JSON.stringify(serverReward));
}
function deleteReward(id){
    for (let reward in serverReward){ 
    	if(id == serverReward[reward].id){
        	serverReward.splice(reward,1);
        	fs.writeFileSync('./app/server/data/rewards.js', JSON.stringify(serverReward));
        	break;
		}
    }
}
function getRewardById(id){
    for (let reward in serverReward){ 
    	if(id == serverReward[reward].id){
        	return serverReward[reward];
		}
    }
}

//User
async function getUsers(res){	
	User.find({}).then(function (users) {
	    if(users != undefined ) {
	      res.status(200).json(users);
	    } else {
	      res.status(404).send(`Usuario no existe!`);
	    }
	 });
}
async function createUser(body){ 
	let userObj = Userjs.createFromObject(body);
	const user = new User({
	_avatarName: `${userObj.avatarName}`,
	_avatarPassword: `${userObj.avatarPassword}`,
	_avatarEmail: `${userObj.avatarEmail}`,
	_avatarImg: `${userObj.avatarImg}`, 
	_avatarLevel: `${userObj.avatarLevel}`,
	_avatarcoins: `${userObj.avatarcoins}`,
	_avatarHealth: `${userObj.avatarHealth}`,
	_avatarExp: `${userObj.avatarExp}`,
	});
	console.log(user);
	await user.save();
	}
async function getUserByEmail(Email,res){
	User.find({_avatarEmail:Email}).then(function (users) {
	    if(users != undefined ) {
	      res.status(200).json(users);
	    } else {
	      res.status(404).send(`Usuario no existe!`);
	    }
	 });
}
async function updateUser(Email, updatedUser) {
	let userObj = Userjs.createFromObject(updatedUser);
	const user = {
		_avatarName: `${userObj.avatarName}`,
		_avatarPassword: `${userObj.avatarPassword}`,
		_avatarEmail: `${userObj.avatarEmail}`,
		_avatarImg: `${userObj.avatarImg}`, 
		_avatarLevel: `${userObj.avatarLevel}`,
		_avatarcoins: `${userObj.avatarcoins}`,
		_avatarHealth: `${userObj.avatarHealth}`,
		_avatarExp: `${userObj.avatarExp}`,
	};
	await User.findOneAndUpdate({_avatarEmail:Email},user);
}

//Habit
async function getHabits(res){	
	Habit.find({}).then(function (habits) {
	    if(habits != undefined ) {
	      res.status(200).json(habits);
	    } else {
	      res.status(404).send(`Habits no existe!`);
	    }
	 });
}
async function createHabit(body){
	let habitObj = Habitjs.createFromObject(body);
	const habit = new Habit({
		_userEmail: `${habitObj.userEmail}`,
		_title: `${habitObj.title}`,
		_difficulty: `${habitObj.difficulty}`,
		_tag: `${habitObj.tag}`, 
		_counter: `${habitObj.counter}`
	});
	console.log(habit);
	await habit.save();
}
async function deleteHabit(id){
	await Habit.findByIdAndDelete(id);
}
async function getHabitFromUser(Email,res){
	Habit.find({_userEmail:Email}).then(function (habits) {
	    if(habits != undefined ) {
	      res.status(200).json(habits);
	    } else {
	      res.status(404).send(`Usuario no existe!`);
	    }
	 });
}
async function getHabitFromId(id,res){
	Habit.findById(id).then(function (habits) {
	    if(habits != undefined ) {
	      res.status(200).json(habits);
	    } else {
	      res.status(404).send(`Usuario no existe!`);
	    }
	 });
}
async function updateHabit(id, updatedHabit){
	let habitObj = Habitjs.createFromObject(updatedHabit);
	const habit = {
		_userEmail: `${habitObj.userEmail}`,
		_title: `${habitObj.title}`,
		_difficulty: `${habitObj.difficulty}`,
		_tag: `${habitObj.tag}`, 
		_counter: `${habitObj.counter}`,
	};
	console.log(habit)
	await Habit.findByIdAndUpdate(id,habit);
}

exports.getRewards = getRewards;
exports.createReward = createReward;
exports.deleteReward = deleteReward;
exports.getTypeRewards = getTypeRewards;

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUserByEmail = getUserByEmail;

exports.getHabits = getHabits;
exports.createHabit = createHabit;
exports.deleteHabit = deleteHabit;
exports.updateHabit = updateHabit;
exports.getHabitFromUser = getHabitFromUser;
exports.getHabitFromId = getHabitFromId;