import { Injectable } from '@angular/core';
import {Http,Response, Headers,RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  private results: any;

  constructor(private _http:Http) {
        console.log("Ajax call")
   }
      // private commentsUrl = 'https://jsonplaceholder.typicode.com/posts';
      private commentsUrl = 'http://localhost:5000/login'
       GetPost(url,params) {
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
         return this._http.post(url, params, options)
                        


  }

        GetPostMethod() {
            //Make the HTTP request:
            return this._http.get(this.commentsUrl).map((data:Response) => data.json());
    }
    getsession(url) {
        //Make the HTTP request:
        return this._http.get(url).map((data:Response) => data.json());
}
}
