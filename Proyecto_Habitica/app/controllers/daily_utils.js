"use strict";

let textboxDaily = document.getElementById('textboxDaily');
let dailycontainer = document.getElementById('dailyList');
let titleDailyModal = document.getElementById('titleDailyModal');
let difficultyDailyModal = document.getElementById('difficultyDailyModal');
let studyDailyCheckboxModal = document.getElementById('studyDailyCheckboxModal');
let workDailyCheckboxModal = document.getElementById('workDailyCheckboxModal');
let healthDailyCheckboxModal = document.getElementById('healthDailyCheckboxModal');
let personalDailyCheckboxModal = document.getElementById('personalDailyCheckboxModal');
let DailyId = document.getElementById('DailyId');
let monDaily = document.getElementById('monDaily');
let tueDaily = document.getElementById('tueDaily');
let wedDaily = document.getElementById('wedDaily');
let thuDaily = document.getElementById('thuDaily');
let friDaily = document.getElementById('friDaily');
let satDaily = document.getElementById('satDaily');
let sunDaily = document.getElementById('sunDaily');
let validOnModal = [];

function dailyToHtml(daily){
    let statusBnt = "good";
    let statusBadge = "badge-info";
    if(daily._counter <= 0){
        statusBnt = "bad" 
        statusBadge = "badge-danger"; 
    }
    if (daily._completed){
        statusBnt = "done disabled"
        statusBadge = "badge-secondary"; 
    }
    return `    
        <li style="list-style-type:none;" class=" mb-1" >
            <ul class="list-group list-group-horizontal">
	            <li class="list-group-item check_list d-flex justify-content-between align-items-center p-2 dayBtn_list ${statusBnt}">
	              <a class="btn dayBnt btn-lg ${statusBnt}" role="button" onclick="dailyDone(this.id)" id="${daily._id}"><i class="fa fa-check" aria-hidden="true"></i></a>
	            </li>
                <span class="d-none"> ${daily._id}</span>
	            <li class="list-group-item text_list d-flex justify-content-between align-items-center" id="${daily._id}"
                    data-toggle="modal" data-target="#daily_modal" onclick="preloadDailyModal(this.id)">
	              <p>${daily._title}</p>
	              <span class="badge ${statusBadge} badge-pill ml-2">
	                <i class="fa fa-forward" aria-hidden="true"></i> ${daily._counter}</span>
	            </li>  
            </ul>
    	</li>
    `;
}

function dailyListToHtml(dailyList){
	dailyList = dailyList.map(updateDate); //marca como completado si el daily no es valido hoy
  	dailycontainer.innerHTML =  dailyList.map(dailyToHtml).join('\n');
}

textboxDaily.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    	
        if(textboxDaily.value !== ''){
            event.preventDefault();
            currentUser = readUserData();
            createDaily({
                "_userEmail": currentUser._avatarEmail,
                "_title": textboxDaily.value
            })
            let filter = readTagFilter();
            if(filter.filter == 'all'){
                updateDailyList();
            }
            else{
                updateDailyFilterList(filter.filter);
            }
            textboxDaily.value = '';
        }
		return false;
    }
});

function addDay(id){
    let currentDay = document.getElementById(id);
    let idNotWanted = "Daily";
    let dayId = id.substr(0,id.indexOf(idNotWanted))
    if (currentDay.classList.contains("btn-light")){
        currentDay.classList.remove("btn-light");
        currentDay.classList.add("btn-warning");
        validOnModal.push(dayId);
    } else {
        currentDay.classList.add("btn-light");
        currentDay.classList.remove("btn-warning");
        for (let day in validOnModal){ 
            if(validOnModal[day] == dayId){
                validOnModal.splice(day,1);
                break;
            }
        }
    }
}

function noDaySellected(){
    validOnModal = [];
    monDaily.classList.remove("btn-warning");
    tueDaily.classList.remove("btn-warning");
    wedDaily.classList.remove("btn-warning");
    thuDaily.classList.remove("btn-warning");
    friDaily.classList.remove("btn-warning");
    satDaily.classList.remove("btn-warning");
    sunDaily.classList.remove("btn-warning");
    monDaily.classList.add("btn-light");
    tueDaily.classList.add("btn-light");
    wedDaily.classList.add("btn-light");
    thuDaily.classList.add("btn-light");
    friDaily.classList.add("btn-light");
    satDaily.classList.add("btn-light");
    sunDaily.classList.add("btn-light");
}

function selectDay(selectedDays){
    for (let day in selectedDays){
        addDay(selectedDays[day]+"Daily")
    }
}

function TagSellectedDaily(){
    if (studyDailyCheckboxModal.checked==true) return 'study';
    else if (workDailyCheckboxModal.checked==true) return 'work';
    else if (healthDailyCheckboxModal.checked==true) return 'health';
    else if (personalDailyCheckboxModal.checked==true) return 'personal';
    else return ''
}

function noTagSellectedDaily(){
    studyDailyCheckboxModal.checked=false;
    workDailyCheckboxModal.checked=false;
    healthDailyCheckboxModal.checked=false;
    personalDailyCheckboxModal.checked=false;
}

function selectTagDaily(tag){
    switch(tag){
        case 'study':
            studyDailyCheckboxModal.checked=true;
            break;
        case 'work':
            workDailyCheckboxModal.checked=true;
            break;
        case 'health':
            healthDailyCheckboxModal.checked=true;
            break;
        case 'personal':
            personalDailyCheckboxModal.checked=true;
            break;
        default:
            break;
    }
}

function preloadDailyModal(id){
    //obtenemos la información del habito
    loadCards(dailyUrl+'/ById/'+id).then(daily => {
        //habitListToHtml(daily);
        let currentDaily = daily;
        //obtenemos los valores actuales del habito
        difficultyDailyModal.value=currentDaily._difficulty;
        titleDailyModal.value = currentDaily._title;
        noTagSellectedDaily();
        noDaySellected();
        selectTagDaily(currentDaily._tag);
        selectDay(daily._validOn[0].slice(daily._validOn[0].indexOf("\n") + 1).split(","))
        DailyId.innerText = id;
    })
}

function editDaily(){
    loadCards(dailyUrl+'/ById/'+DailyId.innerText).then(habits => {
        //habitListToHtml(habits);
        let currentDaily = habits;
        //solamente cambiamos los atributo que pueden cambiar
        currentDaily._difficulty = difficultyDailyModal.value;
        currentDaily._title = titleDailyModal.value;
        currentDaily._tag = TagSellectedDaily();
        console.log(currentDaily)
        currentDaily._validOn = validOnModal;
        putCards(dailyUrl+'/ById/'+DailyId.innerText, currentDaily, (msg) => console.log(msg), (err) => console.log(err));
        let filter = readTagFilter();
        if(filter.filter == 'all'){
            updateDailyList();
        }
        else{
            updateDailyFilterList(filter.filter);
        }
    })
}

function checkDate(daily){
	let updatedAt_Date = toDate(daily._updatedAt);
	let today_Date = toDate(getTodayDate());
	return today_Date.getTime() > updatedAt_Date.getTime();
}

function doneYesterday(daily){
    let updatedAt_Date = toDate(daily._updatedAt);
    let yesterday_Date = toDate(getYesterdayDate());
    return yesterday_Date.getTime() == updatedAt_Date.getTime();
}

function updateDate(daily){
	let today_Date = toDate(getTodayDate());
	let updatedAt_Date = toDate(daily._updatedAt);
	let today_dow = days[ today_Date.getDay() ];
	let validOnArray = daily._validOn[0].slice(daily._validOn[0].indexOf("\n") + 1).split(",");
    //revisa si hoy es un día valido y si ayer se hizo => reinicia daily
    if (validOnArray.includes(today_dow) && doneYesterday(daily)){
        daily._validOn = validOnArray;
        daily._completed = false; 
        putCards(dailyUrl+'/ById/'+daily._id, daily, (msg) => console.log(msg), (err) => console.log(err));
    }
    //revisa si hoy es un día válido y si está atrasada la fecha => usuario olvidó hacer daily
	else if(validOnArray.includes(today_dow) && checkDate(daily)) {
        daily._counter = 0;
        daily._validOn = validOnArray;
        daily._completed = false; 
        putCards(dailyUrl+'/ById/'+daily._id, daily, (msg) => console.log(msg), (err) => console.log(err));
        //TODO NARDA
        let lostCoins = calculatePoints(currentDaily._difficulty);
        reduceCoins(lostCoins);
        //calculamos la cantidad de monedas que pierde
        //updateUser(user); //le restamos vida
    }
	// reviso si hoy no es un dia valido => usuario no tiene que hacer daily hoy
	if(!validOnArray.includes(today_dow) && daily._completed != true){
		//si no es valido, marco que el date ya se completo y actualizo la fecha
		daily._updatedAt = getTodayDate();
		daily._completed = true;
		daily._validOn = validOnArray;
		putCards(dailyUrl+'/ById/'+daily._id, daily, (msg) => console.log(msg), (err) => console.log(err));
	}
	return daily;
}

function updateDates(){
    currentUser = readUserData();
    loadCards(dailyUrl+'/'+currentUser._avatarEmail).then(daily => {
        daily.map(updateDate) //marca como completado si el daily no es valido hoy
    })
}

function dailyDelete(){
    deleteCards(dailyUrl+'/ById/'+DailyId.innerText, (msg) => console.log(msg), (err) => console.log(err));
    let filter = readTagFilter();
    if(filter.filter == 'all'){
        updateDailyList();
    }
    else{
        updateDailyFilterList(filter.filter);
    }
}

function updateDailyList(){
    currentUser = readUserData();
    loadCards(dailyUrl+'/'+currentUser._avatarEmail).then(daily => {
        dailyListToHtml(daily);
        //console.log(daily)
    })
}

function updateDailyFilterList(tag){
    currentUser = readUserData();
    loadCards(dailyUrl+'/filter/'+tag+'/'+currentUser._avatarEmail).then(daily => {
        dailyListToHtml(daily);
        //console.log(daily)
    })
}

function dailyDone(id){
    //obtenemos la información del habito
    loadCards(dailyUrl+'/ById/'+id).then(daily => {
        //habitListToHtml(daily);
        let validOnArray = daily._validOn[0].slice(daily._validOn[0].indexOf("\n") + 1).split(",");
        let currentDaily = daily;
        //solamente cambiamos el atributo de counter
        currentDaily._counter = daily._counter + 1;
        currentDaily._updatedAt = getTodayDate();
        currentDaily._completed = true;
        currentDaily._validOn = validOnArray;
        console.log(currentDaily)
        putCards(dailyUrl+'/ById/'+id, daily, (msg) => console.log(msg), (err) => console.log(err));
        
        let filter = readTagFilter();
        if(filter.filter == 'all'){
            updateDailyList();
        }
        else{
            updateDailyFilterList(filter.filter);
        }

        let gainedPoints = calculatePoints(currentDaily._difficulty);
        addCoins(gainedPoints);
    })
}
function filterDailies(id){
    console.log(id);
}

updateDailyList();