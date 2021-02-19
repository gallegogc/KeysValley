const controllerCompra = {};

const Compra = require('../models/compras');


/* 
 ██████  ███████ ████████ 
██       ██         ██    
██   ███ █████      ██    
██    ██ ██         ██    
 ██████  ███████    ██    
*/
/* MÉTODO QUE DEVUELVE TODAS LAS COMPRAS: PARA LISTA-VENTAS */
controllerCompra.getCompras = async (req, res) => {
  const mostrarCompras = await Compra.find();
  res.json(mostrarCompras);
}

/* MÉTODO QUE DEVUELVE LAS COMPRAS DE UN USUARIO POR ID, PARA LISTA-COMPRAS */
controllerCompra.getComprasUsuario = async (req, res) => {
  const mostrarComprasUsuario = await Compra.find({ idUsuario: req.params.idUsuario });
  console.log(mostrarComprasUsuario)
  res.json(mostrarComprasUsuario);
};



/* 
 █████  ██   ████████  █████  
██   ██ ██      ██    ██   ██ 
███████ ██      ██    ███████ 
██   ██ ██      ██    ██   ██ 
██   ██ ███████ ██    ██   ██ 
 */
/* MÉTODO PARA CREAR COMPRAS: CUANDO SE FORMALIZA EL CARRITO Y SE PROCEDE A REALIZAR LA COMPRA */
controllerCompra.crearCompra = async (req, res) => {
  const nuevoCompra = new Compra(req.body);
  await nuevoCompra.save();
  res.json({
    'status': 'COMPRA ALMACENADA CON EXITO'
  });
}


controllerCompra.borrarCompra = async (req, res) => {
  await Juego.findByIdAndRemove(req.params.id);
  res.json('COMPRA ELIMINADO')
}


// Y EXPORTAMOS LOS QUE NOS INTERESAN
module.exports = controllerCompra;