import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { GistService } from '../../services/gist.service';

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

  constructor(
    private gistService: GistService,
  ) { }

  ngOnInit(): void {
    this.loadGists();
  }

  loadGists() {
    this.gistService.getPublicGists().subscribe({
      next: (data) => {
        this.gists = data;
      },
      error: (err) => console.error('Error fetching gists:', err)
    });
  }

  onToggleChange(event: MatButtonToggleChange) {
    this.layout = event.value;
  }

}
