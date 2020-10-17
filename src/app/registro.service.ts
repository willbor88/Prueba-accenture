import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { HttpClient } from '@angular/common/http'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  //clientesChanged = new Subject<Cliente[]>();

  // private cliente: Cliente= [
  //   new Cliente(
  //     'Wilmar',
  //     'Borja!',
  //     '1020123456',
  //     '17-01-2020'
  //     )


  private clientState =
{
  "-Lb_JtJG2xzkIAihkVwB": {
    "birthdate": "01-03-1993",
    "firstname": "Carlos",
    "identification": "123456789",
    "lastname": "Pérez"
  },
  "-Lbnb_rjnETvumkbug_I": {
    "birthdate": "06-05-2001",
    "firstname": "pedro",
    "identification": "1234",
    "lastname": "jose"
  },
}

  private clientes: Cliente[] = [];

constructor(private http:HttpClient ) {}

  anadirCliente(cliente: Cliente) {
    //this.clientes =
    this.clientes.push(cliente)
    //this.clientesChanged.next(this.clientes.slice());
  }

  consultarClientes(id: string) {
//    this.http.get('https://angular-http-1f4ea.firebaseio.com/posts.json')
    this.http.get('https://testbankapi.firebaseio.com/clients.json')

    .pipe(map((DatosRecibidos :Cliente) =>{ //Especificar la estructura  dato que recibiermosy asi sabremos que propiedades podemos usar
          const postsArray:Cliente[] =[]//Definir el tipo de array
  //Metodo para recorrer los elementos o propiedades  de un objeto
      for (const key in DatosRecibidos) {//El key es el nombre de cada elemento del objeto
        if (DatosRecibidos.hasOwnProperty(key)) {//hasOwnProperty:Valida que cada elmento si tenga un key o nombre
          postsArray.push({...DatosRecibidos[key],id:key})//DatosRecibidos[key] extrae  el valor de cada  elemento del objeto
        //Luego copio las propiedades o elementos de cada objeto   y añado a una nueva propiedad 'id' a cada elemento y finalmente push a nuestro array
       }
         }

         return postsArray
      //console.log(DatosRecibidos)//Este es objeto en estado "Crudo" como venia de la api
      //console.log(postsArray)//Genero un array con cada uno de los valores extraidos de cada elemento
       }))


    .subscribe(ClientesRecibidos =>{
     //console.log(post[0].title)
     console.log(ClientesRecibidos)

     //return ClientesRecibidos
    })

  }

  // getCliente(index: number) {
  //   return this.clientes[index];
  // }

  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }

  // addCliente(Cliente: Cliente) {
  //   this.clientes.push(Cliente);
  //   this.clientesChanged.next(this.clientes.slice());
  // }

  // updateCliente(index: number, newCliente: Cliente) {
  //   this.clientes[index] = newCliente;
  //   this.clientesChanged.next(this.clientes.slice());
  // }

  // deleteCliente(index: number) {
  //   this.clientes.splice(index, 1);
  //   this.clientesChanged.next(this.clientes.slice());
  // }
}



