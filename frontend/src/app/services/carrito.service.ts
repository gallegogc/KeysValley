import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../models/Carrito';
import { Juego } from '../models/Juego';
import { JuegosService } from './juegos.service';
import { UsuariosService } from './usuarios.service';
import { Compra } from '../models/Compra';
import { ComprasService } from './compras.service';
import { ComunicacionService } from './comunicacion.service';
declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(
    private http: HttpClient,
    public juegosService: JuegosService,
    public usuariosService: UsuariosService,
    public comprasService: ComprasService,
    public comunicationService: ComunicacionService

  ) {
    this.carritoSeleccionado = new Carrito(null, null);
  }

  carritoSeleccionado: Carrito
  carritos: Array<Carrito>

  /* ARRAYS DE ELEMENTOS */
  public arrayIdJuegosVacio: Array<string> = []

  public juegosCarritoUSUARIO: Array<Juego> = []
  public juegosIndividualesCarritoUSUARIO: Array<Juego> = []
  public juegosCantidadCarritoUSUARIO: Array<number> = []

  /* OTRAS VARIABLES */

  /* PRECIO DEL CARRITO */
  public precioTotal: number
  /* VARIABLE QUE NOS PERMITE MOSTRAR UN MENSAJE CUANDO LA COMPRA SE REALIZA ESTANDO EN EL CARRITO */
  public compraCompleta = false
  public cantidadComprar = 1






  
  /* CONSTANTE CON LA RUTA DE LOS CARRITOS EN NUESTRO SERVIDOR */
  readonly URL = 'http://localhost:3000/api/carritos'

  mostrarCarritos() {
    return this.http.get(this.URL + `/todos/`);
  }

  mostrarCarritoUsuario(idUsuario) {
    return this.http.get(this.URL + `/usuario/${idUsuario}`);
  }

  /* PARA CREAR EL CARRITO SE HACE SIN FORMULARIO (COMO EN LOS OTROS CASOS, JUEGOS, USUARIOS,...)
      - RECIBE LA ID DEL USUARIO PARA EL CUAL SERÁ EL CARRITO
      - SE GENERA UN ARRAY VACÍO DE STRINGS DE JUEGO
  CREAMOS UN OBJETO CARRITO SOBRECARGADO CON LOS 2 PARAMETROS ANTERIORES */
  crearCarrito(idusuario: string) {
    this.arrayIdJuegosVacio = []
    return this.http.post(this.URL, new Carrito(idusuario, this.arrayIdJuegosVacio));
  }

  /* ESTE MÉTODO RECIBE EL OBJETO carrito Y ACTUALIZAMOS POR PUT EN LA DIRECCIÓN /carritos/idCarrito*/
  actualizarCarrito(carrito: Carrito) {
    console.log("ACTUALIZANDO CARRITO...")
    return this.http.put(this.URL + `/${carrito._id}`, carrito);
  }

  borrarCarrito(_id: String) {
    return this.http.delete(this.URL + `/${_id}`);
  }







  /* 
     ██████  ██████  ████████ ███████ ███    ██ ███████ ██████       ██████  █████  ██████  ██████  ██ ████████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
    ██    ██ ██   ██    ██    ██      ████   ██ ██      ██   ██     ██      ██   ██ ██   ██ ██   ██ ██    ██    ██    ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
    ██    ██ ██████     ██    █████   ██ ██  ██ █████   ██████      ██      ███████ ██████  ██████  ██    ██    ██    ██     ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
    ██    ██ ██   ██    ██    ██      ██  ██ ██ ██      ██   ██     ██      ██   ██ ██   ██ ██   ██ ██    ██    ██    ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
     ██████  ██████     ██    ███████ ██   ████ ███████ ██   ██      ██████ ██   ██ ██   ██ ██   ██ ██    ██     ██████       ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
              */
  /* MÉTODO DE OBTENCIÓN DE CARRITO DE USUARIO */
  obtenerCarrito() {
    /* SI EL USUARIO NO TIENE CARRITO (ES LA PRIMERA VEZ QUE INICIA SESIÓN SE CREA UNO NUEVO) */
    this.mostrarCarritoUsuario(this.usuariosService.usuarioSeleccionado._id)
      .subscribe(res => {
        console.log(res)
        this.carritoSeleccionado = res as Carrito;
        if (this.carritoSeleccionado == null) {
          this.crearCarritoNuevo()
          // GUARDAMOS CAMBIOS
          this.guardarCambiosCarrito();
        }
      })
  }

  /* MÉTODO QUE CREA EL CARRITO MANDANDO EL ID USUARIO ACTUAL */
  crearCarritoNuevo() {
    this.crearCarrito(this.usuariosService.usuarioSeleccionado._id)
      .subscribe(res => {
        console.log(res);
        // UNA VEZ CREADO, LO RECOGEMOS EN EL SELECCIONADO Y GUARDAMOS CAMBIOS
        this.obtenerCarrito();
        this.guardarCambiosCarrito();
      })
  }



  /* ██████  ██████  ████████ ███████ ███    ██ ███████ ██████           ██ ██    ██ ███████  ██████   ██████  ███████      ██████  █████  ██████  ██████  ██ ████████  ██████  
    ██    ██ ██   ██    ██    ██      ████   ██ ██      ██   ██          ██ ██    ██ ██      ██       ██    ██ ██          ██      ██   ██ ██   ██ ██   ██ ██    ██    ██    ██ 
    ██    ██ ██████     ██    █████   ██ ██  ██ █████   ██████           ██ ██    ██ █████   ██   ███ ██    ██ ███████     ██      ███████ ██████  ██████  ██    ██    ██    ██ 
    ██    ██ ██   ██    ██    ██      ██  ██ ██ ██      ██   ██     ██   ██ ██    ██ ██      ██    ██ ██    ██      ██     ██      ██   ██ ██   ██ ██   ██ ██    ██    ██    ██ 
     ██████  ██████     ██    ███████ ██   ████ ███████ ██   ██      █████   ██████  ███████  ██████   ██████  ███████      ██████ ██   ██ ██   ██ ██   ██ ██    ██     ██████  
  */
  /* MÉTODO QUE PERMITE RECOGER TODOS LOS JUEGOS INDIVIDUALES PRESENTES EN EL CARRITO DEL USUARIO Y SUS CANTIDADES */
  getJuegosCarritoUsuario() {
    /* REINICIAMOS LOS ARRAYS */
    this.juegosCarritoUSUARIO = []
    this.juegosIndividualesCarritoUSUARIO = []
    this.juegosCantidadCarritoUSUARIO = []
    // RECOGEMOS CARRITO
    this.mostrarCarritoUsuario(this.usuariosService.usuarioSeleccionado._id)
      .subscribe(res => {
        console.log(res)
        this.carritoSeleccionado = res as Carrito;

        // RECOGEMOS JUEGOS
        this.juegosService.mostrarJuegos()
          .subscribe(res => {
            console.log(res)
            this.juegosService.juegos = res as Juego[];



            for (let x = 0; x < this.carritoSeleccionado.idJuegos.length; x++) {
              /* Y RECORREMOS TODOS LOS JUEGOS DE LA BASE DE DATOS */
              for (let y = 0; y < this.juegosService.juegos.length; y++) {

                if (this.carritoSeleccionado.idJuegos[x] == this.juegosService.juegos[y]._id) {
                  this.juegosCarritoUSUARIO.push(this.juegosService.juegos[y])
                }
              }
            }


            /* AHORA RECORREMOS TODOS LOS JUEGOS DEL CARRITO */
            for (let x = 0; x < this.juegosCarritoUSUARIO.length; x++) {
              let juegoEncontrado = false;
              /* Y A SU VEZ EL ARRAY DE INDIVIDUALES QUE ESTAMOS CREANDO */
              for (let y = 0; y < this.juegosIndividualesCarritoUSUARIO.length && !juegoEncontrado; y++) {
                /* SI ENCUENTRAN EL PRIMERO EN EL SEGUNDO ARRAY LO INDICAMOS */
                if (this.juegosCarritoUSUARIO[x]._id == this.juegosIndividualesCarritoUSUARIO[y]._id) {
                  juegoEncontrado = true;
                  /* Y AÑADIMOS UNO A LA CANTIDAD */
                  this.juegosCantidadCarritoUSUARIO[y]++;
                }
              }
              /* SI HA RECORRIDO TODOS Y NO HA ENCONTRADO EL JUEGO LO AÑADIMOS AL ARRAY DE JUEGOS INDIVIDUALES */
              if (!juegoEncontrado) {
                /* AÑADIMOS EL JUEGO */
                this.juegosIndividualesCarritoUSUARIO.push((this.juegosCarritoUSUARIO[x]))
                /* AÑADIMOS CANTIDAD 1 */
                this.juegosCantidadCarritoUSUARIO.push(1)
              }
            }
            this.calcularPrecioTotal();

          })
      })

  }




  /* 
     ██████  ██████  ███████ ██████   █████   ██████ ██  ██████  ███    ██ ███████ ███████      ██████  █████  ██████  ██████  ██ ████████  ██████  
    ██    ██ ██   ██ ██      ██   ██ ██   ██ ██      ██ ██    ██ ████   ██ ██      ██          ██      ██   ██ ██   ██ ██   ██ ██    ██    ██    ██ 
    ██    ██ ██████  █████   ██████  ███████ ██      ██ ██    ██ ██ ██  ██ █████   ███████     ██      ███████ ██████  ██████  ██    ██    ██    ██ 
    ██    ██ ██      ██      ██   ██ ██   ██ ██      ██ ██    ██ ██  ██ ██ ██           ██     ██      ██   ██ ██   ██ ██   ██ ██    ██    ██    ██ 
     ██████  ██      ███████ ██   ██ ██   ██  ██████ ██  ██████  ██   ████ ███████ ███████      ██████ ██   ██ ██   ██ ██   ██ ██    ██     ██████  
              */
  addJuegoCarrito(juego: Juego) {
    /* PONEMOS LA COMPRA COMPLETADA A FALSE PARA QUE VUELVA A APARECER LA TABLA CON EL CARRITO AL VOLVER A AÑADIR ALGO TRAS UNA COMPRA */
    this.compraCompleta = false;

    let juegoEncontradoEnCarrito = false
    /* RECORREMOS LOS JUEGOS DEL CARRITO */
    for (let index = 0; index < this.juegosIndividualesCarritoUSUARIO.length && !juegoEncontradoEnCarrito; index++) {
      /* SI LO ENCUENTRA */
      if (this.juegosIndividualesCarritoUSUARIO[index]._id == juego._id) {
        juegoEncontradoEnCarrito = true
        // PARA PEDIRLE AL USUARIO QUE INTRODUZCA EL NÚMERO DE UNIDADES QUE QUIERE AÑADIR DEL JUEGO
        // let unidades = parseInt(prompt("Introduzca el número de unidades a añadir"))
        this.juegosCantidadCarritoUSUARIO[index] += this.cantidadComprar
        console.log("Unidad de un juego existente añadida al carrito")
      }
    }
    if (!juegoEncontradoEnCarrito) {
      this.juegosIndividualesCarritoUSUARIO.push(juego)
      // UNIDADES AÑADIDAS POR DEFECTO CUANDO EL JUEGO NO SE ENCUENTRA EN EL CARRITO
      this.juegosCantidadCarritoUSUARIO.push(this.cantidadComprar)
      console.log("Nuevo juego añadido al carrito")
    }
    this.guardarCambiosCarrito()
    M.toast({ html: 'UNIDAD DEL JUEGO AÑADIDO AL CARRITO', classes: 'toastVerde' })
  }





  /* ELIMINAR UNIDAD, SE ESCUCHA ASÍ MISMO PARA ELIMINAR EN LAS 2 INSTANCIACIONES DEL CARRITO
    EL INDEX QUE RECIBE ES LA POSICIÓN DEL JUEGO TANTO EN EL ARRAY DE JUEGOS LOCAL COMO EN EL ARRAY DE CANTIDADES */
  eliminarUnidadCarrito(index: number) {
    /* RESTAMOS LA UNIDAD */
    this.juegosCantidadCarritoUSUARIO[index]--
    /* SI LA CANTIDAD RESULTANDO ES INFERIOR A 1, ELIMINAMOS EL JUEGO DEL CARRITO */
    if (this.juegosCantidadCarritoUSUARIO[index] < 1) {
      /* ELIMINA UN ELEMENTO DESDE EL INDICE INDICADO */
      this.juegosIndividualesCarritoUSUARIO.splice(index, 1)
      this.juegosCantidadCarritoUSUARIO.splice(index, 1)
    }
    this.guardarCambiosCarrito();

    M.toast({ html: 'UNIDAD DEL JUEGO ELIMINADA DEL CARRITO', classes: 'toastRojo' })
  }


  eliminarJuegoCarrito(index: number) {
    this.juegosIndividualesCarritoUSUARIO.splice(index, 1)
    this.juegosCantidadCarritoUSUARIO.splice(index, 1)
    this.guardarCambiosCarrito()
    /* DESPUES DE GUARDAR RECARGAMOS PARA TENER TAMBIÉN ACTUALIZO EL ARRAY DE JUEGOS REPETIDOS */
    M.toast({ html: 'UNIDADES DEL JUEGO SELECCIONADO ELIMINADAS DEL CARRITO', classes: 'toastRojo' })
  }


  vaciarCarrito() {
    this.juegosCantidadCarritoUSUARIO = []
    this.juegosIndividualesCarritoUSUARIO = []
    this.juegosCantidadCarritoUSUARIO = []
    this.guardarCambiosCarrito();

  }


  /* 
   ██████  ██    ██  █████  ██████  ██████   █████  ██████       ██████  █████  ███    ███ ██████  ██  ██████  ███████ 
  ██       ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██     ██      ██   ██ ████  ████ ██   ██ ██ ██    ██ ██      
  ██   ███ ██    ██ ███████ ██████  ██   ██ ███████ ██████      ██      ███████ ██ ████ ██ ██████  ██ ██    ██ ███████ 
  ██    ██ ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██     ██      ██   ██ ██  ██  ██ ██   ██ ██ ██    ██      ██ 
   ██████   ██████  ██   ██ ██   ██ ██████  ██   ██ ██   ██      ██████ ██   ██ ██      ██ ██████  ██  ██████  ███████ 
  */
  /* MÉTODO QUE PERMITE CREAR UN NUEVO CARRITO CON EL QUE SOBREESCRIBIR EL QUE YA EXISTE EN LA BASE DE DATOS */
  guardarCambiosCarrito() {
    /* CREAMOS UN ARRAY DE STRINGS QUE VA A CONTENER LAS STRINGS DE JUEGOS QUE SE VAN A AÑADIR AL CARRITO EN LA BD */
    let arrayIdJuegosCarritoActualizado = []
    /* RECORREMOS EL ARRAY DE JUEGOS INDIVIDUALES*/
    for (let index = 0; index < this.juegosIndividualesCarritoUSUARIO.length; index++) {
      /* Y AÑADIMOS UN ID STRING DEL JUEGO POR CADA UNIDAD QUE HABÍA EN EL CARRITO */
      for (let j = 0; j < this.juegosCantidadCarritoUSUARIO[index]; j++) {
        arrayIdJuegosCarritoActualizado.push(this.juegosIndividualesCarritoUSUARIO[index]._id)
      }
    }
    /* ACTUALIZAMOS EL CARRITO SELECCIONADO (EL CUAL YA TIENE UN _id Y EL idUsuario) CON EL NUEVO ARRAY DE IDS DE JUEGOS */
    this.carritoSeleccionado.idJuegos = arrayIdJuegosCarritoActualizado
    this.calcularPrecioTotal();

    /* LO MANDAMOS COMO PARÁMETRO AL MÉTODO ACTUALIZAR CARRITO */
    this.actualizarCarrito(this.carritoSeleccionado)
      .subscribe(res => {
        console.log(res);
      })
  }



  /* 
     ██████  █████  ██       ██████ ██    ██ ██       █████  ██████      ██████  ██████  ███████  ██████ ██  ██████  
    ██      ██   ██ ██      ██      ██    ██ ██      ██   ██ ██   ██     ██   ██ ██   ██ ██      ██      ██ ██    ██ 
    ██      ███████ ██      ██      ██    ██ ██      ███████ ██████      ██████  ██████  █████   ██      ██ ██    ██ 
    ██      ██   ██ ██      ██      ██    ██ ██      ██   ██ ██   ██     ██      ██   ██ ██      ██      ██ ██    ██ 
     ██████ ██   ██ ███████  ██████  ██████  ███████ ██   ██ ██   ██     ██      ██   ██ ███████  ██████ ██  ██████  
               */
  /* PARA CALCULAR EL PRECIO MULTIPLICAMOS EL PRECIO DE CADA JUEGO EN EL CARRITO POR SU CANTIDAD */
  calcularPrecioTotal() {
    this.precioTotal = 0
    for (let i = 0; i < this.juegosIndividualesCarritoUSUARIO.length; i++) {
      this.precioTotal += this.juegosIndividualesCarritoUSUARIO[i].precio * this.juegosCantidadCarritoUSUARIO[i]
    }
    this.precioTotal = Math.round((this.precioTotal + Number.EPSILON) * 100) / 100
  }







  /* 
   ██████  ██████  ███    ██ ███████ ██ ██████  ███    ███  █████  ██████       ██████  ██████  ███    ███ ██████  ██████   █████  
  ██      ██    ██ ████   ██ ██      ██ ██   ██ ████  ████ ██   ██ ██   ██     ██      ██    ██ ████  ████ ██   ██ ██   ██ ██   ██ 
  ██      ██    ██ ██ ██  ██ █████   ██ ██████  ██ ████ ██ ███████ ██████      ██      ██    ██ ██ ████ ██ ██████  ██████  ███████ 
  ██      ██    ██ ██  ██ ██ ██      ██ ██   ██ ██  ██  ██ ██   ██ ██   ██     ██      ██    ██ ██  ██  ██ ██      ██   ██ ██   ██ 
   ██████  ██████  ██   ████ ██      ██ ██   ██ ██      ██ ██   ██ ██   ██      ██████  ██████  ██      ██ ██      ██   ██ ██   ██                                                                                                                                  
  */
  confirmarCompra() {
    /* VENTANA PARA QUE EL USUARIO CONFIRME LA COMPRA */
    if (window.confirm("¿HA REVISADO LOS DETALLES DEL CARRITO Y DESEA CONSOLIDAR LA COMPRA?")) {

      /* SE COMPRUEBA EL STOCK */
      if (this.comprobarStock()) {

        /* POR CADA JUEGO CREAMOS UNA KEY QUE SE PODRÁ CANJEAR EN LA PLATAFORMA CORRESPONDIENTE PARA OBTENER EL JUEGO.
        EN UNA APP REAL SE INCLUIRÍAN CLAVES APORTADAS POR LA DISTRIBUIDORA O EL DESARROLLADOR DEL JUEGO */

        /* CREAMOS UN ARRAY DE CLAVES, UNA POR CADA STRING idJuego EN EL CARRITO */
        let juegosKeys = []
        for (let index = 0; index < this.carritoSeleccionado.idJuegos.length; index++) {
          juegosKeys.push(this.randomKey())
        }

        /* CREAMOS UN OBJETO COMPRA AL QUE LE PASAMOS EL ID USUARIO, LOS ID JUEGOS Y LAS KEYS*/
        let compra = new Compra(this.carritoSeleccionado.idUsuario, this.carritoSeleccionado.idJuegos, juegosKeys)

        /* LLAMAMOS AL MÉTODO CREAR COMPRA DEL SERVICIO PARA CREARLA EN LA BD, LE PASAMOS COMO PARÁMETRO
        EL OBJETO COMPRA CREADO ANTERIORMENTE */
        this.comprasService.crearCompra(compra)
          .subscribe(res => {
            console.log(res);
          })

        /* QUITAMOS DEL STOCK LAS UNIDADES ADQUERIDAS, HAY QUE ACTUALIZAR TODOS LOS JUEGOS QUE SE HAYAN COMPRADO */
        /* COMO TENEMOS EL ARRAY LOCAL DE JUEGOS SOLO TENEMOS QUE RESTAR LAS UNIDADES COMPRADAS DE CADA JUEGO QUE TENEMOS EN EL CARRITO
        Y ACTUALIZAR EL JUEGO MANDÁNDO EL OBJETO*/
        for (let index = 0; index < this.juegosIndividualesCarritoUSUARIO.length; index++) {
          this.juegosIndividualesCarritoUSUARIO[index].stock -= this.juegosCantidadCarritoUSUARIO[index]
          /* ACTUALIZAMOS EL JUEGO CON EL NUEVO STOCK */
          this.juegosService.actualizarJuego(this.juegosIndividualesCarritoUSUARIO[index])
            .subscribe(res => {
              console.log(res);
            })
        }

        /* PONEMOS LA COMPRA COMPLETA A TRUE PARA QUE APAREZCA EL MENSAJE */
        this.compraCompleta = true

        /* VACIAMOS EL CARRITO */
        this.vaciarCarrito()

        /* LLAMAMOS AL MÉTODO QUE ACTIVA LA VISTA DEL CARRITO EN EL MAIN PARA QUE SE RECARGUE LA VISTA */
        this.comunicationService.invocarMetodoCarrito()
      }
    }

  }



  comprobarStock() {
    /* RECARGAMOS EL CARRITO PARA TENER LOS STOCK MÁS FIABLES; LO SUYO SERÍA HACER ESTO CON HILOS Y SINCRONIZADO */
    this.obtenerCarrito()
    for (let index = 0; index < this.juegosIndividualesCarritoUSUARIO.length; index++) {
      /* COMPARAMOS LA CANTIDAD PEDIDA EN EL ARRAY CANTIDADES LOCAL CON EL STOCK DE JUEGOS
      SI AL MENOS UN JUEGO NO TIENE STOCK SUFICIENTE, DEVUELVE FALSE Y MUESTRA  */
      if (this.juegosCantidadCarritoUSUARIO[index] > this.juegosIndividualesCarritoUSUARIO[index].stock) {
        M.toast({ html: 'ALGUNO DE LOS JUEGOS NO TIENE STOCK SUFICIENTE', classes: 'toastRojo' })
        return false;
      };
    }
    return true
  }

  /* MÉTODO QUE GENERA UNA CLAVE ALEATORIA */
  randomKey() {
    var key = "";
    var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var longitudCaracteres = caracteres.length;
    for (var i = 0; i < 10; i++) {
      key += caracteres.charAt(Math.floor(Math.random() * longitudCaracteres));
    }
    return key;
  }








}





