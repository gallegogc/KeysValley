// LLAMAMOS A MONGOOSE
const mongoose = require("mongoose");
// VAMOS A CREAR OTRA CONSTANTE QUE APUNTE A MONGO DB, VA A DAR EL NOMBRE A LA BD, SI NO EXISTE MONGO LA CREA
const URI = "mongodb://localhost/mean-crud";
// CONTECTAMOS A LA BASE DE DATOS
mongoose.connect(URI) 
// VAMOS A CREAR UNA PROMESA, DE FORMA QUE SI NO PODEMOS CONECTARNOS A LA BD, NOS LO ESPECIFIQUE
    .then(db => console.log("La BD está conectada."))
    .catch(err=> console.error(err));

    module.exports = mongoose;

// ESTO LO HACEMOS PARA PODER LLAMAR AL MÓDULO DESDE EL index.js
// VAMOS AL INDEX