"user strict";

// Nos conectamos a nuestra instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');

let mongoDB = 'mongodb://localhost:27017/UsersDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Creamos el modelo de Usuario con un esquema especifico usando mongoose
let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: Date,
    sex: {
        type: String,
        enum: ['M', 'H'],
        required: true
    },
    image: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'GUEST'],
        required: true
    },
});
let User = mongoose.model('user', userSchema);

// Creamos un usuario nuevo
let newUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    password: "doej",
    date: "2001-01-01",
    sex: "H",
    image: "https://randomuser.me/api/portraits/men/0.jpg",
    role: 'USER'
};
let user = User(newUser);

// Guardamos el usuario en nuestra UsersDB
user.save().then((doc)=> console.log(doc));

// ------- Buscar Documentos -------

// Todos los documentos de la colección.
User.find({}, (err, docs) => console.log(docs));

// Todos los documentos cuyo sexo sea 'H'
let data = 'H';
User.find({'sex': new RegExp(data, 'i')}, (err, docs) => console.log(docs));

// Documento con ID especifico
let id = '607d856be3eb074f98771652'
User.findById(id, (err, docs) => console.log(docs));

// ------- Actualizar Documentos -------
User.findOneAndUpdate({ firstName: 'John' }, { firstName: 'Phil' }, { new : true })
    .then((doc) => { console.log(doc) }) // si fue exitoso
	.catch((error) => { console.log(error) }); // si ocurre algún error

// ------- Borrar Documentos -------
User.findByIdAndDelete(id, (err, doc) => { console.log(doc) });
