"use strict";

// ------- Ejercicio 1 -------

function generarReporte(user, grade, passingFn, failingFn) {
    if (grade >= 60) {
        passingFn(user);
    } else {
        failingFn(user);
    }
}

function failed(user) {
    console.log(`User ${user} failed`);
}

function passed(user) {
    console.log(`User ${user} passed`);
}

let failed2 = function(user) {
    console.log(`Failed: User ${user}`);
}

let passed2 = function(user) {
    console.log(`Passed: User ${user}`);
}

generarReporte("Juan Perez", 50, passed, failed);
generarReporte("Eduardo Lopez", 70, passed2, failed2);
generarReporte("Jose Garcia", 60,
    function(user) {
        console.log(`El usuario ${user} aprobo la materia`);
    },
    function(user) {
        console.log(`El usuario ${user} reprobo la materia`);
    }
);
generarReporte("Luis Ramos", 0,
    (user) => console.log(`Usuario ${user} aprobado`),
    (user) => console.log(`Usuario ${user} reprobado`)
);
