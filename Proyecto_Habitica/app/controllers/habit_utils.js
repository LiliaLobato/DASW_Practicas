"use strict";

let textboxHabit = document.getElementById('textboxHabit');
let habitcontainer = document.getElementById('habitList');
let titleHabitModal = document.getElementById('titleHabitModal');
let difficultyHabitModal = document.getElementById('difficultyHabitModal');
let studyHabitCheckboxModal = document.getElementById('studyHabitCheckboxModal');
let workHabitCheckboxModal = document.getElementById('workHabitCheckboxModal');
let healthHabitCheckboxModal = document.getElementById('healthHabitCheckboxModal');
let personalHabitCheckboxModal = document.getElementById('personalHabitCheckboxModal');
let HabitId = document.getElementById('HabitId');

function habitToHtml(habit){
    let statusBnt = "";
    let statusBadge = "badge-warning";
    if(habit._counter > 0){
        statusBnt = "strong" 
        statusBadge = "badge-success"; 
    }
    return `    
        <li style="list-style-type:none;" class=" mb-1" >
          <ul class="list-group list-group-horizontal">
            <li class="list-group-item check_list d-flex justify-content-between align-items-center p-2 habBtn_list ${statusBnt}">
              <a class="btn habBnt btn-lg ${statusBnt}" role="button" onclick="habitPlus(this.id)" id="${habit._id}"><i class="fa fa-plus" aria-hidden="true"></i></a>
            </li>
            <span class="d-none"> ${habit._id}</span>
            <li class="list-group-item text_list d-flex justify-content-between align-items-center" id="${habit._id}" 
                data-toggle="modal" data-target="#habit_modal" onclick="preloadHabitModal(this.id)" >
              <ul class="list-group">
                <li style="list-style-type:none;">
                  <p>${habit._title}</p>
                </li>
                <li style="list-style-type:none;">
              <span class="badge ${statusBadge} badge-pill">
                <i class="fa fa-forward" aria-hidden="true"></i> ${habit._counter}</span>
                </li> 
              </ul>
            </li> 
          </ul>
        </li>
    `;
}

function habitListToHtml(habitList){
  habitcontainer.innerHTML =  habitList.map(habitToHtml).join('\n');
}

textboxHabit.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    	
        if(textboxHabit.value !== ''){
            event.preventDefault();
            currentUser = readUserData();
            createHabit({
                "_userEmail": currentUser._avatarEmail,
                "_title": textboxHabit.value
            })
            let filter = readTagFilter();
            if(filter.filter == 'all'){
                updateHabitsList();
                updateHabitsList();
            }
            else{
                updateHabitsFilterList(filter.filter);
                updateHabitsFilterList(filter.filter);
            }
            textboxHabit.value = '';
        }
		return false;
    }
});

function TagSellectedHabit(){
    if (studyHabitCheckboxModal.checked==true) return 'study';
    else if (workHabitCheckboxModal.checked==true) return 'work';
    else if (healthHabitCheckboxModal.checked==true) return 'health';
    else if (personalHabitCheckboxModal.checked==true) return 'personal';
    else return ''
}


function noTagSellectedHabit(){
    studyHabitCheckboxModal.checked=false;
    workHabitCheckboxModal.checked=false;
    healthHabitCheckboxModal.checked=false;
    personalHabitCheckboxModal.checked=false;
}

function selectTagHabit(tag){
    switch(tag){
        case 'study':
            studyHabitCheckboxModal.checked=true;
            break;
        case 'work':
            workHabitCheckboxModal.checked=true;
            break;
        case 'health':
            healthHabitCheckboxModal.checked=true;
            break;
        case 'personal':
            personalHabitCheckboxModal.checked=true;
            break;
        default:
            break;
    }
}

function preloadHabitModal(id){
    //obtenemos la información del habito
    loadCards(habitsUrl+'/ById/'+id).then(habits => {
        //habitListToHtml(habits);
        let currentHabit = habits;
        //obtenemos los valores actuales del habito
        difficultyHabitModal.value=currentHabit._difficulty;
        titleHabitModal.value = currentHabit._title;
        noTagSellectedHabit();
        selectTagHabit(currentHabit._tag);
        HabitId.innerText = id;
    })
}

function editHabit(){
    loadCards(habitsUrl+'/ById/'+HabitId.innerText).then(habits => {
        //habitListToHtml(habits);
        let currentHabit = habits;
        //solamente cambiamos los atributo que pueden cambiar
        currentHabit._difficulty = difficultyHabitModal.value;
        currentHabit._title = titleHabitModal.value;
        currentHabit._tag = TagSellectedHabit();
        console.log(currentHabit)
        putCards(habitsUrl+'/ById/'+HabitId.innerText, currentHabit, (msg) => console.log(msg), (err) => console.log(err));
        let filter = readTagFilter();
        if(filter.filter == 'all'){
            updateHabitsList();
            updateHabitsList();
        }
        else{
            updateHabitsFilterList(filter.filter);
            updateHabitsFilterList(filter.filter);
        }
    })
}

function habitPlus(id){
    //obtenemos la información del habito
    loadCards(habitsUrl+'/ById/'+id).then(habits => {
        //habitListToHtml(habits);
        let currentHabit = habits;
        let gainedPoints = calculatePoints(currentHabit._difficulty);
        //solamente cambiamos el atributo de counter
        currentHabit._counter = habits._counter + 1;
        putCards(habitsUrl+'/ById/'+id, currentHabit, (msg) => console.log(msg), (err) => console.log(err));
        let filter = readTagFilter();
        if(filter.filter == 'all'){
            updateHabitsList();
            updateHabitsList();
        }
        else{
            updateHabitsFilterList(filter.filter);
            updateHabitsFilterList(filter.filter);
        }
        console.log(gainedPoints);
        addExperience(gainedPoints);
        addCoins(gainedPoints);
    })
    //TODO NARDA

    //calculamos la cantidad de monedas y experiencia que gana
    //updateUser(user); //le sumamos monedas y experienca pero revisamos que si sobrepasan el límite, aumente de nivel
}

function habitDelete(){
    deleteCards(habitsUrl+'/ById/'+HabitId.innerText, (msg) => console.log(msg), (err) => console.log(err));
    updateHabitsList();
    updateHabitsList();
}

function habitRestart(){
    //obtenemos la información del habito
    loadCards(habitsUrl+'/ById/'+HabitId.innerText).then(habits => {
        //habitListToHtml(habits);
        let currentHabit = habits;
        console.log(currentHabit)
        //adicionalmente cambiamos el atributo de counter
        currentHabit._counter = 0;
        currentHabit._difficulty = difficultyHabitModal.value;
        currentHabit._title = titleHabitModal.value;
        currentHabit._tag = TagSellectedHabit();
        putCards(habitsUrl+'/ById/'+HabitId.innerText, currentHabit, (msg) => console.log(msg), (err) => console.log(err));
        let filter = readTagFilter();
        if(filter.filter == 'all'){
            updateHabitsList();
            updateHabitsList();
        }
        else{
            updateHabitsFilterList(filter.filter);
            updateHabitsFilterList(filter.filter);
        }
    })
}

function updateHabitsList(){
    currentUser = readUserData();
    loadCards(habitsUrl+'/'+currentUser._avatarEmail).then(habits => {
        habitListToHtml(habits);
    })

}

function updateHabitsFilterList(tag){
    currentUser = readUserData();
    loadCards(habitsUrl+'/filter/'+tag+'/'+currentUser._avatarEmail).then(habit => {
        habitListToHtml(habit);
    })
}

updateHabitsList();