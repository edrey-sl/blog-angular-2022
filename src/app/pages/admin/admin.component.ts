import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { CrudService } from 'src/app/servicios/crud.service';


interface sideNavTogge{
  screenWich:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  navbar!: boolean;

  constructor(private cokie: CokiesService, private ruta: Router, private servicio: CrudService) {
    if (!this.cokie.verToken()) {
      this.ruta.navigateByUrl('')
    } else {
      this.servicio.consultar_users(this.cokie.verToken()).subscribe((usuario) => {
        if (usuario == false) {
          this.ruta.navigateByUrl('')
        }
      })
    }

    this.navbar = this.cokie.desactivarNavbar()
  }

  ngOnInit(): void {

  }

 isSideNavCollapsed = false;
 screenWidth = 0;
 
  onToggeSideNav(data:sideNavTogge):void{
    this.isSideNavCollapsed = data.collapsed;
    this.screenWidth = data.screenWich;
  }
}
