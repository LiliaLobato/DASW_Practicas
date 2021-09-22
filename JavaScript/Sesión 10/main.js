// Crear un objeto con la información de un usuario {uid, nombre, apellidos, email, password, fecha, sexo, imagen}
let user1 = {
    uid: '1234567890',
    nombre: 'Juan',
    apellidos: 'Perez',
    email: 'juan.perez@iteso.mx',
    password: 'ImpossibleToHack',
    fecha: '10/10/1980',
    sexo: 'H',
    imagen: 'https://randomuser.me/api/portraits/men/0.jpg'
};
console.log(user1);

// Implementa una función generadora de usuarios (usar el método resumido)
function crearUsuario(uid, nombre, apellidos, email, password, fecha, sexo, imagen) {
    return {
        uid,
        nombre,
        apellidos,
        email,
        password,
        fecha,
        sexo,
        imagen
    }
}

// pruébala
let user2 = crearUsuario('2222222222', 'Diego', 'Lopez', 'diego.lopez@iteso.mx', 'BestPassword', '02/06/1993', 'H', 'https://randomuser.me/api/portraits/men/10.jpg');
console.log(user2);

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

// pruébala
let user3 = new User('0987654321', 'Diana', 'Gomez', 'diana.gomez@iteso.mx', 'pass1234', '12/08/1991', 'M', 'https://randomuser.me/api/portraits/women/0.jpg');

console.log(user3);

// Muestra todas las propiedades del Usuario
for (let key in user3) {
    console.log(`${key}: ${user3[key]}`);
}

// Crea una función que indique si un objeto recibido tiene o no alguna
// propiedad y de tenerla mostrar el valor de esa propiedad
user2.hasOwnProperty('apellidos');
user3.hasOwnProperty('_apellidos');
'apellidos' in user2;

function checarPropiedad(obj, prop) {
    if (obj[prop] !== undefined) {
        console.log(obj[prop]);
    }
    // if (prop in obj) {
    //     console.log(obj[prop]);
    // }
    // if (obj.hasOwnProperty(prop)) {
    //     console.log(obj[prop]);
    // }
}

checarPropiedad(user2, 'apellidos');
checarPropiedad(user3, '_apellidos');



