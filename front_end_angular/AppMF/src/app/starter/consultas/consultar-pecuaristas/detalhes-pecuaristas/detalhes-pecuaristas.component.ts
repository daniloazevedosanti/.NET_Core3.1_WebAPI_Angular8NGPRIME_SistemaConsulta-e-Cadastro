import { DatePipe, CurrencyPipe } from '@angular/common';
import { ConsultasService } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-pecuaristas',
  templateUrl: './detalhes-pecuaristas.component.html',
  styleUrls: ['./detalhes-pecuaristas.component.css']
})
export class DetalhesPecuaristasComponent implements OnInit {

  pecuarista: any;
  pecuaristaDados: any;

  nome: string = "";
  id: string = "";
  cols: any = [];

  tabelaView = [];
  compraGadoItens: any = [];

  constructor(private service: ConsultasService,
    private route: ActivatedRoute,
    private navigate: Router,
    private pipeDate: DatePipe,
    private pipeCurrency: CurrencyPipe) { }

  ngOnInit() {

    this.pecuarista = this.service.getPecuaristaIdList(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        dados => {
          this.pecuaristaDados = dados;
          this.nome = this.pecuaristaDados[0].nome;
          this.id = this.pecuaristaDados[0].id;


          for (let item of this.pecuaristaDados[0].compraGados) {
            this.service.getCompraGadoItens()
              .subscribe(
                data => {
                  this.compraGadoItens = data;

                  for (let no of this.compraGadoItens) {

                    if (no['compraGadoId'] == item.id) {
                      this.service.getAnimalId(no['animalId'])
                        .subscribe(
                          data => {
                            this.tabelaView.push({
                              id: item['id'], data:
                                this.pipeDate.transform(item['dataEntrega'], 'dd/MM/yyy'),
                              total: this.pipeCurrency.transform(
                                parseFloat(no['quantidade']) * parseFloat(data['preco']),'BRL'),
                              quantidade: no['quantidade'],
                              preco: this.pipeCurrency.transform(parseFloat(data['preco']), 'BRL'),
                              nomeanimal: data['descricao']
                            });
                          });
                    } 
                    
                  }
                }
              );

          }
        });

    this.service.getPecuaristaIdList(this.route.snapshot.paramMap.get("id"))
      .subscribe(dados => { });

    this.cols = [
      { field: 'id', header: 'Id Compra' },
      { field: 'data', header: 'Data de Entrega' },
      { field: 'nomeanimal', header: 'Item' },
      {field: 'quantidade', header: 'Quantidade'},
      {field: 'preco', header: 'Preço'},
      { field: 'total', header: 'Total' }
    ];
  }

  voltar() {
    this.navigate.navigate(['consulta_pecuaristas']);
  }

}
