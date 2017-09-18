//importing required libraries
import { Component, OnInit } from '@angular/core';
import {SignupService} from './signup.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
//exporting required Component
export class SignupComponent implements OnInit {

	details:any={};
	ref:any;
  constructor(private signupService:SignupService, private router:Router) { }
  addDetails(){
    if(this.details.userName==undefined ||this.details.emailId==undefined ||this.details.phoneNumber==undefined ||this.details.password==undefined){
      alert("Fields can't be empty");
    }
    else{
      this.signupService.addDetails(this.details)
      .subscribe(ref => {
        this.ref = ref
        console.log(ref);
        this.login(ref);
      });
    }
  }


  login(flag:any){
    console.log(flag);
    if(flag){
      console.log("you are in if part");
      alert("Succesfully Registered");
      this.router.navigateByUrl("/login");         
    }
    else{
      console.log("you are in else part");
      alert("Enter different email-id");         
    }
    console.log("aftre",flag);
  }


  ngOnInit() {
  }

}
