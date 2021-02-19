import { Component, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/Compra';
import { Juego } from 'src/app/models/Juego';
import { ComprasService } from 'src/app/services/compras.service';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {

  constructor(
    public comprasService: ComprasService,
    public juegosService: JuegosService
  ) {
  }


  ngOnInit(): void {
    this.comprasService.getJuegosCompradosTotales();
  }


}
