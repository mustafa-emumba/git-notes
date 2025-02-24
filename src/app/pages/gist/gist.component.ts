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
  forkIconPath: string = "/icons/fork.svg";
  starIconPath: string = "/icons/star.svg";
  gist: any;
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
  }

  getForkCount() {
    this.gistService.getForkCount(this.gist.id).subscribe(forkCount => {
      this.forkCount = forkCount;
    });
  }

}
