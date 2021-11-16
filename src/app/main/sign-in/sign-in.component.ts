import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoading!: boolean;
  isLoginMode: any;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required,),
    password: new FormControl('', Validators.minLength(8)),
  });

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    // if (!form.valid) {
    //   return;
    // }
    // const email = form.value.email;
    // const password = form.value.password;

    let authObs: Observable<any>;

    this.isLoading = true;
    //authObs = this.authService.login(email, password);
    alert("Login Succesful");
  }
    
}
