import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { GistService } from '../../services/gist.service';
import { MatPaginator } from '@angular/material/paginator';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-your-gists',
  standalone: false,
  templateUrl: './your-gists.component.html',
  styleUrl: './your-gists.component.scss'
})
export class YourGistsComponent implements OnInit {
  user: any;
  gists: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pagedGists: any[] = [];
  pageSize = 3;
  currentPage = 0;
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    readOnly: true,
    scrollbar: {
      horizontal: 'hidden',
      vertical: 'hidden',
      handleMouseWheel: false
    },
    overviewRulerLanes: 0,
    matchBrackets: 'never',
    occurrencesHighlight: 'off',
    renderLineHighlight: 'none',
    renderLineHighlightOnlyWhenFocus: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0
  }

  constructor(
    private router: Router,
    private gistService: GistService
  ) { }

  ngOnInit(): void {
    const currentState = this.router.lastSuccessfulNavigation;
    this.user = currentState?.extras?.state?.['data'];
    this.loadGists();
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

  loadGists() {
    this.gistService.getPublicGists().subscribe({
      next: (data) => {
        this.gists = data;
        this.updatePagedGists();

      },
      error: (err) => console.error('Error fetching gists:', err)
    });
  }

  openGist(gist: any) {
    const navigationExtras: NavigationExtras = { state: { data: gist } };
    this.router.navigate(['/gist'], navigationExtras);
  }
}
