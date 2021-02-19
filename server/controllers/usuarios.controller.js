const controllerUsuario = {};

//HAY QUE LLAMAR AL SCHEMA DE LA BD Y TRABAJAR CON ÉL
const Usuario = require('../models/usuarios'); // ES EL SCHEMA DE LA BD EN UN OBJETO


/* 
 ██████  ███████ ████████ 
██       ██         ██    
██   ███ █████      ██    
██    ██ ██         ██    
 ██████  ███████    ██    
*/
// ESTAS FUNCIONES VAN A HACER PETICIONES SOBRE EL OBJETO SCHEMA QUE HEMOS CREADO PREVIAMENTE

/* MÉTODO QUE DEVUELVE TODOS LOS USUARIOS */
controllerUsuario.getUsuarios = async (req, res) => {
  const mostrarUsuarios = await Usuario.find(); //CON await HACEMOS QUE EL METODO FIND VA A ESTAR A LA ESCUCHA
  res.json(mostrarUsuarios);
}

/* MÉTODO QUE DEVUELVE UN USUARIO POR SU ID */
controllerUsuario.getUsuario = async (req, res) => {
  const buscarUsuario = await Usuario.findById(req.params.id);
  res.json(buscarUsuario);
}




/* 
 █████  ██   ████████  █████  
██   ██ ██      ██    ██   ██ 
███████ ██      ██    ███████ 
██   ██ ██      ██    ██   ██ 
██   ██ ███████ ██    ██   ██ 
 */
controllerUsuario.crearUsuario = async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.json({
    'status': 'USUARIO ALMACENADO CON EXITO'
  });
}





/* 
███████ ██████  ██ ████████ 
██      ██   ██ ██    ██    
█████   ██   ██ ██    ██    
██      ██   ██ ██    ██    
███████ ██████  ██    ██    
*/
controllerUsuario.editarUsuario = async (req, res) => {
  const { id } = req.params; // EL ID VIENE POR LA RUTA
  const editarUsuario = { // CONSTANTE QUE RECOGE LOS DATOS A EDITAR
    user: req.body.user,
    pass: req.body.pass,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    status: req.body.status
  }
  await Usuario.findByIdAndUpdate(id, { $set: editarUsuario }, { new: true }); // EN CASO DE QUE EL USUARIO NO EXISTIESE, CREA UNO NUEVO CON new:true
  res.json('USUARIO ACTUALIZADO')
}


/* 
██████  ███████ ██      ███████ ████████ ███████ 
██   ██ ██      ██      ██         ██    ██      
██   ██ █████   ██      █████      ██    █████   
██   ██ ██      ██      ██         ██    ██      
██████  ███████ ███████ ███████    ██    ███████ 
*/
controllerUsuario.borrarUsuario = async (req, res) => {
  await Usuario.findByIdAndRemove(req.params.id);
  res.json('USUARIO ELIMINADO')

}

// Y EXPORTAMOS LOS QUE NOS INTERESAN
module.exports = controllerUsuario;


