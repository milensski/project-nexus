import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User, UserToken } from '../types';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'token';

  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;
  loggedUser: string = ''

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<UserToken>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/auth/login/', { username, password }).pipe(
      tap((token: any) =>
        this.doLoginUser(username, JSON.stringify(token))
      )
    );
  }

  private doLoginUser(username: string, token: any) {
    const decodedToken = jwtDecode(token);
    const user: UserToken = decodedToken as UserToken
    
    this.loggedUser = username;
    this.storeJwtToken(token);

    this.currentUserSubject.next(user);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentUser');
  }

  getUsers() {
    return this.http.get<any>('http://localhost:3000/user')
  }

  

}
