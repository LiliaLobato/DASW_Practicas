'use strict'
/* Ejemplo 1 */

let c = 10;

function sumaC (a) {
    return c + a;
}

c = 5;
c = sumaC(2);

console.log(c);


/* Ejemplo 2 */

function createTalker() {
    let greeting = "Hello world!";
    return function() {
        console.log(greeting);
    };
}

let greeting = "Hallo Welt!";

let greet = createTalker();

greet();

/* Ejemplo 3 */
(function () {
    let greeting = "Hello world!";

    console.log(greeting);
})();