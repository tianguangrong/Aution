import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'stockSearch'})
export class StockSearchPipe implements PipeTransform {
    transform(stocks: any[], name:string, keyWord:string): any {
        
        if(!name || !keyWord){
            return stocks
        }
       return  stocks.filter((stock) => stock[name].indexOf(keyWord) >= 1)
          
        
    }
}