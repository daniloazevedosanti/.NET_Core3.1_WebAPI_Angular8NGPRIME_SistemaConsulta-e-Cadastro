import { DetalhesPecuaristasComponent } from './starter/consultas/consultar-pecuaristas/detalhes-pecuaristas/detalhes-pecuaristas.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasService } from './starter/consultas/services/consultas.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { MenuComponent } from './starter/menu/menu.component';
import { PanelModule } from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';

import { PecuaristasComponent } from './starter/cadastros/pecuaristas/pecuaristas.component';
import { AnimaisComponent } from './starter/cadastros/animais/animais.component';
import { ComprasComponent } from './starter/cadastros/compras/compras.component';
import { ConsultarAnimaisComponent } from './starter/consultas/consultar-animais/consultar-animais.component';
import { ConsultarPecuaristasComponent } from './starter/consultas/consultar-pecuaristas/consultar-pecuaristas.component';
import { ConsultarComprasComponent } from './starter/consultas/consultar-compras/consultar-compras.component';
import { EditarPecuaristaComponent } from './starter/consultas/consultar-pecuaristas/editar-pecuarista/editar-pecuarista.component';
import { ExluirPecuaristaComponent } from './starter/consultas/consultar-pecuaristas/exluir-pecuarista/exluir-pecuarista.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ExcluirComponent } from './starter/consultas/consultar-animais/excluir/excluir.component';
import { EditarComponent } from './starter/consultas/consultar-animais/editar/editar.component';
import { DetalhesComponent } from './starter/consultas/consultar-compras/detalhes/detalhes.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PecuaristasComponent,
    AnimaisComponent,
    ComprasComponent,
    ConsultarAnimaisComponent,
    ConsultarPecuaristasComponent,
    ConsultarComprasComponent,
    DetalhesPecuaristasComponent,
    EditarPecuaristaComponent,
    ExluirPecuaristaComponent,
    ExcluirComponent,
    EditarComponent,
    DetalhesComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    TabViewModule,
    PanelModule,
    AccordionModule,
    MenubarModule,
    ReactiveFormsModule
        
  ],
  providers: [CurrencyPipe, ConsultasService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
