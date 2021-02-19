import { Component, Input, OnInit } from '@angular/core';
import { Juego } from 'src/app/models/Juego';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var M: any;

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  /* OBJETO JUEGO QUE OBTENEMOS DEL MAIN POR ngInput */
  @Input() juego: Juego;

  /* VARIABLES QUE RECOGEN LA RUTA DE LA IMAGEN DEL JUEGO Y EL ICONO DE SU PLATAFORMA */
  public imagePath: String;
  public iconPath: String;

  /* VARIABLE QUE RECOGE EL COLOR DE LA LABEL DE LA PLATAFORMA, PARA CAMBIAR CONFORME LA MISMA */
  public colorLabel: String;

  constructor(
    public comunicacionService: ComunicacionService,
    public usuariosService: UsuariosService,
    public carritoService: CarritoService
  ) { }

  /* 
  ██ ███    ██ ██ ████████ 
  ██ ████   ██ ██    ██    
  ██ ██ ██  ██ ██    ██    
  ██ ██  ██ ██ ██    ██    
  ██ ██   ████ ██    ██  
  */

  ngOnInit(): void {
    this.imagePath = "../../../../assets/images/" + this.juego.imagen + ".jpg"
    this.iconPath = "../../../../assets/images/" + this.juego.plataforma + ".png"
    this.actualizarColorPlataforma();
  }

  /* CAMBIAMOS EL VALOR DE COLOR LABEL EN FUNCIÓN DE LA PLATAFORMA DEL JUEGO, Y ASÍ SE CAMBIA POR ngStyle EN LA VISTA */
  actualizarColorPlataforma() {
    switch (this.juego.plataforma) {
      case "Steam":
        this.colorLabel = "black";
        break;
      case "Nintendo Switch":
        this.colorLabel = "red";
        break;
      case "Playstation 4":
        this.colorLabel = "#095dca";
        break;
      case "Playstation 5":
        this.colorLabel = "black";
        break;
      case "Xbox One":
        this.colorLabel = "#5aa153";
        break;
      case "Xbox Series":
        this.colorLabel = "#1BFF00";
        break;
      default:
        this.colorLabel = "black";
        break;
    }
  }

  /* 
   ██████  ██████  ███    ███ ██████  ██████   █████  ██████  
  ██      ██    ██ ████  ████ ██   ██ ██   ██ ██   ██ ██   ██ 
  ██      ██    ██ ██ ████ ██ ██████  ██████  ███████ ██████  
  ██      ██    ██ ██  ██  ██ ██      ██   ██ ██   ██ ██   ██ 
   ██████  ██████  ██      ██ ██      ██   ██ ██   ██ ██   ██ 
  */
  /* LANZADOR QUE ESCUCHA EL CARRITO PARA AÑADIR UNA UNIDAD DEL JUEGO */
  comprar() {
    if (this.usuariosService.usuarioSeleccionado._id!=null) {
      this.carritoService.addJuegoCarrito(this.juego)
    } else {
      M.toast({ html: "Inicie sesión para añadir juegos al carrito", classes: 'toastAmarillo' })
    }
  }


}
