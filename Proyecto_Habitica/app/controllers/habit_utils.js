"use strict";

let textboxHabit = document.getElementById('textboxHabit');

textboxHabit.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    	//document.getElementById("myFormID").submit();
        event.preventDefault();
    	console.log("enter")
		return false;
    }
    console.log("im out")
});

function createHabit(){

}

function editHabit(){

}

function loadUserHabit(){

}