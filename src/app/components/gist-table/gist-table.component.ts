import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-gist-table',
  standalone: false,
  templateUrl: './gist-table.component.html',
  styleUrl: './gist-table.component.scss'
})
export class GistTableComponent implements OnInit {
  @Input() gists: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'notebook', 'keyword', 'updatedAt', 'actions'];
  gitIconPath: string = "/icons/git.svg";
  starIconPath: string = "/icons/star.svg";
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.gists && this.gists.length > 0) {
      this.loadData(this.gists);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gists'] && this.gists.length > 0) {
      this.loadData(this.gists);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData(gists: any[]) {
    this.dataSource.data = gists;
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

  openGist(gist: any) {
    console.log(gist)
    const navigationExtras: NavigationExtras = { state: { data: gist } };
    this.router.navigate(['/gist'], navigationExtras);
  }

}
