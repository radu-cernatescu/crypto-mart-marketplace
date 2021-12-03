import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/token-storage.service';

import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent implements OnInit {
  isLoading!: boolean;
  isLoginMode: any;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required,),
    password: new FormControl('', Validators.minLength(8)),
  });
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private service: UserService,
    private router: Router, private tokenStorage: TokenStorageService) { } 

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != "") {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.service.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: any) => {
      if (res.message === "SUCCESS") {
        console.log(res);
        this.tokenStorage.saveToken(res.data._id);  
        this.service.isLoggedIn = true;     
        window.location.replace("/main");
      }
      else {
        alert("Username or password incorrect.");
      }
    });


    this.isLoading = true;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
