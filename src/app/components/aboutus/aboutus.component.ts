import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  private MyArray:any;s
 constructor(private _dataservice:DataService) {
  }
 ngOnInit() {
   this._dataservice.GetPost('/checksession',"").subscribe(response => this.MyArray=response)
 //  this.MyArray=this._dataservice.getsession('http://localhost:5000/sessiondata')
 //  .subscribe(response => this.MyArray=response)
 // }

}
}
