import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/servicios/crud.service';
import Swal from 'sweetalert2';
import { LanguageApp } from '../admin/LanguageApp';


@Component({
  selector: 'app-admin-gmail',
  templateUrl: './admin-gmail.component.html',
  styleUrls: ['./admin-gmail.component.css']
})
export class AdminGmailComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  ArregloCorreo!: any;
  dtTrigger:Subject<any> = new Subject<any>();
  constructor(private service: CrudService) {  }

  ngOnInit(): void {
    this.dtOptions = {
      language: LanguageApp.spanish_datatables
    };
   
     this.service.subscribe().subscribe((resp)=>{
     this.ArregloCorreo = resp;
     this.dtTrigger.next(resp);
     
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteCorreo(id: number, control: number) {

    Swal.fire({
      title: 'Está seguro de eliminar?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#C20000 ',
      denyButtonText: `Cancelar`,
      denyButtonColor: '#696969 ',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(
          {
            icon:'success',
            title: 'Eliminado!',
            confirmButtonText: 'Salir',
            confirmButtonColor: '#273c75',
          }
        );

        this.service.deleteSubscribe(id).subscribe((resp) => {
          if (resp === 'error') {
            Swal.fire(
              'No se puedo eliminar',
              'Vuelve a intentar!',
              'error'
            )
          } else {
            this.ArregloCorreo.splice(control, 1);
          }

        })

      }
    })


  }
}
