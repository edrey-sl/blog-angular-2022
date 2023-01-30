import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/servicios/crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-update-blog',
  templateUrl: './admin-update-blog.component.html',
  styleUrls: ['./admin-update-blog.component.css']
})
export class AdminUpdateBlogComponent implements OnInit {

  Articulos: any;
  public page!: number
  title: string = 'hola'
  formPublication!: FormGroup;

  constructor(private service: CrudService) {

    this.service.vistaCardALL().subscribe((articulos) => {      
    this.Articulos = articulos;

    })
  }

  ngOnInit(): void {
  }

  editar(id: any) {
    console.log(id);
  }

  eliminarArticulo(id_articulo: any, index_arreglo: any) {
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
          icon: 'success',
          title: 'Eliminado!',
          confirmButtonText: 'Salir',
          confirmButtonColor: '#273c75',
        });

        this.service.deleteArticulo(id_articulo).subscribe((resp) => {
          if (resp === 'error') {
            Swal.fire(
              {
                title: 'No se puedo eliminar!',
                confirmButtonText: 'Vuelve a intentar!',
                confirmButtonColor: '#273c75',
              }
            )
          } else {
            this.Articulos.splice(index_arreglo, 1);

          }

        })

      }
    })
  }

}
