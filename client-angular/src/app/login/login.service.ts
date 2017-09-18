//importing required libraries
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
//exporting required Service
export class LoginService {

	vl:any;

  private url = "http://localhost:1337/signIn";
  constructor(private http: Http) { }

  signIn(details:any){
  	return this.http.post(this.url,details)
  	.map(res => {
      console.log(res.json());
      localStorage.setItem('key',res.json().token);
      if(res.json().token===undefined){
        this.vl= 0;
      }
      else{
        this.vl=1;
      }
      return res.json();
    },(error)=>{
      return error.json()
    });
  }
}
