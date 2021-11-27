"use strict";

var days = ['mon','tue','wed','thu','fri','sat','sun'];

function generateId(val){
	return val+'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{
		let r=Math.random()*16|0;
		let v=c=='x'?r:(r&0x3|0x8);
		return v.toString(16);
	});
}

function getTodayDate(){
	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	return date;
}
function getYesterdayDate(){
	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1);
	return date;
}

const random = (min, max) =>  {
return Math.floor(Math.random() * (max - min) + min);
  };

function toDate(dateStr) {
  return new Date(dateStr)
}
