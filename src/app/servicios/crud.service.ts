import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactoServices } from './datosContactoService';
import { EstructuraEmail } from './datosEmailService';
import { DatosLogin } from './datosLogin';



@Injectable({
  providedIn: 'root'
})

export class CrudService {
 API: string = "http://localhost:82/blog_2022/";
  constructor(private clienteHttp:HttpClient) { 
    
  }
  agregarArticulo(datosArticulos:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertarArticulos=1",datosArticulos);
  }
  updateArticulos(datosArticulos:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?updateArticulos=1",datosArticulos);
  }
  agregarContacto(datosContacto:ContactoServices):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosContacto);
  }

  agregarEmail(datosEmail:EstructuraEmail):Observable<any>{
    return this.clienteHttp.post(this.API+"?subs=1",datosEmail);
  }

  validarLogin(datosLogin:DatosLogin):Observable<any>{
    return this.clienteHttp.post(this.API+`?login=1`,datosLogin);
  }


  vistaCardMini(){
    return this.clienteHttp.post(this.API+"?cards=0",0);
  }

  vistaCardALL(){
    return this.clienteHttp.post(this.API,0);
  }

  vistaCategory(){
    return this.clienteHttp.post(this.API+"?category=0",0);
  }

 filtrado(id:any){
  return this.clienteHttp.post(this.API+`?filtrado=${id}`,0);
 }

 consultar(id:any){
  return this.clienteHttp.post(this.API+`?consultar=${id}`,0);
 }

 consultarForUpdate(id:any){
  return this.clienteHttp.post(this.API+`?consultarForUpdate=${id}`,0);
 }

 random(cuantos:any){
  return this.clienteHttp.post(this.API+`?random=${cuantos}`,0);
 }

 consultar_users(token:any){
  return this.clienteHttp.post(this.API+`?consultar_users=${token}`,0);
 }

 contactos():Observable<any>{
  return this.clienteHttp.post(this.API+'?contactos=0',0);
 }
 
 subscribe():Observable<any>{
  return this.clienteHttp.post(this.API+'?subscribe=0',0);
 }
 
 deleteSubscribe(id:number):Observable<any>{
  return this.clienteHttp.post(this.API+`?deleteSubscribe=${id}`,0);
 }

 deleteContacto(id:number):Observable<any>{
  return this.clienteHttp.post(this.API+`?deleteContacto=${id}`,0);
 }

 deleteArticulo(id:number):Observable<any>{
  return this.clienteHttp.post(this.API+`?deleteArticulo=${id}`,0);
 }

 count_publication():Observable<any>{
  return this.clienteHttp.post(this.API+'?count_publication=0',0);
 }

 count_contact():Observable<any>{
  return this.clienteHttp.post(this.API+'?count_contact=0',0);
 }

 count_subscribe():Observable<any>{
  return this.clienteHttp.post(this.API+'?count_subscribe=0',0);
 }
}

