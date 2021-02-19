import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/Usuario';
import { CarritoService } from './carrito.service';
declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient    ) {
    this.usuarioSeleccionado = new Usuario();
  }

  public usuarioSeleccionado: Usuario
  public usuarios: Array<Usuario>

  public registroCompleto = false
  public pass2: string


  /* CONSTANTE CON LA RUTA DE LOS USUARIOS EN NUESTRO SERVIDOR */
  readonly URL = 'http://localhost:3000/api/usuarios'

  getUsuarios() {
    return this.http.get(this.URL + `/todos/`);
  }

  getUsuario(_id: String) {
    return this.http.get(this.URL + `/todos/${_id}`);
  }

  addUsuario(usuario: Usuario) {
    return this.http.post(this.URL, usuario);
  }

  /* ESTE MÉTODO RECIBE EL OBJETO usuario */
  editUsuario(usuario: Usuario) {
    return this.http.put(this.URL + `/${usuario._id}`, usuario);
  }

  /*  ESTE MÉTODO RECIBE EL ID DE USUARIO */
  deleteUsuario(_id: String) {
    return this.http.delete(this.URL + `/${_id}`);
  }








  obtenerUsuarios() {
    this.getUsuarios()
      .subscribe(res => {
        this.usuarios = res as Usuario[];
      })
  }






  /* 
   █████  ██   ████████  █████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  
  ██   ██ ██      ██    ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ███████ ██      ██    ███████     ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ 
  ██   ██ ██      ██    ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██ 
  ██   ██ ███████ ██    ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  
*/
  altaUsuario(form: NgForm) {
    if (this.validarFormulario()) {
      /* FORZAMOS A MINUSCULAS */
      this.forzarMinusculas();

      if (window.confirm("¿Desea realmente darse de alta?")) {
        /* HACEMOS EL ADD USUARIO  */
        this.addUsuario(form.value)
          .subscribe(res => {
            console.log(res);
            M.toast({ html: 'REGISTRO DE USUARIO COMPLETADO', classes: 'toastVerde' })
            this.reiniciarFormulario(form);
            this.registroCompleto = true

            /* LLAMAMOS A RECARGAR USUARIOS Y CARRITOS QUE LO ESCUCHA EL LOGIN PARA RECARGARLOS Y PODER LOGUEAR NADA MÁS REGISTRARNOS */
            this.obtenerUsuarios();
            window.location.reload();
          })
      }
    }
  }

  /* MÉTODO QUE TRANSFORMA EL USUARIO, NOMBRE Y APELLIDOS A MINÚSCULAS */
  forzarMinusculas() {
    this.usuarioSeleccionado.user = this.usuarioSeleccionado.user.toLowerCase();
    this.usuarioSeleccionado.nombre = this.usuarioSeleccionado.nombre.toLowerCase();
    this.usuarioSeleccionado.apellidos = this.usuarioSeleccionado.apellidos.toLowerCase();
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
    if (this.usuarioSeleccionado.user == null || this.usuarioSeleccionado.pass==null || this.usuarioSeleccionado.nombre==null || this.usuarioSeleccionado.apellidos==null) {
      M.toast({ html: "AL MENOS UN CAMPO ESTÁ VACÍO", classes: 'toastAmarillo' })
      return false;
    }

    /* VALIDACIÓN DEL USUARIO */
    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].user == this.usuarioSeleccionado.user) {
        M.toast({ html: "EL USUARIO YA ESTÁ EN USO", classes: 'toastRojo' })
        return false;
      }
    }

    /* VALIDACIÓN DEL FORMATO DEL USUARIO */
    let regexUser = new RegExp("^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");
    if (!regexUser.test(this.usuarioSeleccionado.user)) {
      M.toast({ html: "EL NOMBRE DE USUARIO NO PRESENTA UN FORMATO ADECUADO", classes: 'toastAmarillo' })
      return false;
    }

    /* VALIDACIÓN DE LAS CONTRASEÑAS */
    if (this.usuarioSeleccionado.pass != this.pass2) {
      M.toast({ html: "LAS CONTRASEÑAS NO COINDICEN", classes: 'toastAmarillo' })
      return false;
    }

    return true;
  }



  /* 
  ██████  ███████ ██ ███    ██ ██  ██████ ██  █████  ██████      ███████  ██████  ██████  ███    ███ ██    ██ ██       █████  ██████  ██  ██████  
  ██   ██ ██      ██ ████   ██ ██ ██      ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ████  ████ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
  ██████  █████   ██ ██ ██  ██ ██ ██      ██ ███████ ██████      █████   ██    ██ ██████  ██ ████ ██ ██    ██ ██      ███████ ██████  ██ ██    ██ 
  ██   ██ ██      ██ ██  ██ ██ ██ ██      ██ ██   ██ ██   ██     ██      ██    ██ ██   ██ ██  ██  ██ ██    ██ ██      ██   ██ ██   ██ ██ ██    ██ 
  ██   ██ ███████ ██ ██   ████ ██  ██████ ██ ██   ██ ██   ██     ██       ██████  ██   ██ ██      ██  ██████  ███████ ██   ██ ██   ██ ██  ██████  
*/
  reiniciarFormulario(form: NgForm) {
    if (form) {
      // EL FORM.reset PROVOCA QUE DESAPAREZCA EL HIDDEN STATUS = 0
      // POR ELLO MEJOR REINICIAMOS ASÍ

      /* REINSTANCIAMOS EL OBJETO USUARIO PARA LIMPIAR LOS DATOS */
      this.usuarioSeleccionado = new Usuario();
      /* REINICIAMOS LA PASS2 */
      this.pass2 = ""
    }
  }
}


