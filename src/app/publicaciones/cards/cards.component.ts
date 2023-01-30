import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicios/crud.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  
  Cards!:any;

  constructor(private service:CrudService) { }

  ngOnInit(): void {
   this.service.vistaCardMini().subscribe((resp)=>{

   this.Cards = resp;
   
   })
  }

  
}
