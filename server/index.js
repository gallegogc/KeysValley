////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////INICIALIZACIÓN DEL SERVIDOR////////////////////////
////////////////////////////////////////////////////////////////////////////////////

//INDEX.JS VA A INICIAR EL SERVIDOR

//CREAMOS UNA CONSTANTE CON EL MÓDULO DE EXPRESS QUE VAMOS A UTILIZAR POSTERIORMENTE
const express = require('express');
//CREAMOS UN OBJETO DE EXPRESS, ESTE OBJETO VA A CONTENER TODA LA FUNCIONALIDAD DEL SERVIDOR
const app = express();
//METODO LISTEN PARA PONER AL SERVIDOR A LA ESCUCHA DE LAS PETICIONES
//EL PRIMER PARÁMETRO ES EL PUERTO EN EL QUE QUEREMOS QUE ESCUCHE
const morgan = require('morgan');

//VENIMOS DE DATABASE.JS
const { mongoose } = require("./database");
const router = require('./routes/empleados.routes');
const router2 = require('./routes/juegos.routes');
const router3 = require('./routes/usuarios.routes');
const router4 = require('./routes/carritos.routes');
const router5 = require('./routes/compras.routes');


// PARA UTILIZAR CORS
const cors = require('cors');

// SETTINGS


// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json()); // PARA QUE EXPRESS ENTIENDA FORMATOS JSON
app.use(cors({origin:'http://localhost:4200'}));

// ROUTES
//app.use(require('./routes/empleados.routes')) // SIN .js AL FINAL
app.use('/api/empleados', require('./routes/empleados.routes'));
app.use('/api/juegos', require('./routes/juegos.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/carritos', require('./routes/carritos.routes'));
app.use('/api/compras', require('./routes/compras.routes'));

//INICIAMOS EL SERVIDOR
app.set('port', process.env.PORT || 3000); // LE DECIMOS QUE SE EJECUTE EN EL PUERTO QUE ESTÉ POR DEFECTO Y SINO EN EL 3000

app.listen(app.get('port'), () => {
  console.log("Servidor ejecutándose en el puerto " + app.get('port')) //HACEMOS UN LOG PARA COMPROBAR SI FUNCIONA 
}
);
//PARA EJECUTAR EL SERVIDOR EN LA CONSOLA: node server/index.js

//PODEMOS QUE COMPROBAR QUE FUNCIONA ACCEDIENDO EN CHROME A LOCALHOST:3000 (EN EL PUERTO 3000)

//VAMOS A DIVIDIR NUESTRA PARTE DEL SERVIDOR EN VARIAS PARTES