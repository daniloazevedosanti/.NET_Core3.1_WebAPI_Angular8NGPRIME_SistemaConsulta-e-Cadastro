import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ConsultasService } from './../services/consultas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-compras',
  templateUrl: './consultar-compras.component.html',
  styleUrls: ['./consultar-compras.component.css']
})
export class ConsultarComprasComponent implements OnInit {

  pecuaristas: any = [];
  compraGado: any = [];
  pecuaristaId: any = "";

  tabelaView = [];

  dataini: Date; //= new Date('2020-01-01 00:00:00');
  datafim: Date; //= new Date();
  cols: any = [];

  tabela: any;
  tabelaCompras = [];

  msgErro = "";
  erro = false;

  constructor(private service: ConsultasService,
    private pipe: DatePipe,
    private current: CurrencyPipe,
    private form: FormBuilder,
    private router: Router) { }

  ngOnInit() {

    let data: any;
    this.service.getPecuaristas()
      .subscribe(dados => {
        this.pecuaristas = dados;
      });

    this.cols = [
      { field: 'Id', header: 'Id' },
      { field: 'Nome', header: 'Pecuarista' },
      { field: 'DataEntrega', header: 'Data de entrega' },
      { field: 'Total', header: 'Total' }
    ];

    this.service.getComprasByList()
      .then(res => {
        data = res;
        for (let item of data) {
          this.tabelaCompras.push(
            item['idCompra']
          );
        }
      });

    setTimeout(() => {
    }, 20);

  }

  consultaById(id: string) {
    this.tabela = "";
    this.tabela = [];
    this.tabelaView = [];
    this.service.getCompraGado()
      .subscribe(dados => {
        this.tabela = dados;
        for (let item of this.tabela) {
          if (id == item.PecuaristaId)
            this.tabelaView.push({
              Id: item.Id, DataEntrega: this.pipe.transform(item.DataEntrega, 'dd/MM/yyyy'),
              Nome: item.Nome, Total: this.current.transform(item.Total, 'BRL')
            });
        }
        this.tabela = this.tabelaView;
      });
  }

  consultaByDate(dataini: string, datafim?: string) {
    this.tabela = "";
    this.tabela = [];
    this.tabelaView = [];
    this.service.getCompraGado()
      .subscribe(dados => {
        this.tabela = dados;
        for (let item of this.tabela) {
          if (item.DataEntrega >= dataini && item.DataEntrega <= datafim)
            this.tabelaView.push({
              Id: item.Id, DataEntrega: this.pipe.transform(item.DataEntrega, 'dd/MM/yyyy'),
              Nome: item.Nome, Total: this.current.transform(item.Total, 'BRL')
            });
        }
        this.tabela = this.tabelaView;
      });
  }

  consultaAll(id: string, dataini: string, datafim?: string) {
    this.tabela = "";
    this.tabela = [];
    this.tabelaView = [];
    this.service.getCompraGado()
      .subscribe(dados => {
        this.tabela = dados;
        for (let item of this.tabela) {
          if (item.PecuaristaId == id && item.DataEntrega >= dataini && item.DataEntrega <= datafim)
            this.tabelaView.push({
              Id: item.Id, DataEntrega: this.pipe.transform(item.DataEntrega, 'dd/MM/yyyy'),
              Nome: item.Nome, Total: this.current.transform(item.Total, 'BRL')
            });
        }
        this.tabela = this.tabelaView;
      });
  }

  onChangePecuarista() {
    var x = document.getElementById("inputPecuarista").attributes[0].ownerElement['value'];
    if (isNaN(x) != true) {
      this.pecuaristaId = x;
    } else
      this.pecuaristaId = "";
  }

  pesquisa() {
    if ((this.pecuaristaId == "" || this.pecuaristaId == null) && this.dataini == undefined && this.datafim == undefined) {
      this.erro = true;
      this.msgErro = "*Selecione um dos filtros para pesquisar!*";
    } else {
      this.msgErro = "";
      if (this.pecuaristaId != "" && (this.dataini == undefined && this.datafim == undefined)) {
        this.consultaById(this.pecuaristaId);
      }
      else if (this.pecuaristaId == "" && (this.dataini != undefined || this.datafim != undefined)) {
        const dataAux = this.datafim;
        if (this.dataini == undefined)
          this.dataini = new Date("2020-01-01");
        if (this.datafim == undefined)
          this.datafim = new Date("2020-12-31");

        if (this.dataini > this.datafim) {
          this.datafim = this.dataini;
          this.dataini = dataAux;
        }
        this.consultaByDate(this.pipe.transform(this.dataini, 'yyyy-MM-dd'),
          this.pipe.transform(this.datafim, 'yyyy-MM-dd'));
      }
      else {
        if (this.dataini == undefined)
          this.dataini = new Date("2019-01-01");

        if (this.datafim == undefined)
          this.datafim = new Date("2021-12-31");

        this.consultaAll(this.pecuaristaId, this.pipe.transform(this.dataini, 'yyyy-MM-dd'),
          this.pipe.transform(this.datafim, 'yyyy-MM-dd'));
      }
    }
  }

  onComprasConcretizadas(id: string): boolean {
    return this.tabelaCompras.includes(id);
  }

  onFinalizarOrImprimir(compraId: string) {
    let form: FormGroup;
    if (!this.onComprasConcretizadas(compraId)) {
      this.service.getCompraGadoId(compraId)
        .subscribe(res => {
          this.service.getPecuaristaId(res.pecuaristaId)
            .subscribe(data => {
              form = this.form.group({
                idcompra: res.id,
                comprador: data['nome'],
                compradorid: data['id'],
                dataentrega: res['dataEntrega'],
                datacompra: this.pipe.transform(Date.now(), "yyyy-MM-dd'T'HH:mm:ss")
              });

              this.service.postNovaCompra(form.value)
                .subscribe(response => {
                  console.log(response);
                  this.service.getNewCompra(response.id)
                    .subscribe((res) => {
                      this.downLoadFile(res, "application/pdf")
                      console.log(res);
                    });
                });
            });
        });
    }
    else {
      this.service.getCompraByCompraGadoId(compraId)
        .subscribe(dados => {
          this.service.getNewCompra(dados['id'])
            .subscribe((res) => {
              this.downLoadFile(res, "application/pdf")
              console.log(res);
            });
        });
    }
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  reload(){
    location.reload();
  }

}
