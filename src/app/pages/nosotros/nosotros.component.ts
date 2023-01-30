import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { SeoService } from 'src/app/servicios/seo.service';



@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  navbar!:boolean;
  constructor(private cokie:CokiesService,private seo:SeoService, private head:Title) { 
    this.navbar = this.cokie.activoNavbar();
  }

  ngOnInit(): void {
    this.head.setTitle('Nosotros');
        this.seo.generateTansConfig({
          title:'Nosotros',
          slug:'nosotros',
        })
  }

}
