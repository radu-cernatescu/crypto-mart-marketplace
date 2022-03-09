import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/token-storage.service';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService]
})
export class SignInComponent implements OnInit {
  user: User;
  isLoading!: boolean;
  isLoginMode: any;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required,),
    password: new FormControl('', Validators.minLength(8)),
  });
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private service: UserService,
    private router: Router, private tokenStorage: TokenStorageService) {
      this.user = new User();
     } 

  ngOnInit(): void {
    if (this.tokenStorage.getToken() != "") {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.user.email = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.service.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe((res: any) => {
      if (res.message === "SUCCESS") {
        this.user._id = res.data._id;
        this.user.password = res.data.password;
        this.user.firstName = res.data.firstName;
        this.user.lastName = res.data.lastName;
        this.user.type = res.data.type;
        this.user.isBlock = res.data.isBlock;

        if (!this.user.isBlock) {
          this.tokenStorage.saveToken(res.data._id);
          this.tokenStorage.saveUser(this.user);
          this.service.isLoggedIn = true;     
          window.location.replace("/main");
        }
        else {
          window.alert("This user has been banned!");
          this.loginForm.reset();
        }
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
