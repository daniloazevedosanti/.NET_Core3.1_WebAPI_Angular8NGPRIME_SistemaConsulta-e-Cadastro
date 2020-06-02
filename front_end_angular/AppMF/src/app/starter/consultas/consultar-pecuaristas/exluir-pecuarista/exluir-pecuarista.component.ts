import { Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exluir-pecuarista',
  templateUrl: './exluir-pecuarista.component.html',
  styleUrls: ['./exluir-pecuarista.component.css']
})
export class ExluirPecuaristaComponent implements OnInit {

  nome: string = "";
  id: string = "";
  constructor(private service: ConsultasService,
              private route: ActivatedRoute,
              private navigate: Router) { }

  ngOnInit() {
    
    this.service.getPecuaristaId(this.route.snapshot.paramMap.get("id"))
    .subscribe(dados => {
      this.nome = dados['nome'];
      this.id = dados['id'];
    });
  }

  voltar(){
    this.navigate.navigate(['/consulta_pecuaristas']);
  }

  delete(){
    this.service.deletePecuarista(this.id)
    .subscribe(
      (response) => {
        if (response != null)
          console.log(response);
      }
    );
    this.navigate.navigate(['/consulta_pecuaristas']);
  }

}
