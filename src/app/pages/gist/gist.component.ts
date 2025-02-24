import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GistService } from '../../services/gist.service';
import * as monaco from 'monaco-editor';
import { catchError, EMPTY, of, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-gist',
  standalone: false,
  templateUrl: './gist.component.html',
  styleUrl: './gist.component.scss'
})
export class GistComponent implements OnInit {
  forkIconPath: string = "/icons/fork.svg";
  starIconPath: string = "/icons/star.svg";
  starFilledIconPath: string = "/icons/star-filled.svg";
  gist: any;
  isStarred: boolean = false;
  files: any;
  forkCount: number = 0;
  starCount: number = 0;
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
  }

  constructor(
    private router: Router,
    private gistService: GistService
  ) { }

  ngOnInit() {
    const currentState = this.router.lastSuccessfulNavigation;
    this.gist = currentState?.extras?.state?.['data'];
    this.getForkCount();
    this.files = Object.values(this.gist.files)
    this.isGistStarred()
  }

  getForkCount() {
    this.gistService.getForkCount(this.gist.id).subscribe(forkCount => {
      this.forkCount = forkCount;
    });
  }

  forkGist() {
    this.gistService.forkGist(this.gist.id).subscribe(() => {
      alert(`You forked a Gist from ${this.gist.owner.login}`);
    });
  }

  isGistStarred() {
    this.gistService.isGistStarred(this.gist.id).pipe(
      tap(() => this.isStarred = true),
      catchError(error => {
        if (error.status === 404) {
          this.isStarred = false;
          return EMPTY;
        }
        console.error('Error checking gist star status:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  starGist() {
    this.gistService.starGist(this.gist.id).subscribe((response) => {
      if (response.status === 204) {
        this.isStarred = true;
      }
    });
  }

  unstarGist() {
    this.gistService.unstarGist(this.gist.id).subscribe((response) => {
      if (response.status === 204) {
        this.isStarred = false;
      }
    });
  }

}
