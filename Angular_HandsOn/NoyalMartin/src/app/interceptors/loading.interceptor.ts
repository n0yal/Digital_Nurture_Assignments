import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn
} from '@angular/common/http';
import { LoadingService } from '../services/loading.service';

// shows a loading spinner globally for every http call
export const LoadingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);

  loadingService.showLoading();
  return next(req).pipe(
    finalize(() => loadingService.hideLoading())
  );
};
