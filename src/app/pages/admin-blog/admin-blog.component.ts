import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {
 status!: boolean;
 btnStatus!: boolean;
 
  constructor() { 
    this.status = true;
    this.btnStatus = false;
 
  }

  ngOnInit(): void {
  }

  hide():void{
  this.status = false;
  this.btnStatus = true;
  }

  show():void{
    this.status = true;
    this.btnStatus = false;
  }
 
}
