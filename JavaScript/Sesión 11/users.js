"use strict";

// Implementa la clase User
class User {
    constructor(uid, nombre, apellidos, email, password, fecha, sexo, imagen) {
        this.uid = uid
        this.nombre = nombre
        this.apellidos = apellidos
        this.email = email
        this.password = password
        this.fecha = fecha
        this.sexo = sexo
        this.imagen = imagen
    }

    get uid() {
        return this._uid;
    }
    set uid(val) {
        this._uid = val;
    }

    get nombre() {
        return this._nombre;
    }
    set nombre(val) {
        this._nombre = val;
    }

    get apellidos() {
        return this._apellidos;
    }
    set apellidos(val) {
        this._apellidos = val;
    }

    get email() {
        return this._email;
    }
    set email(val) {
        this._email = val;
    }

    get password() {
        return this._password;
    }
    set password(val) {
        this._password = val;
    }

    get fecha() {
        return this._fecha;
    }
    set fecha(val) {
        this._fecha = val;
    }

    get sexo() {
        return this._sexo;
    }
    set sexo(val) {
        this._sexo = val;
    }

    get imagen() {
        return this._imagen;
    }
    set imagen(val) {
        this._imagen = val;
    }
}

// Ejercicio 1
const users = [];

users.push(generateUser('Juan', 'Perez', 'juan.perez@iteso.mx', 'ImpossibleToHack', '1980-10-10', 'H'));
users.push(generateUser('Diego', 'Lopez', 'diego.lopez@iteso.mx', 'BestPassword', '1993-02-06', 'H'));
users.push(generateUser('Diana', 'Gomez', 'diana.gomez@iteso.mx', 'pass1234', '1991-12-08', 'M'));

console.table(users);
console.log(JSON.stringify(users));

users.length = 1;

console.table(users);

function generateUser(nombre, apellidos, email, password, fecha, sexo, imagen) {
    let uid = generateUid(10);
    if (!imagen) {
        imagen = generateImgUrl(uid, sexo);
    }
    return new User(uid, nombre, apellidos, email, password, fecha, sexo, imagen);
}

function generateUid(len) {
    let uid = '';
    for (let i = 0; i < len; i++) {
        uid += Math.trunc(Math.random() * 10);
    }
    return uid;
}

function generateImgUrl(uid, sexo) {
    if (sexo == 'H') {
        return 'https://randomuser.me/api/portraits/men/' + (uid % 100) + '.jpg';
    } else {
        return 'https://randomuser.me/api/portraits/women/' + (uid % 100) + '.jpg';
    }
}

// Ejercicio 2
function addUser(nombre, apellidos, email, password, fecha, sexo, imagen) {
    if (isUserValid(nombre, apellidos, email)) {
        let newUser = generateUser(nombre, apellidos, email, password, fecha, sexo, imagen);
        users.push(newUser);
    }
}

function isUserValid(nombre, apellidos, email) {
    if (users.find(user => user.nombre == nombre && user.apellidos == apellidos)) return false;
    if (users.find(user => user.email == email)) return false;
    return true;
}

addUser('Juan', 'Perez', 'juan.perez@iteso.mx', 'ImpossibleToHack', '1980-10-10', 'H');
addUser('Eduardo', 'Perez', 'juan.perez@iteso.mx', 'ImpossibleToHack', '1980-10-10', 'H');
addUser('Eduardo', 'Perez', 'eduardo.perez@iteso.mx', 'ImpossibleToHack', '1980-10-10', 'H');

console.table(users);

// Ejercicio 3
function updateUser(uid, userInfo) {
    if (!users.find(user => user.uid == uid)) {
        return;
    }
    for (let property in userInfo) {
        if (['nombre', 'apellidos', 'password', 'fecha', 'sexo', 'imagen'].includes(property)) continue;
        delete userInfo[property];
    }
    let index = users.findIndex(user => user.uid == uid);
    Object.assign(users[index], userInfo);
}

function deleteUser(uid) {
    if (!users.find(user => user.uid == uid)) {
        return;
    }
    let index = users.findIndex(user => user.uid == uid);
    users.splice(index, 1);
}

updateUser(users[0].uid, {
    uid: users[0].uid,
    apellidos: 'Lopez',
    email: 'juan.lopex@iteso.mx',
    foo: 'bar'
});

deleteUser(users[1].uid);
console.table(users);

// Ejercicio 4
let arrUsers = [];

for (let i = 0; i < 10; i++) {
    let newUser = generateUser('Nombre ' + i, 'Apellido ' + i, `correo${i}@gmail.com`, 'pass' + i, `199${i}-01-01`, Math.random() > 0.5 ? 'H' : 'M');
    arrUsers.push(newUser);
}

function sortUsers(users, cb) {
    return [...users].sort(cb);
    // return users.sort(cb);
}

let sortByLastName = (user1, user2) => {
    if (user1.apellidos.toUpperCase() < user2.apellidos.toUpperCase()) return -1;
    if (user1.apellidos.toUpperCase() > user2.apellidos.toUpperCase()) return 1;
    return 0;
}

let sortByEmail = (user1, user2) => {
    if (user1.email < user2.email) return 1;
    if (user1.email > user2.email) return -1;
    return 0;
}

console.table(sortUsers(arrUsers, sortByLastName));
console.table(sortUsers(arrUsers, sortByEmail));

arrUsers.forEach((value) => console.log(`${value.uid}-${value.email}`));

console.log(arrUsers.map((value, index) => `${index}->${value.nombre}`).join(","));