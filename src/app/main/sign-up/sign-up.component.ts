import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isLoading!: boolean;
  isLoginMode: any;
  passwordMatch= false;
  signUpForm = new FormGroup({
    first: new FormControl('', Validators.required,),
    last: new FormControl('', Validators.required,),
    email: new FormControl('', Validators.required,),
    password: new FormControl('', Validators.minLength(8)),
    rePassword: new FormControl(''),
  });
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(() => {
      if((this.signUpForm.controls['password'].value === this.signUpForm.controls['rePassword'].value) &&
      this.signUpForm.valid){
        this.passwordMatch = true;
      } else{
        this.passwordMatch = false;
      }
    })
  }

  onSubmit() {
    // if (!form.valid) {
    //   return;
    // }
    // const email = form.value.email;
    // const password = form.value.password;
    this.service.addUser(this.signUpForm.value.first, this.signUpForm.value.last, this.signUpForm.value.email, this.signUpForm.value.password).subscribe((res: any) =>
    {
      console.log(res.message)
      if (res.message == "SUCCESS") {
        //User found
        alert("Signup successful!");
      }
      else if (res.message == "EXISTING USER"){
        alert("User already exists");
      }
      else {
        alert("There was an error signing up.")
      }
    });

    let authObs: Observable<any>;

    this.isLoading = true;
  }
}
