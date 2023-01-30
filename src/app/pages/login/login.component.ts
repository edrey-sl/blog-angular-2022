import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/servicios/crud.service';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { SeoService } from 'src/app/servicios/seo.service';
import { Title } from '@angular/platform-browser';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  cokie_alm!: string;
  navbar!: boolean;

  constructor(private service: CrudService, private form: FormBuilder, private ruta: Router, private cookie: CokiesService, private seo:SeoService, private head:Title) {

    this.navbar = this.cookie.activoNavbar();

    this.formularioLogin = this.form.group({
      email: ['', [Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/), Validators.required]],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.head.setTitle('Sesion');
    this.seo.generateTansConfig({
      title:'Sesion',
      slug:'login',
    })
  }

  sendLogin() {
    if (this.formularioLogin.invalid) {
      Swal.fire(
        {
          icon: 'info',
          title: 'Rellena todos los campos!',
          confirmButtonText: 'Salir',
          confirmButtonColor: '#273c75',
        }
      )
    } else {
      this.service.validarLogin(this.formularioLogin.value).subscribe((resp) => {

        if (resp == 'null') {
          Swal.fire(
            {
              icon: 'info',
              title: 'Usuario no encontrado!',
              confirmButtonText: 'Salir',
              confirmButtonColor: '#273c75',
            }
          )
        } else {

          this.cookie.agregarCokie(resp.token, resp.id);

          this.cokie_alm = this.cookie.verToken();

          if (this.cokie_alm) {
            this.ruta.navigateByUrl('administrador/inicio')

          }
        }

      })

    }
  }

  get email() {
    return this.formularioLogin.get('email');
  }

  get password() {
    return this.formularioLogin.get('password');
  }

}
