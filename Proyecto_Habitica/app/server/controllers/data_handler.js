"use strict";

//Este es el equivalente a nuestro servidor.
const serverHabit = [];
const serverDaily = [];
const serverTodo = [];
const serverTag = [];
const serverReward = [];
const filter = [];

//Tags
function getTags(){
	return serverTag;
}
function createTag(tag){
	serverTag.push(Tag.createFromObject(tag));
}
function deleteTag(id){
    for (let tag in serverTag){ 
    	if(id == serverTag[tag].id){
        	serverTag.splice(tag,1);
        	break;
		}
    }
}
function getTagById(id){
    for (let tag in serverTag){ 
    	if(id == serverTag[tag].id){
        	return serverTag[tag];
		}
    }
}

//Reward
function getRewards(){
	return serverReward;
}
function createReward(reward){
	serverReward.push(Reward.createFromObject(reward));
}
function deleteReward(id){
    for (let reward in serverReward){ 
    	if(id == serverReward[reward].id){
        	serverReward.splice(reward,1);
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
	serverHabit.push(Habit.createFromObject(habit));
}
function deleteHabit(id){
    for (let habit in serverHabit){ 
    	if(id == serverHabit[habit].id){
        	serverHabit.splice(habit,1);
        	break;
		}
    }
}
function getHabitById(id){
    for (let habit in serverHabit){ 
    	if(id == serverHabit[habit].id){
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