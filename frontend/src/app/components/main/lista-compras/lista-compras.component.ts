import { Component, Input, OnInit } from '@angular/core';
import { Compra } from 'src/app/models/Compra';
import { Juego } from 'src/app/models/Juego';
import { ComprasService } from 'src/app/services/compras.service';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  @Input() idUsuario: string;

  public arrayTuplasJuegosCompra: [number, Juego, string][] = [];

  constructor(
    public comprasService: ComprasService,
    public juegosService: JuegosService
  ) {
  }

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras() {
    // COGEMOS LAS COMPRAS SÓLO DEL USUARIO ACTUAL
    this.comprasService.mostrarCompraUsuario(this.idUsuario)
      .subscribe(res => {
        console.log(res)
        this.comprasService.compras = res as Compra[];

        /* RECORREMOS TODAS LAS COMPRAS DEL USUARIO */
        for (let w = 0; w < this.comprasService.compras.length; w++) {
          /* EN CADA ITERACIÓN COGEMOS ESA COMPRA Y LA PONEMOS EN LA SELECCIONADA PARA PODER MANEJARLA */
          this.comprasService.compraSeleccionado = this.comprasService.compras[w]

          /* RECORREMOS TODOS LOS ID JUEGOS QUE EL USUARIO COMPRÓ EN ESA COMPRA */
          for (let x = 0; x < this.comprasService.compraSeleccionado.idJuegos.length; x++) {
            /* Y RECORREMOS TODOS LOS JUEGOS DE LA BASE DE DATOS */
            for (let j = 0; j < this.juegosService.juegos.length; j++) {
              /* CUANDO COINCIDA EL STRING ID DEL JUEGO DE LA COMPRA CON EL ID DEL JUEGO HACEMOS UN PUSH DE:
              - EL INDICE DE LA COMPRA EN LA QUE ESTAMOS
              - EL JUEGO
              - LA CLAVE DEL JUEGO QUE RECOGEMOS DEL ARRAY DE KEYS DE LA COMPRA SELECCIONADA
              A LA TUPLA LOCAL DE JUEGOS*/
              if (this.comprasService.compraSeleccionado.idJuegos[x] == this.juegosService.juegos[j]._id) {
                this.arrayTuplasJuegosCompra.push([w, this.juegosService.juegos[j], this.comprasService.compraSeleccionado.keys[x]])
              }
            }
          }
        }
      })
  }
}


