import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stock, StockService } from '../stock.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap'

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css'],
  providers:[]
})
export class StockManageComponent implements OnInit {
  stocks:Stock[];
  searchStocks:FormControl = new FormControl();
  keyWord:string;
  constructor(
    private router:Router,
    private stockService:StockService
  ) {
    this.searchStocks.valueChanges
      .debounceTime(500)
      .subscribe((w)=>{
       this.keyWord = w;
      })
  }
  ngOnInit() {
    let stock_observable = this.stockService.getStock() ;
    stock_observable
    .subscribe(data =>{
      this.stocks = data;
    })
   
  }
  
  onCreat(){
    this.router.navigateByUrl("/stock/0");
  }

  onUpdate(stock){
    this.router.navigateByUrl("/stock/"+stock.id);
  }

}
