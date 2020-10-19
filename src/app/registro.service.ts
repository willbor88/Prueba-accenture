import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { HttpClient } from '@angular/common/http'
import { map} from "rxjs/operators";
import { from,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  clientesChanged = new Subject<Cliente[]>();
  clienteChanged = new Subject<Cliente>();
  ClienteEncontrado = new Subject<Boolean>();
 private econtradoCiclo:boolean

  private Encontrado:boolean = false;

//   private clientState =
// {
//   "-Lb_JtJG2xzkIAihkVwB": {
//     "birthdate": "01-03-1993",
//     "firstname": "Carlos",
//     "identification": "123456789",
//     "lastname": "Pérez"
//   },
//   "-Lbnb_rjnETvumkbug_I": {
//     "birthdate": "06-05-2001",
//     "firstname": "pedro",
//     "identification": "1234",
//     "lastname": "jose"
//   },
// }

  private clientes: Cliente[] = [];

constructor(private http:HttpClient ) {

}

  anadirCliente(cliente: Cliente) {
   //console.log(cliente)

   return this.http
    .post<Cliente>(//Especificar a typescrit que formato o tipo de datos recibiremos de la peticion http atreves del body de la peticion  usando  "<>""
      'https://testbankapi.firebaseio.com/clients.json',//la extencion .json solo es necesario en Firebase
      cliente//El body de la peticion :La data para almacenar
    )




  }

  consultarClientes(id: string) {
    //id.toString()
    this.econtradoCiclo=false


//    this.http.get('https://angular-http-1f4ea.firebaseio.com/posts.json')
  this.http.get('https://testbankapi.firebaseio.com/clients.json')

    .pipe(map((DatosRecibidos :Cliente) =>{ //Especificar la estructura  dato que recibiermosy asi sabremos que propiedades podemos usar ejecutando codigo para modifcar
          const postsArray:Cliente[] =[]//Definir el tipo de array
  //Metodo para recorrer los elementos o propiedades  de un objeto
      for (const key in DatosRecibidos) {//El key es el nombre de cada elemento del objeto
       if (DatosRecibidos.hasOwnProperty(key)) {//hasOwnProperty:Valida que cada elmento si tenga un key o nombre

           // console.log(DatosRecibidos)

           postsArray.push({...DatosRecibidos[key],id:key})//Extraer las propiedades y elementos a un nuevo array


      }
       }


      return postsArray

    }
  ))
  .subscribe(ClientesRecibido =>{

    for (const key of ClientesRecibido) {

      //if(key['identification']=='123456789'){
        if(key['identification']== id){
       // console.log(key)
        this.clienteChanged.next(key);
        this.ClienteEncontrado.next(this.Encontrado=true);
       this.econtradoCiclo= true
        break
      }
      // else{
      //   console.log('will')
      //   this.econtradoCiclo=false
      // }
    }
      if(!this.econtradoCiclo){

       this.ClienteEncontrado.next(this.Encontrado=false);

      }


  }, error=>{
    //console.log(error)
  })


// })


  }

}















