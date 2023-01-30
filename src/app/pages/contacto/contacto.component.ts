
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { CrudService } from 'src/app/servicios/crud.service';
import { SeoService } from 'src/app/servicios/seo.service';



import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [CrudService]
})
export class ContactoComponent implements OnInit{

  formularioContacto: FormGroup;
  spinnerActivo!: boolean;
  navbar!:boolean;

  constructor(private formBuilder: FormBuilder,
    private contactoService: CrudService,
    private cokie:CokiesService,private seo:SeoService, private head:Title

  ) {
    this.navbar = this.cokie.activoNavbar();
    this.spinnerActivo = true;
    this.formularioContacto = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/), Validators.required]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.head.setTitle('Contacto');
    this.seo.generateTansConfig({
      title:'Contacto',
      slug:'contacto',
    })
  }


  contactoFormulario() {
    if (this.formularioContacto.invalid) {
      Swal.fire(
        {
          icon:'error',
          title: 'Rellena todos los campos!',
          confirmButtonText: 'Salir',
          confirmButtonColor: '#273c75',
        }
      )
    } else {

      this.spinnerActivo = false;
      setTimeout(() => {

        this.spinnerActivo = true;
        const name = this.formularioContacto.get('name')?.value;
        this.contactoService.agregarContacto(this.formularioContacto.value).subscribe({

          complete() {

            Swal.fire(
              {
                icon:'success',
                title: `${name}, su mensaje fue enviado!`,
                confirmButtonText: 'Salir',
                confirmButtonColor: '#273c75',
              }
             
            )

          }, error() {
            Swal.fire(
              {
                icon:'error',
                title: `Mensaje no enviado`,
                confirmButtonText: 'Salir',
                confirmButtonColor: '#273c75',
              }
            )
          }
        });
        this.formularioContacto.reset();

      }, 1500);

    }
  }

  get name() {
    return this.formularioContacto.get('name');
  }
  get email() {
    return this.formularioContacto.get('email');
  }
  get subject() {
    return this.formularioContacto.get('subject');
  }
  get message() {
    return this.formularioContacto.get('message');
  }

}
