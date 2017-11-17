import { Injectable } from '@angular/core';
import{DataService} from '../data.service'

@Injectable()
export class AuthService {
  constructor(private _dataservice:DataService) { }
  isLoggedIn(){
    return this._dataservice.PostService("checksession",{})
      .subscribe(
            data => {
             // alert(data.msg=="session expired!")
              if(data.msg=="session expired!"){
                return false
              }
              else{
                  return data;
              }
              
            })
          //  .then(data=>{
          //     let body = data.json();
          //     return body || {};
          //  })
      }
}


// .subscribe(
//             data => {
              
//             },
//             err => {
//                 console.log(err);
//             }
//             )