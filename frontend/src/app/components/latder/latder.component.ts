import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/models/Juego';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-latder',
  templateUrl: './latder.component.html',
  styleUrls: ['./latder.component.css']
})
export class LatderComponent implements OnInit {

  public loged: boolean
  // PARA PASAR A OPCIONES
  public idUsuario: String
  // PARA PASAR A OPCIONES Y MOSTRAR/OCULTAR CARRITO
  public status: number
  // PARA MOSTRAR/OCULTAR VISTA PREVIA
  public vistaPrevia: boolean;
  public juegoVistaPrevia: Juego;
  // VARIABLE QUE SE PASA AL HIJO PARA MOSTRAR CARRITO PEQUEÑO
  public formato: String = "carritoSimple";

  /* HACEMOS AL LATDER ESCUCHADOR DEL METODO AÑADIR JUEGO PARA QUE CUANDO SE CLIQUE EN LA OPCIÓN SE MUESTRE LA VISTA PREVIA */
  constructor(public objetoJuegosService: JuegosService,
    private comunicacionService: ComunicacionService) {

    /* 
      ██      ██ ███████ ████████ ███████ ███    ██ ███████ ██████  ███████ 
      ██      ██ ██         ██    ██      ████   ██ ██      ██   ██ ██      
      ██      ██ ███████    ██    █████   ██ ██  ██ █████   ██████  ███████ 
      ██      ██      ██    ██    ██      ██  ██ ██ ██      ██   ██      ██ 
      ███████ ██ ███████    ██    ███████ ██   ████ ███████ ██   ██ ███████
     */
    /* MOSTRAR VISTA PREVIA Y GUARDAR JUEGO SELECCIONADO */
    this.comunicacionService.invocarMetodoMostrarVistaPreviaObservable.subscribe(
      () => {
        this.vistaPrevia = true
        this.juegoVistaPrevia = objetoJuegosService.juegoSeleccionado
      }
    );

    /* OCULTAR VISTA PREVIA */
    this.comunicacionService.invocarMetodoOcultarVistaPreviaObservable.subscribe(
      () => {
        this.vistaPrevia = false
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
  ngOnInit(): void {
    /* EMPEZAMOS SIN LOGUEAR Y SIN VISTA PREVIA*/
    this.formato = "carritoSimple";
    this.loged = false
    this.vistaPrevia = false
  }
  /* 
    ███    ██  ██████        ███████ ██    ██ ███████ ███    ██ ████████ 
    ████   ██ ██             ██      ██    ██ ██      ████   ██    ██    
    ██ ██  ██ ██   ███ █████ █████   ██    ██ █████   ██ ██  ██    ██    
    ██  ██ ██ ██    ██       ██       ██  ██  ██      ██  ██ ██    ██    
    ██   ████  ██████        ███████   ████   ███████ ██   ████    ██  
   */
  recibir(event) {
    this.loged = event.loged
    this.idUsuario = event.idUsuario
    this.status = event.status
  }

}
