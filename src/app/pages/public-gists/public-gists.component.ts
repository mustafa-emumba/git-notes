import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { GistService } from '../../core/services/gist.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-public-gists',
  standalone: false,
  templateUrl: './public-gists.component.html',
  styleUrl: './public-gists.component.scss'
})
export class PublicGistsComponent implements OnInit {
  gridIconPath: string = "/icons/grid.svg";
  listIconPath: string = "/icons/list.svg";
  layout: string = "list";
  gists: any;
  private destroy$ = new Subject<void>();

  constructor(
    private gistService: GistService,
  ) { }

  ngOnInit(): void {
    this.loadGists();
  }

  loadGists() {
    this.gistService.getPublicGists().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.gists = data;
      },
      error: (err) => console.error('Error fetching gists:', err)
    });
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.layout = event.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
