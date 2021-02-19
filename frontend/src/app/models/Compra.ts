/* CLASE MODELO QUE DEFINE LOS OBJETOS EN LOS SERVICIOS DEL FRONT QUE SE COMUNICAN CON EL BACK */
export class Compra {

    _id: string;
    idUsuario: string;
    idJuegos: Array<String>;
    keys: Array<string>;
    fecha: string;

    /* A COMPRAS LE SUCEDE LO MISMO QUE A LOS CARRITOS, NO SE CREAN POR FORMULARIO, POR LO QUE NECESITAMOS
    UN CONSTRUCTOR SOBRECARGADO, EL OBJETO COMPRA SE CREA EN EL SERVICES COMPRAS ANTES DE DAR DE ALTA LA COMPRA */
    
    constructor(idUsuario: string, idJuegos: Array<string>, keys: Array<string>) {
        this.idUsuario = idUsuario;
        this.idJuegos = idJuegos
        this.keys = keys
        /* LA FECHA Y LA HORA LA RECOGEMOS MEDIANTE EL MÉTODO */
        this.fecha = new Date().toLocaleString()
    }
}