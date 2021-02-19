const controllerEmpleado = {};

  //HAY QUE LLAMAR AL SCHEMA DE LA BD Y TRABAJAR CON ÉL
  const Empleado = require('../models/empleados'); // ES EL SCHEMA DE LA BD EN UN OBJETO

// ESTA FUNCIÓN VA A HACER UNA PETICION SOBRE EL OBJETO SCHEMA QUE HEMOS CREADO PREVIAMENTE
// ESTE METODO ASYNC NOS VA A PERMITIR QUE ESTA PETICION EN BASE DE DATOS BUSQUE LOS EMPLEADOS
controllerEmpleado.getEmpleados = async (req,res)=> { // HAY QUE INDICAR QUE SEA DE TIPO ASINCRONA PARA QUE NO DE ERROR
  const mostrarEmpleados = await Empleado.find(); //CON await HACEMOS QUE EL METODO FIND VA A ESTAR A LA ESCUCHA
  // LA DEL REQUIRE, LA CONSTANTE GLOBAL ES A LA QUE APLICAMOS EL FIND
  // CUANDO TERMINE LO METE EN LA CONSTANTE EMPLEADOS
  res.json(mostrarEmpleados); //NOS DEVUELVE EL JSON CON LA INFORMACIÓN DE EMPLEADOS
}

controllerEmpleado.getEmpleado = async (req, res) => { // METODO PARA BUSCAR UN EMPLEADO POR SU ID
  const buscarEmpleado = await Empleado.findById(req.params.id);
  res.json(buscarEmpleado);
}

controllerEmpleado.crearEmpleado = async (req, res) => {
  const nuevoEmpleado = new Empleado(req.body);
  await nuevoEmpleado.save();
  res.json ({
    'status': 'EMPLEADO ALMACENADO CON EXITO' });
}

controllerEmpleado.editarEmpleado = async (req, res) => {
  const {id} = req.params;
  const editarEmpleado = { // CONSTANTE QUE RECOGE LOS DATOS A EDITAR
    nombre: req.body.nombre,
    cargo: req.body.cargo,
    departamento: req.body.departamento,
    salario: req.body.salario
  }
  await Empleado.findByIdAndUpdate(id, {$set:editarEmpleado}, {new: true}); // EN CASO DE QUE EL USUARIO NO EXISTIESE, CREA UNO NUEVO CON new:true
  res.json('USUARIO ACTUALIZADO')
}

controllerEmpleado.borrarEmpleado = async (req, res) => { 
  await Empleado.findByIdAndRemove(req.params.id);
  res.json('USUARIO ELIMINADO')

}

// Y EXPORTAMOS LOS QUE NOS INTERESAN
module.exports = controllerEmpleado;


