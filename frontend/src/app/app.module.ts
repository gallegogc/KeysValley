import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // AÑADIDO POR NOSOTROS PARA QUE VAYAN LOS TWOWAYMODULES

/* IMPORTAMOS EL HTTP CLIENT */
import { HttpClientModule } from '@angular/common/http';


/* COMPONENTES HEAD Y FOOTER */
import { HeadComponent } from './components/head/head.component';
import { FooterComponent } from './components/footer/footer/footer.component';

/* COMPONENTES MAIN */
import { MainComponent } from './components/main/main.component';

/* SIN LOGIN */
import { BienvenidaComponent } from './components/main/bienvenida/bienvenida.component';
import { RegistroComponent } from './components/main/registro/registro.component';
import { JuegoComponent } from './components/main/juego/juego.component';
import { JuegoMovComponent } from './components/main/juego-mov/juego-mov.component';
import { JuegoSinStockComponent } from './components/main/juego-sin-stock/juego-sin-stock.component';
import { JuegoSinStockMovComponent } from './components/main/juego-sin-stock-mov/juego-sin-stock-mov.component';
import { FichaComponent } from './components/main/ficha/ficha.component';

/* USUARIO */
import { CarritoComponent } from './components/latder/carrito/carrito.component';
import { ListaComprasComponent } from './components/main/lista-compras/lista-compras.component';
import { CuentaComponent } from './components/main/cuenta/cuenta.component';

/* ADMIN */
import { AddJuegoComponent } from './components/main/add-juego/add-juego.component';
import { ListaJuegosComponent } from './components/main/lista-juegos/lista-juegos.component';
import { ListaUsuariosComponent } from './components/main/lista-usuarios/lista-usuarios.component';
import { ListaVentasComponent } from './components/main/lista-ventas/lista-ventas.component';

/* COMPONENTES LATIZ */
import { LatizComponent } from './components/latiz/latiz.component';
import { CategoriasComponent } from './components/latiz/categorias/categorias.component';


/* COMPONENTES LATDER */
import { LatderComponent } from './components/latder/latder.component';
import { LoginComponent } from './components/latder/login/login.component';
import { OpcionesComponent } from './components/latder/opciones/opciones.component';
import { VistaPreviaComponent } from './components/latder/vista-previa/vista-previa.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MainComponent,
    LatizComponent,
    LatderComponent,
    JuegoComponent,
    LoginComponent,
    CarritoComponent,
    CategoriasComponent,
    OpcionesComponent,
    JuegoMovComponent,
    JuegoSinStockComponent,
    JuegoSinStockMovComponent,
    FichaComponent,
    ListaJuegosComponent,
    ListaUsuariosComponent,
    RegistroComponent,
    AddJuegoComponent,
    VistaPreviaComponent,
    CuentaComponent,
    ListaComprasComponent,
    BienvenidaComponent,
    ListaVentasComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule, // IMPORTAAAANTE HAY QUE IMPORTAR EL FORMSMODULE QUE HEMOS CREAOD ARRIBA, SINO NO VA
    HttpClientModule, // SE AÑADE AQUÍ TAMBIÉN
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
