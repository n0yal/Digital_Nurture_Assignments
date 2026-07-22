import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _isLoading = signal<boolean>(false);
  // Using signal so multiple parts of the app can listen easily
  isLoading$ = this._isLoading.asReadonly();

  showLoading() {
    this._isLoading.set(true);
  }

  hideLoading() {
    this._isLoading.set(false);
  }
}
