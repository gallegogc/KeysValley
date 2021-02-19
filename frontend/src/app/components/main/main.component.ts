import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { isUndefined } from 'util';
import { Juego } from '../../models/Juego';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  /* VARIABLES QUE CAMBIAN EL TITULO DE LA VENTANA OBSERVABLE EN EL MAIN Y EL SUBTITULO DE RESULTADOS */
  public titulo: String = "Bienvenida"
  public resultados: String = ""
  /* VARIABLE QUE DETERMINA EL COMPONENTE A MOSTRAR EN EL MAIN */
  public ventana: String
  /* VARIABLES QUE DETERMINAN EL TIPO DE COMPONENTE Y EL NUMERO DE ELLOS QUE SE MUESTRAN EN EL MAIN */
  public numJuegos: String
  public juegoIndividual: Juego
  public formatoJuegos: String
  /* VARIABLE QUE SE PASA AL COMPONENTE CARRITO POR NG INPUT PARA MOSTRAR LA VISTA CARRITO COMPLETA */
  public formatoCarrito: String = "carritoDesglose"
  public idUsuario: string  // VAR PARA ALMACENAR EL USUARIO LOGUEADO


  /*
   ██████  ██████  ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████  ██████  ██████  
  ██      ██    ██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██ 
  ██      ██    ██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██    ██ ██████  
  ██      ██    ██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██ 
   ██████  ██████  ██   ████ ███████    ██    ██   ██  ██████   ██████    ██     ██████  ██   ██ 
  */

  constructor(
    /* INSTANCIAMOS EL OBJETO DEL SERVICE */
    public objetoJuegosService: JuegosService,
    private comunicacionService: ComunicacionService,
    private objetoUsuarioService: UsuariosService) {



    /*
    ██      ██ ███████ ████████ ███████ ███    ██ ███████ ██████  ███████ 
    ██      ██ ██         ██    ██      ████   ██ ██      ██   ██ ██      
    ██      ██ ███████    ██    █████   ██ ██  ██ █████   ██████  ███████ 
    ██      ██      ██    ██    ██      ██  ██ ██ ██      ██   ██      ██ 
    ███████ ██ ███████    ██    ███████ ██   ████ ███████ ██   ██ ███████ DENTRO DEL CONSTRUCTOR
    */




    /* 
     ██████  █████  ████████ ███████  ██████   ██████  ██████  ██  █████  ███████ 
    ██      ██   ██    ██    ██      ██       ██    ██ ██   ██ ██ ██   ██ ██      
    ██      ███████    ██    █████   ██   ███ ██    ██ ██████  ██ ███████ ███████ 
    ██      ██   ██    ██    ██      ██    ██ ██    ██ ██   ██ ██ ██   ██      ██ 
     ██████ ██   ██    ██    ███████  ██████   ██████  ██   ██ ██ ██   ██ ███████ 
    */

    /* TODOS */
    this.comunicacionService.invocarMetodoTodosObservable.subscribe(
      () => {
        /* CADA VEZ QUE VAYAMOS A MOSTRAR JUEGOS HAY QUE CAMBIAR LA VAR VENTANA A 
        JUEGOS POR SI VENIMOS DEL REGISTRO, DE LA LISTA DE USUARIOS ETC */
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"

        this.objetoJuegosService.mostrarJuegos()
          .subscribe(res => {
            // LE DECIMOS QUE NOS DE COMO RESPUESTA EL ARRAY DE JUEGOS
            this.objetoJuegosService.juegos = res as Juego[];
            this.actualizarResultados();
            this.actualizarTitulo("Todos los juegos")
          })

        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );


    /* GENERO */
    this.comunicacionService.invocarMetodoGeneroObservable.subscribe(
      (genero: String) => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"

        this.objetoJuegosService.mostrarJuegosGenero(genero)
          .subscribe(res => {
            this.objetoJuegosService.juegos = res as Juego[];
            this.actualizarResultados();
            this.actualizarTitulo("juegos por género: " + genero);

          })

        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* PLATAFORMA */
    this.comunicacionService.invocarMetodoPlataformaObservable.subscribe(
      (plataforma: String) => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"

        this.objetoJuegosService.mostrarJuegosPlataforma(plataforma)
          .subscribe(res => {
            this.objetoJuegosService.juegos = res as Juego[];
            this.actualizarResultados();
            this.actualizarTitulo("juegos de " + plataforma);
          })

        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* LANZAMIENTO */
    this.comunicacionService.invocarMetodoLanzamientoObservable.subscribe(
      (lanzamiento: Number) => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"

        this.objetoJuegosService.mostrarJuegosLanzamiento(lanzamiento)
          .subscribe(res => {
            this.objetoJuegosService.juegos = res as Juego[];
            switch (lanzamiento) {
              case 1990:
                this.actualizarTitulo("juegos de los 90");
                break;
              case 2000:
                this.actualizarTitulo("juegos de los 2000");
                break;
              case 2010:
                this.actualizarTitulo("juegos de los 2010");
                break;
              case 2020:
                this.actualizarTitulo("juegos desde el 2020");
              default:
                break;
            }
            this.actualizarResultados();
          })

        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* SIN STOCK */
    this.comunicacionService.invocarMetodoSinStockObservable.subscribe(
      () => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"

        this.objetoJuegosService.mostrarJuegosSinStock()
          .subscribe(res => {
            this.objetoJuegosService.juegos = res as Juego[];
            this.actualizarResultados();
            this.actualizarTitulo("juegos actualmente sin stock");
          })

        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* NUM STOCK */
    this.comunicacionService.invocarMetodoNumStockObservable.subscribe(
      (numStock: number) => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"
        this.objetoJuegosService.mostrarJuegosNumStock(numStock)
          .subscribe(res => {
            console.log(numStock)
            this.objetoJuegosService.juegos = res as Juego[];
          })
      }
    );

    /* EMPEZAR POR */
    this.comunicacionService.invocarMetodoEmpPorObservable.subscribe(
      (letra: string) => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"
        this.objetoJuegosService.mostrarJuegosEmpPor(letra)
          .subscribe(res => {
            console.log(letra)
            this.objetoJuegosService.juegos = res as Juego[];
          })
      }
    );

    /* BUSQUEDA POR NOMBRE */
    this.comunicacionService.invocarMetodoBusquedaNombreObservable.subscribe(
      (busqueda: string) => {
        this.ventana = "juegos"
        this.formatoJuegos = "formatoPequeno"
        this.numJuegos = "varios"
        this.comunicacionService.invocarMetodoOcultarVistaPrevia();

        this.objetoJuegosService.mostrarJuegosBusqueda(busqueda)
          .subscribe(res => {
            this.objetoJuegosService.juegos = res as Juego[];
            this.actualizarResultados();
            this.actualizarTitulo("Búsqueda de juegos");
          })

      }
    );

    /* CAMBIAR TIPO DE VISTA: ENTRE CARTAS Y FICHAS */
    this.comunicacionService.invocarMetodoCambiarVistaObservable.subscribe(
      () => {

        /* SI EL NUMERO DE JUEGOS ES UNO (UNA ÚNICA FICHA GRANDE) PASAMOS A VARIOS JUEGOS PEQUEÑOS */
        if (this.numJuegos == "uno") {
          this.numJuegos = "varios"
          this.formatoJuegos = "formatoPequeno"
          /* SI NO, TENEMOS VARIOS JUEGOS */
        } else {
          /* ENTONCES SI EL FORMATO ES GRANDE, LO HACEMOS PEQUEÑO Y VICEVERSA */
          if (this.formatoJuegos == "formatoGrande") {
            this.formatoJuegos = "formatoPequeno"
          } else {
            this.formatoJuegos = "formatoGrande"
          }
        }
      }

    );

    /* MOSTRAR FICHA DE UN JUEGO CUANDO ES CLICADO */
    this.comunicacionService.invocarMetodoMostrarFichaObservable.subscribe(
      (juego: Juego) => {
        this.numJuegos = "uno"
        this.formatoJuegos = "ficha"
        this.juegoIndividual = juego
      }
    );


    /* 
        ███████ ██ ███    ██     ██       ██████   ██████  ██ ███    ██ 
        ██      ██ ████   ██     ██      ██    ██ ██       ██ ████   ██ 
        ███████ ██ ██ ██  ██     ██      ██    ██ ██   ███ ██ ██ ██  ██ 
             ██ ██ ██  ██ ██     ██      ██    ██ ██    ██ ██ ██  ██ ██ 
        ███████ ██ ██   ████     ███████  ██████   ██████  ██ ██   ████ 
    */

    /* MOSTRAR BIENVENIDA */
    this.comunicacionService.invocarMetodoBienvenidaObservable.subscribe(
      () => {
        this.ventana = "bienvenida"
        this.actualizarTitulo("Bienvenida")
        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* MOSTRAR REGISTRO */
    this.comunicacionService.invocarMetodoRegistroObservable.subscribe(
      () => {
        this.ventana = "registro"
        this.actualizarTitulo("Registro de usuario");
        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );


    /* 
        ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
        ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
        ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
        ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
         ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
    */


    this.comunicacionService.invocarMetodoCarritoObservable.subscribe(
      () => {
        this.ventana = "carrito"
        this.actualizarTitulo("Desglose de carrito de compra");
      }
    );


    this.comunicacionService.invocarMetodoComprasObservable.subscribe(
      (idUsuario: string) => {
        /* IGUALAMOS EL ID USUARIO AL LOCAL DEL COMPONENTE PARA PASARLO POR INPUT AL COMPONENTE COMPRAS */
        this.idUsuario = idUsuario
        this.ventana = "compras"
        this.actualizarTitulo("Historial de compras");
      }
    );

    this.comunicacionService.invocarMetodoCuentaObservable.subscribe(
      (idUsuario: string) => {
        /* IGUALAMOS EL ID USUARIO AL LOCAL DEL COMPONENTE PARA PASARLO POR INPUT AL COMPONENTE CUENTA */
        this.idUsuario = idUsuario
        this.ventana = "cuenta"
        this.actualizarTitulo("Cuenta y ajustes de usuario");
      }
    );

    /* 
     █████  ██████  ███    ███ ██ ███    ██ 
    ██   ██ ██   ██ ████  ████ ██ ████   ██ 
    ███████ ██   ██ ██ ████ ██ ██ ██ ██  ██ 
    ██   ██ ██   ██ ██  ██  ██ ██ ██  ██ ██ 
    ██   ██ ██████  ██      ██ ██ ██   ████ 
    */

    /* MOSTRAR FORMULARIO DE ALTA DE JUEGOS */
    this.comunicacionService.invocarMetodoAddJuegoObservable.subscribe(
      () => {
        this.ventana = "addjuego"
        /* REINSTANCIAMOS EL JUEGO SELECCIONADO DEL SERVICE, POR SI VENIMOS DE LISTA DE JUEGOS EDITANDO UN JUEGO,
        LOS PARÁMETROS NO APAREZCAN EN PRIMERA INSTANCIA DE ESTE*/
        this.actualizarTitulo("Alta de videojuegos");
        this.objetoJuegosService.juegoSeleccionado = new Juego
      }
    );

    /* MOSTRAR LISTA DE JUEGOS */
    this.comunicacionService.invocarMetodoListaJuegosObservable.subscribe(
      () => {
        this.ventana = "lista juegos"
        this.actualizarTitulo("Lista de juegos");
        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* MOSTRAR LISTA DE USUARIOS */
    this.comunicacionService.invocarMetodoListaUsuariosObservable.subscribe(
      () => {
        this.ventana = "lista usuarios"
        this.actualizarTitulo("Lista de usuarios");
        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );

    /* MOSTRAR LISTA DE VENTAS */
    this.comunicacionService.invocarMetodoListaVentasObservable.subscribe(
      () => {
        this.ventana = "lista ventas"
        this.actualizarTitulo("Lista de ventas por juegos y plataformas");
        this.comunicacionService.invocarMetodoOcultarVistaPrevia();
      }
    );


  }







  /*
    ██   ███    ██   ██   ████████ 
    ██   ████   ██   ██      ██    
    ██   ██ ██  ██   ██      ██    
    ██   ██  ██ ██   ██      ██    
    ██   ██   ████   ██      ██    
  */
  /* INICIAMOS EL COMPONENTE, EN BIENVENIDA */
  ngOnInit(): void {
    this.ventana = "bienvenida"
    this.actualizarTitulo("Bienvenida")
  }




  /*
  ████████ ██ ████████ ██    ██ ██       ██████      ██████  ███████ ███████ ██    ██ ██   ████████  █████  ██████   ██████  ███████ 
     ██    ██    ██    ██    ██ ██      ██    ██     ██   ██ ██      ██      ██    ██ ██      ██    ██   ██ ██   ██ ██    ██ ██      
     ██    ██    ██    ██    ██ ██      ██    ██     ██████  █████   ███████ ██    ██ ██      ██    ███████ ██   ██ ██    ██ ███████ 
     ██    ██    ██    ██    ██ ██      ██    ██     ██   ██ ██           ██ ██    ██ ██      ██    ██   ██ ██   ██ ██    ██      ██ 
     ██    ██    ██     ██████  ███████  ██████      ██   ██ ███████ ███████  ██████  ███████ ██    ██   ██ ██████   ██████  ███████ 
  */

  /* MÉTODO QUE RECIBE UN STRING Y ACTUALIZA EL TÍTULO DEL MAIN */
  actualizarTitulo(titulo: String) {
    this.titulo = titulo;
  }

  /* MÉTODO ACTUALIZA EL SUBTITULO DEL MAIN, DONDE SE RECOGE EL NÚMERO DE JUEGOS MOSTRADOS */
  actualizarResultados() {
    /* LEE EL NÚMERO DE JUEGOS EN EL ARRAY DE JUEGOS DEL SERVICE PARA CONTARLOS */
    let num = this.objetoJuegosService.juegos.length;
    if (num == 0 || isUndefined(num)) {
      this.resultados = "No se han encontrado resultados"
    } else {
      this.resultados = num + " resultados encontrados"
    }
  }






}
