import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  user: User;

  constructor(private tokenStorageService: TokenStorageService) { 
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('/main');
  }

}
