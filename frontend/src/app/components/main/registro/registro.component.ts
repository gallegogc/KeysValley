import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var M: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  constructor(
    public usuariosService: UsuariosService,
    public comunicacionService: ComunicacionService
  ) { }




  /* 
  ██ ███    ██ ██ ████████ 
  ██ ████   ██ ██    ██    
  ██ ██ ██  ██ ██    ██    
  ██ ██  ██ ██ ██    ██    
  ██ ██   ████ ██    ██  
  */
  ngOnInit(): void {
    /* AL INSTANCIAR EL COMPONENTE PONEMOS EL REGISTRO COMPLETO A FALSE PARA MOSTRAR EL FORMULARIO DE REGISTRO */
    this.usuariosService.registroCompleto = false
    /* OBTENEMOS EL ARRAY DE USUARIOS EN EL SERVICE */
    this.usuariosService.obtenerUsuarios()
  }


  llamarAltaUsuario(form: NgForm) {
    this.usuariosService.altaUsuario(form)
  }

  llamarReiniciarFormulario(form: NgForm) {
    this.usuariosService.reiniciarFormulario(form)
  }

}
