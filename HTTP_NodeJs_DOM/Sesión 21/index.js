"use strict";

function displayUsers() {
    loadUsers(usersUrl).then(users => {
        usersToHTML(users.map(User.generateUser));
    });
}

let ximenaUser = new User("Ximena", "Ruis", "ximena.ruiz@iteso.mx", "BestPassword2", "1997-08-08", "M");

function addUser(user) {
    storeUser(usersUrl, user, (msg) => {
        console.log(msg);
        displayUsers();
    }, (err) => console.log(err));
}

displayUsers();