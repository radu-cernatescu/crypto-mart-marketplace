import { Injectable } from '@angular/core';

/* Future JWT implementation for auth 
  For now just uses session storage and stores a token in it
*/

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    var token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    else {
      return "";
    }
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    var token = sessionStorage.getItem(USER_KEY);
    if (token) {
      return JSON.parse(token);
    }
    else {
      return {};
    }
  }
}
