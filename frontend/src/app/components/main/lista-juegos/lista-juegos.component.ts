import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Juego } from 'src/app/models/Juego';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';
declare var M: any;

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.css']
})
export class ListaJuegosComponent implements OnInit {

  /* TITULO DEL JUEGO EDITANDO PARA QUE APAREZCA EN LA PARTE SUPERIOR DEL FORMULARIO */
  public juegoEditando: String
  /* BOOLEANO QUE PERMITE MOSTRAR EL FORMULARIO DE EDICIÓN O NO */
  public mostrarEditor: boolean

  constructor(
    public objetoJuegosService: JuegosService,
    public comunicacionService: ComunicacionService
  ) {
  }



  /* 
  ██ ███    ██ ██ ████████ 
  ██ ████   ██ ██    ██    
  ██ ██ ██  ██ ██    ██    
  ██ ██  ██ ██ ██    ██    
  ██ ██   ████ ██    ██    
  */
  ngOnInit(): void {
    this.obtenerJuegos();
    this.mostrarEditor = false
  }


  /* 
   ██████  ██████  ████████ ███████ ███    ██ ███████ ██████           ██ ██    ██ ███████  ██████   ██████  ███████ 
  ██    ██ ██   ██    ██    ██      ████   ██ ██      ██   ██          ██ ██    ██ ██      ██       ██    ██ ██      
  ██    ██ ██████     ██    █████   ██ ██  ██ █████   ██████           ██ ██    ██ █████   ██   ███ ██    ██ ███████ 
  ██    ██ ██   ██    ██    ██      ██  ██ ██ ██      ██   ██     ██   ██ ██    ██ ██      ██    ██ ██    ██      ██ 
   ██████  ██████     ██    ███████ ██   ████ ███████ ██   ██      █████   ██████  ███████  ██████   ██████  ███████ 
  */
  /* MÉTODO ESCUCHA DE JUEGOS SERVICES PARA RECOGER TODOS LOS JUEGOS:
      - AL INICIAR EL COMPONENTE PARA MOSTRAR LA LISTA
      - ACTUALIZAR LA LISTA TRAS UN EDIT
      - ACTUALIZAR LA LISTA TRAS UN BORRADO */
  obtenerJuegos() {
    this.objetoJuegosService.mostrarJuegos()
      .subscribe(res => {
        this.objetoJuegosService.juegos = res as Juego[];
      })
  }


  /*      
   █████   ██████ ████████ ██ ██    ██  █████  ██████      ███████ ██████  ██ ████████  ██████  ██████  
  ██   ██ ██         ██    ██ ██    ██ ██   ██ ██   ██     ██      ██   ██ ██    ██    ██    ██ ██   ██ 
  ███████ ██         ██    ██ ██    ██ ███████ ██████      █████   ██   ██ ██    ██    ██    ██ ██████  
  ██   ██ ██         ██    ██  ██  ██  ██   ██ ██   ██     ██      ██   ██ ██    ██    ██    ██ ██   ██ 
  ██   ██  ██████    ██    ██   ████   ██   ██ ██   ██     ███████ ██████  ██    ██     ██████  ██   ██ 
  */
  /* MÉTODO QUE SE LLAMA CUANDO SE CLIQUE EN EL BOTÓN EDITAR */
  editarJuego(juego: Juego) {

    /* PONEMOS COMO JUEGO SELECCIONADO EL JUEGO SOBRE EL QUE HEMOS HECHO CLIC EN EDITAR */
    this.objetoJuegosService.juegoSeleccionado = juego;
    this.juegoEditando = this.objetoJuegosService.juegoSeleccionado.nombre
    /* MOSTRAMOS EL EDITOR */
    this.mostrarEditor = true
    /* MOSTRAMOS UN MENSAJE */
    M.toast({ html: 'SE HA HABILITADO UN EDITOR EN LA PARTE SUPERIOR DE ESTA VENTANA', classes: 'toastVerde' })
    /* MOSTRAMOS LA VISTA PREVIA */
    this.comunicacionService.invocarMetodoMostrarVistaPrevia();
  }


  /* 
   ██████  ██    ██  █████  ██████  ██████   █████  ██████       ██████  █████  ███    ███ ██████  ██  ██████  ███████ 
  ██       ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██     ██      ██   ██ ████  ████ ██   ██ ██ ██    ██ ██      
  ██   ███ ██    ██ ███████ ██████  ██   ██ ███████ ██████      ██      ███████ ██ ████ ██ ██████  ██ ██    ██ ███████ 
  ██    ██ ██    ██ ██   ██ ██   ██ ██   ██ ██   ██ ██   ██     ██      ██   ██ ██  ██  ██ ██   ██ ██ ██    ██      ██ 
   ██████   ██████  ██   ██ ██   ██ ██████  ██   ██ ██   ██      ██████ ██   ██ ██      ██ ██████  ██  ██████  ███████ 
  */
  /* MÉTODO QUE ACTUALIZA EL JUEGO AL GUARDAR CAMBIOS */
  addJuego(form: NgForm) {
    if (this.validarFormulario()) {
      if (!this.validarJuego()) {

        this.objetoJuegosService.actualizarJuego(form.value)
          .subscribe(res => {
            console.log(res);
            M.toast({ html: 'JUEGO ACTUALIZADO', classes: 'toastVerde' })
            /* REINICIAMOS LOS CAMPOS TRAS EDITAR*/
            this.reiniciarFormulario(form);
            this.obtenerJuegos();
            this.mostrarEditor = false
            /* CUANDO OCULTEMOS EL EDITOR OCULTAMOS LA VISTA PREVIA */
            this.comunicacionService.invocarMetodoOcultarVistaPrevia();
          })
      }
    }
  }



  /* 
  ██    ██  █████  ██      ██ ██████   █████  ██████      ███████  ██████  ██████  ███    ███ ██    ██ ██       █████  ██████  ██  ██████  
  ██    ██ ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ████  ████ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
  ██    ██ ███████ ██      ██ ██   ██ ███████ ██████      █████   ██    ██ ██████  ██ ████ ██ ██    ██ ██      ███████ ██████  ██ ██    ██ 
   ██  ██  ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ██  ██  ██ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
    ████   ██   ██ ███████ ██ ██████  ██   ██ ██   ██     ██       ██████  ██   ██ ██      ██  ██████  ███████ ██   ██ ██   ██ ██  ██████  
  */
  validarFormulario() {
    /* VALIDACIÓN DE INTRODUCCIÓN EN CAMPOS */
    if (!isDefined(this.objetoJuegosService.juegoSeleccionado.desarrolladora) || !isDefined(this.objetoJuegosService.juegoSeleccionado.genero) || !isDefined(this.objetoJuegosService.juegoSeleccionado.lanzamiento) || !isDefined(this.objetoJuegosService.juegoSeleccionado.nombre) || !isDefined(this.objetoJuegosService.juegoSeleccionado.plataforma) || !isDefined(this.objetoJuegosService.juegoSeleccionado.precio) || !isDefined(this.objetoJuegosService.juegoSeleccionado.resena) || !isDefined(this.objetoJuegosService.juegoSeleccionado.stock)) {
      M.toast({ html: "AL MENOS UN CAMPO ESTÁ VACÍO", classes: 'toastAmarillo' })
      return false;
    }
    if (this.objetoJuegosService.juegoSeleccionado.lanzamiento < 1990 || this.objetoJuegosService.juegoSeleccionado.lanzamiento > 2030) {
      M.toast({ html: "EL AÑO DE LANZAMIENTO DEBE ESTAR COMPRENDIDO ENTRE EL 1990 y 2030, INCLUÍDOS", classes: 'toastAmarillo' })
      return false;
    }
    return true
  }


  /*
  ██    ██  █████  ██      ██ ██████   █████  ██████           ██ ██    ██ ███████  ██████   ██████  
  ██    ██ ██   ██ ██      ██ ██   ██ ██   ██ ██   ██          ██ ██    ██ ██      ██       ██    ██ 
  ██    ██ ███████ ██      ██ ██   ██ ███████ ██████           ██ ██    ██ █████   ██   ███ ██    ██ 
   ██  ██  ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██   ██ ██    ██ ██      ██    ██ ██    ██ 
    ████   ██   ██ ███████ ██ ██████  ██   ██ ██   ██      █████   ██████  ███████  ██████   ██████  
  */
  /* RECORRE TODOS LOS JUEGOS EN LA BD COMPROBANDO QUE NO EXISTA YA UN JUEGO CON DICHO NOMBRE Y PLATAFORMA 
   SE VERIFICA QUE NO SEA EL JUEGO ACTUAL YA QUE SINO NO DEJARÍA ACTUALIZAR OTROS PARÁMETROS*/
  validarJuego() {
    for (let index = 0; index < this.objetoJuegosService.juegos.length; index++) {

      /* PARA PERMITIR LA EDICIÓN DE OTROS PARÁMETROS Y DEJAR EL NOMBRE Y LA PLATAFORMA SIN CAMBIAR DEBEMOS VERIFICAR QUE EL ID COMPROBADO NO SEA EL MISMO QUE EL ACTUAL */
      if (this.objetoJuegosService.juegos[index]._id != this.objetoJuegosService.juegoSeleccionado._id) {

        /* UNA VEZ LOS ID SON DISTINTOS, ENTONCES SI SE VERIFICA SI LOS NOMBRES Y LAS PLATAFORMAS COINCIDEN, IMPIDIENDO LA ACTUALIZACIÓN SI YA EXISTE */
        if (this.objetoJuegosService.juegos[index].nombre == this.objetoJuegosService.juegoSeleccionado.nombre) {
          if (this.objetoJuegosService.juegos[index].plataforma == this.objetoJuegosService.juegoSeleccionado.plataforma) {
            M.toast({ html: 'EL JUEGO YA EXISTE EN LA PLATAFORMA INDICADA', classes: 'toastRojo' })
            return true
          }
        }
      }
    }
    return false
  }

  /* 
██████  ███████ ██ ███    ██ ██  ██████ ██  █████  ██████      ███████  ██████  ██████  ███    ███ ██    ██ ██       █████  ██████  ██  ██████  
██   ██ ██      ██ ████   ██ ██ ██      ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ████  ████ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
██████  █████   ██ ██ ██  ██ ██ ██      ██ ███████ ██████      █████   ██    ██ ██████  ██ ████ ██ ██    ██ ██      ███████ ██████  ██ ██    ██ 
██   ██ ██      ██ ██  ██ ██ ██ ██      ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ██  ██  ██ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
██   ██ ███████ ██ ██   ████ ██  ██████ ██ ██   ██ ██   ██     ██       ██████  ██   ██ ██      ██  ██████  ███████ ██   ██ ██   ██ ██  ██████  
*/
  reiniciarFormulario(form: NgForm) {
    if (form) {
      form.reset();
      this.objetoJuegosService.juegoSeleccionado = new Juego();
    }
  }

  /* CUANDO SALIMOS SIN GUARDAR DEL EDITOR */
  salirEditar() {
    this.mostrarEditor = false; /* LO ESCONDEMOS */
    this.obtenerJuegos(); /* ACTUALIZAMOS LA LISTA POR SI CAMBIAMOS ALGÚN CAMPO QUE SE VE CORRECTAMENTE */
    this.comunicacionService.invocarMetodoOcultarVistaPrevia();
  }

  /* 
  ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████           ██ ██    ██ ███████  ██████   ██████  
  ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██          ██ ██    ██ ██      ██       ██    ██ 
  █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████           ██ ██    ██ █████   ██   ███ ██    ██ 
  ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██     ██   ██ ██    ██ ██      ██    ██ ██    ██ 
  ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██      █████   ██████  ███████  ██████   ██████  
  */
  eliminarJuego(juego: Juego) {
    if (window.confirm("Confirmación de eliminación:\n    - Juego: " + juego.nombre.toUpperCase() + "\n    - Plataforma: " + juego.plataforma.toUpperCase() + "")) {
      this.objetoJuegosService.borrarJuego(juego._id)
        // MOSTRAMOS UN MENSAJE
        .subscribe(res => {
          console.log(res);
          M.toast({ html: 'Juego eliminado' })
          this.obtenerJuegos();
        })
    }
  }








  /* 
     █████   ██████ ████████ ██    ██  █████  ██      ██ ███████  █████  ██████      ██ ███    ███  █████   ██████  ███████ ███    ██ 
    ██   ██ ██         ██    ██    ██ ██   ██ ██      ██    ███  ██   ██ ██   ██     ██ ████  ████ ██   ██ ██       ██      ████   ██ 
    ███████ ██         ██    ██    ██ ███████ ██      ██   ███   ███████ ██████      ██ ██ ████ ██ ███████ ██   ███ █████   ██ ██  ██ 
    ██   ██ ██         ██    ██    ██ ██   ██ ██      ██  ███    ██   ██ ██   ██     ██ ██  ██  ██ ██   ██ ██    ██ ██      ██  ██ ██ 
    ██   ██  ██████    ██     ██████  ██   ██ ███████ ██ ███████ ██   ██ ██   ██     ██ ██      ██ ██   ██  ██████  ███████ ██   ████ 
    */

  /* AL CAMBIAR EL VALOR DEL STRING JUEGO EDITANDO SALTA ESTA LLAMADA
  ACTUALIZA LA IMAGEN A MOSTRAR DE LA VISTA PREVIA */
  ngDoCheck(): void {
    this.comunicacionService.invocarMetodoActualizarImagen();
  }
}
