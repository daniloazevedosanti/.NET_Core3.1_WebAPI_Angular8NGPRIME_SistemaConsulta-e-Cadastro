import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ConsultasService } from './../../consultas/services/consultas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pecuaristas',
  templateUrl: './pecuaristas.component.html',
  styleUrls: ['./pecuaristas.component.css']
})
export class PecuaristasComponent implements OnInit {

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
  }

  voltar() {
    this.navigate.navigate(['consulta_pecuaristas']);
  }

  onSubmit() {
    this.send = this.formBuilder.group({
      nome: this.f.value.nome
    });
    
    this.service.postPecuarista(this.send.value)
      .subscribe((response) => {
        if (response != null){
          console.log(response);
          this.navigate.navigate(['consulta_pecuaristas']);
          
        }
        else
        this.msg = "Erro de cadastro!";
      });
  }
}