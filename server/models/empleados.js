const mongoose = require ('mongoose');
const { Schema } = mongoose; // LE DECIMOS LA MODULO MONGOOSE QUE SOLO NOS INTERESA EL SCHEMA DEL MODELO

const empleadosSchema = new Schema ({ // OBTENMOS EL OBJETO DEL SCHEMA, VAMOS A DEFINIR LOS CAMPOS, LAS PROPIEDADES QUE QUEREMOS
    nombre: { type: String, required: true},        
    cargo: { type: String, required: true},
    departamento: { type: String, required: true},
    salario: { type: Number, required: true}
})

// AHORA EXPORTAMOS EL MODELO DEL MÓDULO MONGOOSE, DÁNDOLE UN NOMBRE Y EL OBJETO ESQUEMA
module.exports = mongoose.model('Empleados', empleadosSchema);