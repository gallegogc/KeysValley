import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Juego } from 'src/app/models/Juego';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';
declare var M: any;

@Component({
  selector: 'app-add-juego',
  templateUrl: './add-juego.component.html',
  styleUrls: ['./add-juego.component.css']
})
export class AddJuegoComponent implements OnInit {


  constructor(
    public objetoJuegosService: JuegosService,
    public comunicacionService: ComunicacionService
  ) { }

  ngOnInit(): void {
    /* RECARGAMOS EL ARRAY DE JUEGOS DE JUEGOSSERVICE YA QUE HAY QUE VALIDAR LUEGO QUE LA COMBINACIÓN NOMBRE-PLATAFORMA NO SE REPITA */
    this.obtenerJuegos();
    this.comunicacionService.invocarMetodoMostrarVistaPrevia()
  }

  obtenerJuegos() {
    this.objetoJuegosService.mostrarJuegos()
      .subscribe(res => {
        this.objetoJuegosService.juegos = res as Juego[];
      })
  }

  addJuego(form: NgForm) {
    if (this.validarFormulario()) {
      if (!this.validarJuego()) {
        if (window.confirm("DESEAS AÑADIR EL JUEGO?")) {

          this.objetoJuegosService.crearJuego(form.value)
            .subscribe(res => {
              console.log(res);
              M.toast({ html: 'JUEGO AÑADIDO', classes: 'toastVerde' })
              this.reiniciarFormulario(form);
              this.obtenerJuegos();
            })
        }
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
  validarJuego() {
    for (let index = 0; index < this.objetoJuegosService.juegos.length; index++) {
      if (this.objetoJuegosService.juegos[index].nombre == this.objetoJuegosService.juegoSeleccionado.nombre) {
        if (this.objetoJuegosService.juegos[index].plataforma == this.objetoJuegosService.juegoSeleccionado.plataforma) {
          M.toast({ html: 'EL JUEGO YA EXISTE EN LA PLATAFORMA INDICADA', classes: 'toastRojo' })
          return true
        }
      };
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
      this.objetoJuegosService.juegoSeleccionado.desarrolladora = ""
      this.objetoJuegosService.juegoSeleccionado.genero = ""
      this.objetoJuegosService.juegoSeleccionado.imagen = ""
      this.objetoJuegosService.juegoSeleccionado.nombre = ""
      this.objetoJuegosService.juegoSeleccionado.plataforma = ""
      this.objetoJuegosService.juegoSeleccionado.resena = ""
      this.objetoJuegosService.juegoSeleccionado.lanzamiento = 1990
      this.objetoJuegosService.juegoSeleccionado.precio = 0
      this.objetoJuegosService.juegoSeleccionado.stock = 0
    }
  }

/* 
   █████   ██████ ████████ ██    ██  █████  ██      ██ ███████  █████  ██████      ██ ███    ███  █████   ██████  ███████ ███    ██ 
  ██   ██ ██         ██    ██    ██ ██   ██ ██      ██    ███  ██   ██ ██   ██     ██ ████  ████ ██   ██ ██       ██      ████   ██ 
  ███████ ██         ██    ██    ██ ███████ ██      ██   ███   ███████ ██████      ██ ██ ████ ██ ███████ ██   ███ █████   ██ ██  ██ 
  ██   ██ ██         ██    ██    ██ ██   ██ ██      ██  ███    ██   ██ ██   ██     ██ ██  ██  ██ ██   ██ ██    ██ ██      ██  ██ ██ 
  ██   ██  ██████    ██     ██████  ██   ██ ███████ ██ ███████ ██   ██ ██   ██     ██ ██      ██ ██   ██  ██████  ███████ ██   ████ 
*/                                                                                                      

  /* PARA ACTUALIZAR LA IMAGEN Y EL ICONO UTILIZAMOS UN DOCHECK QUE LLAMA AL MÉTODO ACTUALIZAR IMAGEN DEL COMPONENTE JUEGO
  CUANDO CAMBIE LA VISTA DEL COMPONENTE ACTUAL, COMO EN EL CASO DE ESCRIBIR EN EL INPUT IMAGEN */
  ngDoCheck(): void {
    this.comunicacionService.invocarMetodoActualizarImagen();
  }

}
