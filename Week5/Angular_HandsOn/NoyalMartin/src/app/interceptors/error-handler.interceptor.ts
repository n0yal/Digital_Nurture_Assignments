import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';

// global http error handler
export const ErrorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        console.warn('Unauthorized, redirecting...');
      } else if (err.status === 500) {
        console.error('Server error, please try later');
      }
      return throwError(() => err);
    })
  );
};
