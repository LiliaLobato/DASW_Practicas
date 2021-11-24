"use strict";

class TodoException{
	constructor(errorMessage){
		this.errorMessage = errorMessage;
	}
}

class Todo{
	constructor(title, difficulty, tagId, date, status) {
        this._id = generateId('todo');
        this.userId = //sesionStorage($userId)
        this.title = title
        //this.difficulty = difficulty //pendiente
        this.tag = tag
        this.date = date //calcular si es good || bad 23/11/2021 getdate() => 22/11/2021
        this.completed = completed //true == done; flase == pending
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
    //tagId
    get tagId() {
        return this._tagId;
    }
    set tagId(val) {
    	if(typeof val !== "string" && val !== undefined){
    		throw new TodoException('tagId is not valid.');
    	}
        if(val === undefined){
            this._tagId = '';
        }else{
            this._tagId = val;
        }
    }
    //date
    get date() {
        return this._date;
    }
    set date(val) {
        if(val == '' || val === undefined){
            this._date = getTodayDate();
        } else {
            if(typeof val !== "string"){
                throw new TodoException('date cannot be empty.');
            }
            this._date = val;
        }
    }
    //status
    get status() {
        return this._status;
    }
    set status(val) {
        if( val == ''  || val === undefined){
            this._status = "good";
        } else {
            if(val !== "bad" && val !== "good" && val !== "done"){
                throw new HabitException('status not valid.');
            }
            if(typeof val !== "string"){
                throw new TodoException('status cannot be empty.');
            }
            this._status = val;
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
    	//Falta ir pasando los valores a un Todoo que pertenezca a la clase
    	let todo = new Todo(newTodo['title'], newTodo['difficulty'], newTodo['tagId'], newTodo['date'], newTodo['status']);
    	return todo;
    }

    //Limpiamos el objeto recibido de todos
    //aquellos valores ajenos a la clase Todo
    static cleanObject(obj){
    	const TodoProperties = ['title', 'difficulty', 'tagId', 'date', 'status'];
    	for (let prop in obj){
    		//if prop not in TodoProperties
    		if(TodoProperties.indexOf(prop) == -1){
            	delete obj[prop];
            }
    	}
    }


}
