import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GistService } from '../../services/gist.service';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-gist',
  standalone: false,
  templateUrl: './gist.component.html',
  styleUrl: './gist.component.scss'
})
export class GistComponent implements OnInit {
  gitIconPath: string = "/icons/git.svg";
  starIconPath: string = "/icons/star.svg";
  gist: any;
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
  }

  getFileName(file: any): string {
    const filename = Object.keys(file)[0]
    return filename
  }

  getForkCount() {
    this.gistService.getForkCount(this.gist.id).subscribe(forkCount => {
      this.forkCount = forkCount;
    });
  }

}
