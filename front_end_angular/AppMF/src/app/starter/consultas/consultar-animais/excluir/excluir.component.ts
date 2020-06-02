import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit {

  descricao: string = "";
  id: string = "";
  constructor(private service: ConsultasService,
              private route: ActivatedRoute,
              private navigate: Router) { }

  ngOnInit() {
    this.service.getAnimalId(this.route.snapshot.paramMap.get("id"))
    .subscribe(dados => {
      this.descricao = dados['descricao'];
      this.id = dados['id'];
    });
  }

  voltar(){
    this.navigate.navigate(['/consulta_animais']);
  }

  delete(){
    this.service.deletarAnimal(this.id)
    .subscribe(
      err => {
        if (err != null)
          console.log(err);
      }
    );
    this.navigate.navigate(['/consulta_animais']);
  }
}
