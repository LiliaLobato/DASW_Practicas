"use strict";

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

const random = (min, max) =>  {
return Math.floor(Math.random() * (max - min) + min);
  };

function getTodayWeekDay(){
	const d = new Date();
	let day = d.getDay()
	switch(day){
		case 0:
			return 'mon';
			break;
		case 1:
			return 'tue';
			break;
		case 2:
			return 'wed';
			break;
		case 3:
			return 'thu';
			break;
		case 4:
			return 'fri';
			break;
		case 5:
			return 'sat';
			break;
		case 6:
			return 'sun';
			break;

	}

}
  
exports.getTodayWeekDay = getTodayWeekDay;
exports.generateId = generateId;
exports.getTodayDate = getTodayDate;
