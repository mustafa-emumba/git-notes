import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-gist-grid',
  standalone: false,
  templateUrl: './gist-grid.component.html',
  styleUrl: './gist-grid.component.scss'
})
export class GistGridComponent implements OnInit {
  @Input() gists: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pagedGists: any[] = [];
  pageSize = 6;
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
    private router: Router
  ) { }
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

  openGist(gist: any) {
    const navigationExtras: NavigationExtras = { state: { data: gist } };
    this.router.navigate(['/gist'], navigationExtras);
  }

}
