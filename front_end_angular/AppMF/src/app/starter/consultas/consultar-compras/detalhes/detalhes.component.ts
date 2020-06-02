import { DatePipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  pecuarista: any;
  compraGado: any;

  nome: string = "";
  id: string = "";
  cols: any = [];

  tabelaView = [];
  tabela: any;
  compraGadoItens: any = [];
  total: number = 0;
  data: string = "";
  constructor(private service: ConsultasService,
    private route: ActivatedRoute,
    private navigate: Router,
    private pipe: DatePipe,
    private current: CurrencyPipe) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.service.getCompraGadoId(this.id)
    .subscribe(data => {
      this.data = data['dataEntrega'];
      this.pecuarista = data['pecuaristaId'];
      this.service.getPecuaristaId(this.pecuarista)
      .subscribe(dados =>
        this.nome = dados['nome']);
      console.log(data)
    });

    this.cols = [
      { field: 'idItem', header: 'Id do Item' },
      { field: 'animal', header: 'Animal' },
      { field: 'quantidade', header: 'Quantidade' },
      { field: 'preco', header: 'Preço' },
      { field: 'total', header: 'Total' }
    ];

    this.service.getCompraGadoItens()
      .subscribe(dados => {
        this.compraGado = dados;
        
        for (let item of this.compraGado) {
          if(item['compraGadoId'] == this.id ){
                this.tabelaView.push({
                idItem: item.id,
                animal: item['animal'].descricao,
                quantidade: item.quantidade,
                preco: this.current.transform(parseFloat(item['animal'].preco), 'BRL'),
                total: this.current.transform(
                  (item['animal'].preco) * parseFloat(item.quantidade), 'BRL')
            });
            this.total += (item['animal'].preco) * parseFloat(item.quantidade);
          }
        }
        this.tabela = this.tabelaView;
      });

  }

  voltar() {
    this.navigate.navigate(['consulta_pecuaristas']);
  }

}
