import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {

  @Input() idUsuario: string;
  @Input() status: number;

  constructor(
    private comunicacionService: ComunicacionService) { }


  ngOnInit(): void {
    this.comunicacionService.invocarMetodoLoged()
  }

  /* 
    ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
    ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
    ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
    ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
     ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
  */

  carrito() {
    this.comunicacionService.invocarMetodoCarrito();
  }

  compras() {
    this.comunicacionService.invocarMetodoCompras(this.idUsuario);
  }

  cuenta() {
    this.comunicacionService.invocarMetodoCuenta(this.idUsuario);
  }




  /* 
   █████  ██████  ███    ███ ██ ███    ██ 
  ██   ██ ██   ██ ████  ████ ██ ████   ██ 
  ███████ ██   ██ ██ ████ ██ ██ ██ ██  ██ 
  ██   ██ ██   ██ ██  ██  ██ ██ ██  ██ ██ 
  ██   ██ ██████  ██      ██ ██ ██   ████ 
  */
  addJuego() {
    this.comunicacionService.invocarMetodoAddJuego();
    this.comunicacionService.invocarMetodoMostrarVistaPrevia();
  }

  listaJuegos() {
    this.comunicacionService.invocarMetodoListaJuegos();
  }

  listaUsuarios() {
    this.comunicacionService.invocarMetodoListaUsuarios();
  }

  listaVentas() {
    this.comunicacionService.invocarMetodoListaVentas();
  }




}
