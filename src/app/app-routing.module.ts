import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ErrorComponent } from './pages/error/error.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminContactoComponent } from './pages/admin-contacto/admin-contacto.component';
import { AdminBlogComponent } from './pages/admin-blog/admin-blog.component';
import { AdminInicioComponent } from './pages/admin-inicio/admin-inicio.component';
import { AdminGmailComponent } from './pages/admin-gmail/admin-gmail.component';
import { AdminAddBlogComponent } from './pages/admin-add-blog/admin-add-blog.component';
import { AdminUpdateBlogComponent } from './pages/admin-update-blog/admin-update-blog.component';
import { AdminUpdateToolComponent } from './pages/admin-update-tool/admin-update-tool.component';


const routes: Routes = [
  { path: '',redirectTo:'inicio',pathMatch:'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  {path: 'publicaciones', component: PublicacionesComponent},
  {path: 'articulo/:id', component: ArticuloComponent},
  {path: 'login', component: LoginComponent},
  {path: 'administrador', component: AdminComponent, children:[
    {path: 'inicio', component: AdminInicioComponent},
    {path: 'contacto', component: AdminContactoComponent},
    {path: 'correos', component: AdminGmailComponent},
    {path: 'blog', component: AdminBlogComponent,children:[
      {path: 'add', component: AdminAddBlogComponent},
      {path: 'update', component: AdminUpdateBlogComponent},
      {path: 'vista/:id', component: AdminUpdateToolComponent},
    ]},
   

  ]},
 
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
