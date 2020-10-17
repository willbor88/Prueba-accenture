import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import {RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  miFormulario : FormGroup
  constructor(
    private registroService: RegistroService,
  ) { }

  ngOnInit(): void {

    this.miFormulario = new FormGroup({

      'datosUsuario':new FormGroup({
        'identificacion':new FormControl(null,[Validators.required,Validators.minLength(6)]),
       //'nombrecompleto':new FormGroup({
        'nombre':new FormControl(null,[Validators.required,
          // OJO FUNCION A LLAMAR
        //this.FunUsuariosProhibidos.bind(this)
        ]),//<USAMOS bind para que reconsco el metodo
        //Recibe dos Argumentos:El primer Agurmento  es el valor por defecto que tendra el control, el segundo son los validadores que aplicaremos al control
      'apellido':new FormControl(null,[Validators.required]),
    //}),

       'fecha':new FormControl(null,[Validators.required,]),


    })
  })



  }


  onSubmit(){

    console.log(this.miFormulario)

    this.registroService.anadirCliente(this.miFormulario.value);



  }

validarEdades(){

}


//   FunUsuariosProhibidos(control:FormControl):{[key:string]:boolean}
// {
//  if(this.NombresInvalidos.indexOf(control.value)!==-1){//index entrega un menos uno sino encontro el usuario en elemento control.vauo
//    return {'NombreInvalido':true}
//  }
//  return null
}


