import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { CrudService } from 'src/app/servicios/crud.service';
import { SeoService } from 'src/app/servicios/seo.service';



@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})

export class PublicacionesComponent implements OnInit {
  public page!:number;
  Data!:any;
  Category!:any;
  Filtrar!:any;
  status!: boolean;
  statusfiltro!: boolean;
  navbar!: boolean;


  constructor(private service:CrudService,private cokie:CokiesService, private seo:SeoService, private head:Title) { 

    this.status = true;
    this.statusfiltro = false;
    this.navbar = this.cokie.activoNavbar();
  }

  ngOnInit(): void {

  this.service.vistaCardALL().subscribe((resp)=>{
    this.Data=resp;
     
  })

   this.service.vistaCategory().subscribe((resp)=>{
  
    this.Category = resp;    
  })

  this.head.setTitle('Publicaciones');
        this.seo.generateTansConfig({
          title:'Publicaciones',
          description:'Pagina de articulos del canal Edututos',
          slug:'publicaciones',
        })

  }//termina 

  filtrar(id:any){
    this.statusfiltro = true;
    this.service.filtrado(id).subscribe((resp)=>{
      this.status = false;
      this.Filtrar = resp;
       
    })
  }

  resetAll(){
    this.status = true;
    this.statusfiltro = false;
      this.service.vistaCardALL().subscribe((resp)=>{
      this.Data=resp;
    })
  }
 }
