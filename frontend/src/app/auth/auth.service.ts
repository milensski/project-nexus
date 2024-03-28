import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subscribable, Subscription, tap, throwError } from 'rxjs';
import { User, UserReg, UserToken } from '../types';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly JWT_TOKEN = 'token';
  public readonly CURRENT_USER = 'currentUser'

  private currentUserSubject: BehaviorSubject<UserToken | null>;
  public currentUser: Observable<UserToken | null>;
  loggedUser: string = ''
  

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem(this.CURRENT_USER) as any;
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<UserToken | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken | null {
    return this.currentUserSubject.value as UserToken;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/auth/login/', { username, password }).pipe(
      tap((token: any) =>
        this.doLoginUser(username, JSON.stringify(token)))
    )
  }

  register(user: any): Observable<any> {
    return this.http.post<User>(`${API}/auth/register`, user)
      .pipe(
        tap((response: any) => {
          // Handle successful registration response (e.g., token)
          this.doLoginUser(user.username, response.token); // Assuming response contains a token
        }),
        catchError(error => {
          // Handle registration errors
          return throwError(error);
        })
      );
  }

  private doLoginUser(username: string, token: any) {
    const decodedToken = jwtDecode(token);
    const user: UserToken = decodedToken as UserToken

    this.loggedUser = username;
    // this.storeJwtToken(token);
    this.storeUserData(user);
    this.storeJwtToken(token)
    this.currentUserSubject.next(user);
  }

  private storeUserData(user: UserToken): void {
    // Use secure storage mechanism provided by your framework (e.g., SecureStorage in Angular)
    const storage = window.localStorage // Fallback to localStorage
    storage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.CURRENT_USER);
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem(this.CURRENT_USER);
    localStorage.removeItem(this.JWT_TOKEN)
    this.currentUserSubject.next(null);
    this.router.navigate(['/'], { queryParams: { refresh: true } })
  }

  getUser(user: string | null) {

    if (user) {
      const userId = JSON.parse(user).id
      return this.http
        .get<UserToken>(`http://localhost:3000/user/${userId}`)
        .pipe(tap((user) => this.currentUserSubject.next(user)));
    }
    return throwError(HttpErrorResponse)
  }

  getUsers() {
    return this.http.get<any>('http://localhost:3000/user')
  }

  isTokenExpired(exp: number): boolean {
    const expiry = exp;
    return expiry ? (Date.now() >= expiry * 1000) : true;
  }


}
