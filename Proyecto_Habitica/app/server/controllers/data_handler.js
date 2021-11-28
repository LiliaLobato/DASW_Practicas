"use strict";
const fs = require('fs');
const Rewardjs = require('./reward');
const Userjs = require('./user');
const Habitjs = require('./habit');
const Dailyjs = require('./daily');
const Todojs = require('./todo');

const User = require ('../../model/user');
const Habit = require ('../../model/habit');
const Daily = require ('../../model/daily'); 
const Todo = require ('../../model/todo');  


let contentReward = fs.readFileSync('./app/server/data/rewards.js');

//Este es el equivalente a nuestro servidor.
let serverReward = JSON.parse(contentReward).map(Rewardjs.createFromObject);
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
//Dailies 
async function getDailies(res){	
	Daily.find({}).then(function (dailies) {
	    if(dailies != undefined ) {
	      res.status(200).json(dailies);
	    } else {
	      res.status(404).send(`Habits no existe!`);
	    }
	 });
}
async function createDaily(body){
	let dailyObj = Dailyjs.createFromObject(body);
	console.log(dailyObj);
	const daily = new Daily({
		_userEmail : `${dailyObj.userEmail}`,
		_title : `${dailyObj.title}`,
		_difficulty : `${dailyObj.difficulty}`,
		_tag:  `${dailyObj.tag}`,
		_validOn: `${dailyObj.validOn}`,
	   	_updatedAt:`${dailyObj.updatedAt}`,
	  	_completed: `${dailyObj.completed}`,
	   	_counter: `${dailyObj.counter}`
	});
	console.log(daily);
	await daily.save();
}
async function deleteDaily(id){
	await Daily.findByIdAndDelete(id);
}
async function getDailyFromUser(Email,res){
	Daily.find({_userEmail:Email}).then(function (dailies) {
	    if(dailies != undefined ) {
	      res.status(200).json(dailies);
	    } else {
	      res.status(404).send(`Daily no existe!`);
	    }
	 });
}
async function getDailyFromId(id,res){
	Daily.findById(id).then(function (dailies) {
	    if(dailies != undefined ) {
	      res.status(200).json(dailies);
	    } else {
	      res.status(404).send(`Daily no existe!`);
	    }
	 });
}
async function updateDaily(id, updatedDaily){
	let dailyObj = Dailyjs.createFromObject(updatedDaily);
	const daily =  {
		_userEmail : `${dailyObj.userEmail}`,
		_title : `${dailyObj.title}`,
		_difficulty : `${dailyObj.difficulty}`,
		_tag:  `${dailyObj.tag}`,
		_validOn: [`${dailyObj.validOn}`],
	   	_updatedAt:`${dailyObj.updatedAt}`,
	  	_completed: `${dailyObj.completed}`,
	   	_counter: `${dailyObj.counter}`
	};
	console.log(daily)
	await Daily.findByIdAndUpdate(id,daily);
}

//Todos
async function getTodos(res){	
	Todo.find({}).then(function (todos) {
	    if(todos != undefined ) {
	      res.status(200).json(todos);
	    } else {
	      res.status(404).send(`Todo no existe!`);
	    }
	 });
}
async function createTodo(body){
	let todoObj = Todojs.createFromObject(body);
	const todo = new Todo({
		_userEmail : `${todoObj.userEmail}`,
		_title : `${todoObj.title}`,
		_difficulty : `${todoObj.difficulty}`,
		_tag:  `${todoObj.tag}`,
		_date: `${todoObj.date}`,
	  	_completed: `${todoObj.completed}`
	});
	console.log(todo);
	await todo.save();
}
async function deleteTodo(id){
	await Todo.findByIdAndDelete(id);
}
async function getTodoFromUser(Email,res){
	Todo.find({_userEmail:Email}).then(function (todos) {
	    if(todos != undefined ) {
	      res.status(200).json(todos);
	    } else {
	      res.status(404).send(`Todo no existe!`);
	    }
	 });
}
async function updateTodo(id, updatedTodo){
	let todoObj = Todojs.createFromObject(updatedTodo);
	const todo = {
		_userEmail : `${todoObj.userEmail}`,
		_title : `${todoObj.title}`,
		_difficulty : `${todoObj.difficulty}`,
		_tag:  `${todoObj.tag}`,
		_date: `${todoObj.date}`,
	  	_completed: `${todoObj.completed}`
	};
	console.log(todo)
	await Todo.findByIdAndUpdate(id,todo);
}
async function getTodoFromId(id,res){
	Todo.findById(id).then(function (todos) {
	    if(todos != undefined ) {
	      res.status(200).json(todos);
	    } else {
	      res.status(404).send(`Todo no existe!`);
	    }
	 });
}


exports.getRewards = getRewards;
exports.createReward = createReward;
exports.deleteReward = deleteReward;
exports.getTypeRewards = getTypeRewards;
exports.getRewardById = getRewardById;

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

exports.getDailies = getDailies;
exports.createDaily = createDaily;
exports.deleteDaily = deleteDaily;
exports.updateDaily = updateDaily;
exports.getDailyFromUser= getDailyFromUser;
exports.getDailyFromId = getDailyFromId;

exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;
exports.getTodoFromUser= getTodoFromUser;
exports.getTodoFromId = getTodoFromId;
