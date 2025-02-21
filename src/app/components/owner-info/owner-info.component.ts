import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-owner-info',
  standalone: false,
  templateUrl: './owner-info.component.html',
  styleUrl: './owner-info.component.scss'
})
export class OwnerInfoComponent {
  @Input() item!: any;

  getFileName(file: any): string {
    const filename = Object.keys(file)[0]
    return filename
  }

  timeSince(timestamp: string): string {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.round((now.getTime() - then.getTime()) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `Last updated ${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'Last updated just now';
  }

}
