import { Component, Input, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Juego } from '../../../models/Juego';

@Component({
  selector: 'app-juego-sin-stock',
  templateUrl: './juego-sin-stock.component.html',
  styleUrls: ['./juego-sin-stock.component.css']
})
export class JuegoSinStockComponent implements OnInit {

  /* OBJETO JUEGO QUE OBTENEMOS DEL MAIN POR ngInput */
  @Input() juego: Juego;

  /* VARIABLES QUE RECOGEN LA RUTA DE LA IMAGEN DEL JUEGO Y EL ICONO DE SU PLATAFORMA */
  public imagePath: String;
  public iconPath: String;

  constructor(
    private comunicacionService: ComunicacionService
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




}
