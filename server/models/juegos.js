const mongoose = require ('mongoose');
const { Schema } = mongoose; // LE DECIMOS LA MODULO MONGOOSE QUE SOLO NOS INTERESA EL SCHEMA DEL MODELO

/* MODEL SCHEMA PARA DEFINIR LA COLECCIÓN JUEGOS EN LA BASE DE DATOS */
const juegosSchema = new Schema ({ // OBTENEMOS EL OBJETO DEL SCHEMA, VAMOS A DEFINIR LOS CAMPOS, LAS PROPIEDADES QUE QUEREMOS
    nombre: { type: String, required: true},        
    genero: { type: String, required: true},
    desarrolladora: { type: String, required: true},
    plataforma: { type: String, required: true},
    lanzamiento: { type: Number, required: true},
    resena: { type: String, required: true},
    precio: { type: Number, required: true},
    stock: { type: Number, required: true},
    imagen: { type: String, required: true},
})

// AHORA EXPORTAMOS EL MODELO DEL MÓDULO MONGOOSE, DÁNDOLE UN NOMBRE Y EL OBJETO ESQUEMA
module.exports = mongoose.model('Juegos', juegosSchema);