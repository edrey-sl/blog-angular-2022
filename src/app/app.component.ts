import { Component,OnInit } from '@angular/core';
import { CokiesService } from './servicios/cokies.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'blog';
  navbar!:boolean;


 constructor(private cokie:CokiesService){

 }

 ngOnInit(): void {
 this.navbar = this.cokie.visible;
 console.log('Desde componente principal es: ' + this.navbar);
 
}


}
