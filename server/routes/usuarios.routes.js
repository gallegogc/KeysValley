const express = require('express') // PARA LLAMAR AL MÓDULO EXPRESS
const router = express.Router(); // ESTE MÉTODO DEVUELVE UN OBJETO QUE VAMOS A UTILIZAR

const controllerUsuario = require('../controllers/usuarios.controller');

/* GET */
router.get('/todos/:id', controllerUsuario.getUsuario);
router.get('/todos', controllerUsuario.getUsuarios);

/* POST */
router.post('/', controllerUsuario.crearUsuario);

/* PUT */
router.put('/:id', controllerUsuario.editarUsuario);

/* DELETE */
router.delete('/:id', controllerUsuario.borrarUsuario);

module.exports = router;

