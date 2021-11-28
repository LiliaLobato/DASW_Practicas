"use strict";

let textboxTodo = document.getElementById('textboxTodo');
let todocontainer = document.getElementById('todoList');
let titleTodoModal = document.getElementById('titleTodoModal');
let difficultyTodoModal = document.getElementById('difficultyTodoModal');
let dateTodoModal = document.getElementById('dateTodoModal');
let studyTodoCheckboxModal = document.getElementById('studyTodoCheckboxModal');
let workTodoCheckboxModal = document.getElementById('workTodoCheckboxModal');
let healthTodoCheckboxModal = document.getElementById('healthTodoCheckboxModal');
let personalTodoCheckboxModal = document.getElementById('personalTodoCheckboxModal');


function todoToHtml(todo){
    let statusBnt = "good";
    let statusBadge = "badge-info";
    let DueDate = "Done"
    if (todo._completed){
        statusBnt = "done disabled"
        statusBadge = "badge-secondary";
    } else if(checkDate(todo)){
        statusBnt = "bad" 
        statusBadge = "badge-danger"; 
        DueDate = dueInPast(todo);
    } else {
    	DueDate = dueInFuture(todo)
    }
    return `    
        <li style="list-style-type:none;" class=" mb-1" >
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item check_list d-flex justify-content-between align-items-center p-2 dayBtn_list ${statusBnt}">
              <a class="btn dayBnt btn-lg ${statusBnt}" role="button" onclick="todoDone(this.id)" id="${todo._id}"><i class="fa fa-check" aria-hidden="true"></i></a>
            </li>
        	<span class="d-none"> ${todo._id}</span>
            <li class="list-group-item text_list d-flex justify-content-between align-items-center" id="${todo._id}"
                data-toggle="modal" data-target="#todo_modal" onclick="preloadTodoModal(this.id)">
              <ul class="list-group">
                <li style="list-style-type:none;">
                  <p>${todo._title}</p>
                </li>
                <li style="list-style-type:none;">
                    <span class="badge ${statusBadge} badge-pill mr-2">
                      <i class="fa fa-calendar-o" aria-hidden="true"></i> ${DueDate}</span>
                </li> 
              </ul>
            </li> 
          </ul>
        </li>
    `;
}

function todoListToHtml(todoList){
  	todocontainer.innerHTML =  todoList.map(todoToHtml).join('\n');
}

textboxTodo.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    	
        if(textboxTodo.value !== ''){
            event.preventDefault();
            currentUser = readUserData();
            createTodo({
                "_userEmail": currentUser._avatarEmail,
                "_title": textboxTodo.value
            })
            updateTodoList();
            textboxTodo.value = '';
        }
		return false;
    }
});

function TagSellectedTodo(){
    if (studyTodoCheckboxModal.checked==true) return 'study';
    else if (workTodoCheckboxModal.checked==true) return 'work';
    else if (healthTodoCheckboxModal.checked==true) return 'health';
    else if (personalTodoCheckboxModal.checked==true) return 'personal';
    else return ''
}

function noTagSellectedTodo(){
    studyTodoCheckboxModal.checked=false;
    workTodoCheckboxModal.checked=false;
    healthTodoCheckboxModal.checked=false;
    personalTodoCheckboxModal.checked=false;
}

function selectTagTodo(tag){
    switch(tag){
        case 'study':
            studyTodoCheckboxModal.checked=true;
            break;
        case 'work':
            workTodoCheckboxModal.checked=true;
            break;
        case 'health':
            healthTodoCheckboxModal.checked=true;
            break;
        case 'personal':
            personalTodoCheckboxModal.checked=true;
            break;
        default:
            break;
    }
}

function preloadTodoModal(id){
    //obtenemos la información del habito
    loadCards(todoUrl+'/ById/'+id).then(todo => {
        let currentTodo = todo;
        //obtenemos los valores actuales del habito
        dateTodoModal.valueAsDate = toDate(todo._date);
        difficultyTodoModal.value=currentTodo._difficulty;
        titleTodoModal.value = currentTodo._title;
        noTagSellectedTodo();
        selectTagTodo(currentTodo._tag);
        TodoId.innerText = id;
    })
}

function editTodo(){
    loadCards(todoUrl+'/ById/'+TodoId.innerText).then(todo => {
        //habitListToHtml(todo);
        let currentTodo = todo;
        //solamente cambiamos los atributo que pueden cambiar
        currentTodo._difficulty = difficultyTodoModal.value;
        currentTodo._title = titleTodoModal.value;
        currentTodo._tag = TagSellectedTodo();
        currentTodo._date = getStringDate(dateTodoModal.valueAsDate);
        putCards(todoUrl+'/ById/'+TodoId.innerText, currentTodo, (msg) => console.log(msg), (err) => console.log(err));
        updateTodoList();
    })
}

function todoUndo(){
    loadCards(todoUrl+'/ById/'+TodoId.innerText).then(todo => {
        //habitListToHtml(todo);
        let currentTodo = todo;
        //solamente cambiamos los atributo que pueden cambiar
        currentTodo._difficulty = difficultyTodoModal.value;
        currentTodo._title = titleTodoModal.value;
        currentTodo._tag = TagSellectedTodo();
        currentTodo._date = getStringDate(dateTodoModal.valueAsDate);
        currentTodo._completed = false;
        putCards(todoUrl+'/ById/'+TodoId.innerText, currentTodo, (msg) => console.log(msg), (err) => console.log(err));
        updateTodoList();
    })
    //TODO NARDA
    //updateUser(user); //le restamos vida
}

function todoDelete(){
    deleteCards(todoUrl+'/ById/'+TodoId.innerText, (msg) => console.log(msg), (err) => console.log(err));
    updateTodoList();
}

function updateTodoList(){
    currentUser = readUserData();
    loadCards(todoUrl+'/'+currentUser._avatarEmail).then(todo => {
        todoListToHtml(todo);
        //console.log(todo)
    })
}

function todoDone(id){
    //obtenemos la información del todoo
    loadCards(todoUrl+'/ById/'+id).then(todo => {
        //todoListToHtml(todo);
        let currentTodo = todo;
        currentTodo._completed = true;
        putCards(todoUrl+'/ById/'+id, currentTodo, (msg) => console.log(msg), (err) => console.log(err));
        updateTodoList();
    })
    //TODO NARDA
    //calculamos la cantidad de experiencia que gana
    //updateUser(user); //le sumamos experienca pero revisamos que si sobrepasan el límite, aumente de nivel
}

function checkDate(todo){
	let todo_Date = toDate(todo._date);
	let today_Date = toDate(getTodayDate());
	return today_Date.getTime() > todo_Date.getTime();
}

function dueInFuture(todo){
	let todo_Date = toDate(todo._date);
	let today_Date = toDate(getTodayDate());
	let period = 0;
	if (today_Date.getTime() == todo_Date.getTime()){
		return "Due Today"
	} else if(today_Date.getFullYear() != todo_Date.getFullYear()){
		period = (todo_Date.getFullYear() - today_Date.getFullYear())
		return "Due in " + period + ((period == 1)?" year":" years")
	} else if(today_Date.getMonth() != todo_Date.getMonth()){
		period = (todo_Date.getMonth() - today_Date.getMonth())
		return "Due in " + period + ((period == 1)?" month":" months")
	} else {
		period = (todo_Date.getDate() - today_Date.getDate())
		return "Due in " + period + ((period == 1)?" day":" days")
	}
}

function dueInPast(todo){
	let todo_Date = toDate(todo._date);
	let today_Date = toDate(getTodayDate());
	let period = 0;
	if(todo_Date.getFullYear() != today_Date.getFullYear()){
		period = (today_Date.getFullYear() - todo_Date.getFullYear())
		return "Due " + period + ((period == 1)?" year":" years") + " ago"
	} else if(todo_Date.getMonth() != today_Date.getMonth()){
		period = (today_Date.getMonth() - todo_Date.getMonth())
		return "Due " + period + ((period == 1)?" month":" months") + " ago"
	} else {
		period = (today_Date.getDate() - todo_Date.getDate())
		return "Due " + period + ((period == 1)?" day":" days") + " ago"
	}
}

updateTodoList();