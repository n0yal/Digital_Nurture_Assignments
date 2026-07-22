import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';

// adds a mock auth token to every outgoing request
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: 'Bearer mocktoken-12345'
    }
  });
  return next(cloned);
};
