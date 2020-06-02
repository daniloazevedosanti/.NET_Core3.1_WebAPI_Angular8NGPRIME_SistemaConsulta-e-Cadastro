import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../services/consultas.service';

@Component({
  selector: 'app-consultar-pecuaristas',
  templateUrl: './consultar-pecuaristas.component.html',
  styleUrls: ['./consultar-pecuaristas.component.css']
})
export class ConsultarPecuaristasComponent implements OnInit {

  getPecuaristas: any;
  pecuaristas: any = [];
  cols: any[];
  pag: Number = 1;
  contador: Number = 5;
  tabela = [];

  constructor(private service: ConsultasService,
    private router: Router) { }

  ngOnInit() {
    this.pecuaristas = [];

    this.service.getComprasByList()
    .then(res => {
      console.log(res);
      for (let item of res)
        this.tabela.push(item.compradorId);
      
    });
    
    setTimeout(() => {
      this.consulta()
    }, 50);
  }

  consulta() {
    this.getPecuaristas = this.service.getPecuaristas()
      .subscribe(
        dados => {
          this.pecuaristas = dados;
        });

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'nome', header: 'Pecuarista' }
    ];
  }

  onComprasConcretizadas(id: string): boolean {
    return this.tabela.includes(id);
  }

  delete(id){
    this.router.navigate(['/consulta_pecuaristas/delete/', id]);
  }
  
  reload(){
    location.reload();
  }

}
