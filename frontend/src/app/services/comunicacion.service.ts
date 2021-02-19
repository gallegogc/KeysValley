import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Juego } from '../models/Juego';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {



  /*                                                                  
   ███████ ██    ██ ██████       ██ ███████  ██████ ████████ ███████ 
   ██      ██    ██ ██   ██      ██ ██      ██         ██    ██      
   ███████ ██    ██ ██████       ██ █████   ██         ██    ███████ 
        ██ ██    ██ ██   ██ ██   ██ ██      ██         ██         ██ 
   ███████  ██████  ██████   █████  ███████  ██████    ██    ███████ 
  */

  /* ATRIBUTOS PRIVADOS SUBJECT, PUEDEN ALMACENAR OBJETOS Y OTRAS VARIABLES */

  // LOS COMPONENTES SE PUEDEN SUSCRIBIR A ESTE SUBJECT

  /* SIN LOGIN */
  private invocarMetodoBienvenidaSubject = new Subject<any>();
  private invocarMetodoRegistroSubject = new Subject<any>();
  private invocarMetodoRecargarUsuariosSubject = new Subject<Juego>();
  private invocarMetodoMostrarFichaSubject = new Subject<any>();
  private invocarMetodoLogedSubject = new Subject<any>()

  /* CATEGORIAS */
  private invocarMetodoTodosSubject = new Subject<any>();
  private invocarMetodoGeneroSubject = new Subject<any>();
  private invocarMetodoBusquedaNombreSubject = new Subject<string>();
  private invocarMetodoPlataformaSubject = new Subject<any>();
  private invocarMetodoLanzamientoSubject = new Subject<Number>();
  private invocarMetodoSinStockSubject = new Subject<any>();
  private invocarMetodoNumStockSubject = new Subject<any>();
  private invocarMetodoEmpPorSubject = new Subject<string>();
  private invocarCambiarVistaSubject = new Subject<any>();

  /* USUARIO */
  private invocarMetodoCarritoSubject = new Subject<string>();
  private invocarMetodoComprasSubject = new Subject<string>();
  private invocarMetodoCuentaSubject = new Subject<string>();
  private invocarCerrarSesionSubject = new Subject<any>();

  /* CARRITO */
  private invocarMetodoAddJuegoCarritoSubject = new Subject<any>();
  private invocarMetodoEliminarUnidadCarritoSubject = new Subject<any>();
  private invocarMetodoEliminarJuegoCarritoSubject = new Subject<any>();
  private invocarMetodoVaciarCarritoSubject = new Subject<any>();

  /* ADMIN */
  private invocarMetodoAddJuegoSubject = new Subject<any>();
  private invocarMetodoListaJuegosSubject = new Subject<any>();
  private invocarMetodoListaUsuariosSubject = new Subject<any>();
  private invocarMetodoListaVentasSubject = new Subject<any>();

  /* VISTA PREVIA */
  private invocarMetodoMostrarVistaPreviaSubject = new Subject<any>();
  private invocarMetodoOcultarVistaPreviaSubject = new Subject<any>();
  private invocarMetodoActualizarImagenSubject = new Subject<any>();


  private invocarMetodoAuxiliarSubject = new Subject<any>();



  /* 
  ███████ ███████  ██████ ██    ██  ██████ ██   ██  █████  ██████   ██████  ██████  ███████ ███████ 
  ██      ██      ██      ██    ██ ██      ██   ██ ██   ██ ██   ██ ██    ██ ██   ██ ██      ██      
  █████   ███████ ██      ██    ██ ██      ███████ ███████ ██   ██ ██    ██ ██████  █████   ███████ 
  ██           ██ ██      ██    ██ ██      ██   ██ ██   ██ ██   ██ ██    ██ ██   ██ ██           ██ 
  ███████ ███████  ██████  ██████   ██████ ██   ██ ██   ██ ██████   ██████  ██   ██ ███████ ███████ 
  */
  // VARIABLES PÚBLICAS DE SUSCRIPCIÓN PARA ESCUCHAR.
  // ALMACENAN EL SUBJECT COMO OBSERVABLE


  /* SIN LOGIN */
  public invocarMetodoBienvenidaObservable = this.invocarMetodoBienvenidaSubject.asObservable();
  public invocarMetodoRegistroObservable = this.invocarMetodoRegistroSubject.asObservable();
  public invocarMetodoRecargarUsuariosObservable = this.invocarMetodoRecargarUsuariosSubject.asObservable();
  public invocarMetodoMostrarFichaObservable = this.invocarMetodoMostrarFichaSubject.asObservable();
  public invocarMetodoLogedObservable = this.invocarMetodoLogedSubject.asObservable();

  /* CATEGORIAS */
  public invocarMetodoTodosObservable = this.invocarMetodoTodosSubject.asObservable();
  public invocarMetodoBusquedaNombreObservable = this.invocarMetodoBusquedaNombreSubject.asObservable();
  public invocarMetodoGeneroObservable = this.invocarMetodoGeneroSubject.asObservable();
  public invocarMetodoPlataformaObservable = this.invocarMetodoPlataformaSubject.asObservable();
  public invocarMetodoLanzamientoObservable = this.invocarMetodoLanzamientoSubject.asObservable();
  public invocarMetodoSinStockObservable = this.invocarMetodoSinStockSubject.asObservable();
  public invocarMetodoNumStockObservable = this.invocarMetodoNumStockSubject.asObservable();
  public invocarMetodoEmpPorObservable = this.invocarMetodoEmpPorSubject.asObservable();
  public invocarMetodoCambiarVistaObservable = this.invocarCambiarVistaSubject.asObservable();

  /* CARRITO */
  public invocarMetodoAddJuegoCarritoObservable = this.invocarMetodoAddJuegoCarritoSubject.asObservable();
  public invocarMetodoEliminarUnidadCarritoObservable = this.invocarMetodoEliminarUnidadCarritoSubject.asObservable();
  public invocarMetodoEliminarJuegoCarritoObservable = this.invocarMetodoEliminarJuegoCarritoSubject.asObservable();
  public invocarMetodoVaciarCarritoObservable = this.invocarMetodoVaciarCarritoSubject.asObservable();

  /* USUARIO */
  public invocarMetodoCarritoObservable = this.invocarMetodoCarritoSubject.asObservable();
  public invocarMetodoComprasObservable = this.invocarMetodoComprasSubject.asObservable();
  public invocarMetodoCuentaObservable = this.invocarMetodoCuentaSubject.asObservable();
  public invocarMetodoCerrarSesionObservable = this.invocarCerrarSesionSubject.asObservable();

  /* ADMIN */
  public invocarMetodoListaJuegosObservable = this.invocarMetodoListaJuegosSubject.asObservable();
  public invocarMetodoListaUsuariosObservable = this.invocarMetodoListaUsuariosSubject.asObservable();
  public invocarMetodoListaVentasObservable = this.invocarMetodoListaVentasSubject.asObservable();
  public invocarMetodoAddJuegoObservable = this.invocarMetodoAddJuegoSubject.asObservable();

  /* VISTA PREVIA */
  public invocarMetodoMostrarVistaPreviaObservable = this.invocarMetodoMostrarVistaPreviaSubject.asObservable();
  public invocarMetodoOcultarVistaPreviaObservable = this.invocarMetodoOcultarVistaPreviaSubject.asObservable();
  public invocarMetodoActualizarImagenObservable = this.invocarMetodoActualizarImagenSubject.asObservable();


  public invocarMetodoAuxiliarObservable = this.invocarMetodoAuxiliarSubject.asObservable();


 





  /* 
  ██       █████  ███    ██ ███████  █████  ██████   ██████  ██████  ███████ ███████  
  ██      ██   ██ ████   ██    ███  ██   ██ ██   ██ ██    ██ ██   ██ ██      ██       
  ██      ███████ ██ ██  ██   ███   ███████ ██   ██ ██    ██ ██████  █████   ███████  
  ██      ██   ██ ██  ██ ██  ███    ██   ██ ██   ██ ██    ██ ██   ██ ██           ██  
  ███████ ██   ██ ██   ████ ███████ ██   ██ ██████   ██████  ██   ██ ███████ ███████  
  */
  /* MÉTODOS PÚBLICOS QUE LLAMAMOS DESDE LA OPERATIVA DE COMPONENTES, PUEDEN RECIBIR PARÁMETROS QUE PASARLE AL SUBJECT */
  /* ESTOS MÉTODOS POR SI SÓLOS NO HACEN NADA, ES EN LA RECEPCIÓN, EN LA ESCUCHA DEL COMPONENTE ESCUCHADOR DONDE VAMOS A REALIZAR
  LO QUE NOS INTERESE */





  //////////////////////////////////////////////////////
  //////////////////* SIN LOGIN *///////////////////////
  //////////////////////////////////////////////////////

  /* MOSTRAR BIENVENIDA EN EL MAIN */
  invocarMetodoBienvenida() {
    this.invocarMetodoBienvenidaSubject.next();
  }

  /* MOSTRAR REGISTRO EN EL MAIN */
  invocarMetodoRegistro() {
    this.invocarMetodoRegistroSubject.next();
  }

  /* RECARGAR EL ARRAY DE USUARIOS EN EL LOGIN AL HACER UN NUEVO REGISTRO Y QUE DEJE HACER LOGIN AL NUEVO USUARIO SIN RECARGAR LA PAGINA */
  invocarMetodoRecargarUsuarios() {
    this.invocarMetodoRecargarUsuariosSubject.next();
  }

  /* MOSTRAR LA FICHA GRANDE AL CLICAR SOBRE UNA PEQUEÑA */
  invocarMetodoMostrarFicha(juego: Juego) {
    this.invocarMetodoMostrarFichaSubject.next(juego);
  }
  
  invocarMetodoLoged() {
    this.invocarMetodoLogedSubject.next();
  }


  //////////////////////////////////////////////////////
  //////////////////* CATEGORIAS *//////////////////////
  //////////////////////////////////////////////////////

  /* MOSTRAR TODOS LOS JUEGOS EN EL MAIN */
  invocarMetodoTodos() {
    this.invocarMetodoTodosSubject.next();
  }

  /* MOSTRAR LOS JUEGOS CON EL NOMBRE INDICADO */
  invocarMetodoBusqueda(busqueda: string) {
    this.invocarMetodoBusquedaNombreSubject.next(busqueda);
  }

  /* MOSTRAR LOS JUEGOS DEL GÉNERO SELECCIONADO EN EL MAIN */
  invocarMetodoGenero(genero: String) {
    this.invocarMetodoGeneroSubject.next(genero);
  }

  /* MOSTRAR LOS JUEGOS DE LA PLATAFORMA SELECCIONADA EN EL MAIN */
  invocarMetodoPlataforma(plataforma: String) {
    this.invocarMetodoPlataformaSubject.next(plataforma);
  }

  /* MOSTRAR LOS JUEGOS DEL AÑO DE LANZAMIENTO SELECCIONADO */
  invocarMetodoLanzamiento(año: Number) {
    this.invocarMetodoLanzamientoSubject.next(año);
  }

  /* MOSTRAR LOS JUEGOS SIN STOCK */
  invocarMetodoSinStock() {
    this.invocarMetodoSinStockSubject.next();
  }

  /* MOSTRAR LOS JUEGOS CON UN DETERMINADO STOCK */
  invocarMetodoNumStock(numStock: number) {
    this.invocarMetodoNumStockSubject.next(numStock);
  }

  invocarMetodoEmpPor(letra:string){
    this.invocarMetodoEmpPorSubject.next(letra);
  }

  /* CAMBIAR VISTA DE CARTAS PEQUEÑAS A GRANDES O AL REVES */
  invocarMetodoCambiarVista() {
    this.invocarCambiarVistaSubject.next();
  }






  //////////////////////////////////////////////////////
  //////////////////* USUARIO */////////////////////////
  //////////////////////////////////////////////////////

  /* MOSTRAR CARRITO DESPLEGADO EN EL MAIN, HAY QUE PASARLE EL ID USUARIO*/
  invocarMetodoCarrito() {
    this.invocarMetodoCarritoSubject.next();
  }

  /* MOSTRAR COMPRAS EN EL MAIN, HAY QUE PASARLE EL ID DE USUARIO */
  invocarMetodoCompras(idUsuario: string) {
    this.invocarMetodoComprasSubject.next(idUsuario);
  }

  /* MOSTRAR LOS DATOS DE CUENTA DEL USUARIO, HAY QUE PASARLE EL ID DE USUARIO */
  invocarMetodoCuenta(idUsuario: string) {
    this.invocarMetodoCuentaSubject.next(idUsuario);
  }

  /* CERRAR SESIÓN AL DAR DE BAJA */
  invocarMetodoCerrarSesion() {
    this.invocarCerrarSesionSubject.next();
  }



  //////////////////////////////////////////////////////
  //////////////////* CARRITO */////////////////////////
  //////////////////////////////////////////////////////

  /* MÉTODO PARA VACIAR EL CARRITO DE LAS 2 INSTANCIACIONES, SE AUTOLLAMA */
  invocarMetodoVaciarCarrito() {
    this.invocarMetodoVaciarCarritoSubject.next();
  }

  /* MÉTODO PARA AÑADIR UNA UNIDAD DE UN JUEGO EN EL CARRITO DE LAS 2 INSTANCIACIONES:
        -  TANTO DESDE LAS CARTAS JUEGOS
        -  COMO DESDE EL BOTÓN + EN EL CARRITO SIMPLE, SE AUTOLLAMA, ES DECIR EL MISMO COMPONENTE LLAMA Y ESCUCHA AL SUBJECT */
  invocarMetodoAddJuegoCarrito(juego: Juego) {
    this.invocarMetodoAddJuegoCarritoSubject.next(juego);
  }

  /* MÉTODO PARA AÑADIR UNA UNIDAD DE UN JUEGO EN EL CARRITO DE LAS 2 INSTANCIACIONES 
  DESDE EL BOTÓN - EN EL CARRITO SIMPLE, SE AUTOLLAMA */
  invocarMetodoEliminarUnidadCarrito(index: number) {
    this.invocarMetodoEliminarUnidadCarritoSubject.next(index);
  }

  /* MÉTODO PARA ELIMINAR TODAS LAS UNIDADES DE UN JUEGO EN LAS 2 INSTANCIACIONES DEL CARRITO 
  DESDE EL ICONO DE LA PAPELERA, SE AUTOLLAMA  */
  invocarMetodoEliminarJuegoCarrito(index: number) {
    this.invocarMetodoEliminarJuegoCarritoSubject.next(index);
  }


  //////////////////////////////////////////////////////
  //////////////////* ADMIN  *//////////////////////////
  //////////////////////////////////////////////////////

  /* MUESTRA EL FORMULARIO DE ALTA DE JUEGOS EN EL MAIN */
  invocarMetodoAddJuego() {
    this.invocarMetodoAddJuegoSubject.next();
  }

  /* MUESTRA LA LISTA DE JUEGOS EN EL MAIN */
  invocarMetodoListaJuegos() {
    this.invocarMetodoListaJuegosSubject.next();
  }

  /* MUESTRA LA LISTA DE USUARIOS EN EL MAIN */
  invocarMetodoListaUsuarios() {
    this.invocarMetodoListaUsuariosSubject.next();
  }

  /* MUESTRA LA LISTA DE VENTAS EN EL MAIN */
  invocarMetodoListaVentas() {
    this.invocarMetodoListaVentasSubject.next();
  }

  //////////////////////////////////////////////////////
  //////////////////* VISTA PREVIA *////////////////////
  //////////////////////////////////////////////////////

  /* MOSTRAR VISTA PREVIA:
      - LLAMADORES: 
      - ESCUCHADORES: LATDER */
  invocarMetodoMostrarVistaPrevia() {
    this.invocarMetodoMostrarVistaPreviaSubject.next();
  }

  /* OCULTAR VISTA PREVIA:
      - LLAMADORES: 
      - ESCUCHADORES: LATDER */
  invocarMetodoOcultarVistaPrevia() {
    this.invocarMetodoOcultarVistaPreviaSubject.next();
  }


  /* ACTUALIZAR IMAGEN DE VISTA PREVIA:
    - LLAMADORES: 
    - ESCUCHADORES: LATDER */
  invocarMetodoActualizarImagen() {
    this.invocarMetodoActualizarImagenSubject.next();
  }



  invocarMetodoAuxiliar() {
    this.invocarMetodoAuxiliarSubject.next();
  }

 

}
