import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { GistService } from '../../services/gist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gist-table',
  standalone: false,
  templateUrl: './gist-table.component.html',
  styleUrl: './gist-table.component.scss'
})
export class GistTableComponent implements OnInit {
  @Input() gists: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'notebook', 'fileCount', 'updatedAt', 'actions'];
  forkIconPath: string = "/icons/fork.svg";
  starIconPath: string = "/icons/star.svg";
  starFilledIconPath: string = "/icons/star-filled.svg";
  dataSource = new MatTableDataSource<any>([]);
  starredGists: { [key: string]: boolean } = {};
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private gistService: GistService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    if (this.gists && this.gists.length > 0) {
      this.loadData(this.gists);
    }
    this.dataSource.data.forEach(gist => {
      this.checkIfStarred(gist.id);
    });
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gists'] && this.gists.length > 0) {
      this.loadData(this.gists);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  checkIfStarred(gistId: string) {
    this.gistService.isGistStarred(gistId).subscribe({
      next: () => this.starredGists[gistId] = true,
      error: err => {
        if (err.status === 404) {
          this.starredGists[gistId] = false;
        } else {
          console.error(`Error checking star status for ${gistId}`, err);
        }
      }
    });
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
    const navigationExtras: NavigationExtras = { state: { data: gist } };
    this.router.navigate(['/gist'], navigationExtras);
  }

  getFileCount(gist: any) {
    return Object.values(gist.files).length
  }

  forkGist(event: Event, gistId: string, ownerName: string) {
    event.stopPropagation();
    this.gistService.forkGist(gistId).subscribe(() => {
      alert(`You forked a Gist from ${ownerName}`);
    });
  }

  starGist(event: Event, gistId: string) {
    event.stopPropagation();
    this.gistService.starGist(gistId).subscribe((response) => {
      if (response.status === 204) {
        this.starredGists[gistId] = true;
      }
    })
  }

  unstarGist(event: Event, gistId: string) {
    event.stopPropagation();
    this.gistService.unstarGist(gistId).subscribe((response) => {
      if (response.status === 204) {
        this.starredGists[gistId] = false;
      }
    })
  }

}
