import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/servicios/crud.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CokiesService } from 'src/app/servicios/cokies.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-update-tool',
  templateUrl: './admin-update-tool.component.html',
  styleUrls: ['./admin-update-tool.component.css']
})


export class AdminUpdateToolComponent {
  public Editor = DecoupledEditor;
  id!: any;
  Categorias!: any;
  fk_categoria!: any;
  formUpdate: FormGroup;
  previaImg!: any;
  spinnerActivo!: boolean;
  DatosArticulos!: any;
  status!: boolean;

  picture_new!: boolean;
  picture_actual !: any;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    sanitize: true,
    height: 'auto',
    minHeight: '5rem',
    placeholder: 'Enter text in this rich text editor....',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'Quote',
        class: 'quoteClass',
      },
      {
        name: 'Title Heading',
        class: 'titleHead',
        tag: 'h1',
      },
    ],
  };

  constructor(private ruta: ActivatedRoute, private servicio: CrudService, private buil: FormBuilder, private cokie: CokiesService) {

    this.id = this.ruta.snapshot.paramMap.get('id');
    this.status = false;
    this.spinnerActivo = true;
    this.picture_new = true;

    this.formUpdate = this.buil.group({
      id: [''],
      id_user: [''],
      categoria: ['', Validators.required],
      title: ['', Validators.required],
      nombreImg: [''],
      fileSource: [null],
      description: ['', Validators.required],
      html: ['', Validators.required],
      img_old: ['']

    })

    this.servicio.vistaCategory().subscribe((categorias) => {
      this.Categorias = categorias;

    })


    this.servicio.consultarForUpdate(this.id).subscribe(articulos => {
    this.DatosArticulos = articulos;
    this.fk_categoria = this.DatosArticulos.cat_id;

      this.formUpdate.setValue({
        id: this.DatosArticulos.id_p,
        id_user: this.cokie.ver_id(),
        categoria: this.DatosArticulos.cat_id,
        title: this.DatosArticulos.title,
        nombreImg: '',
        fileSource: '',
        description: this.DatosArticulos.description,
        html: this.DatosArticulos.html,
        img_old: this.DatosArticulos.img
      })

      this.picture_actual = this.DatosArticulos.img;
    })
  }


  actualizar() {
    this.spinnerActivo = false;
    setTimeout(() => {
      this.servicio.updateArticulos(this.formUpdate.value).subscribe(resp => {
        if (resp == 'exito') {

          Swal.fire({
            confirmButtonColor: '#273c75',
            confirmButtonText: 'Salir',
            icon: 'success',
            title: 'Éxito',
            text: 'Articulo actualizado!',
            footer: 'Edututos',
          })
         
        }else{
          Swal.fire({
            confirmButtonColor: '#273c75',
            confirmButtonText: 'volver a intentar',
            icon: 'error',
            title: ':(',
            text: 'No se pudo actualizar!',
            footer: 'Edututos',
          })
        }
        this.spinnerActivo = true;
      })
    }, 1500);

 
  }

  guardarImagen(event: any) {
    this.picture_new = false;

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.previaImg = reader.result;

        this.formUpdate.patchValue({
          fileSource: this.previaImg,
          nombreImg: file.name,
          id: this.id

        });
      };
    }
  }
}


