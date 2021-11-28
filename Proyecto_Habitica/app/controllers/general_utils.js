"use strict";

const productsUrl = 'http://localhost:8080/products'
const rewardsUrl = 'http://localhost:8080/reward'
const usersUrl = 'http://localhost:8080/user'
const habitsUrl = 'http://localhost:8080/habit'
const dailyUrl = 'http://localhost:8080/daily'
const todoUrl = 'http://localhost:8080/todo'

let studyFilter = document.getElementById('studyFilter');
let workFilter = document.getElementById('workFilter');
let healthFilter = document.getElementById('healthFilter');
let personalFilter = document.getElementById('personalFilter');
let allFilter = document.getElementById('allFilter');

function readUserData(){
	let user = JSON.parse(sessionStorage.getItem('userData'));
	let i = User.createFromObject(user);
	return i;
}

function writeUserData(user){
	sessionStorage.setItem('userData',JSON.stringify(user));
}

function cleanUserData(){
	sessionStorage.removeItem('userData');
}

function updateUser(user) {
    putUser(usersUrl+'/'+user._avatarEmail, user, (msg) => console.log(msg), (err) => console.log(err));
}

function helloWorld(){
	console.log("Hello World")
}

function onlyOne(checkbox, Modal) {
    let idNotWanted = Modal + "CheckboxModal";
    switch(Modal){
        case 'Habit':
		    noTagSellectedHabit();
		    selectTagHabit(checkbox.substr(0,checkbox.indexOf(idNotWanted)))
            break;
        case 'Todo':
		    noTagSellectedTodo();
		    selectTagTodo(checkbox.substr(0,checkbox.indexOf(idNotWanted)))
            break;
        case 'Daily':
		    noTagSellectedDaily();
		    selectTagDaily(checkbox.substr(0,checkbox.indexOf(idNotWanted)))
            break;
        default:
            break;
    }
}

//CREATE CARDS
function createHabit(habit) {
    postCards(habitsUrl, habit, (msg) => {
        console.log(msg);
    }, (err) => console.log(err));
}

function createDaily(daily) {
    postCards(dailyUrl, daily, (msg) => {
        console.log(msg);
    }, (err) => console.log(err));
}

function createTodo(todo) {
    postCards(todoUrl, todo, (msg) => {
        console.log(msg);
    }, (err) => console.log(err));
}

//FILTERS
function filterCards(id){
    let currentFilter = document.getElementById(id);
    cleanFilter()
    currentFilter.classList.remove("btn-light");
    currentFilter.classList.add("btn-purple");
    switch(id){
    	case 'studyFilter':
    		console.log("only get cards with class study");
    		break;
    	case 'workFilter':
    		console.log("only get cards with class work");
    		break;
    	case 'healthFilter':
    		console.log("only get cards with class health");
    		break;
    	case 'personalFilter':
    		console.log("only get cards with class personal");
    		break;
    	case 'allFilter':
    		console.log("get all cards");
    		updateDailyList();
    		updateHabitsList();
    		updateTodoList();
    		break;
    }
}

function cleanFilter(){
    studyFilter.classList.remove("btn-purple");
    workFilter.classList.remove("btn-purple");
    healthFilter.classList.remove("btn-purple");
    personalFilter.classList.remove("btn-purple");
    allFilter.classList.remove("btn-purple");
    studyFilter.classList.add("btn-light");
    workFilter.classList.add("btn-light");
    healthFilter.classList.add("btn-light");
    personalFilter.classList.add("btn-light");
    allFilter.classList.add("btn-light");
}