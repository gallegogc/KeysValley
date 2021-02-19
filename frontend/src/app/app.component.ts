import { Component } from '@angular/core';

@Component({  //DECORADOR
  selector: 'app-root', // ETIQUETA CON LA QUE LLAMAMOS AL COMPONENTE EN EL INDEX.HTML SERÁ <app-root>
  templateUrl: './app.component.html', // EL DECORADOR LLAMA A SU PARTE HTML, QUE ES EL DISEÑO (VISTA O PLANTILLA-TEMPLATE)
  styleUrls: ['./app.component.css'] // LOS ESTILOS TAMBIÉN POR SEPARADO
})

// UN DECORADOR VA A DAR UNA FUNCIONALIDAD EXTRA A LA CLASE A LA QUE LO EXPORTAMOS

export class AppComponent { // EXPORTACIÓN A LA CLASE 
  public title = 'frontend'; // LAS VARIABLES LAS DECLARAMOS AQUÍ Y LUEGO LAS LLAMAMOS DESDE LA VISTA: app.component.html
}
