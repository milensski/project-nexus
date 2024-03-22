import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let reqUrl = 'http://localhost:3000';
    req = req.clone({
      headers: req.headers.set(
        "Authorization",
        "Bearer " + JSON.parse(localStorage.getItem("token")!)
      ),
      // url: reqUrl + ""
    });

    return next.handle(req);
  }
}


