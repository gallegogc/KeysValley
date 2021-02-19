const mongoose = require ('mongoose');
const { Schema } = mongoose; // LE DECIMOS LA MODULO MONGOOSE QUE SOLO NOS INTERESA EL SCHEMA DEL MODELO

/* MODEL SCHEMA PARA DEFINIR LA COLECCIÓN JUEGOS EN LA BASE DE DATOS */
const usuariosSchema = new Schema ({ // OBTENMOS EL OBJETO DEL SCHEMA, VAMOS A DEFINIR LOS CAMPOS, LAS PROPIEDADES QUE QUEREMOS
    user: { type: String, required: true},        
    pass: { type: String, required: true},
    nombre: { type: String, required: true},
    apellidos: { type: String, required: true},
    status: { type: Number, required: false, default: 0}
})

// AHORA EXPORTAMOS EL MODELO DEL MÓDULO MONGOOSE, DÁNDOLE UN NOMBRE Y EL OBJETO ESQUEMA
module.exports = mongoose.model('Usuarios', usuariosSchema);