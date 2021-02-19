import { Injectable } from '@angular/core';
/* LO PRIMERO NECESITAMOS IMPORTAR EL MODULO DE HTTP */
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../models/Empleado';
/* AHORA NOS VAMOS AL APP MODULE Y LO TENEMOS QUE IMPORTAR */

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  /*  LO PONEMOS EN EL CONSTRUCTOR */
  constructor(private http: HttpClient) { 
    this.empleadoSeleccionado = new Empleado();
  }

  empleadoSeleccionado: Empleado 
  empleados: Array<Empleado>

  readonly URL = 'http://localhost:3000/api/empleados'

  /* AHORA CREAMOS UN MÉTODO PARA MOSTRAR LOS EMPLEADOS */
  mostrarEmpleados() {
    /* NOS VA A DEVOLVER UN ARRAY DE EMPLEADOS */
    /* SE COMUNICA CON LA DIRECCIÓN api/empleados */
    return this.http.get(this.URL)
  }

  /*  DE NUESTRO MODELO DE DATOS VA A RECIBIR LOS DATOS DE ESE EMPLEADO */
  crearEmpleado(empleado: Empleado) {
    return this.http.post(this.URL, empleado); // AQUI LLEGA LA PETICION DE EMPLEADO.COMPONENTE.TS Y DE AQUI VA AL CONTROLADOR
  }

  /* ESTE MÉTODO RECIBE EL OBJETO empleado */
  actualizarEmpleado(empleado: Empleado) {
    return this.http.put(this.URL + `/${empleado._id}`, empleado);
  }

  /*  ESTE MÉTODO RECIBE EL ID SOLO */
  borrarEmpleado(_id: String) {
    return this.http.delete(this.URL + `/${_id}`);
  }
}
