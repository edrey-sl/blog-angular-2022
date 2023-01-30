import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './elementos/navbar/navbar.component';
import { FooterComponent } from './elementos/footer/footer.component';
import { CoverComponent } from './elementos/cover/cover.component';
import { CardsComponent } from './publicaciones/cards/cards.component';
import { SubscribeteComponent } from './elementos/subscribete/subscribete.component';
import { BtnSubscribeteComponent } from './elementos/btn-subscribete/btn-subscribete.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ErrorComponent } from './pages/error/error.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PublicacionesComponent } from './pages/publicaciones/publicaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinkitComponent } from './elementos/spinkit/spinkit.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { MarkdownModule } from 'ngx-markdown';
import { RandomComponent } from './publicaciones/random/random.component';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AdminComponent } from './pages/admin/admin.component';
import { PanelComponent } from './elementos/panel/panel.component';
import { NavBodyComponent } from './elementos/nav-body/nav-body.component';
import { AdminBlogComponent } from './pages/admin-blog/admin-blog.component';
import { AdminContactoComponent } from './pages/admin-contacto/admin-contacto.component';
import { AdminInicioComponent } from './pages/admin-inicio/admin-inicio.component';
import { AdminGmailComponent } from './pages/admin-gmail/admin-gmail.component';
import { DataTablesModule } from "angular-datatables";
import { AdminAddBlogComponent } from './pages/admin-add-blog/admin-add-blog.component';
import { AdminUpdateBlogComponent } from './pages/admin-update-blog/admin-update-blog.component';
import { AdminUpdateToolComponent } from './pages/admin-update-tool/admin-update-tool.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CoverComponent,
    CardsComponent,
    SubscribeteComponent,
    BtnSubscribeteComponent,
    ContactoComponent,
    InicioComponent,
    ErrorComponent,
    NosotrosComponent,
    PublicacionesComponent,
    SpinkitComponent,
    ArticuloComponent,
    RandomComponent,
    LoginComponent,
    AdminComponent,
    PanelComponent,
    NavBodyComponent,
    AdminBlogComponent,
    AdminContactoComponent,
    AdminInicioComponent,
    AdminGmailComponent,
    AdminAddBlogComponent,
    AdminUpdateBlogComponent,
    AdminUpdateToolComponent,

  
    
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AngularEditorModule,
    MarkdownModule.forRoot(),
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'enabled'
  })
    
    
    
  ],

  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
