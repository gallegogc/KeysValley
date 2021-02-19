const express = require('express') 
const router = express.Router(); 

const controllerCarrito = require('../controllers/carritos.controller');

// TIPOS DE PETICIONES PARA CARRITO

router.get('/todos', controllerCarrito.getCarritos);

router.get('/usuario/:idUsuario', controllerCarrito.getCarritoUsuario);

router.post('/', controllerCarrito.crearCarrito);

router.put('/:id', controllerCarrito.editarCarrito);

router.delete('/:id', controllerCarrito.borrarCarrito);

// TENEMOS QUE EXPORTAR EL MÓDULO PARA PODER UTILIZARLO EN EL INDEX
module.exports = router;
