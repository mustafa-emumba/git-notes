import { Component, OnDestroy } from '@angular/core';
import * as monaco from 'monaco-editor';
import { GistService } from '../../services/gist.service';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-gist',
  standalone: false,
  templateUrl: './create-gist.component.html',
  styleUrl: './create-gist.component.scss'
})
export class CreateGistComponent implements OnDestroy {
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
  }
  gistDescription: string = '';
  files: Array<{ filename: string; content: string }> = [
    { filename: '', content: '' }
  ];
  private destroy$ = new Subject<void>();

  constructor(
    private gistService: GistService,
    private authService: AuthService,
    private router: Router
  ) { }

  addFile(): void {
    this.files.push({ filename: '', content: '' });
  }

  removeFile(index: number): void {
    if (this.files.length > 1) {
      this.files.splice(index, 1);
    }
  }

  onCodeChange(index: number, newContent: string) {
    this.files[index].content = newContent;
  }

  createGist(): void {
    const files = Object.fromEntries(
      this.files.map(file => [file.filename, { content: file.content }])
    );

    const gist = {
      description: this.gistDescription,
      public: false,
      files: files
    };

    this.gistService.createGist(gist).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.openYourGists();
    })
  }

  openYourGists() {
    const user = this.authService.getUser()
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          photoURL: user?.photoURL,
          email: user?.email,
          displayName: user?.displayName
        }
      }
    };
    this.router.navigate(['/your-gists'], navigationExtras);
  }

  isFormInvalid(): boolean {
    if (!this.gistDescription.trim()) {
      return true;
    }
    const hasValidFile = this.files.some(file => file.filename.trim() && file.content.trim());
    return !hasValidFile;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
