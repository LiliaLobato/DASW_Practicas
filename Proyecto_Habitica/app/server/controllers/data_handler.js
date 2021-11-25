"use strict";
const fs = require('fs');
const Rewardjs = require('./reward');
const Userjs = require('./user');
const Habitjs = require('./habit');
let contentReward = fs.readFileSync('./app/server/data/rewards.js');
let contentUser = fs.readFileSync('./app/server/data/users.js');
let contentHabit = fs.readFileSync('./app/server/data/habits.js');

//Este es el equivalente a nuestro servidor.
const serverDaily = [];
const serverTodo = [];
const serverTag = [];
//const serverReward = [];
let serverReward = JSON.parse(contentReward).map(Rewardjs.createFromObject);
let serverUser = JSON.parse(contentUser).map(Userjs.createFromObject);
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
function getUsers(){
	return serverUser; //regresa un array de user.object
}
function createUser(user){ // {'name': Lolo}
	serverUser.push(Userjs.createFromObject(user));
    fs.writeFileSync('./app/server/data/users.js', JSON.stringify(serverUser));
}
function getUserByEmail(avatarEmail){
    for (let user in serverUser){ 
    	if(avatarEmail == serverUser[user].avatarEmail){
        	return serverUser[user];
		}
    }
}
function updateUser(avatarEmail, updatedUser) {
    for (let user in serverUser){ 
    	if(avatarEmail == serverUser[user].avatarEmail){
        	serverUser[user] = Userjs.createFromObject(updatedUser);
		}
    }
    fs.writeFileSync('./app/server/data/users.js', JSON.stringify(serverUser));
    return 1;
}

//Todo
function getTodos(){
	return serverTodo;
}
function createTodo(todo){
	serverTodo.push(Todo.createFromObject(todo));
}
function deleteTodo(id){
    for (let todo in serverTodo){ 
    	if(id == serverTodo[todo].id){
        	serverTodo.splice(todo,1);
        	break;
		}
    }
}
function getTodoById(id){
    for (let todo in serverTodo){ 
    	if(id == serverTodo[todo].id){
        	return serverTodo[todo];
		}
    }
}
function updateTodo(id,updatedTodo){
    for (let todo in serverTodo){ 
    	if(id == serverTodo[todo].id){
    		serverTodo[todo]=Todo.createFromObject(updatedTodo);
    		serverTodo[todo]._id=id;
        	return serverTodo[todo];
		}
    }
}

//Daily
function getDailies(){
	return serverDaily;
}
function createDaily(daily){
	serverDaily.push(Daily.createFromObject(daily));
}
function deleteDaily(id){
    for (let daily in serverDaily){ 
    	if(id == serverDaily[daily].id){
        	serverDaily.splice(daily,1);
        	break;
		}
    }
}
function getDailyById(id){
    for (let daily in serverDaily){ 
    	if(id == serverDaily[daily].id){
        	return serverDaily[daily];
		}
    }
}
function updateDaily(id,updatedDaily){
    for (let daily in serverDaily){ 
    	if(id == serverDaily[daily].id){
    		serverDaily[daily]=Daily.createFromObject(updatedDaily);
    		serverDaily[daily]._id=id;
        	return serverDaily[daily];
		}
    }
}

//Habit
function getHabits(){
	return serverHabit;
}
function createHabit(habit){
	serverHabit.push(Habitjs.createFromObject(habit));
    fs.writeFileSync('./app/server/data/habits.js', JSON.stringify(serverHabit));
}
function deleteHabit(id){
    for (let habit in serverHabit){ 
    	if(id == serverHabit[habit].id){
        	serverHabit.splice(habit,1);
        	break;
		}
    }
}
function getHabitFromUser(userEmail){
    for (let habit in serverHabit){ 
    	if(userEmail == serverHabit[habit].userEmail){
        	return serverHabit[habit];
		}
    }
}
function updateHabit(id,updatedHabit){
    for (let habit in serverHabit){ 
    	if(id == serverHabit[habit].id){
    		serverHabit[habit]=Habit.createFromObject(updatedHabit);
    		serverHabit[habit]._id=id;
        	return serverHabit[habit];
		}
    }
}

////////////////////////////////////////////////////////////////////////

function findProduct(query){
	var fields = String(query).split(':');
	filter.length=0;
	if(fields.length==2){
		findTittle(fields[1]);
		findCategory(fields[0]);
	}else{
		findTittle(fields[0]);
	}
	return filter;
}

function findTittle(tittle){
	if(tittle=="") return;
    for (let prod in serverProducts){ 
    	let titlePod = serverProducts[prod]._title;
    	if(titlePod.includes(tittle)){
        	filter.push(serverProducts[prod]);
		}
    }
}

function findCategory(category){
	if(category=="") return;
	if(filter.length!=0){
	    for (let prod in filter){ 
	    	let categPod = filter[prod]._category;
	    	if(!categPod.includes(category)){
	        	filter.splice(prod,1);
			}
	    }
	}else{
		for (let prod in serverProducts){ 
	    	let categPod = serverProducts[prod]._category;
	    	if(categPod.includes(category)){
	        	filter.push(serverProducts[prod]);
			}
    	}
	}
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