"use strict";

let userContainer = document.getElementById('userList');
const usersUrl = 'http://localhost:3000/api/users/';

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
                <a onclick="preloadEditModal('${user.email}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#editModal"><i class="fas fa-pencil-alt"></i></a>
            </div>
            <div class="row">
                <a onclick="preloadDeleteModal('${user.email}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#deleteModal"><i class="fas fa-trash-alt"></i></i></a>
            </div>
        </div>
    </div>
    `
}

function usersToHTML(users) {
    userContainer.innerHTML = users.map(userToHTML).join("\n");
}

async function preloadEditModal(email) {
    let user = await loadUsers(usersUrl + email);
    user = User.generateUser(user);

    document.getElementById('emailEditModal').value = email;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('userDate').value = user.date;
    if (user.sex == 'H') {
        document.getElementById('checboxMale').checked = true;
        document.getElementById('checboxFemale').checked = false;
    } else {
        document.getElementById('checboxMale').checked = false;
        document.getElementById('checboxFemale').checked = true;
    }
    document.getElementById('userUrl').value = user.image;
}

function preloadDeleteModal(email) {
    document.getElementById('emailDeleteModal').value = email;
}

function editUser() {
    let user = {};
    
    user.email = document.getElementById('emailEditModal').value;    
    user.firstName = document.getElementById('firstName').value;
    user.lastName = document.getElementById('lastName').value;
    user.date = document.getElementById('userDate').value;
    user.sex = document.getElementById('checboxMale').checked ? 'H' : 'M';
    user.image = document.getElementById('userUrl').value;

    putUser(usersUrl + user.email, user, (msg) => console.log(msg), (err) => console.log(err));
}

function removeUser() {
    let email = document.getElementById('emailDeleteModal').value;
    deleteUser(usersUrl + email, (msg) => console.log(msg), (err) => console.log(err));
}