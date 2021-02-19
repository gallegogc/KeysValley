const mongoose = require ('mongoose');
const { Schema } = mongoose; 

/* MODEL SCHEMA PARA DEFINIR LA COLECCIÓN COMPRAS EN LA BASE DE DATOS */
const comprasSchema = new Schema ({ 
    idUsuario: { type: String, required: true},        
    idJuegos: { type: Array, required: true},
    keys: { type: Array, required: true},
    fecha: { type: String, required: true},
})

// AHORA EXPORTAMOS EL MODELO DEL MÓDULO MONGOOSE, DÁNDOLE UN NOMBRE Y EL OBJETO ESQUEMA
module.exports = mongoose.model('Compras', comprasSchema);