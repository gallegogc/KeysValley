import { Component, Input, OnInit } from '@angular/core';
import { Juego } from 'src/app/models/Juego';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-vista-previa',
  templateUrl: './vista-previa.component.html',
  styleUrls: ['./vista-previa.component.css']
})
export class VistaPreviaComponent implements OnInit {

  public juegoVistaPrevia: Juego;

  constructor(
    public juegosService : JuegosService,
    public comunicationService: ComunicacionService
  ){
    /* CADA VEZ QUE SE ACTIVE MOSTRA VISTA PREVIA REACTUALIZAMOS EL JUEGO VISTA PREVIA */
    /* ESTO PERMITE ACTUALIZAR LA VISTA PREVIA CUANDO ESTAMOS EDITANDO UN JUEGO Y PASAMOS DIRECTAMENTE A EDITAR OTRO */
    this.comunicationService.invocarMetodoMostrarVistaPreviaObservable.subscribe(
      () => {
        this.juegoVistaPrevia = this.juegosService.juegoSeleccionado
      }
    );
  }

  /* NADA MÁS INSTANCIARSE Y VISUALIZARSE LA VISTA PREVIA IGUALAMOS EL JUEGO SELECCIONADO A UN OBJETO JUEGO VISTA PREVIA QUE PASAREMOS AL HIJO */
  /* NO PODEMOS RECOGER DIRECTAMENTE EL JUEGO SELECCIONADO EN LOS DISTINTOS COMPONENTES JUEGO
  PORQUE ESTAMOS REUTILIZANDO LOS COMPONENTES HIJO DEL MAIN, LOS CUALES HEREDABAN UN JUEGO U OTRO DEL ARRAY DE JUEGOS SERVICE RECORRIDOS CON UN NG FOR
  POR ESO HEMOS DE PASARLO POR NG INPUT TAMBIÉN */
  ngOnInit(): void {
    this.juegoVistaPrevia = this.juegosService.juegoSeleccionado
  }

}
