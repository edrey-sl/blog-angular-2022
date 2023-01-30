
import { Component, OnInit,Output,EventEmitter,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CokiesService } from 'src/app/servicios/cokies.service';
import { Navdata } from './nav-data';


interface sideNavTogge{
  screenWich:number;
  collapsed:boolean;

}
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  collapsed = false;
  navData = Navdata;
  screenWich = 0;
  @Output() onToggeSideNav: EventEmitter<sideNavTogge> = new EventEmitter();

 @HostListener('window:resize',['$event'])

 onResize(event:any){
  this.screenWich = window.innerWidth;
  if (this.screenWich <= 768) {
    this.collapsed = false;
    this.onToggeSideNav.emit({collapsed: this.collapsed,screenWich:this.screenWich})
  }
 }
 
constructor(private cokie:CokiesService, private ruta:Router){

}
 
closeSesion(){
  this.cokie.eliminarCokie();
  this.ruta.navigateByUrl('');
}

  ngOnInit(): void {
    this.screenWich = window.innerWidth;
  }
  
  toggeCollapsed():void{
   this.collapsed = !this.collapsed;
   this.onToggeSideNav.emit({collapsed: this.collapsed,screenWich:this.screenWich})
  }

  closeSidenav():void{
   this.collapsed = false;
   this.onToggeSideNav.emit({collapsed: this.collapsed,screenWich:this.screenWich})
  }
}
