const controllerJuego = {};

// RECOGEMOS EL SCHEMA, EL MODELO DE JUEGOS, QUE NECESITAMOS PARA REALIZAR LAS QUERIES
const Juego = require('../models/juegos');

// ESTA FUNCIÓN VA A HACER UNA PETICION SOBRE EL OBJETO SCHEMA, EL MODELO QUE HEMOS CREADO PREVIAMENTE

/* 
 ██████  ███████ ████████ 
██       ██         ██    
██   ███ █████      ██    
██    ██ ██         ██    
 ██████  ███████    ██    
*/

// MÉTODO QUE REALIZA LA QUERY A LA BD MONGO RECOGIENDO UN JUEGO POR SU ID
controllerJuego.getJuego = async (req, res) => {
  const mostrarJuego = await Juego.findById(req.params.id);
  console.log(mostrarJuego)
  res.json(mostrarJuego);
}

// MÉTODO QUE REALIZA LA QUERY A LA BD MONGO RECOGIENDO TODOS LOS JUEGOS
controllerJuego.getJuegos = async (req, res) => {
  const mostrarJuegos = await Juego.find().sort({ nombre: 1 }); // ORDENAMOS POR NOMBRE ASCENDENTE
  res.json(mostrarJuegos); // NOS DEVUELVE EL JSON CON LA INFORMACIÓN DE LOS JUEGOS
}

controllerJuego.getJuegosBusqueda = async (req, res) => {
  // SE INSTANCIA UN OBJETO REGEX PARA BUSCAR POR PATTERN
  const mostrarJuegosBusqueda = await Juego.find({ nombre: new RegExp(req.params.nombre, "i") }).sort({ nombre: 1 });
  console.log(mostrarJuegosBusqueda)
  res.json(mostrarJuegosBusqueda);
}

// MÉTODO QUE REALIZA LA QUERY A LA BD MONGO RECOGIENDO TODOS LOS JUEGOS CUYO GÉNERO SE INDIQUE COMO PARÁMETRO
controllerJuego.getJuegosGenero = async (req, res) => {
  const mostrarJuegosGenero = await Juego.find({ genero: req.params.genero }).sort({ nombre: 1 });
  console.log(mostrarJuegosGenero)
  res.json(mostrarJuegosGenero);
};

// MÉTODO QUE REALIZA LA QUERY A LA BD MONGO RECOGIENDO TODOS LOS JUEGOS CUYA PLATAFORMA SE INDIQUE COMO PARÁMETRO
controllerJuego.getJuegosPlataforma = async (req, res) => {
  const mostrarJuegosPlataforma = await Juego.find({ plataforma: req.params.plataforma }).sort({ nombre: 1 });
  console.log(mostrarJuegosPlataforma)
  res.json(mostrarJuegosPlataforma);
};

// MÉTODO QUE REALIZA LA QUERY A LA BD MONGO RECOGIENDO TODOS LOS JUEGOS CON AÑO MÍNIMO PASADO COMO PARÁMETRO
// Y MÁXIMO EL INDICADO + 9
controllerJuego.getJuegosLanzamiento = async (req, res) => {
  let max = parseInt(req.params.lanzamiento) + 9;
  console.log(req.params.lanzamiento + "-" + max)
  const mostrarJuegosLanzamiento = await Juego.find({
    lanzamiento: { $lte: max, $gte: req.params.lanzamiento }
  }).sort({ lanzamiento: -1, nombre: 1 });
  /* ORDENAMOS POR LANZAMIENTO DESCENDENTE Y POR NOMBRE ASCENDENTE*/
  console.log(mostrarJuegosLanzamiento)
  res.json(mostrarJuegosLanzamiento);
};

// MÉTODO QUE REALIZA LA QUERY A LA BD MONGO RECOGIENDO TODOS LOS JUEGOS DE STOCK 0
// AUNQUE NO UTILICEMOS NINGÚN PARÁMETRO req NO PUEDE ELIMINARSE YA QUE ASÍ ESTÁ DEFINIDA LA FUNCIÓN
controllerJuego.getJuegosSinStock = async (req, res) => {
  const mostrarJuegosSinStock = await Juego.find({ stock: 0 }).sort({ nombre: 1 });
  console.log(mostrarJuegosSinStock)
  res.json(mostrarJuegosSinStock);
};

controllerJuego.getJuegosNumStock = async (req, res) => {
  console.log(req.params.numstock)
  const mostrarJuegosSinStock = await Juego.find({ stock: { $lte: 99, $gte: req.params.numstock } }).sort({ stock: 1 });
  console.log(mostrarJuegosSinStock)
  res.json(mostrarJuegosSinStock);
};

controllerJuego.getJuegosEmpPor = async (req, res) => {
  const mostrarJuegosEmpPor = await Juego.find({ nombre: new RegExp(req.params.letra, "u")}).sort({ nombre: 1 });
  res.json(mostrarJuegosEmpPor); 
}

/* 
 █████  ██   ████████  █████  
██   ██ ██      ██    ██   ██ 
███████ ██      ██    ███████ 
██   ██ ██      ██    ██   ██ 
██   ██ ███████ ██    ██   ██ 
 */
controllerJuego.crearJuego = async (req, res) => {
  const nuevoJuego = new Juego(req.body);
  await nuevoJuego.save();
  res.json({
    'status': 'JUEGO ALMACENADO CON EXITO'
  });
}


/* 
███████ ██████  ██ ████████ 
██      ██   ██ ██    ██    
█████   ██   ██ ██    ██    
██      ██   ██ ██    ██    
███████ ██████  ██    ██    
*/
controllerJuego.editarJuego = async (req, res) => {
  const { id } = req.params;
  const editarJuego = { // CONSTANTE QUE RECOGE LOS DATOS A EDITAR
    nombre: req.body.nombre,
    genero: req.body.genero,
    desarrolladora: req.body.desarrolladora,
    plataforma: req.body.plataforma,
    lanzamiento: req.body.lanzamiento,
    resena: req.body.resena,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen
  }
  await Juego.findByIdAndUpdate(id, { $set: editarJuego }, { new: true }); // EN CASO DE QUE EL USUARIO NO EXISTIESE, CREA UNO NUEVO CON new:true
  res.json('JUEGO ACTUALIZADO')
}

/* 
██████  ███████ ██      ███████ ████████ ███████ 
██   ██ ██      ██      ██         ██    ██      
██   ██ █████   ██      █████      ██    █████   
██   ██ ██      ██      ██         ██    ██      
██████  ███████ ███████ ███████    ██    ███████ 
*/
controllerJuego.borrarJuego = async (req, res) => {
  await Juego.findByIdAndRemove(req.params.id);
  res.json('JUEGO ELIMINADO')
}

// Y EXPORTAMOS LOS QUE NOS INTERESAN
module.exports = controllerJuego;


