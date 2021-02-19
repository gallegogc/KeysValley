import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  constructor(
    public comunicationService : ComunicacionService
  ) { }

  ngOnInit(): void {
  }

  /* AL HACER CLIC EN LA IMAGEN MOSTRAMOS LA BIENVENIDA */
  bienvenida(){
    this.comunicationService.invocarMetodoBienvenida()
  }

}
