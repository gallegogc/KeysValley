import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Carrito } from 'src/app/models/Carrito';
import { Usuario } from 'src/app/models/Usuario';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loged: boolean
  public loginTitulo: String
  @Output() propagar = new EventEmitter<any>();

  /*
   ██████  ██████  ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████  ██████  ██████  
  ██      ██    ██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██ 
  ██      ██    ██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██    ██ ██████  
  ██      ██    ██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██ 
   ██████  ██████  ██   ████ ███████    ██    ██   ██  ██████   ██████    ██     ██████  ██   ██ 
  */

  constructor(
    public objetoUsuariosService: UsuariosService,
    private comunicacionService: ComunicacionService,
    public carritoService:CarritoService
    ) {

    /* PARA ACTUALIZAR LOS USUARIOS NADA MÁS REGISTRARSE Y PODER HACER LOGIN SIN DARLE DOS VECES */
    this.comunicacionService.invocarMetodoRecargarUsuariosObservable.subscribe(
      () => {
        this.obtenerUsuarios();
      }
    );

    this.comunicacionService.invocarMetodoCerrarSesionObservable.subscribe(
      () => {
        this.cerrarSesion();
      }
    );

  }

  /*
  ██   ███    ██   ██   ████████ 
  ██   ████   ██   ██      ██    
  ██   ██ ██  ██   ██      ██    
  ██   ██  ██ ██   ██      ██    
  ██   ██   ████   ██      ██    
*/
  // AL INICIAR EL COMPONENTE LA PRIMERA VEZ
  ngOnInit(): void {

    // SE MUESTRA EL LOGIN
    this.loged = false
    this.loginTitulo = "Login"

    // OBTENEMOS EL ARRAY DE USUARIOS PARA PODER INICIAR SESIÓN
    this.obtenerUsuarios()
  }


  /* 
    ██████   ██████  ████████  ██████  ███    ██     ██████  ███████  ██████  ██ ███████ ████████ ██████   ██████
    ██   ██ ██    ██    ██    ██    ██ ████   ██     ██   ██ ██      ██       ██ ██         ██    ██   ██ ██    ██
    ██████  ██    ██    ██    ██    ██ ██ ██  ██     ██████  █████   ██   ███ ██ ███████    ██    ██████  ██    ██
    ██   ██ ██    ██    ██    ██    ██ ██  ██ ██     ██   ██ ██      ██    ██ ██      ██    ██    ██   ██ ██    ██
    ██████   ██████     ██     ██████  ██   ████     ██   ██ ███████  ██████  ██ ███████    ██    ██   ██  ██████
   */
  // LLAMA AL MAIN PARA MOSTRAR EL REGISTRO
  registro() {
    this.comunicacionService.invocarMetodoRegistro();
  }


  /* 
    ██ ███    ██ ██  ██████ ██  █████  ██████      ███████ ███████ ███████ ██  ██████  ███    ██ 
    ██ ████   ██ ██ ██      ██ ██   ██ ██   ██     ██      ██      ██      ██ ██    ██ ████   ██ 
    ██ ██ ██  ██ ██ ██      ██ ███████ ██████      ███████ █████   ███████ ██ ██    ██ ██ ██  ██ 
    ██ ██  ██ ██ ██ ██      ██ ██   ██ ██   ██          ██ ██           ██ ██ ██    ██ ██  ██ ██ 
    ██ ██   ████ ██  ██████ ██ ██   ██ ██   ██     ███████ ███████ ███████ ██  ██████  ██   ████
  */

  iniciarSesion() {

    // RECARGAMOS LOS USUARIOS PARA ASEGURAR LA FIDELIDAD DE LOS DATOS
    this.obtenerUsuarios();

    // FLAG PARA NO MOSTRAR: "CREDENCIALES INCORRECTAS" CUANDO EL USUARIO ESTÁ DADO DE BAJA
    let baja = false

    // RECORREMOS TODOS LOS USUARIOS
    for (let index = 0; index < this.objetoUsuariosService.usuarios.length; index++) {
      // SI EL NOMBRE USUARIO RECORRIDO ES IGUAL QUE EL QUE HA INTRODUCIDO EL USUARIO (QUE LO TENEMOS EN EL USUARIO SELECCIONADO DEL SERVICIO)
      if (this.objetoUsuariosService.usuarios[index].user == this.objetoUsuariosService.usuarioSeleccionado.user) {
        // SI LA CONTRASEÑA TAMBIÉN COINCIDE
        if (this.objetoUsuariosService.usuarios[index].pass == this.objetoUsuariosService.usuarioSeleccionado.pass) {
          this.objetoUsuariosService.usuarioSeleccionado = this.objetoUsuariosService.usuarios[index];





          // SEGÚN EL TIPO DE STATUS DEL USUARIO HACEMOS UNA COSA U OTRA
          switch (this.objetoUsuariosService.usuarios[index].status) {

            /* 
            ██    ██ ███████ ██    ██  █████  ██████  ██  ██████      ██████   █████  ███████ ██  ██████  ██████  
            ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██     ██   ██ ██   ██ ██      ██ ██      ██    ██ 
            ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██     ██████  ███████ ███████ ██ ██      ██    ██ 
            ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██     ██   ██ ██   ██      ██ ██ ██      ██    ██ 
             ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████      ██████  ██   ██ ███████ ██  ██████  ██████ 
            */
            case 0:
              this.loged = true

              /* CAMBIAMOS EL TITULO DEL COMPONENTE LOGIN AL NOMBRE DEL USUARIO */
              this.loginTitulo = this.objetoUsuariosService.usuarios[index].user.toUpperCase()

              // MOSTRAR EL ID EN EL TITULO LOGIN PARA PRUEBAS DE USUARIO LOGUEADO
              //this.loginTitulo = this.objetoUsuariosService.usuarios[index]._id

              /* MOSTRAMOS EL MENSAJE */
              M.toast({ html: 'BIENVENIDO, ' + this.objetoUsuariosService.usuarios[index].nombre.toUpperCase(), classes: 'toastVerde' })




              /* PASAMOS AL PADRE: 
                - loged true (PARA MOSTRAR OPCIONES Y CARRITO)
                - EL ID USUARIO (PARA PASARSELO AL CARRITO)
                - EL STATUS (PARA PASARSELO A OPCIONES)
              */
              this.propagar.emit({ loged: true, user: this.objetoUsuariosService.usuarioSeleccionado.user, idUsuario: this.objetoUsuariosService.usuarioSeleccionado._id, status: this.objetoUsuariosService.usuarioSeleccionado.status })
              
              /* AVISAMOS DE QUE HEMOS LOGUEADO, PARA FUTUROS USOS */
              this.comunicacionService.invocarMetodoLoged();
              this.carritoService.mostrarCarritos();
              /* OBTENEMOS EL CARRITO */
              this.carritoService.obtenerCarrito();
              /* OBTENEMOS LOS JUEGOS DEL CARRITO DEL USUARIO */
              this.carritoService.getJuegosCarritoUsuario();
              
              /* MOSTRAMOS EL CARRITO AL INICIAR SESIÓN */
              this.comunicacionService.invocarMetodoCarrito();
              break;



            /* 
             █████  ██████  ███    ███ ██ ███    ██ ██ ███████ ████████ ██████   █████  ██████   ██████  ██████  
            ██   ██ ██   ██ ████  ████ ██ ████   ██ ██ ██         ██    ██   ██ ██   ██ ██   ██ ██    ██ ██   ██ 
            ███████ ██   ██ ██ ████ ██ ██ ██ ██  ██ ██ ███████    ██    ██████  ███████ ██   ██ ██    ██ ██████  
            ██   ██ ██   ██ ██  ██  ██ ██ ██  ██ ██ ██      ██    ██    ██   ██ ██   ██ ██   ██ ██    ██ ██   ██ 
            ██   ██ ██████  ██      ██ ██ ██   ████ ██ ███████    ██    ██   ██ ██   ██ ██████   ██████  ██   ██ 
            */
            case 1:
              this.loged = true

              /* CAMBIAMOS EL TITULO DEL COMPONENTE LOGIN A ADMINISTRADOR */
              this.loginTitulo = this.objetoUsuariosService.usuarios[index].user.toUpperCase()

              /* MENSAJE BIENVENIDO ADMINISTRADOR */
              M.toast({ html: 'BIENVENIDO, ADMINISTRADOR', classes: 'toastVerde' })

              /* PASAMOS AL PADRE: 
                - loged true 
                - El USER NAME
                - EL ID USUARIO
                - EL STATUS 
              */
              this.propagar.emit({ loged: true, user: this.objetoUsuariosService.usuarios[index].user, idUsuario: null, status: this.objetoUsuariosService.usuarios[index].status })
              break;


            /* 
            ██████   █████  ██████   ██████      ██████  ███████     ██████   █████       ██  █████  
            ██   ██ ██   ██ ██   ██ ██    ██     ██   ██ ██          ██   ██ ██   ██      ██ ██   ██ 
            ██   ██ ███████ ██   ██ ██    ██     ██   ██ █████       ██████  ███████      ██ ███████ 
            ██   ██ ██   ██ ██   ██ ██    ██     ██   ██ ██          ██   ██ ██   ██ ██   ██ ██   ██ 
            ██████  ██   ██ ██████   ██████      ██████  ███████     ██████  ██   ██  █████  ██   ██ 
            */
            case 2:
              baja = true
              M.toast({ html: 'LA CUENTA HA SIDO DADA DE BAJA', classes: 'toastRojo' })
              break;
            default:
              break;
          }
        }
      }
    }
    /* SI AL FINAL DE LA COMPROBACIÓN NO SE HA INICIADO SESIÓN Y EL USUARIO NO ESTABA DADO DE BAJA, MOSTRAMOS CREDENCIALES INCORRECTAS */
    if (this.loged == false && baja == false) {
      M.toast({ html: 'CREDENCIALES INCORRECTAS', classes: 'toastRojo' })
    }
  }


  /* 
 ██████  ██████  ████████ ███████ ███    ██ ███████ ██████      ██    ██ ███████ ██    ██  █████  ██████  ██  ██████  ███████ 
██    ██ ██   ██    ██    ██      ████   ██ ██      ██   ██     ██    ██ ██      ██    ██ ██   ██ ██   ██ ██ ██    ██ ██      
██    ██ ██████     ██    █████   ██ ██  ██ █████   ██████      ██    ██ ███████ ██    ██ ███████ ██████  ██ ██    ██ ███████ 
██    ██ ██   ██    ██    ██      ██  ██ ██ ██      ██   ██     ██    ██      ██ ██    ██ ██   ██ ██   ██ ██ ██    ██      ██ 
 ██████  ██████     ██    ███████ ██   ████ ███████ ██   ██      ██████  ███████  ██████  ██   ██ ██   ██ ██  ██████  ███████                                                                                                                             
  */
  // RECOGEMOS TODOS LOS USUARIOS DE LA BASE DE DATOS EN EL ARRAY DE USUARIOS DEL SERVICIO DE USUARIOS
  obtenerUsuarios() {
    this.objetoUsuariosService.getUsuarios()
      .subscribe(res => {
        this.objetoUsuariosService.usuarios = res as Usuario[];
      })
  }


  /* 
  
 ██████ ███████ ██████  ██████   █████  ██████      ███████ ███████ ███████ ██  ██████  ███    ██ 
██      ██      ██   ██ ██   ██ ██   ██ ██   ██     ██      ██      ██      ██ ██    ██ ████   ██ 
██      █████   ██████  ██████  ███████ ██████      ███████ █████   ███████ ██ ██    ██ ██ ██  ██ 
██      ██      ██   ██ ██   ██ ██   ██ ██   ██          ██ ██           ██ ██ ██    ██ ██  ██ ██ 
 ██████ ███████ ██   ██ ██   ██ ██   ██ ██   ██     ███████ ███████ ███████ ██  ██████  ██   ████
  */

  cerrarSesion() {
    /* HACEMOS LA VAR LOGUED = FALSE PARA:
        - OCULTAR EL BOTÓN CERRAR SESIÓN
        - MOSTRAR LOS CAMPOS DE INICIO DE SESIÓN */
    this.loged = false

    /* LIMPIAMOS EL USUARIO DE NUESTRO OBJETO USUARIO SERVICE */
    this.objetoUsuariosService.usuarioSeleccionado._id = null;


    /* VOLVEMOS A MOSTRAR EL TITULO LOGIN */
    this.loginTitulo = "Login"

    /* MANDAMOS UN EMIT AL PADRE, LATDER PARA:
        - OCULTAR EL COMPONENTE OPCIONES
        - OCULTAR EL COMPONENTE CARRITO */
    this.propagar.emit({ loged: false, user: "", status: 1 })

    /* LLAMAMOS AL MÉTODO DE SERVICIO QUE MUESTRA LA BIENVENIDA EN MAIN */
    this.comunicacionService.invocarMetodoBienvenida();

    /* RECARGAMOS LOS USUARIOS POR SI ACTUALIZÓ UN USUARIO SUS DATOS DE CUENTA */
    this.obtenerUsuarios();

    window.location.reload();

  }




}
