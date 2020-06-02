import { ActivatedRoute, Router } from '@angular/router';
import { ConsultasService } from './../../consultas/services/consultas.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {

  nome: string = "";
  id: string = "";
  f: FormGroup;
  send: FormGroup;
  msg: any = "";

  constructor(private service: ConsultasService,
    private navigate: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      nome: [],
      preco: []
    });
  }

  voltar() {
    this.navigate.navigate(['consulta_animais']);
  }

  onSubmit() {
    this.send = this.formBuilder.group({
      descricao: this.f.value.nome,
      preco: this.f.value.preco
    });
    
    this.service.postAnimais(this.send.value)
      .subscribe((response) => {
        if (response != null){
          console.log(response);
          this.navigate.navigate(['consulta_animais']);
          
        }
        else
        this.msg = "Erro de cadastro!";
      });
  }
}
