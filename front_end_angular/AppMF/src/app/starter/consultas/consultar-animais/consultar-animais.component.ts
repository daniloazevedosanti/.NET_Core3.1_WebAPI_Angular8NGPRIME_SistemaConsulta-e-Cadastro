import { async } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultasService } from './../services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-consultar-animais',
  templateUrl: './consultar-animais.component.html',
  styleUrls: ['./consultar-animais.component.css']
})
export class ConsultarAnimaisComponent implements OnInit {

  getAnimais: any;
  animais: any = [];
  animaisAux: any;

  tabelaView: any = [];
  cols: any[];

  id: string = "2";
  descricao: string = "";
  preco: string = "";

  f: FormGroup;
  send: FormGroup;

  msg: any = "";
  path: boolean = false;
  show: boolean = false;
  tabela = [];

  constructor(private service: ConsultasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private pipe: CurrencyPipe) {
  }

  ngOnInit() {

    this.f = this.formBuilder.group({
      descricao: [null],
      preco: [null]
    });

    this.animais = [];

    this.service.getCompraGadoItens()
      .subscribe(res => {
        console.log(res)
        for (let item of res) {
          this.tabela.push(item.animalId);
        }
      });

    setTimeout(() => {
      this.consulta()
    }, 20);
  }

  onContemItens(id: string): boolean {
    return this.tabela.includes(id);
  }

  consulta() {
    this.tabelaView = [];
    this.animais = [];
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'descricao', header: 'Animal' },
      { field: 'preco', header: 'Preço' }
    ];

    this.service.getAnimais()
      .then(
        dados => {
          this.animaisAux = dados;
          for (let item of this.animaisAux) {
            this.tabelaView.push({
              id: item.id,
              descricao: item.descricao,
              preco: this.pipe.transform(parseFloat(item.preco), 'BRL')
            });
          }
          this.animais = this.tabelaView;
        });
  }

  onSubmit() {
    this.send = this.formBuilder.group({
      id: this.id,
      descricao: this.descricao,
      preco: this.preco
    });
    this.animais = [];
    this.service.atualizarAnimais(this.send.value.id, this.send.value)
      .subscribe((error: HttpErrorResponse) => {
        if (error != null) {
          this.path = false;
          this.msg = "Erro de atualização!";
        }
        this.consulta();
      });

  }

  modalEdit(id: string, descricao: string, preco: string) {
    preco = preco.replace('R$', '').replace(',', '');
    this.id = id;
    this.descricao = descricao;
    this.preco = preco;
  }

  deletar(id: string) {

    if (confirm("Confirmar a exlusão?")) {
      this.service.deletarAnimal(id)
        .subscribe(() => null);
      this.router.navigate(['consulta_animais']);
      this.consulta();
    }

  }

  reload() {
    location.reload()
  }

}
