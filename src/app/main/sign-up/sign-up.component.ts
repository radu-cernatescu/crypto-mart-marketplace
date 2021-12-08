import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
import { User } from '../../User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
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
  constructor(private service: UserService,
    private router: Router) {
      this.user = new User();
     }

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
    this.user.firstName = this.signUpForm.value.first;
    this.user.lastName = this.signUpForm.value.last;
    this.user.email = this.signUpForm.value.email;
    this.user.password = this.signUpForm.value.password;

    this.service.addUser(this.user).subscribe((res: any) =>
    {
      console.log(res.message)
      if (res.message == "SUCCESS") {
        //User found
        alert("Signup successful!");
        this.router.navigate(['/main']); 
      }
      else if (res.message == "EXISTING USER"){
        alert("User already exists");
      }
      else {
        alert("There was an error signing up.");
        //this.router.navigate(['/main']);
      }
    });

    this.isLoading = true;
  }
}
