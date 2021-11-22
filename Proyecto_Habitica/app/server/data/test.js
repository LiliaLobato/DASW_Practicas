//Añadimos 4 tags
console.log("Agregamos 3 tags");
createTag({"title":"Escuela"});
createTag({"title":"Deporte"});
createTag({"title":"Materia A"});
console.log(getTags());

//Añadimos 2 rewards
let RewA = {"title":"French Fries",
			"rewardImg":"./Objects/1.png",
			"price":25,
			"category":"health",
			"points":150};
let RewB = {"title":"Nuggets",
			"rewardImg":"./Objects/2.png",
			"price":25,
			"category":"experience",
			"points":150};
console.log("Agregamos 2 rewards");
createReward(RewA);
createReward(RewB);
console.log(getRewards());

//Añadimos 2 todos (equivalente a crear con enter)
console.log("Agregamos 2 todo");
createTodo({"title":"Terminar Tarea"});
createTodo({"title":"Enviar Documento"});
console.log(getTodos());
//Modificamos 1 todos (equivalente a editar con el modal)
let TodoA = {"title":"Terminar Tarea",
			"tagId":"",
			"status":"done",
			"difficulty":"hard",
			"date":"1998-06-13"};
updateTodo("todo1dcba4e2-aa26-43d5-ba5f-f87c48dd86a8",TodoA)
console.log(getTodos());

//Añadimos 2 dailies (equivalente a crear con enter)
console.log("Agregamos 2 dailies");
createDaily({"title":"Tomar Medicina"});
createDaily({"title":"Regar plantas"});
console.log(getDailies());
//Modificamos 1 daily (equivalente a editar con el modal)
let DailyA = {"title":"Regar plantas",
			"tagId":"",
			"status":"done",
			"difficulty":"hard",
			"streak":25,
			"validOn":['mon','fri']};
updateDaily("daily5eb8ba68-ea94-459f-8082-b1dd737e5a2a",DailyA);
console.log(getDailies());

//Añadimos 2 habits (equivalente a crear con enter)
console.log("Agregamos 2 habits");
createHabit({"title":"Días sin fumar"});
createHabit({"title":"Hacer ejercicio"});
console.log(getHabits());
//Modificamos 1 habits (equivalente a editar con el modal)
let HabitA = {"title":"Hacer ejercicio",
			"tagId":"",
			"status":"strong",
			"difficulty":"hard",
			"streak":25,
			"reset":"monthly",
			"bntCnt":['positive','negative']};
updateHabit("habitffe6fd7d-8906-453c-bad5-198174112534",HabitA);
console.log(getHabits());