import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Menu } from '../domain/menu.model';
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuList:Array<Menu>=[];
  currentId:number;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.menuList = [
      {id:1,name:'首页',url:'dashboard'},
      {id:2,name:'股票管理',url:'stock'}
    ];
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) =>{
        if(event.url == '/' || event.url == '/dashboard' ){
          this.currentId = 1;
        }else{
          this.currentId = 2;
        }
      })
  }

  navTo(menu:Menu){
    this.currentId = menu.id;
    this.router.navigateByUrl(menu.url);
  }
}

// export class MenuList implements Menu {
//    constructor(
//      public id:number,
//      public name:string,
//      public url:string
//    ){}
// }