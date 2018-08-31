import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpModule, Http } from '@angular/http';


@Injectable()
export class StockService {
    // public stocks:Stock[] = [
    //     new Stock(1,"第一只股票",30,1.5,"供销电商股票",["互联网","金融"]),
    //     new Stock(2,"第二只股票",30,3,"华夏银行股票",["金融"]),
    //     new Stock(3,"第三只股票",30,4,"工商银行股票",["金融"]),
    //     new Stock(4,"第四只股票",30,4.5,"艾融软件股票",["互联网","金融"]),
    //     new Stock(5,"第五只股票",30,3.5,"农业银行股票",["金融"]),
    //     new Stock(6,"第六只股票",30,5,"京东股票",["互联网","金融"]),
    //     new Stock(7,"第七只股票",30,1,"阿里巴巴股票",["互联网","金融","购物"]),
    //     new Stock(8,"第八只股票",30,3.5,"腾讯股票",["互联网","金融","游戏"])
    //   ];

      constructor(public http:Http){}
    
      getStock():Observable<Stock[]>{
          return this.http.get("http://localhost:3000/stocks").map(res=> res.json());
      };

      getStockById(id):Observable<Stock>{
          return this.http.get("http://localhost:3000/stocks/"+id).map(res=> res.json());
        // Observable.from(this.stocks)
        //     .filter((stock)=>stock.id == id)
        //     .subscribe((stock)=>{
        //         console.log(stock)
        //         return stock;
        //     })
      };
}
export class Stock{
    constructor(
        public id:number,
        public name:string,
        public price:number,
        public rating:number,
        public desc:string,
        public category:Array<string>
    ){}

}