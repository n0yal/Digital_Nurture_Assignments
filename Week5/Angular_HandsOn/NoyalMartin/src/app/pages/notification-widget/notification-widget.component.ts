import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

// Component-level provider creates a NEW instance scoped to this component only.
// Any sibling component gets its own separate instance.
@Component({
  selector: 'app-notification-widget',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService],
  template: `
    <div class="notify-box">
      <h4>Notifications</h4>
      <p *ngIf="loading">Scanning for notifications...</p>
      <p *ngIf="!loading">No new notifications</p>
    </div>
  `,
  styles: [`.notify-box { background:#fff3e0; padding:1rem; border-radius:8px; margin:1rem 0; }`]
})
export class NotificationWidgetComponent implements OnInit {
  loading = false;

  constructor(private notify: NotificationService) {
    this.notify.send('Welcome', 'Portal is live');
  }

  ngOnInit(): void {}
}
