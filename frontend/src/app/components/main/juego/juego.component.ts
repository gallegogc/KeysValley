import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Juego } from '../../../models/Juego';
declare var M: any;

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  /* OBJETO JUEGO QUE OBTENEMOS DEL MAIN POR ngInput */
  @Input() juego: Juego;

  /* VARIABLES QUE RECOGEN LA RUTA DE LA IMAGEN DEL JUEGO Y EL ICONO DE SU PLATAFORMA */
  public imagePath: String;
  public iconPath: String;

  constructor(
    private comunicacionService: ComunicacionService,
    public usuariosService: UsuariosService,
    public carritoService: CarritoService
  ) {

    /* 
    ██      ██ ███████ ████████ ███████ ███    ██ ███████ ██████  ███████ 
    ██      ██ ██         ██    ██      ████   ██ ██      ██   ██ ██      
    ██      ██ ███████    ██    █████   ██ ██  ██ █████   ██████  ███████ 
    ██      ██      ██    ██    ██      ██  ██ ██ ██      ██   ██      ██ 
    ███████ ██ ███████    ██    ███████ ██   ████ ███████ ██   ██ ███████ 
    */
    /* EL COMPONENTE JUEGO SE HACE ESCUCHADOR DEL METODO ACTUALIZAR IMAGEN PARA ACTUALIZAR LA IMAGEN EN LA VISTA PREVIA 
    AL DAR DE ALTA JUEGOS O EDITARLOS*/
    this.comunicacionService.invocarMetodoActualizarImagenObservable.subscribe(
      () => {
        this.imagePath = "../../../../assets/images/" + this.juego.imagen + ".jpg"
        this.iconPath = "../../../../assets/images/" + this.juego.plataforma + ".png"
      }
    );
  }

  /* 
  ██ ███    ██ ██ ████████ 
  ██ ████   ██ ██    ██    
  ██ ██ ██  ██ ██    ██    
  ██ ██  ██ ██ ██    ██    
  ██ ██   ████ ██    ██  
  */

  ngOnInit() {
    /* ACTUALIZAMOS LA IMAGEN Y EL ICONO AL LANZAR EL COMPONENTE */
    this.imagePath = "../../../../assets/images/" + this.juego.imagen + ".jpg"
    this.iconPath = "../../../../assets/images/" + this.juego.plataforma + ".png"
  }


  /* 
    ███    ███  ██████  ███████ ████████ ██████   █████  ██████      ███████ ██  ██████ ██   ██  █████  
    ████  ████ ██    ██ ██         ██    ██   ██ ██   ██ ██   ██     ██      ██ ██      ██   ██ ██   ██ 
    ██ ████ ██ ██    ██ ███████    ██    ██████  ███████ ██████      █████   ██ ██      ███████ ███████ 
    ██  ██  ██ ██    ██      ██    ██    ██   ██ ██   ██ ██   ██     ██      ██ ██      ██   ██ ██   ██ 
    ██      ██  ██████  ███████    ██    ██   ██ ██   ██ ██   ██     ██      ██  ██████ ██   ██ ██   ██  
    */
  /* LANZADOR QUE ESCUCHARÁ EL MAIN PARA PONER FORMATO A FICHA Y NUM JUEGOS A 1 PARA MOSTRAR EL JUEGO CLICADO */
  mostrarFicha() {
    this.comunicacionService.invocarMetodoMostrarFicha(this.juego)
  }

  /* 
   ██████  ██████  ███    ███ ██████  ██████   █████  ██████  
  ██      ██    ██ ████  ████ ██   ██ ██   ██ ██   ██ ██   ██ 
  ██      ██    ██ ██ ████ ██ ██████  ██████  ███████ ██████  
  ██      ██    ██ ██  ██  ██ ██      ██   ██ ██   ██ ██   ██ 
   ██████  ██████  ██      ██ ██      ██   ██ ██   ██ ██   ██ 
  */
  comprar() {
    if (this.usuariosService.usuarioSeleccionado._id!=null) {
      this.carritoService.addJuegoCarrito(this.juego)
    } else {
      M.toast({ html: "Inicie sesión para añadir juegos al carrito", classes: 'toastAmarillo' })
    }
  }

}
