"use strict";

const utils = require('./utils');

class TodoException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}

class Todo{
	constructor(userEmail, title, difficulty, tag, date, completed) {
        this._id = utils.generateId('todo');
        this.userEmail = userEmail
        this.title = title
        this.difficulty = difficulty //pendiente
        this.tag = tag
        this.date = date //calcular si es good || bad 23/11/2021 getdate() => 22/11/2021
        this.completed = completed //true == done; flase == pending; recibe boolean
    }
    //id
    get id() {
        return this._id;
    }
    set id(val) {
    	throw new TodoException('id have to be autogenerated.');
    }
    //title
    get title() {
        return this._title;
    }
    set title(val) {
    	if(typeof val !== "string" || val == ''){
    		throw new TodoException('Todo title cannot be empty.');
    	}
        this._title = val;
    }
    //difficulty
    get difficulty() {
        return this._difficulty;
    }
    set difficulty(val) {
        if( val == '' || val === undefined){
            this._difficulty = "easy";
        } else {
            if(typeof val !== "string"){
                throw new TodoException('difficulty cannot be empty.');
            }
            this._difficulty = val;
        }
    }
    //tag
    get tag() {
        return this._tag;
    }
    set tag(val) {
    	if(typeof val !== "string" && val !== undefined){
    		throw new TodoException('tag is not valid.');
    	}
        if(val === undefined){
            this._tag = '';
        }else{
            this._tag = val;
        }
    }
    //date
    get date() {
        return this._date;
    }
    set date(val) {
        if(val == '' || val === undefined){
            this._date = utils.getTodayDate();
        } else {
            if(typeof val !== "string"){
                throw new TodoException('date cannot be empty.');
            }
            this._date = val;
        }
    }
    //completed
    get completed() {
        return this._completed;
    }
    set completed(val) {
        if( val == '' || val === undefined){
            this._completed = false;
        } else {
            if(typeof val !== "boolean"){
                throw new TodoException('completed has to be a boolean.');
            }
            this._completed = val;
        }
    }

    //Convertimos el String de JSON recibido 
    //en una nueva instancia de Todoo
    static createFromJson(jsonValue){
    	let obj = JSON.parse(jsonValue);
    	return Todo.createFromObject(obj);
    }

    //Convertimos el objeto recibido en una
    //nueva instancia de Todo
    //le entra algo como let a = {'bntCnt': 15};
    static createFromObject(obj){
    	let newTodo = {};
    	Object.assign(newTodo, obj); //clone object and handle
    	Todo.cleanObject(newTodo);
        if(newTodo instanceof Todo){
            return newTodo;
        } else {
        	//Falta ir pasando los valores a un Todoo que pertenezca a la clase
        	let todo = new Todo(newTodo['userEmail'], newTodo['title'], newTodo['difficulty'], newTodo['tag'], newTodo['date'], newTodo['completed']);
        	return todo;
        }
    }

    //Limpiamos el objeto recibido de todos
    //aquellos valores ajenos a la clase Todo
    static cleanObject(obj){
    	const TodoProperties = ['userEmail','title', 'difficulty', 'tag', 'date', 'completed'];
    	for (let prop in obj){
            let prop_clean = prop.replace(/_/g, "");
            Object.defineProperty(obj, prop_clean,
                Object.getOwnPropertyDescriptor(obj, prop));
    		//if prop not in TodoProperties
    		if(TodoProperties.indexOf(prop) == -1){
            	delete obj[prop];
            }
    	}
    }
}

module.exports = Todo;
