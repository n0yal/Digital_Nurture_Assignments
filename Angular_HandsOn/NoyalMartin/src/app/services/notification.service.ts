import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private timer: any;

  constructor() {
    this.timer = setInterval(() => {
      console.log('NotificationService scanning...');
    }, 10000);
  }

  send(title: string, message: string) {
    console.log(`[${title}] ${message}`);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
