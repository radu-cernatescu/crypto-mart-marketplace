import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as ENV } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/User';

const httpOptions = {
    headers: new HttpHeaders(
      { 'Content-Type': 'application/json' },
    )
};

@Injectable({
  providedIn: 'any'
})
export class UserService {
    CMS_API: string;
    isLoggedIn = false;

    constructor(private http: HttpClient) { 
        this.CMS_API = ENV.CMS_API;
    }

    loginUser(email: any, password: any): Observable<any> {
      return this.http.post(this.CMS_API + 'user-login', {email: email, password: password})
        .pipe(catchError(this.handleError('get user', [])));
    }
    //firstName: any, lastName: any, email: any, password: any
    addUser(user: User): Observable<any> {
      const userObj = {firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password};
      return this.http.post(this.CMS_API + 'sign-up', userObj)
        .pipe(catchError(this.handleError('get user', []))
      ); 
    }

    getUserCountry(lat: number, lon: number): Observable<any> {
      return this.http.get(ENV.Geo_API + `&lat=${lat}&lng=${lon}`)
      .pipe(catchError(this.handleError('get country', []))
      );
    }

    /** API call to get all users by admin  */
    getAllUsers(): Observable<any> {
      return this.http.get(this.CMS_API + 'allusers',)
        .pipe(catchError(this.handleError('get user', [])));
    }
    /** API call to get all items with selected user info by admin  */
    getUserItems(userId:any): Observable<any> {
      return this.http.post(this.CMS_API + 'user/items', {userId: userId})
        .pipe(catchError(this.handleError('get user', [])));
    }
    /** API call to block/unblock user info by admin  */
    blockUser(user:any): Observable<any> {
      return this.http.post(this.CMS_API + 'block-user', {user: user})
        .pipe(catchError(this.handleError('get user', [])));
    }
    /** API call to delete user info by admin  */
    deleteUser(user:any): Observable<any> {
      return this.http.post(this.CMS_API + 'remove-user', {user: user})
        .pipe(catchError(this.handleError('get user', [])));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
      }
    
}
