import { Injectable } from '@angular/core';
/* LO PRIMERO NECESITAMOS IMPORTAR EL MODULO DE HTTP */
import { HttpClient } from '@angular/common/http';
import { Juego } from '../models/Juego';
/* AHORA NOS VAMOS AL APP MODULE Y LO TENEMOS QUE IMPORTAR */

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  /*  LO PONEMOS EN EL CONSTRUCTOR */
  constructor(private http: HttpClient) {
    this.juegoSeleccionado = new Juego();
  }

  juegoSeleccionado: Juego
  juegos: Array<Juego>

  public generosJuegos: Array<String> = []
  public generosCantidad: Array<number> = []


  /* CONSTANTE CON LA RUTA DE LOS JUEGOS EN NUESTRO SERVIDOR */
  readonly URL = 'http://localhost:3000/api/juegos'

  /* AHORA CREAMOS UN MÉTODO PARA MOSTRAR LOS EMPLEADOS */
  mostrarJuegos() {
    /* NOS VA A DEVOLVER UN ARRAY DE EMPLEADOS */
    /* SE COMUNICA CON LA DIRECCIÓN api/juegos */
    return this.http.get(this.URL + `/todos/`);
  }

  mostrarJuego(_id: String) {
    return this.http.get(this.URL + `/todos/${_id}`);
  }

  mostrarJuegosBusqueda(nombre: string) {
    return this.http.get(this.URL + `/nombre/${nombre}`);
  }

  mostrarJuegosGenero(genero: String) {
    return this.http.get(this.URL + `/genero/${genero}`);
  }

  mostrarJuegosPlataforma(plataforma: String) {
    return this.http.get(this.URL + `/plataforma/${plataforma}`);
  }

  mostrarJuegosLanzamiento(lanzamiento: Number) {
    return this.http.get(this.URL + `/lanzamiento/${lanzamiento}`);
  }

  mostrarJuegosSinStock() {
    return this.http.get(this.URL + `/stock/`);
  }

  mostrarJuegosNumStock(numstock: number) {
    return this.http.get(this.URL + `/numstock/${numstock}`);
  }

  mostrarJuegosEmpPor(letra: string) {
    return this.http.get(this.URL + `/letra/${letra}`);
  }


  crearJuego(juego: Juego) {
    return this.http.post(this.URL, juego);
  }

  /* ESTE MÉTODO RECIBE EL OBJETO juego */
  actualizarJuego(juego: Juego) {
    console.log(juego.stock)
    return this.http.put(this.URL + `/${juego._id}`, juego);
  }

  /*  ESTE MÉTODO RECIBE EL ID SOLO */
  borrarJuego(_id: String) {
    return this.http.delete(this.URL + `/${_id}`);
  }

  /* DEVUELVE AL ARRAY GENEROSJUEGOS TODOS LOS GENEROS QUE TENEMOS Y LA CANTIDAD DE JUEGOS QUE HAY EN CADA UNO */
  getGenerosJuegos() {
    /* REINICIAMOS LOS ARRAYS */
    this.generosJuegos = []
    this.generosCantidad = []
    /* RECOGEMOS TODOS LOS JUEGOS */
    this.mostrarJuegos()
      .subscribe(res => {
        this.juegos = res as Juego[];
        /* LOS RECORREMOS */
        for (let x = 0; x < this.juegos.length; x++) {
          let generoEncontrado = false;
          /* RECORREMOS EL ARRAY NUEVO DE GENEROS */
          for (let y = 0; y < this.generosJuegos.length && !generoEncontrado; y++) {
            /* SI YA LO HEMOS GUARDADO AÑADIMOS UNA UNIDAD AL ARRAY DE CANTIDADES */
            if (this.juegos[x].genero == this.generosJuegos[y]) {
              generoEncontrado = true;
              this.generosCantidad[y]++
            }
          }
          /* SI AL ACABAR NO LO HA ENCONTRADO LO AÑADIMOS  */
          if (!generoEncontrado) {
            this.generosJuegos.push(this.juegos[x].genero)
            this.generosCantidad.push(1)
          }

        }

      })
  }
}
