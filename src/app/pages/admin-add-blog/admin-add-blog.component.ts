import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { CrudService } from 'src/app/servicios/crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-add-blog',
  templateUrl: './admin-add-blog.component.html',
  styleUrls: ['./admin-add-blog.component.css']
})

export class AdminAddBlogComponent {

  formPublication!: FormGroup;
  Categorias!: any;
  previaImg !: any;
  spinnerActivo!: boolean;
  showUploader: boolean = true;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    sanitize: true,
    height: 'auto',
    minHeight: '25rem',
    placeholder: 'Redacta tu articulo',
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
    ]
          
  };

  constructor(private form: FormBuilder, private service: CrudService,private cokie:CokiesService) {
    this.spinnerActivo = true;
 
    this.formPublication = form.group({
      id: [''],
      categoria: ['', Validators.required],
      title: ['', Validators.required],
      nombreImg: [''],
      imagenArticulo:['',Validators.required],
      fileSource: [null],
      description: ['', Validators.required],
      html: ['', Validators.required]

    })

    this.service.vistaCategory().subscribe((categorias)=>{
    this.Categorias = categorias;
    
    
    })
  }

  sendBlog() {

    if (this.formPublication.invalid) {
       Swal.fire(
        {
          icon: 'error',
          title: 'Oops',
          text: 'Rellena todos los campos!',
          footer: 'Edututos',
          confirmButtonColor: '#273c75',
          confirmButtonText: 'Salir',
        }
      )
    } else {

      this.spinnerActivo = false;
     setTimeout(() => {
      this.spinnerActivo = true;
      this.service.agregarArticulo(this.formPublication.value).subscribe((resp)=>{
       
      if(resp == 'exito'){
        Swal.fire(
          {
            icon: 'success',
            title: 'Éxito',
            text: 'Articulo Publicado',
            footer: 'Edututos',
            confirmButtonColor: '#273c75',
            confirmButtonText: 'Salir',
          }
        )
        this.formPublication.reset();
        this.previaImg = '';
        this.showUploader = false;
        setTimeout(() =>{ this.showUploader = true }, 100);
      }else{
        Swal.fire(
          {
            confirmButtonColor: '#273c75',
            confirmButtonText: 'Salir',
            icon: 'error',
            title: ':(',
            text: 'Error al publicar articulo!',
            footer: 'Edututos',
          }
        )
      }
      });
     }, 2000);
    }

     }

  guardarImagen(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.previaImg = reader.result;

        this.formPublication.patchValue({
          fileSource: this.previaImg,
          nombreImg: file.name,
          id: this.cokie.ver_id()
        });

      };
    }
  }


}

