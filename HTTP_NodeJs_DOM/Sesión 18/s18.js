"use strict";

let userContainer = document.getElementById('userList');

function userToHTML(user) {
    return `
    <div class="media col-12 mt-2">
        <div class="media-left align-self-center mr-3">
            <img src="${user.image}">
        </div>
        <div class="media-body">
            <h4>${user.firstName} ${user.lastName}</h4>
            <p>Correo: ${user.email}</p>
            <p>Fecha de nacimiento: ${user.date}</p>
            <p>Sexo: ${user.sex}</p>
        </div>
        <div class="media-right align-self-center">
            <div class="row">
                <a href="#" class="btn btn-primary"><i class="fas fa-search"></i></a>
            </div>
            <div class="row">
                <a href="#" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt"></i></a>
            </div>
            <div class="row">
                <a href="#" class="btn btn-primary mt-2"><i class="fas fa-trash-alt"></i></i></a>
            </div>
        </div>
    </div>
    `
}

function userListToHTML(userList) {
    userContainer.innerHTML = userList.map(userToHTML).join("\n");
}

const users = [];

users.push(generateUser('Juan', 'Perez', 'juan.perez@iteso.mx', 'ImpossibleToHack', '1980-10-10', 'H'));
users.push(generateUser('Diego', 'Lopez', 'diego.lopez@iteso.mx', 'BestPassword', '1993-02-06', 'H'));
users.push(generateUser('Diana', 'Gomez', 'diana.gomez@iteso.mx', 'pass1234', '1991-12-08', 'M'));

userListToHTML(users);

userContainer.querySelectorAll('img').forEach(img => img.className = 'rounded-circle');