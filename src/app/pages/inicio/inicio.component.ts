import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { SeoService } from 'src/app/servicios/seo.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  navbar!: boolean;
  constructor(private cokie:CokiesService, private seo:SeoService, private head:Title) { 
    this.navbar = this.cokie.activoNavbar();
    }

    ngOnInit(): void {
        this.head.setTitle('Edublog');
        this.seo.generateTansConfig({
          title:'Edublog',
          description:'Blog de tecnología',
          slug:'',
        })
    }

}
