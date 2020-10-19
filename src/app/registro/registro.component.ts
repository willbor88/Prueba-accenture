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
  fechaCliente:Date
  mayorEdad:Boolean

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

        ]),

      'lastname':new FormControl(null,[Validators.required]),
    //}),

       'birthdate':new FormControl(null,[Validators.required,this.validarEdad.bind(this)]),


    //})
  })

//Ver el stado del formulario con cada cambio
  // this.miFormulario.statusChanges.subscribe(
  //   (status)=>console.log(status))



  }


  onSubmit(){
    this.registroExitoso=false
    this.clienteExistente=false

   //console.log(this.miFormulario)
   //console.log(this.miFormulario.value.identification)

   console.log(this.fechaCliente)

    this.registroService.consultarClientes(this.miFormulario.value.identification)
    this.registroService.ClienteEncontrado.subscribe(res =>{
      //console.log(res)
      if (res==true) {
        //console.log(res)
        this.clienteExistente=true
        this.miFormulario.reset()//Limpiar campos del formulario
      }
      else{

        this.registroService.anadirCliente(this.miFormulario.value).subscribe(respuestaData => {
          //console.log(respuestaData );
          this.registroExitoso=true
          this.miFormulario.reset()//Limpiar campos del formulario

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

  ingresoFecha(){
    //this.miFormulario.value.

  }


//validarEdad(control:FormControl):{[key:string]:boolean
validarEdad(control:FormControl):{[key:string]:boolean}


{


   var today = new Date();
   var birthDate = new Date(control.value);

   //console.log(control.value)

   if(control.value==null){
     return
   }
   var age = today.getFullYear() - birthDate.getFullYear();
   var m = today.getMonth() - birthDate.getMonth();
   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
       age--;
   }

  console.log(age)//Ver edad calculada

   if(age<18){

  //   console.log(age)
  return {'EdadInvalida':true}

   }


  return null;


 }

}


