"use strict";

// Imprimir Holas
for (let i in [1, 2, 3, 4, 5]) {
    setTimeout(() => console.log("Hola" + i), i * 1000);
}

// for (let i = 1; i <= 5; i++) {
//     setTimeout(() => console.log("Hola" + i), i * 1000);
// }

// Imprimir Mundos
for (let i in [1, 2, 3, 4]) {
    setTimeout(() => console.log("Mundo" + i), 1000);
}