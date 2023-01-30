import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-body',
  templateUrl: './nav-body.component.html',
  styleUrls: ['./nav-body.component.css']
})
export class NavBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() collapse = false;
  @Input() screenWidth = 0;

  getBodyClass():string{
    let styleClass = '';
    if (this.collapse && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    }else if(this.collapse && this.screenWidth <= 768 && this.screenWidth > 0 ){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }

}
