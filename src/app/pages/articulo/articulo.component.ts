import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, RouterLink } from '@angular/router';
import { CrudService } from 'src/app/servicios/crud.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { CokiesService } from 'src/app/servicios/cokies.service';




@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  id!: any;
  Articulo!: any;
  Random!: any;
  navbar!:boolean;
  

  constructor(private rutaActiva:ActivatedRoute,
    private service:CrudService,
    private ruta:Router,
    private title:Title,
    private cokie:CokiesService) {
      this.navbar = this.cokie.activoNavbar();
      this.id = this.rutaActiva.snapshot.paramMap.get("id");

    this.service.consultar(this.id).subscribe((resp)=>{

      if (Object.entries(resp).length === 0){
        this.ruta.navigateByUrl('/publicaciones');
       }else{
        this.Articulo = resp;
      
        for (const iterator of  this.Articulo) {
          
          this.title.setTitle(iterator.title);
       
        
        }
       
       }
    })
     
     }

  ngOnInit(): void {
   this.service.random(4).subscribe((rep)=>{
    this.Random = rep
    
   })
  }

  newPost( id:number){

    this.service.consultar(id).subscribe((resp)=>{

      if (Object.entries(resp).length === 0){
        this.ruta.navigateByUrl('/publicaciones');
       }else{
        this.Articulo = resp;
        
        window.scroll({
          top: 0,
          left: 0,
          behavior:'smooth'
          
        })
      
        for (const iterator of  this.Articulo) {
                
          this.title.setTitle(iterator.title);
         
        }
       
       }
    })
    
  }
  
}
