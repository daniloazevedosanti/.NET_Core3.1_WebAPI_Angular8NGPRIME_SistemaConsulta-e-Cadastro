import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from './../../services/consultas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  descricao: string = "";
  id: string = "";
  preco: string = "";
  f: FormGroup;
  send: FormGroup;
  msg: any = "";

  constructor(private service: ConsultasService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      descricao: [],
      preco: []
    });

    this.service.getAnimalId(this.route.snapshot.paramMap.get("id"))
      .subscribe(dados => {
        this.descricao = dados['descricao'];
        this.id = dados['id'];
        this.preco = dados['preco'];
        this.f.value.id = this.id;
        this.f.value.descricao = this.descricao;
        this.f.value.preco = this.preco;
      });
  }

  voltar() {
    this.router.navigate(['/consulta_animais']);
  }

  onSubmit() {
    this.send = this.formBuilder.group({
      id: this.route.snapshot.paramMap.get("id"),
      descricao: this.f.value.descricao,
      preco: this.f.value.preco
    });

    this.service.atualizarAnimais(this.send.value.id, this.send.value)
      .subscribe((error: HttpErrorResponse) => {
        if (error != null)
          this.msg = "Erro de atualização!";
        else
          this.router.navigate(['/consulta_animais']);
      });
  }
}