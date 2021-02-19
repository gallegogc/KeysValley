import { Component, Input, OnInit } from '@angular/core';
import { Juego } from '../../../models/Juego';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  @Input() juego: Juego;
  public imagePath: String;

  constructor() { }

  ngOnInit(): void {
    this.imagePath = "../../../../assets/images/" + this.juego.imagen + ".jpg"
    this.comportamientoTituloJuego()
  }

  comportamientoTituloJuego() {
    if (document.getElementById('divModificado') != null) {
      console.log("RESTAURANDO")
      // RECOGEMOS EL DIV MODIFICADO
      var divModificado = document.getElementById('divModificado');

      // CREAMOS UN MARQUEE
      var marquee = document.createElement('marquee');
      marquee.setAttribute("direction", "right");
      marquee.setAttribute("width", "140vw");
      marquee.setAttribute("behavior", "alternate");
      // IGUALAMOS EL CONTENIDO DEL DIV AL MARQUE
      let nombreJuego = this.juego.nombre
      marquee.innerHTML = '<marquee direction="right" width="140vw" behavior="alternate"><h5 class="tituloJuego">'+nombreJuego+'</h5></marquee>'

      // COGEMOS EL PADRE DEL DIV MODIFICADO Y SUSTITUIMOS EL HIJO POR EL MARQUEE
      divModificado.parentNode.replaceChild(marquee, divModificado);
      console.log(marquee.parentElement.innerHTML)
    }

    // SI TIENE MENOS DE 15 CARACTERES LO TRANSFORMAMOS A DIV
    if (this.juego.nombre.length < 17) {
      console.log("PARADO: " + this.juego.nombre)
      // RECOGEMOS EL MARQUEE
      var tituloMovil = document.getElementsByTagName('marquee')[0];

      // CREAMOS UN DIV
      var div = document.createElement('div');

      // IGUALAMOS EL CONTENIDO DEL MARQUE AL DIV
      let nombreJuego = this.juego.nombre

      div.innerHTML = '<h5 class="tituloJuego">'+nombreJuego+'</h5>';
      // LE APLICAMOS UN id PARA RECONOCERLO AL QUITARLO
      div.setAttribute("id", "divModificado");
      // COGEMOS EL PADRE DEL MARQUEE Y SUSTITUIMOS EL HIJO POR EL DIV
      tituloMovil.parentNode.replaceChild(div, tituloMovil);
      console.log(div.parentElement.innerHTML)
    } else {
      console.log("MOVIENDO: " + this.juego.nombre)
    }
  }

}
