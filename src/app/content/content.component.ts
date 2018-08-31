import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private router:Router) { }
  topTitle:Object = {};
  ngOnInit() {
    this.router.events
      .filter((event)=>event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd)=>{
        console.log('event : '+event);
        if(event.url == '/' || event.url == '/dashboard' ){
          this.topTitle = {
            title:'首页面板',
            detail:'这是你的首页'
          }
        }else{
          this.topTitle = {
            title:'股票管理系统',
            detail:'这是你的股票管理系统'
          }
        }
      })

  }

}
