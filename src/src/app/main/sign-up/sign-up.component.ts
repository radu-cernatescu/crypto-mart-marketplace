import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoading!: boolean;
  isLoginMode: any;
  loginForm = new FormGroup({
    first: new FormControl('', Validators.required,),
    last: new FormControl('', Validators.required,),
    email: new FormControl('', Validators.required,),
    password: new FormControl('', Validators.minLength(8)),
    rePassword: new FormControl('', Validators.required,),
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
    alert("Account created Successfully");
  }
}
