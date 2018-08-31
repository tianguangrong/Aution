import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Stock, StockService } from '../stock.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModule:FormGroup;
  stock:Stock={
    id :0,
    name:"",
    price:0,
    desc:"",
    rating:0,
    category:[""]
  };
  stockCategories:Array<string> = ['IT','互联网','金融']

  constructor(
    private router:Router,
    private stockService:StockService,
    private routerInfo:ActivatedRoute,
    private fb:FormBuilder
  
  ) { }
  
  //自定义校验器
  catesSellectValidators(catesArray:FormArray):any{
    let arr = catesArray.controls;
    let valid = false;
    arr.forEach((a)=>{
      if(a.value)valid = true;
    })
    if(valid){return null;}
    else{return{catesSellectValidator:true}}
  }
  ngOnInit() {
    let id = this.routerInfo.snapshot.params["id"];
    this.stockService.getStockById(id)
     .subscribe(data =>{
       this.stock = data;
       this.formModule.reset({
        stockName:data.name,
        stockPrice:data.price,
        stockDesc:data.desc,
        rating:data.rating,
        categories:[
          data.category.indexOf(this.stockCategories[0]) >= 0,
          data.category.indexOf(this.stockCategories[1])>= 0,
          data.category.indexOf(this.stockCategories[2])>= 0
        ]
       })
     })
    
    //创建响应式表单数据结构
    this.formModule = this.fb.group({
      stockName:["",[Validators.required,Validators.minLength(4)]],
      stockPrice:["",[Validators.required]],
      stockDesc:["",[Validators.required]],
      categories:this.fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ],this.catesSellectValidators)
    })
  }

  save(){
    let stockCates = this.formModule.get('categories').value;
    let cates = [];
    for(let i=0;i<3;i++){
      if(stockCates[i]==true){
        cates = [...cates,this.stockCategories[i]]
      }else{
        cates = [...cates,'无']
      }
    }
    this.formModule.value.categories = cates;
  }
}
