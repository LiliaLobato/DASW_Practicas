/* Ejemplo 1 */

let Persona = {
    "Nombre": null,
    "Apellido": null,
    "Caminar": function () {
        console.log("La persona está caminando");
    }
};
let Estudiante = {
    "Carrera": null,
    "HacerTarea": function() {
        console.log("El estudiante está haciendo tarea");
    }
};
Estudiante.__proto__ = Persona;

/* Ejemplo 2 */


let Persona = {
    "Nombre": null,
    "Apellido": null,
    "Caminar": function () {
        console.log("La persona está caminando");
    }
};
function Estudiante(carrera) {
    this.Carrera = carrera;
    this.HacerTarea = function() {
        console.log("El estudiante está haciendo tarea");
    };
};
Estudiante.prototype = Persona;

let estudiante = new Estudiante('Mkt');


//__proto__ = Persona

function Persona() {
    this.Nombre = null;
    this.Apellido = null; 
};
Persona.prototype.Caminar = 
function () {
    console.log("La persona está caminando");
};
function Estudiante() {
    this.Carrera = null;
};
Estudiante.prototype.HacerTarea = function HacerTarea() {
    console.log("El estudiante está haciendo tarea");
};
Estudiante.prototype.__proto__ = Persona.prototype;
let estudiante = new Estudiante();
estudiante.Caminar();
estudiante.HacerTarea();
    