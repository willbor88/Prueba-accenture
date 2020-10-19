import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Cliente } from '../cliente.model';
import {RegistroService } from '../registro.service';

@Component({
  selector: 'app-solicitud-credito',
  templateUrl: './solicitud-credito.component.html',
  styleUrls: ['./solicitud-credito.component.scss']
})
export class SolicitudCreditoComponent implements OnInit {
  miFormulario : FormGroup
  id:string;
  vaidar:boolean
  Encontrado:Boolean//Esta definido con mayuscula:typescript
  mensaje:boolean

  //Cliente:Cliente

//   Saludar: Cliente{
//     nombre:
//       apellido:
//        identification: string,
//         fecha:string

// }

  constructor(
    private registroService: RegistroService,
  ) { }

  ngOnInit(): void {
    this.Encontrado=false
    mensaje:false

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
       'key':new FormControl(''),


    }),
    'total':new FormControl(null,[Validators.required,]),
  })


  //Escuchar o ver el estado del formulario permanente
  this.miFormulario.statusChanges.subscribe(
    (status)=>console.log(status)
  )

  }


  buscarCliente(){

    if (this.id==null){
      return
    }

    this.registroService.consultarClientes(this.id)
    this.registroService.clienteChanged.subscribe((resul:Cliente)=>{

    // Usar setValue: Asignar todos los valores por defecto en cualquier momento

  this.miFormulario.setValue({
    'datosUsuario':{
    'identificacion':resul['identification'],
    'nombre':resul['firstname'],
    'apellido':resul['lastname'],
    'fecha':resul['birthdate'],
    'key':resul['id'],
  },
  'total':''
  })

     // console.log(resul)


    }, error=>{
      //this.errors.next(error.message)//Le pasamos el mensaje del  error al obsevable errros.Detecta cuando hay un error

    })

    this.registroService.ClienteEncontrado.subscribe(res=>{


        this.Encontrado= !res



    }

    )

  }

  mostrarMensaje(){
    this.mensaje=true
    this.miFormulario.reset()//Limpiar campos del formulario
  }

  onSubmit(){

  }

}
