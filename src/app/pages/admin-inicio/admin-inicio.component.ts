import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CrudService } from 'src/app/servicios/crud.service';


@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.css']
})
export class AdminInicioComponent implements OnInit {
  count_publication !: number;
  count_contact !: number;
  count_suscribete!: number;

  constructor(private servicio:CrudService, private head:Title) {
    this.servicio.count_publication().subscribe(resp => {
      this.count_publication = resp[0];
    })

    this.servicio.count_subscribe().subscribe(resp => {
      this.count_suscribete = resp[0];
    })

    this.servicio.count_contact().subscribe(resp => {
      this.count_contact = resp[0];
    })
   }

  ngOnInit(): void {
    this.head.setTitle('Administrador');
  }

}
