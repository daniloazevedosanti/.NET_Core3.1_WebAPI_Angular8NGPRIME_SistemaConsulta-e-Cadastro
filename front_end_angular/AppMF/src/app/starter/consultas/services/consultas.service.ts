import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  api_url: any = environment.url;

  constructor(private http: HttpClient,
    private navigate: Router) { }

  getPecuaristas() {
    return this.http.get(this.api_url + "pecuaristas/nomes");
  }

  getPecuaristaId(id: string) {
    return this.http.get(this.api_url + "pecuaristas/id/" + id);
  }

  getPecuaristaIdList(id: string) {
    return this.http.get(this.api_url + "pecuaristas/" + id);
  }

  deletePecuarista(id: string) {
    return this.http.delete(this.api_url + "pecuaristas/" + id);
  }

  atualizarPecuarista(id: string, body: { id: string, nome: string }) {
    return this.http.put<any>(this.api_url + "pecuaristas/" + id, body);
  }

  async getAnimais(): Promise<any> {
    return this.http.get(this.api_url + "animais").toPromise();
  }

  getAnimalId(id: string) {
    return this.http.get(this.api_url + "animais/" + id);
  }

  atualizarAnimais(id: string, body: { id: string, descricao: string, preco: string }) {
    return this.http.put<any>(this.api_url + "animais/" + id, body);
  }

  deletarAnimal(id: string) {
    return this.http.delete<any>(this.api_url + "animais/" + id);
  }

  getCompraGado() {
    return this.http.get<any>(this.api_url + "compragados/compras");
  }


  getCompraGadoItens() {
    return this.http.get<any>(this.api_url + "compragadoItems");
  }

  getCompraGadoId(id: string) {
    return this.http.get<any>(this.api_url + "compragados/" + id);
  }

  postPecuarista(body: { id: string, nome: string }) {
    return this.http.post<any>(this.api_url + "pecuaristas/", body);
  }

  postAnimais(body: { id: string, descricao: string, preco: string }) {
    return this.http.post<any>(this.api_url + "animais/", body);
  }

  postCompraGado(body: { id: string, dataentrega: string, preco: string }) {
    return this.http.post<any>(this.api_url + "compraGados/", body);
  }

  postCompraGadoItem(body: { id: string, quantidade: string, compragadoid: string, animalid }) {
    return this.http.post<any>(this.api_url + "compragadoItems/", body);
  }

  postNovaCompra(body: {
    id: string, comprador: string, compradorid: string,
    idcompra: string, dataentrega: string; datacompra: string
  }) {
    return this.http.post<any>(this.api_url + "compras", body);
  }

  getNewCompra(id: string) {
    return this.http.get(this.api_url + "compras/final/" + id, { responseType: 'blob' });
  }

  getComprasByList(): Promise<any> {
    return this.http.get<any>(this.api_url + "compras")
      .toPromise();
  }

  getCompraByCompraGadoId(id: string){
    return this.http.get(this.api_url + "compras/compragadoid/"+id);
  }
}