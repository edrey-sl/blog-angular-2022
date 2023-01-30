import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/servicios/crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-contacto',
  templateUrl: './admin-contacto.component.html',
  styleUrls: ['./admin-contacto.component.css']
})
export class AdminContactoComponent implements OnInit,OnDestroy {
  dtOptions: DataTables.Settings = {};
  ArregloContacto!: any;
  dtTrigger:Subject<any> = new Subject<any>();
  constructor(private service: CrudService) { }

  ngOnInit(): void {

    this.service.contactos().subscribe((resp)=>{
   
     this.ArregloContacto = resp;
     console.log(this.ArregloContacto);
     
     this.dtTrigger.next(resp);
     
    })
    
    this.dtOptions = {
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'
        },
      pagingType: 'full_numbers'
    };

    
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteContacto(id_bd:number,index_arreglo:number){
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
        Swal.fire({
          icon:'success',
          title: 'Eliminado!',
          confirmButtonText: 'Salir',
          confirmButtonColor: '#273c75',
        });

        this.service.deleteContacto(id_bd).subscribe((resp) => {
          if (resp === 'error') {
            Swal.fire(
              {
                title: 'No se puedo eliminar!',
                confirmButtonText: 'Vuelve a intentar!',
                confirmButtonColor: '#273c75',
              }
               )
          } else {
            this.ArregloContacto.splice(index_arreglo, 1);
            this.dtOptions.deferLoading;
          }

        })

      }
    })
    
  }
}
