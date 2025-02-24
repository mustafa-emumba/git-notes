import { Component } from '@angular/core';
import * as monaco from 'monaco-editor';


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
    console.log('Creating gist with description:', this.gistDescription);
    console.log('Files:', this.files);
  }
}
