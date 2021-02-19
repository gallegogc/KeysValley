import { Component, Input, OnInit } from '@angular/core';
import { Juego } from 'src/app/models/Juego';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { JuegosService } from 'src/app/services/juegos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  /* RECIBIMOS EL idUsuario POR INPUT DEL PADRE LATDER */
  @Input() idUsuario: string;
  /* STRING QUE RECIBE Y CAMBIA EL FORMATO EN EL QUE SE MUESTRA EL CARRITO, PARA TENER SIMPLIFICADO Y DESGLOSE */
  @Input() formato: string;

  /* BOOLEANO QUE DETERMINA QUE SE MUESTRE EL MENSAJE DE COMPRA REALIZADA EN LA VISTA O EL CARRITO DESGLOSE */
  public compraCompleta: boolean

  constructor(
    public comunicationService: ComunicacionService,
    public comprasServices: ComprasService,
    public usuariosService: UsuariosService,
    public carritoService: CarritoService,
    public juegosService: JuegosService
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
    /* HACEMOS LA VAR COMPRA COMPLETADA FALSE EN CADA INICIO
    PARA QUE UNA VEZ SE HAYA REALIZADO LA COMPRA Y SE MUESTRE EL COMPONENTE COMO TAL
    SI SE VUELVE AL CARRITO SE MUESTRE NUEVAMENTE VACÍO Y SIN EL MENSAJE */
    this.compraCompleta = false;
  }



  /* 
  ██      ██       █████  ███    ███  █████  ██████   ██████  ██████  ███████ ███████ 
  ██      ██      ██   ██ ████  ████ ██   ██ ██   ██ ██    ██ ██   ██ ██      ██      
  ██      ██      ███████ ██ ████ ██ ███████ ██   ██ ██    ██ ██████  █████   ███████ 
  ██      ██      ██   ██ ██  ██  ██ ██   ██ ██   ██ ██    ██ ██   ██ ██           ██ 
  ███████ ███████ ██   ██ ██      ██ ██   ██ ██████   ██████  ██   ██ ███████ ███████
  */

  /* METODO QUE LLAMA A AÑADIR UNA UNIDAD AL CARRITO DEL JUEGO */
  llamarAddJuegoCarrito(juego: Juego) {
    this.carritoService.addJuegoCarrito(juego);
  }

  /* MÉTODO QUE LLAMA A ELIMINAR UNA UNIDAD DEL CARRITO*/
  llamarEliminarUnidadCarrito(index: number) {
    this.carritoService.eliminarUnidadCarrito(index);
  }

  /* MÉTODO A ELIMINAR TODAS LAS UNIDADES DE UN JUEGO EN EL CARRITO */
  llamarEliminarJuegoCarrito(index: number) {
    if (window.confirm("¿Desea eliminar el juego del carrito?")) {
      this.carritoService.eliminarJuegoCarrito(index);
    }
  }

  /* MÉTODO QUE LLAMA A VACIAR CARRITO */
  llamarVaciarCarrito() {
    this.carritoService.vaciarCarrito();
  }

  /* MÉTODO QUE LLAMA A CONFIRMAR COMPRA */
  llamarConfirmarCompra() {
    this.carritoService.confirmarCompra()
  }

}

