const express = require('express') // PARA LLAMAR AL MÓDULO EXPRESS
const router = express.Router(); // ESTE MÉTODO DEVUELVE UN OBJETO QUE VAMOS A UTILIZAR

// RECOGEMOS EL CONTROLADOR
const controllerJuego = require('../controllers/juegos.controller');



// SEGÚN EL TIPO DE PETICIÓN (GET,POST,PUT o DELETE) HAREMOS UNA PRIMERA REDIRECCIÓN
// Y DENTRO DE UN MISMO TIPO DE PETICIÓN COMO TODAS LAS BÚSQUEDAS POR GET, DIFERENCIAMOS POR LAS CABECERAS DE LA RUTA


/* GET */
router.get('/todos/:id', controllerJuego.getJuego);
router.get('/todos', controllerJuego.getJuegos);
router.get('/nombre/:nombre', controllerJuego.getJuegosBusqueda);
router.get('/genero/:genero', controllerJuego.getJuegosGenero);
router.get('/plataforma/:plataforma', controllerJuego.getJuegosPlataforma);
router.get('/lanzamiento/:lanzamiento', controllerJuego.getJuegosLanzamiento);
router.get('/stock', controllerJuego.getJuegosSinStock);
router.get('/numstock/:numstock', controllerJuego.getJuegosNumStock);
router.get('/letra/:letra', controllerJuego.getJuegosEmpPor);

/* POST */
router.post('/', controllerJuego.crearJuego);

/* PUT */
router.put('/:id', controllerJuego.editarJuego);

/* DELETE */
router.delete('/:id', controllerJuego.borrarJuego);

// TENEMOS QUE EXPORTAR EL MÓDULO PARA PODER UTILIZARLO EN EL INDEX
module.exports = router;
