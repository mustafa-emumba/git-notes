import { Component } from '@angular/core';
import * as monaco from 'monaco-editor';
import { GistService } from '../../services/gist.service';


@Component({
  selector: 'app-create-gist',
  standalone: false,
  templateUrl: './create-gist.component.html',
  styleUrl: './create-gist.component.scss'
})
export class CreateGistComponent {
  editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
  }
  gistDescription: string = '';
  files: Array<{ filename: string; content: string }> = [
    { filename: '', content: '' }
  ];

  constructor(
    private gistService: GistService
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

    this.gistService.createGist(gist).subscribe((response) => {
      console.log(response)
    })
  }
}
