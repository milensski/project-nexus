import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Bad Credentials', error.error);
      return throwError(() => new Error('Bad credentials'))
      
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<User>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/auth/login/', { username, password })


    
    // return this.http.post<any>('http://localhost:3000/auth/login', { username, password })
    // .pipe(map(user => {

    // if (user && user.token) {
    // // store user details in local storage to keep user logged in
    // localStorage.setItem('currentUser', 'test');
    // this.currentUserSubject.next(user);
    // }
     
    // return user;
    // }));
    }
     
    logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    }
    
}
