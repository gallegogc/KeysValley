import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../models/Compra';
import { Juego } from '../models/Juego';
import { JuegosService } from './juegos.service';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  public compraSeleccionado: Compra
  public compras: Array<Compra>

  /* COMPRAS USUARIO */
  public juegosCompradosUSUARIO: Array<Juego> = [] /* MISMO JUEGO VARIAS VECES */
  public juegosIndividualesCompradosUSUARIO: Array<Juego> = [] /* SOLO UNA VEZ CADA JUEGO */
  public juegosCantidadCompradosUSUARIO: Array<number> = [] /* CANTIDAD DE CADA JUEGO */
  public preciosCompradosUsuario: Array<number> = []


  /* TODAS LAS COMPRAS */
  public juegosCompradosTODOS: Array<Juego> = [] /* MISMO JUEGO VARIAS VECES */
  public juegosIndividualesCompradosTODOS: Array<Juego> = []  /* SOLO UNA VEZ CADA JUEGO */
  public juegosCantidadCompradosTODOS: Array<number> = []  /* CANTIDAD DE CADA JUEGO */

  /*  LO PONEMOS EN EL CONSTRUCTOR */
  constructor(
    private http: HttpClient,
    public usuariosService: UsuariosService,
    public juegosService: JuegosService
  ) {
    this.compraSeleccionado = new Compra(null, null, null);
  }


  /* CONSTANTE CON LA RUTA DE LAS COMPRAS EN NUESTRO SERVIDOR */
  readonly URL = 'http://localhost:3000/api/compras'


  /* DEVUELVE LA RESPUESTA DE LA PETICIÓN GET A LA RUTA /compras/todos */
  mostrarCompras() {
    return this.http.get(this.URL + `/todos/`);
  }

  /* DEVUELVE LA RESPUESTA DE LA PETICIÓN GET A LA RUTA /compras/todos/idUsuario */
  mostrarCompraUsuario(idUsuario: string) {
    return this.http.get(this.URL + `/todos/${idUsuario}`);
  }

  mostrarJuegosCompradosUsuario(idUsuario: string) {
    return this.http.get(this.URL + `/juegos/${idUsuario}`);
  }

  /* DEVUELVE LA RESPUESTA DE LA PETICIÓN POST A LA RUTA /compras/  PASÁNDOLE EN EL BODY EL OBJETO COMPRA */
  crearCompra(compra: Compra) {
    return this.http.post(this.URL, compra);
  }

  borrarCompra(_id: String) {
    return this.http.delete(this.URL + `/${_id}`);
  }


  /*  
       ██ ██    ██ ███████         ██████  ██████  ███    ███ ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
       ██ ██    ██ ██             ██      ██    ██ ████  ████ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
       ██ ██    ██ █████          ██      ██    ██ ██ ████ ██ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
  ██   ██ ██    ██ ██             ██      ██    ██ ██  ██  ██ ██          ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
   █████   ██████  ███████ ██      ██████  ██████  ██      ██ ██ ██        ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
  */
  /* MÉTODO QUE PERMITE RECOGER TODOS LOS JUEGOS INDIVIDUALES PRESENTES EN LA TOTALIDAD DE LAS COMPRAS DEL USUARIO Y SUS CANTIDADES */
  getJuegosCompradosUsuario() {
    // REINICIAMOS ARRAYS
    this.juegosCompradosUSUARIO = []
    this.juegosIndividualesCompradosUSUARIO = []
    this.juegosCantidadCompradosUSUARIO = []

    // RECOGEMOS COMPRAS DEL USUARIO
    this.mostrarCompraUsuario(this.usuariosService.usuarioSeleccionado._id)
      .subscribe(res => {
        console.log(res)
        this.compras = res as Compra[];

        // RECOGEMOS JUEGOS
        this.juegosService.mostrarJuegos()
          .subscribe(res => {
            console.log(res)
            this.juegosService.juegos = res as Juego[];

            // RECORREMOS TODAS LAS COMPRAS
            for (let x = 0; x < this.compras.length; x++) {
              // RECORREMOS TODOS LOS ID JUEGOS DE LAS COMPRAS
              for (let y = 0; y < this.compras[x].idJuegos.length; y++) {
                /* Y RECORREMOS TODOS LOS JUEGOS DE LA BASE DE DATOS */
                for (let z = 0; z < this.juegosService.juegos.length; z++) {
                  // CUANDO COINCIDAN HACEMOS PUSH AL ARRAY DE JUEGOS 
                  if (this.compras[x].idJuegos[y] == this.juegosService.juegos[z]._id) {
                    this.juegosCompradosUSUARIO.push(this.juegosService.juegos[z])
                  }
                }
              }
            }

            /* AHORA RECORREMOS TODOS LOS JUEGOS COMPRADOS */
            for (let x = 0; x < this.juegosCompradosUSUARIO.length; x++) {
              let juegoEncontrado = false;
              /* Y A SU VEZ EL ARRAY DE INDIVIDUALES QUE ESTAMOS CREANDO */
              for (let y = 0; y < this.juegosIndividualesCompradosUSUARIO.length && !juegoEncontrado; y++) {
                /* SI ENCUENTRAN EL PRIMERO EN EL SEGUNDO ARRAY LO INDICAMOS Y AÑADIMOS UNO A LA CANTIDAD*/
                if (this.juegosCompradosUSUARIO[x]._id == this.juegosIndividualesCompradosUSUARIO[y]._id) {
                  juegoEncontrado = true;
                  /* Y AÑADIMOS UNO A LA CANTIDAD */
                  this.juegosCantidadCompradosUSUARIO[y]++;
                  this.preciosCompradosUsuario[y]+=this.juegosCompradosUSUARIO[y].precio
                }
              }
              /* SI HA RECORRIDO TODOS Y NO HA ENCONTRADO EL JUEGO LO AÑADIMOS AL ARRAY DE JUEGOS INDIVIDUALES */
              if (!juegoEncontrado) {
                /* AÑADIMOS EL JUEGO */
                this.juegosIndividualesCompradosUSUARIO.push(this.juegosCompradosUSUARIO[x])
                /* AÑADIMOS CANTIDAD 1 */
                this.juegosCantidadCompradosUSUARIO.push(1)
                this.preciosCompradosUsuario.push(this.juegosCompradosUSUARIO[x].precio)

              }
            }
            for (let index20 = 0; index20 < this.preciosCompradosUsuario.length; index20++) {
                    alert("COMPRA: "+index20+", PRECIO: "+this.preciosCompradosUsuario[index20])
            }

          })
      })
  }


/* 
     ██ ██    ██ ███████         ██████  ██████  ███    ███ ██████      ████████  ██████  ██████   ██████  ███████ 
     ██ ██    ██ ██             ██      ██    ██ ████  ████ ██   ██        ██    ██    ██ ██   ██ ██    ██ ██      
     ██ ██    ██ █████          ██      ██    ██ ██ ████ ██ ██████         ██    ██    ██ ██   ██ ██    ██ ███████ 
██   ██ ██    ██ ██             ██      ██    ██ ██  ██  ██ ██             ██    ██    ██ ██   ██ ██    ██      ██ 
 █████   ██████  ███████ ██      ██████  ██████  ██      ██ ██ ██          ██     ██████  ██████   ██████  ███████ 
*/                                                                                                      
                                                                                  
  /* MÉTODO QUE PERMITE RECOGER TODOS LOS JUEGOS COMPRADOS CON SUS CANTIDADES */
  getJuegosCompradosTotales() {
    this.juegosCompradosTODOS = []
    this.juegosIndividualesCompradosTODOS = []
    this.juegosCantidadCompradosTODOS = []
    // RECOGEMOS TODAS LAS COMPRAS
    this.mostrarCompras()
      .subscribe(res => {
        console.log(res)
        this.compras = res as Compra[];

        // RECOGEMOS LOS JUEGOS
        this.juegosService.mostrarJuegos()
          .subscribe(res => {
            console.log(res)
            this.juegosService.juegos = res as Juego[];

            /* RECORREMOS LAS COMPRAS */
            for (let x = 0; x < this.compras.length; x++) {
              /* RECORREMOS LOS IDJUEGOS DE CADA COMPRA */
              for (let y = 0; y < this.compras[x].idJuegos.length; y++) {
                /* Y RECORREMOS TODOS LOS JUEGOS DE LA BASE DE DATOS */
                for (let z = 0; z < this.juegosService.juegos.length; z++) {
                  /* SI COINCIDEN LOS ID HACEMOS PUSH */
                  if (this.compras[x].idJuegos[y] == this.juegosService.juegos[z]._id) {
                    this.juegosCompradosTODOS.push(this.juegosService.juegos[z])
                  }
                }
              }
            }

            /* AHORA RECORREMOS TODOS LOS JUEGOS COMPRADOS DE TODAS LAS COMPRAS */
            for (let x = 0; x < this.juegosCompradosTODOS.length; x++) {
              let juegoEncontrado = false;
              /* Y A SU VEZ EL ARRAY DE INDIVIDUALES QUE ESTAMOS CREANDO */
              for (let y = 0; y < this.juegosIndividualesCompradosTODOS.length && !juegoEncontrado; y++) {
                /* SI ENCUENTRAN EL PRIMERO EN EL SEGUNDO ARRAY LO INDICAMOS */
                if (this.juegosCompradosTODOS[x]._id == this.juegosIndividualesCompradosTODOS[y]._id) {
                  juegoEncontrado = true;
                  /* Y AÑADIMOS UNO A LA CANTIDAD */
                  this.juegosCantidadCompradosTODOS[y]++;
                }
              }
              /* SI HA RECORRIDO TODOS Y NO HA ENCONTRADO EL JUEGO LO AÑADIMOS AL ARRAY DE JUEGOS INDIVIDUALES */
              if (!juegoEncontrado) {
                /* AÑADIMOS EL JUEGO */
                this.juegosIndividualesCompradosTODOS.push(this.juegosCompradosTODOS[x])
                /* AÑADIMOS CANTIDAD 1 */
                this.juegosCantidadCompradosTODOS.push(1)
              }
            }

          })
      })
  }

}
