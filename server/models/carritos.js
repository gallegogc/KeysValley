const mongoose = require ('mongoose');
const { Schema } = mongoose; 

/* MODEL SCHEMA PARA DEFINIR LA COLECCIÓN CARRITO EN LA BASE DE DATOS */
const carritosSchema = new Schema ({
    idUsuario: { type: String, required: true},        
    idJuegos: { type: Array, required: false},
})

// AHORA EXPORTAMOS EL MODELO DEL MÓDULO MONGOOSE, DÁNDOLE UN NOMBRE Y EL OBJETO ESQUEMA
module.exports = mongoose.model('Carritos', carritosSchema);