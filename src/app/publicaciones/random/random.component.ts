import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from 'src/app/servicios/crud.service';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  Random!: any;
  @Input() categoryid !: any;
  @Output() idEnviar = new EventEmitter<number>();
  constructor(private service:CrudService) {
   
   }

  ngOnInit(): void {
    this.service.random(4).subscribe((resp)=>{
   
      this.Random = resp
     })
  }

  newPublication(id:number){
       this.idEnviar.emit(id)
  }

}
