import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private MyArray:any;s
 constructor(private _dataservice:DataService) {
  }
 ngOnInit() {
   this._dataservice.GetPost('http://localhost:5000/login',"").subscribe(response => this.MyArray=response)
 //  this.MyArray=this._dataservice.GetPostMethod()
 //  .subscribe(response => this.MyArray=response)
 // }
}
}
