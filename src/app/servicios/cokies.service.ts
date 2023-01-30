import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CokiesService {
  dato!:string;
  id!:string;
  visible: boolean = true;

  constructor(private cookie:CookieService) { 

  }

   agregarCokie(token:any,id:any) {
    this.cookie.set('id',id);
    this.cookie.set('token',token);
   
   
  
  }

 eliminarCokie() {
  this.cookie.delete('id');
    this.cookie.delete('token');
   
   
  }
 activoNavbar(){

  return this.visible = true;
 }

 desactivarNavbar(){
  return this.visible = false;
 }
  verToken(){
    this.dato = this.cookie.get('token');
    return this.dato;
  }

  ver_id(){
    this.id = this.cookie.get('id');
    return this.id;
  }
}
