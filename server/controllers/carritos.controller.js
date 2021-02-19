const controllerCarrito = {};

const Carrito = require('../models/carritos');



/* 
 ██████  ███████ ████████ 
██       ██         ██    
██   ███ █████      ██    
██    ██ ██         ██    
 ██████  ███████    ██    
*/
/* MÉTODO PARA RECOGER TODOS LOS CARRITOS */
controllerCarrito.getCarritos = async (req, res) => {
  const mostrarCarritos = await Carrito.find();
  console.log(mostrarCarritos)
  res.json(mostrarCarritos);
}

controllerCarrito.getCarritoUsuario = async (req, res) => {
  const mostrarCarrito = await Carrito.findOne({ idUsuario: req.params.idUsuario});
  console.log(mostrarCarrito)
  res.json(mostrarCarrito);
}


/* 
 █████  ██   ████████  █████  
██   ██ ██      ██    ██   ██ 
███████ ██      ██    ███████ 
██   ██ ██      ██    ██   ██ 
██   ██ ███████ ██    ██   ██ 
 */
/* MÉTODO PARA CREAR UN CARRITO */
controllerCarrito.crearCarrito = async (req, res) => {
  const nuevoCarrito = new Carrito(req.body);
  await nuevoCarrito.save();
  res.json({
    'status': 'CARRITO ALMACENADO CON EXITO'
  });
}



/* 
███████ ██████  ██ ████████ 
██      ██   ██ ██    ██    
█████   ██   ██ ██    ██    
██      ██   ██ ██    ██    
███████ ██████  ██    ██    
*/
/* MÉTODO PARA EDITAR CARRITO */
controllerCarrito.editarCarrito = async (req, res) => {
  const { id } = req.params;
  const editarCarrito = {
    idUsuario: req.body.idUsuario,
    idJuegos: req.body.idJuegos,
  }
  await Carrito.findByIdAndUpdate(id, { $set: editarCarrito }, { new: true });
  res.json('CARRITO ACTUALIZADO')
}



/* 
██████  ███████ ██      ███████ ████████ ███████ 
██   ██ ██      ██      ██         ██    ██      
██   ██ █████   ██      █████      ██    █████   
██   ██ ██      ██      ██         ██    ██      
██████  ███████ ███████ ███████    ██    ███████ 
*/
controllerCarrito.borrarCarrito = async (req, res) => {
  await Carrito.findByIdAndRemove(req.params.id);
  res.json('CARRITO ELIMINADO')
}

module.exports = controllerCarrito;