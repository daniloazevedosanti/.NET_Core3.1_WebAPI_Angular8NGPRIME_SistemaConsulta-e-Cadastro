import { DetalhesComponent } from './starter/consultas/consultar-compras/detalhes/detalhes.component';
import { EditarComponent } from './starter/consultas/consultar-animais/editar/editar.component';
import { ExcluirComponent } from './starter/consultas/consultar-animais/excluir/excluir.component';
import { ExluirPecuaristaComponent } from './starter/consultas/consultar-pecuaristas/exluir-pecuarista/exluir-pecuarista.component';
import { EditarPecuaristaComponent } from './starter/consultas/consultar-pecuaristas/editar-pecuarista/editar-pecuarista.component';
import { DetalhesPecuaristasComponent } from './starter/consultas/consultar-pecuaristas/detalhes-pecuaristas/detalhes-pecuaristas.component';
import { ConsultarPecuaristasComponent } from './starter/consultas/consultar-pecuaristas/consultar-pecuaristas.component';
import { ConsultarComprasComponent } from './starter/consultas/consultar-compras/consultar-compras.component';
import { ComprasComponent } from './starter/cadastros/compras/compras.component';
import { PecuaristasComponent } from './starter/cadastros/pecuaristas/pecuaristas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimaisComponent } from './starter/cadastros/animais/animais.component';
import { ConsultarAnimaisComponent } from './starter/consultas/consultar-animais/consultar-animais.component';


const routes: Routes = [
  {path:'', redirectTo:'consulta_compras', pathMatch:'full'},
  {path: 'cadastro_pecuaristas', component: PecuaristasComponent},
  {path: 'cadastro_animais', component: AnimaisComponent},
  {path: 'cadastro_compras', component: ComprasComponent},
  {path:'consulta_compras', component: ConsultarComprasComponent},
  {path:'consulta_animais', component: ConsultarAnimaisComponent},
  {path:'consulta_pecuaristas', component: ConsultarPecuaristasComponent},
  {path:'consulta_pecuaristas/details/:id', component: DetalhesPecuaristasComponent},
  {path:'consulta_pecuaristas/edit/:id', component: EditarPecuaristaComponent},
  {path:'consulta_pecuaristas/delete/:id', component: ExluirPecuaristaComponent},
  {path:'consulta_animais/delete/:id', component: ExcluirComponent},
  {path:'consulta_animais/edit/:id', component: EditarComponent},
  {path:'consulta_compras/details/:id', component: DetalhesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
