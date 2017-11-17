import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class DataService {
  constructor(private _http:Http) {   

   }
    GetService(_url){
      //Make the HTTP request:
        return this._http.get('http://localhost:5000/'+_url).map((data:Response) => data.json())
        .catch(this.handleError);
    }
    PostService(_url,params){
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `${this.jwtToken}`);   
    //  params["user"]="";
    //headers.append('Access-Control-Allow-Credentials', 'true');
        const options = new RequestOptions({ headers: headers });        
        return this._http.post('http://localhost:5000/'+_url, params, options).map((data:Response) => data.json())
        .catch(this.handleError);
      }


    //   Getsearch(apiURL:string) {
    //           let promise = new Promise((resolve, reject) => {
               
    //             this._http.get(apiURL)
    //               .toPromise()
    //               .then(
    //                 res => { // Success
    //                   console.log(res.json());
    //                   resolve();
    //                 }
    //               );
    //           });
    //           return promise;
    //         }

    //          createService(url: string, param: any): Promise<any> {
    //               let body = JSON.stringify(param);
    //               return this._http
    //                   .post(url, body, this.options)
    //                   .toPromise()
    //                   .then(this.extractData)
    //                   .catch(this.handleError);
    //               }
    
    //   private extractData(res: Response) {
    //     let body = res.json();
    //     return body || {};
    // }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error|| 'Server error');
    }
}
