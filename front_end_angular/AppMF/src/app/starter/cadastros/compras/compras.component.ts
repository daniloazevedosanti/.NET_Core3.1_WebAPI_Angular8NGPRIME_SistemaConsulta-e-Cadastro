import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConsultasService } from './../../consultas/services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as jsPDF from 'jspdf';
import { ElementSchemaRegistry } from '@angular/compiler';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  pecuaristas: any;

  animais: any;

  animalId = "";
  animalPreco = "";
  animalDescricao = "";
  quantidade = "";

  pecuaristaId = "";
  data: Date = new Date();
  newdata: Date = new Date();
  total = 0;

  cols: any[];

  tabela: any = [];
  novatabela: any[];

  send: FormGroup;
  final: FormGroup;
  msg: any = "";
  path: boolean = true;

  constructor(private service: ConsultasService,
    private formBuilder: FormBuilder,
    private pipeDate: DatePipe,
    private router: Router) { }

  ngOnInit() {
    
    this.service.getPecuaristas()
      .subscribe(dados => {
        this.pecuaristas = dados;
      });

    this.service.getAnimais()
      .then(data => {
        this.animais = data;
      })

    this.cols = [
      { field: 'animal', header: 'Animal' },
      { field: 'quantidade', header: 'Quantidade' },
      { field: 'preco', header: 'Preço $' },
      { field: 'total', header: 'Valor Total $' }
    ];
  }

  onQuantidade (): boolean{
    if (parseFloat(this.quantidade) > 0)
      return true;
    else
      return false;
  }

  onChangeAnimal() {
    var x = document.getElementById("inputAnimal").attributes[0].ownerElement['value'];
    if (isNaN(x) != true) {
      this.service.getAnimalId(x)
        .subscribe(data => {
          this.animalPreco = data['preco'];
          this.animalDescricao = data['descricao'];
        })
      this.animalId = x;
    } else {
      this.animalId = "";
      this.animalPreco = "";
    }
  }

  addElementoCompra(id: string, animal: string,
    quantidade: string, preco: string) {
    var total = parseFloat(quantidade) * parseFloat(preco);
    this.total += total;
    this.tabela.push({
      id: id, animal: animal,
      quantidade, preco: preco, total: total
    });
    this.novatabela = this.tabela;
    this.animalId = "";
    this.animalDescricao = "";
    this.animalPreco = "";
    this.quantidade = "";
  }

  onChangePecuarista() {
    var x = document.getElementById("inputPecuarista").attributes[0].ownerElement['value'];
    
    if (isNaN(x) != true) {
      this.pecuaristaId = x;
    } else
      this.pecuaristaId = "";
  }

  onChangeDate() {
    var x = document.getElementById("inputCity").attributes[0].ownerElement['value'];
    this.newdata = x;
  }

  onValid(): boolean {
    if (this.pecuaristaId != "" && this.data != undefined && this.path){
      if (this.tabela.length > 0) 
        return true;
      else
        return false;
    }
    else
      return false;
  }

  popElementoCompra(id: string, animal: string,
      quantidade: string, preco: string, total: string) {
        var prod = parseFloat(quantidade) * parseFloat(preco);
        this.total -= prod;
        this.tabela.pop({
        id, animal,quantidade, preco, total
      });

      this.novatabela = this.tabela;
  }

  onSubmit() {
    var id;
    this.send = this.formBuilder.group({
      dataentrega: this.pipeDate.transform(this.newdata, "yyyy-MM-dd'T'HH:mm:ss"),
      pecuaristaid: this.pecuaristaId
    });

    this.service.postCompraGado(this.send.value)
      .subscribe(response => {
        id = response.id
        this.service.getPecuaristaId(response.pecuaristaId)
        .subscribe(dados => {

        this.final = this.formBuilder.group({
          idcompra: id,
          comprador: dados['nome'],
          compradorid: this.pecuaristaId,
          dataentrega: this.pipeDate.transform(this.newdata, "yyyy-MM-dd'T'HH:mm:ss"),
          datacompra: this.pipeDate.transform(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")
        });
      });
        for (let item of this.novatabela) {
          
          var body = this.formBuilder.group({
            quantidade: item['quantidade'],
            compragadoId: id,
            animalid: item['id']
          });
          this.service.postCompraGadoItem(body.value)
            .subscribe(
              response => {
                console.log(response);
              }
            );

        }
      });
      this.path = false;
  }

  onFinalizar() {
    //var id;
    this.service.postNovaCompra(this.final.value)
    .subscribe(response => {
      console.log(response);
      
      this.service.getNewCompra(response.id)
      .subscribe((res) =>
        {  this.downLoadFile(res, "application/pdf")
          console.log(res);
      });
    });

    this.router.navigate(['/consulta_compras']);
  }

  reload(){
    location.reload();
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
}

}
