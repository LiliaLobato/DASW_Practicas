"user strict";

// Nos conectamos a nuestra instancia local de MongoDB a traves de mongoose
const mongoose = require('mongoose');

let mongoDB = 'mongodb://localhost:27017/AlumnosDB';
mongoose.connect(mongoDB, { useNewUrlParser: true });

// Creamos el modelo de Alumno con un esquema especifico usando mongoose
let alumnoSchema = mongoose.Schema({
    nombre: String,
    edad: {
        type: Number,
        min: 18,
        max: 80,
        required: true
    },
    carrera: {
        type: String,
        enum: ['IE', 'ISC', 'IES', 'ISI'],
        required: true
    },
});
let Alumno = mongoose.model('alumno', alumnoSchema);

// Creamos un alumno nuevo
let newAlumno = {
    nombre: "Pepe G",
    edad: 35,
    carrera: "IES"
};
let alumno = Alumno(newAlumno);

// Guardamos el alumno en nuestra AlumnosDB
alumno.save().then((doc)=> console.log(doc));

// ------- Buscar Documentos -------

// Todos los documentos de la colección.
Alumno.find({}, (err, docs) => console.log(docs)); 

// Todos los documentos cuyo nombre inicie con 'Lor'
let data = "Lor";
Alumno.find({'nombre': new RegExp(data, 'i')}, (err, docs) => console.log(docs));

// Todos los documentos cuya edad sea >= 18
Alumno.find({edad:{$gte: 18}}, (err, docs) => console.log(docs));

// ------- Actualizar Documentos -------
Alumno.findOneAndUpdate({ nombre: 'Pepe G' }, { nombre: 'Lorena M' }, { new : true })
    .then((doc) => { console.log(doc) }) // si fue exitoso
	.catch((error) => { console.log(error) }); // si ocurre algún error

// ------- Borrar Documentos -------
Alumno.findByIdAndDelete("607cfbfe7e1770025cef6843", (err, doc) => { console.log(doc) });
