const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const password = "12345";

let encryptedPassword = bcrypt.hashSync(password, 10);

console.log(encryptedPassword);

let hash = '$2b$10$TQLUbLn6jGDHAjLzxhzVW.Obohto9jsNprUQmw2rD7ww/AeYME61W';

console.log(bcrypt.compareSync(password, hash));

let token = jwt.sign({userId: 123, nombre: 'Jorge'}, 'ABC123#');
console.log(token);

let prevToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibm9tYnJlIjoiSm9yZ2UiLCJpYXQiOjE2MTkwNjg4MDB9.ePUTJkgck58TwSyCJtxVv45KHRtRUcgBW-2EDF_kaG8'

jwt.verify(prevToken, 'ABC123#', (err, decoded) => {
    if(err) {
        console.log('Error');
        console.log(err);
    }
    else {
        console.log(decoded);
    }
});