import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-gist-grid',
  standalone: false,
  templateUrl: './gist-grid.component.html',
  styleUrl: './gist-grid.component.scss'
})
export class GistGridComponent implements OnInit{
  @Input() gists: any;
  pagedGists: any[] = []; // Only show paginated items
  pageSize = 6;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.updatePagedGists();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedGists();
  }

  updatePagedGists() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedGists = this.gists.slice(startIndex, endIndex);
  }

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
