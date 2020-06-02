import { ConsultasService } from './../../services/consultas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editar-pecuarista',
  templateUrl: './editar-pecuarista.component.html',
  styleUrls: ['./editar-pecuarista.component.css']
})
export class EditarPecuaristaComponent implements OnInit {

  nome: string = "";
  id: string = "";
  f: FormGroup;
  send: FormGroup;
  msg: any = "";

  constructor(private service: ConsultasService,
    private route: ActivatedRoute,
    private navigate: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      nome: []
    });

    this.service.getPecuaristaId(this.route.snapshot.paramMap.get("id"))
      .subscribe(dados => {
        this.nome = dados['nome'];
        this.id = dados['id'];
        this.f.value.id = this.id;
        this.f.value.nome = this.nome;
      });
  }

  voltar() {
    this.navigate.navigate(['/consulta_pecuaristas']);
  }

  onSubmit() {
    this.send = this.formBuilder.group({
      id: this.route.snapshot.paramMap.get("id"),
      nome: this.f.value.nome
    });
    
    this.service.atualizarPecuarista(this.send.value.id, this.send.value)
      .subscribe((error: HttpErrorResponse) => {
        if (error != null)
          this.msg = "Erro de atualização!";
        else
          this.navigate.navigate(['/consulta_pecuaristas']);
      });
  }
}
