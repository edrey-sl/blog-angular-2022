import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { CrudService } from 'src/app/servicios/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-btn-subscribete',
  templateUrl: './btn-subscribete.component.html',
  styleUrls: ['./btn-subscribete.component.css']
})
export class BtnSubscribeteComponent implements OnInit {
  formularioSubs!:FormGroup;

  constructor(private form:FormBuilder,
    private service:CrudService) { 
   
    this.formularioSubs = form.group({
      emailSubs:['',[Validators.required,Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/)]]
    })
  }

  ngOnInit(): void {
    
  }

  saveEmail(){
    if (this.formularioSubs.invalid) {
      Swal.fire(
        {
          icon:'info',
          title: 'Ingrese un correo válido!',
          confirmButtonText: 'Salir',
          confirmButtonColor: '#273c75',
        }
      )
    } else {
      this.service.agregarEmail(this.formularioSubs.value).subscribe({
        complete() {
          Swal.fire(
            {
              icon:'success',
              title: 'Correo ingresado exitosamente!',
              confirmButtonText: 'Salir',
              confirmButtonColor: '#273c75',
            }
          )
              },error() {
          Swal.fire(
          {
            icon:'error',
            title: 'Error al enviar correo!',
            confirmButtonText: 'Salir',
            confirmButtonColor: '#273c75',
          }
          )
        },
      })
    
     this.formularioSubs.reset();
    }
  }

  get emailSubs(){
  return this.formularioSubs.get('emailSubs');
  }
}
