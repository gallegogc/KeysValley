/* CLASE MODELO QUE DEFINE LOS OBJETOS EN LOS SERVICIOS DEL FRONT QUE SE COMUNICAN CON EL BACK */
export class Juego {

    _id: String;
    nombre: String;
    genero: String;
    desarrolladora: String;
    plataforma: String
    lanzamiento: number;
    resena: String;
    precio: number;
    stock: number;
    imagen: String;

    /* JUEGO NO TIENE CONSTRUCTOR PORQUE SE CREA Y EDITA MEDIANTE FORMULARIO */


    /* EL CONSTRUCTOR COMENTADO A CONTINUACIÓN SE UTILIZÓ DURANTE EL DESARROLLO DE LA INTERFAZ DE LA WEB
    SE RELLENABA EL ARRAY DE OBJETOS JUEGOS MEDIANTE EL MISMO. UNA VEZ SE IMPLANTÓ LA BASE DE DATOS YA NO ERA NECESARIO.
    ADEMÁS REMARCAR QUE EL ID TUVO QUE CAMBIARSE id a _id Y PASAR DEL TIPO number AL TIPO String
    
    constructor(id: Number, nombre: String, genero: String, desarrolladora: String, plataforma: String, lanzamiento: Number, resena: String, precio: Number, stock: Number, imagen: String) {
        this.id = id
        this.nombre = nombre
        this.genero = genero
        this.desarrolladora = desarrolladora
        this.plataforma = plataforma
        this.lanzamiento = lanzamiento
        this.resena = resena
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    }*/
}