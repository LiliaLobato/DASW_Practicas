"use strict";

const MongoClient = require('mongodb').MongoClient;

let mongoUrl = 'mongodb://localhost:27017';
let options = { useNewUrlParser: true };

// Crear coleccion 'usuarios'
MongoClient.connect(mongoUrl, options, (err, client) => {
    if (err) throw err;
    console.log('Connected to MongoDB server');

    const db = client.db('UsuariosDB') // Creamos la DB de usuarios
    db.createCollection('usuarios', (err, res) => {
        if (err) throw err;
        console.log('Collection "usuarios" created!');
        client.close();
    });
})

// Insertar usuario 'Juan Perez'
let user = {
    "_uid": "7503822168",
    "_firstName": "Juan",
    "_lastName": "Perez",
    "_email": "juan.perez@iteso.mx",
    "_password": "ImpossibleToHack",
    "_date": "1980-10-10",
    "_sex": "H",
    "_image": "https://randomuser.me/api/portraits/men/62.jpg"
}

MongoClient.connect(mongoUrl, options, (err, client) => {
    if (err) throw err;
    const db = client.db('UsuariosDB')
    db.collection('usuarios').insertOne(user).then(() => client.close());
})

// Consultar usuario de nombre 'Juan'
MongoClient.connect(mongoUrl, options, (err, client) => {
    if (err) throw err;
    const db = client.db('UsuariosDB')
    let query = { _firstName: 'Juan'};
    db.collection('usuarios').findOne(query).then(result => {
        console.log(result);
        client.close();
    })
})
