import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {


  constructor(
    private comunicacionService: ComunicacionService) { 
    }



  ngOnInit(): void {
  }




  /* 
  ████████  ██████  ██████   ██████  ███████ 
     ██    ██    ██ ██   ██ ██    ██ ██      
     ██    ██    ██ ██   ██ ██    ██ ███████ 
     ██    ██    ██ ██   ██ ██    ██      ██ 
     ██     ██████  ██████   ██████  ███████ 
  */
  todos() {
    this.comunicacionService.invocarMetodoTodos();
  }




  /* 
  ██████  ██    ██ ███████  ██████  ██    ██ ███████ ██████   █████  
  ██   ██ ██    ██ ██      ██    ██ ██    ██ ██      ██   ██ ██   ██ 
  ██████  ██    ██ ███████ ██    ██ ██    ██ █████   ██   ██ ███████ 
  ██   ██ ██    ██      ██ ██ ▄▄ ██ ██    ██ ██      ██   ██ ██   ██ 
  ██████   ██████  ███████  ██████   ██████  ███████ ██████  ██   ██ 
  */
  busquedaJuego(nombre: string) {
    this.comunicacionService.invocarMetodoBusqueda(nombre);
  }




  /*
   ██████  ███████ ███    ██ ███████ ██████   ██████  ███████
  ██       ██      ████   ██ ██      ██   ██ ██    ██ ██
  ██   ███ █████   ██ ██  ██ █████   ██████  ██    ██ ███████
  ██    ██ ██      ██  ██ ██ ██      ██   ██ ██    ██      ██
   ██████  ███████ ██   ████ ███████ ██   ██  ██████  ███████
  */
  genero(genero: String) {
    this.comunicacionService.invocarMetodoGenero(genero);
  }



  /* 
  ██████  ██       █████  ████████  █████  ███████  ██████  ██████  ███    ███  █████  ███████ 
  ██   ██ ██      ██   ██    ██    ██   ██ ██      ██    ██ ██   ██ ████  ████ ██   ██ ██      
  ██████  ██      ███████    ██    ███████ █████   ██    ██ ██████  ██ ████ ██ ███████ ███████ 
  ██      ██      ██   ██    ██    ██   ██ ██      ██    ██ ██   ██ ██  ██  ██ ██   ██      ██ 
  ██      ███████ ██   ██    ██    ██   ██ ██       ██████  ██   ██ ██      ██ ██   ██ ███████ 
  */
  plataforma(plataforma: String) {
    this.comunicacionService.invocarMetodoPlataforma(plataforma);
  }



  /* 
  ██       █████  ███    ██ ███████  █████  ███    ███ ██ ███████ ███    ██ ████████  ██████  
  ██      ██   ██ ████   ██    ███  ██   ██ ████  ████ ██ ██      ████   ██    ██    ██    ██ 
  ██      ███████ ██ ██  ██   ███   ███████ ██ ████ ██ ██ █████   ██ ██  ██    ██    ██    ██ 
  ██      ██   ██ ██  ██ ██  ███    ██   ██ ██  ██  ██ ██ ██      ██  ██ ██    ██    ██    ██ 
  ███████ ██   ██ ██   ████ ███████ ██   ██ ██      ██ ██ ███████ ██   ████    ██     ██████ 
  */
  lanzamiento(año: Number) {
    this.comunicacionService.invocarMetodoLanzamiento(año);
  }



  /* 
  ███████ ██ ███    ██     ███████ ████████  ██████   ██████ ██   ██ 
  ██      ██ ████   ██     ██         ██    ██    ██ ██      ██  ██  
  ███████ ██ ██ ██  ██     ███████    ██    ██    ██ ██      █████   
       ██ ██ ██  ██ ██          ██    ██    ██    ██ ██      ██  ██  
  ███████ ██ ██   ████     ███████    ██     ██████   ██████ ██   ██ 
  */
  sinStock() {
    this.comunicacionService.invocarMetodoSinStock();
  }

  buscarNumStock() {
    let numStock = parseInt(prompt("Introduce el stock mínimo"))
    this.comunicacionService.invocarMetodoNumStock(numStock);
  }

  buscarEmpPor() {
    let letra = prompt("Introduce el texto por el que quieres que empiece")
    letra="^"+letra;
    this.comunicacionService.invocarMetodoEmpPor(letra);
  }

  /* 
   ██████  █████  ███    ███ ██████  ██  █████  ██████      ██    ██ ██ ███████ ████████  █████  
  ██      ██   ██ ████  ████ ██   ██ ██ ██   ██ ██   ██     ██    ██ ██ ██         ██    ██   ██ 
  ██      ███████ ██ ████ ██ ██████  ██ ███████ ██████      ██    ██ ██ ███████    ██    ███████ 
  ██      ██   ██ ██  ██  ██ ██   ██ ██ ██   ██ ██   ██      ██  ██  ██      ██    ██    ██   ██ 
   ██████ ██   ██ ██      ██ ██████  ██ ██   ██ ██   ██       ████   ██ ███████    ██    ██   ██
  */
  cambiarVista() {
    this.comunicacionService.invocarMetodoCambiarVista();
  }


}
