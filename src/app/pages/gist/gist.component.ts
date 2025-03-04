import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GistService } from '../../core/services/gist.service';
import * as monaco from 'monaco-editor';
import { catchError, EMPTY, of, tap, throwError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

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
  isLoggedIn: boolean = false;
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    readOnly: true,
  }
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private gistService: GistService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const currentState = this.router.lastSuccessfulNavigation;
    this.gist = currentState?.extras?.state?.['data'];
    this.getForkCount();
    this.files = Object.values(this.gist.files);
    this.isGistStarred();
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  getForkCount() {
    this.gistService.getForkCount(this.gist.id).pipe(takeUntil(this.destroy$)).subscribe(forkCount => {
      this.forkCount = forkCount;
    });
  }

  forkGist() {
    this.gistService.forkGist(this.gist.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
    ).pipe(takeUntil(this.destroy$)).subscribe();
  }

  starGist() {
    this.gistService.starGist(this.gist.id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response.status === 204) {
        this.isStarred = true;
      }
    });
  }

  unstarGist() {
    this.gistService.unstarGist(this.gist.id).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response.status === 204) {
        this.isStarred = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
