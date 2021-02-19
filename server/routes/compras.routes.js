const express = require('express') 
const router = express.Router(); 
const controllerCompra = require('../controllers/compras.controller');


// TIPOS DE PETICIONES PARA COMPRAS

/* GET */

/* DEVUELVE TODAS LAS COMPRAS */
router.get('/todos', controllerCompra.getCompras);
/* DEVUELVE LAS COMPRAS DE UN USUARIO */
router.get('/todos/:idUsuario', controllerCompra.getComprasUsuario);

/* POST */
/* CREA UNA COMPRA DE UN USUARIO */
router.post('/', controllerCompra.crearCompra);

router.delete('/:id', controllerCompra.borrarCompra);


// TENEMOS QUE EXPORTAR EL MÓDULO PARA PODER UTILIZARLO EN EL INDEX
module.exports = router;
