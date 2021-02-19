import { isDefined } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var M: any;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  public usuarioEditando: String
  public mostrarEditor: boolean


  /*
   ██████  ██████  ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████  ██████  ██████  
  ██      ██    ██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██ 
  ██      ██    ██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██    ██ ██████  
  ██      ██    ██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██ 
   ██████  ██████  ██   ████ ███████    ██    ██   ██  ██████   ██████    ██     ██████  ██   ██ 
  */
  constructor(
    /* INSTANCIAMOS EL OBJETO DEL SERVICE */
    public objetoUsuariosService: UsuariosService
  ) { }






  /*
    ██   ███    ██   ██   ████████ 
    ██   ████   ██   ██      ██    
    ██   ██ ██  ██   ██      ██    
    ██   ██  ██ ██   ██      ██    
    ██   ██   ████   ██      ██    
  */

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  /* 
  
   ██████  ██████  ████████ ███████ ███    ██ ███████ ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  ███████ 
  ██    ██ ██   ██    ██    ██      ████   ██ ██      ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ ██      
  ██    ██ ██████     ██    █████   ██ ██  ██ █████   ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ ███████ 
  ██    ██ ██   ██    ██    ██      ██  ██ ██ ██      ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██      ██ 
   ██████  ██████     ██    ███████ ██   ████ ███████ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  ███████ 
  */

  obtenerUsuarios() {
    this.objetoUsuariosService.getUsuarios()
      .subscribe(res => {
        // LE DECIMOS QUE NOS DE COMO RESPUESTA UN ARRAY DE EMPLEADOS
        this.objetoUsuariosService.usuarios = res as Usuario[];
      })
  }

  /* MÉTODO QUE SE LLAMA CUANDO SE CLIQUE EN EL BOTÓN EDITAR */
  editarUsuario(usuario: Usuario) {
    // ACTUALIZA EL OBJETO empladoSeleccionado CON EL usuario RECIBIDO, QUE LO OBTENEMOS GRACIAS A QUE
    // EL ICONO TIENE ASOCIADO UNA LLAMADA A ESTE METODO PASÁNDOLE EL usuario EN CUESTIÓN
    this.objetoUsuariosService.usuarioSeleccionado = usuario;
    this.usuarioEditando = usuario.nombre
    this.mostrarEditor = true
    M.toast({ html: 'SE HA HABILITADO UN EDITOR EN LA PARTE SUPERIOR DE ESTA VENTANA', classes: 'toastVerde' })
  }

  /* MÉTODO QUE ACTUALIZA EL USUARIO AL GUARDAR CAMBIOS */
  addUsuario(form: NgForm) {
    if (this.validarFormulario()) {
      if (!this.validarUsuario()) {

        this.objetoUsuariosService.editUsuario(form.value)
          .subscribe(res => {
            console.log(res);
            M.toast({ html: 'USUARIO ACTUALIZADO', classes: 'toastVerde' })
            this.reiniciarFormulario(form);
            this.obtenerUsuarios();
            this.mostrarEditor = false
          })
      }
    }
  }

  /* 
  ██    ██  █████  ██      ██ ██████   █████  ██████      ███████  ██████  ██████  ███    ███ ██    ██ ██       █████  ██████  ██  ██████  
  ██    ██ ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ████  ████ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
  ██    ██ ███████ ██      ██ ██   ██ ███████ ██████      █████   ██    ██ ██████  ██ ████ ██ ██    ██ ██      ███████ ██████  ██ ██    ██ 
   ██  ██  ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ██  ██  ██ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
    ████   ██   ██ ███████ ██ ██████  ██   ██ ██   ██     ██       ██████  ██   ██ ██      ██  ██████  ███████ ██   ██ ██   ██ ██  ██████
  */

  validarFormulario() {
    /* VALIDACIÓN DE INTRODUCCIÓN EN CAMPOS */
    if (!isDefined(this.objetoUsuariosService.usuarioSeleccionado.user) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.pass) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.nombre) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.apellidos) || !isDefined(this.objetoUsuariosService.usuarioSeleccionado.status)) {
      M.toast({ html: "AL MENOS UN CAMPO ESTÁ VACÍO", classes: 'toastAmarillo' })
      return false;
    }
    if (this.objetoUsuariosService.usuarioSeleccionado.status < 0 || this.objetoUsuariosService.usuarioSeleccionado.status > 2) {
      M.toast({ html: "EL STATUS DEBE ESTAR COMPRENDIDO ENTRE 0 y 2, INCLUÍDOS", classes: 'toastAmarillo' })
      return false;
    }
    return true
  }


  /*  
   ██    ██  █████  ██      ██ ██████   █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
   ██    ██ ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
   ██    ██ ███████ ██      ██ ██   ██ ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
    ██  ██  ██   ██ ██      ██ ██   ██ ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
     ████   ██   ██ ███████ ██ ██████  ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
    */

  /* RECORRE TODOS LOS USUARIOS EN LA BD COMPROBANDO QUE NO EXISTA OTRO CON EL MISMO NOMBRE DE USUARIO 
  SE VERIFICA QUE NO SEA EL USUARIO ACTUAL YA QUE SINO NO DEJARÍA ACTUALIZAR OTROS PARÁMETROS*/
  validarUsuario() {
    for (let index = 0; index < this.objetoUsuariosService.usuarios.length; index++) {
      /* PARA PERMITIR LA EDICIÓN DE OTROS PARÁMETROS Y DEJAR EL USER NAME SIN CAMBIAR DEBEMOS VERIFICAR QUE EL ID COMPROBADO NO SEA EL MISMO QUE EL ACTUAL */
      if (this.objetoUsuariosService.usuarios[index]._id != this.objetoUsuariosService.usuarioSeleccionado._id) {
        /* UNA VEZ LOS ID SON DISTINTOS, ENTONCES SI SE VERIFICA SI EL USER NAME ES EL MISMO, IMPIDIENDO LA ACTUALIZACIÓN SI YA EXISTE */
        if (this.objetoUsuariosService.usuarios[index].user == this.objetoUsuariosService.usuarioSeleccionado.user) {
          M.toast({ html: 'EL NOMBRE DE USUARIO INDICADO YA EXISTE', classes: 'toastRojo' })
          return true
        }
      }
    }
    return false
  }







  /* 
  ███████ ██      ██ ███    ███ ██ ███    ██  █████  ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
  ██      ██      ██ ████  ████ ██ ████   ██ ██   ██ ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  █████   ██      ██ ██ ████ ██ ██ ██ ██  ██ ███████ ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
  ██      ██      ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ███████ ███████ ██ ██      ██ ██ ██   ████ ██   ██ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████ 
  */
  eliminarUsuario(usuario: Usuario) {
    if (window.confirm("Quieres eliminar el usuario?")) {
      this.objetoUsuariosService.deleteUsuario(usuario._id)
        // MOSTRAMOS UN MENSAJE
        .subscribe(res => {
          console.log(res);
          M.toast({ html: 'USUARIO ELIMINADO', classes: 'toastVerde' })
          this.obtenerUsuarios();
        })
    }
  }



  /* 
  ██████  ███████ ██ ███    ██ ██  ██████ ██  █████  ██████      ███████  ██████  ██████  ███    ███ 
  ██   ██ ██      ██ ████   ██ ██ ██      ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ████  ████ 
  ██████  █████   ██ ██ ██  ██ ██ ██      ██ ███████ ██████      █████   ██    ██ ██████  ██ ████ ██ 
  ██   ██ ██      ██ ██  ██ ██ ██ ██      ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ██  ██  ██ 
  ██   ██ ███████ ██ ██   ████ ██  ██████ ██ ██   ██ ██   ██     ██       ██████  ██   ██ ██      ██ 
  */

  reiniciarFormulario(form: NgForm) {
    if (form) {
      form.reset();
      this.objetoUsuariosService.usuarioSeleccionado = new Usuario();
    }
  }


  /* 
  ███████  █████  ██      ██ ██████      ███████ ██████  ██  ██████ ██  ██████  ███    ██ 
  ██      ██   ██ ██      ██ ██   ██     ██      ██   ██ ██ ██      ██ ██    ██ ████   ██ 
  ███████ ███████ ██      ██ ██████      █████   ██   ██ ██ ██      ██ ██    ██ ██ ██  ██ 
       ██ ██   ██ ██      ██ ██   ██     ██      ██   ██ ██ ██      ██ ██    ██ ██  ██ ██ 
  ███████ ██   ██ ███████ ██ ██   ██     ███████ ██████  ██  ██████ ██  ██████  ██   ████ 
  */

  /* CUANDO SALIMOS SIN GUARDAR DEL EDITOR */
  salirEditar(form: NgForm) {
    this.mostrarEditor = false; /* LO ESCONDEMOS */
    this.obtenerUsuarios(); /* ACTUALIZAMOS LA LISTA POR SI CAMBIAMOS ALGÚN CAMPO QUE SE VE CORRECTAMENTE */
  }

}
