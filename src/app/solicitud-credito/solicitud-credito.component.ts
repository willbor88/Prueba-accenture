import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {RegistroService } from '../registro.service';

@Component({
  selector: 'app-solicitud-credito',
  templateUrl: './solicitud-credito.component.html',
  styleUrls: ['./solicitud-credito.component.scss']
})
export class SolicitudCreditoComponent implements OnInit {
  miFormulario : FormGroup
 identificacion:string;

  constructor(
    private registroService: RegistroService,
  ) { }

  ngOnInit(): void {
  //   this.miFormulario = new FormGroup({

  //     'datosUsuario':new FormGroup({
  //       'identificacion':new FormControl(null,[Validators.required,Validators.minLength(6)]),
  //      //'nombrecompleto':new FormGroup({
  //       'nombre':new FormControl(null,[Validators.required,
  //         // OJO FUNCION A LLAMAR
  //       //this.FunUsuariosProhibidos.bind(this)
  //       ]),//<USAMOS bind para que reconsco el metodo
  //       //Recibe dos Argumentos:El primer Agurmento  es el valor por defecto que tendra el control, el segundo son los validadores que aplicaremos al control
  //     'apellido':new FormControl(null,[Validators.required]),
  //   //}),

  //      'fecha':new FormControl(null,[Validators.required,]),


  //   })
  // })

  }

  buscarCliente(){

    this.registroService.consultarClientes(this.identificacion)
    // .subscribe(ClientesRecibidos =>{
    //    //console.log(post[0].title)

    //   console.log(ClientesRecibidos)
    //   })

  }

  mostrarCliente(){

    //this.registroService.consultarClientes(this.identificacion);


  }

}
