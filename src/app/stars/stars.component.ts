import { Component, OnInit, Input, OnChanges,SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {
  stars:Array<boolean> = [];
  @Input() 
  rating:Number;

  @Output()
  ratingChange = new EventEmitter<any>();

  @Input()
  readonly:boolean = true;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void{
    this.stars=[];
    for(let i=1; i<6;i++){
      this.stars = [...this.stars,this.rating<i];//利用数组展开的方式生成一个新的数组；
    }
  }
  ngOnInit() {}
  doClick(num){
    if(!this.readonly){
      this.rating = num+1;
      this.ratingChange.emit(this.rating);
      console.log("this.rating>> "+this.rating)
    }
  }

}
