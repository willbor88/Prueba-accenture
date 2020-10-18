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
  error:Boolean
  mensaje:String
  clienteExistente:Boolean
  registroExitoso:Boolean

  constructor(
    private registroService: RegistroService,
  ) { }

  ngOnInit(): void {
    this.error=false
    this.clienteExistente=false

    this.miFormulario = new FormGroup({

     // 'datosUsuario':new FormGroup({
        'identification':new FormControl(null,[Validators.required,Validators.minLength(6)]),
       //'nombrecompleto':new FormGroup({
        'firstname':new FormControl(null,[Validators.required,
          // OJO FUNCION A LLAMAR
        //this.FunUsuariosProhibidos.bind(this)
        ]),//<USAMOS bind para que reconsco el metodo
        //Recibe dos Argumentos:El primer Agurmento  es el valor por defecto que tendra el control, el segundo son los validadores que aplicaremos al control
      'lastname':new FormControl(null,[Validators.required]),
    //}),

       'birthdate':new FormControl(null,[Validators.required,]),


    //})
  })



  }


  onSubmit(){
    this.registroExitoso=false
    this.clienteExistente=false

   //console.log(this.miFormulario)
   //console.log(this.miFormulario.value.identification)

    this.registroService.consultarClientes(this.miFormulario.value.identification)
    this.registroService.ClienteEncontrado.subscribe(res =>{
      //console.log(res)
      if (res==true) {
        //console.log(res)
        this.clienteExistente=true
      }
      else{

        this.registroService.anadirCliente(this.miFormulario.value).subscribe(respuestaData => {
          //console.log(respuestaData );
          this.registroExitoso=true

        },
        error =>{
          this.error=true
          this.mensaje=error['message']+'\n' + 'Estatus:' + error['status']
          console.log(error)
          //this.error=error.message
        }
        )

      }
    })



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


