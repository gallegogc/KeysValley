import { isDefined } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var M: any;


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  /* ID USUARIO QUE VIENE DEL MAIN PARA PODER OBTENER EL USUARIO EN EL QUE ESTAMOS */
  @Input() idUsuario: string;
  public editando: boolean
  public pass2: string

  constructor(
    public objetoUsuariosService: UsuariosService,
    public comunicationService: ComunicacionService
  ) {
    this.editando = false
  }


  /* 
  ██ ███    ██ ██ ████████ 
  ██ ████   ██ ██    ██    
  ██ ██ ██  ██ ██    ██    
  ██ ██  ██ ██ ██    ██    
  ██ ██   ████ ██    ██  
  */
  ngOnInit(): void {
    this.obtenerUsuario();
  }





  /* 
   ██████  ██████  ████████ ███████ ███    ██ ███████ ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
  ██    ██ ██   ██    ██    ██      ████   ██ ██      ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ██    ██ ██████     ██    █████   ██ ██  ██ █████   ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
  ██    ██ ██   ██    ██    ██      ██  ██ ██ ██      ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
   ██████  ██████     ██    ███████ ██   ████ ███████ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
  */
  obtenerUsuario() {
    this.objetoUsuariosService.getUsuario(this.idUsuario)
      .subscribe(res => {
        this.objetoUsuariosService.usuarioSeleccionado = res as Usuario;
      })
  }




  /* 
  ██   ██  █████  ██████  ██ ██      ██ ████████  █████  ██████      ███████ ██████  ██  ██████ ██  ██████  ███    ██ 
  ██   ██ ██   ██ ██   ██ ██ ██      ██    ██    ██   ██ ██   ██     ██      ██   ██ ██ ██      ██ ██    ██ ████   ██ 
  ███████ ███████ ██████  ██ ██      ██    ██    ███████ ██████      █████   ██   ██ ██ ██      ██ ██    ██ ██ ██  ██ 
  ██   ██ ██   ██ ██   ██ ██ ██      ██    ██    ██   ██ ██   ██     ██      ██   ██ ██ ██      ██ ██    ██ ██  ██ ██ 
  ██   ██ ██   ██ ██████  ██ ███████ ██    ██    ██   ██ ██   ██     ███████ ██████  ██  ██████ ██  ██████  ██   ████ 
  */
  editar() {
    if (this.editando) {
      this.editando = false
    } else {
      this.editando = true
    }
  }




  /* 
  ███████ ██████  ██ ████████  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
  ██      ██   ██ ██    ██    ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  █████   ██   ██ ██    ██    ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
  ██      ██   ██ ██    ██    ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ███████ ██████  ██    ██    ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
  */
  editarUsuario(form: NgForm) {
    if (this.validarFormulario()) {

      this.forzarMinusculas();

      if (window.confirm("¿Desea realmente actualizar los datos del usuario?")) {
        this.objetoUsuariosService.editUsuario(form.value)
          .subscribe(res => {
            console.log(res);
            M.toast({ html: 'DATOS DE USUARIO ACTUALIZADOS', classes: 'toastVerde' })
            this.editando = false
          })
      }
    }
  }

  /* MÉTODO QUE TRANSFORMA EL USUARIO, NOMBRE Y APELLIDOS A MINÚSCULAS */
  forzarMinusculas() {
    this.objetoUsuariosService.usuarioSeleccionado.user = this.objetoUsuariosService.usuarioSeleccionado.user.toLowerCase();
    this.objetoUsuariosService.usuarioSeleccionado.nombre = this.objetoUsuariosService.usuarioSeleccionado.nombre.toLowerCase();
    this.objetoUsuariosService.usuarioSeleccionado.apellidos = this.objetoUsuariosService.usuarioSeleccionado.apellidos.toLowerCase();
  }

  validarFormulario() {
    /* VALIDACIÓN DE INTRODUCCIÓN EN CAMPOS */
    if (!isDefined(this.objetoUsuariosService.usuarioSeleccionado.user) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.pass) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.nombre) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.apellidos)) {
      M.toast({ html: "AL MENOS UN CAMPO ESTÁ VACÍO", classes: 'toastAmarillo' })
      return false;
    }

    /* VALIDACIÓN DEL FORMATO DEL USUARIO */
    let regexUser = new RegExp("^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");
    if (!regexUser.test(this.objetoUsuariosService.usuarioSeleccionado.user)) {
      M.toast({ html: "EL NOMBRE DE USUARIO NO PRESENTA UN FORMATO ADECUADO", classes: 'toastAmarillo' })
      return false;
    }

    /* VALIDACIÓN DE LAS CONTRASEÑAS */
    if (this.objetoUsuariosService.usuarioSeleccionado.pass != this.pass2) {
      M.toast({ html: "LAS CONTRASEÑAS NO COINDICEN", classes: 'toastAmarillo' })
      return false;
    }

    return true;
  }


  /* 
  ██████   █████       ██  █████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
  ██   ██ ██   ██      ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ██████  ███████      ██ ███████     ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
  ██   ██ ██   ██ ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ██████  ██   ██  █████  ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
  */
  baja() {
    // RECOJO EL USUARIO ACTUAL
    this.objetoUsuariosService.getUsuario(this.idUsuario)
      .subscribe(res => {
        this.objetoUsuariosService.usuarioSeleccionado = res as Usuario;
      })

    // CAMBIAMOS EL STATUS DEL USUARIO A 2, PARA DARLO DE BAJA
    this.objetoUsuariosService.usuarioSeleccionado.status = 2;
    // PASAMOS EL USUARIO SELECCIONADO PARA QUE LO EDITE Y LO DÉ DE BAJA
    if (window.confirm("Se está intentando dar de baja. ¿Realmente desea darse de baja? Esta opción ES IRREVERSIBLE.")) {
      this.objetoUsuariosService.editUsuario(this.objetoUsuariosService.usuarioSeleccionado)
        .subscribe(res => {
          console.log(res);
          M.toast({ html: 'USUARIO DADO DE BAJA CORRECTAMENTE', classes: 'toastVerde' })

          this.comunicationService.invocarMetodoCerrarSesion();
        })
    }
  }
}
