import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(private service: UserService,
    private router: Router) { } 

  ngOnInit(): void {
  }
  onSubmit() {
    // if (!form.valid) {
    //   return;
    // }
    this.service.getUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: any) =>
    {
      if (res.message == "SUCCESS") {
        //User found
        alert("Login Succesful");
        this.router.navigate(['/main']);
      }
      else{
        alert("Username or password incorrect.");
        //this.router.navigate(['/main']);
      }
    });
    
    this.isLoading = true;
  }
    
}
