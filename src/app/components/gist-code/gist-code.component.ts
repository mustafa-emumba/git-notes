import { AfterViewInit, Component, Input, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { GistService } from '../../services/gist.service';
import { ensureMonacoEnvironment } from '../../utils/monaco-config';
import * as monaco from 'monaco-editor';

interface GistFile {
  filename: string;
  raw_url: string;
}

@Component({
  selector: 'app-gist-code',
  standalone: false,
  templateUrl: './gist-code.component.html',
  styleUrl: './gist-code.component.scss'
})
export class GistCodeComponent implements OnInit, AfterViewInit {
  @Input() file!: GistFile;
  @Input() editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {};
  @Input() editorForeground: string = '#000000';
  @Input() editorBackground: string = '#FAFAFA';
  @Output() codeChanged = new EventEmitter<string>();
  codeContent: string = '';

  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;
  editor!: monaco.editor.IStandaloneCodeEditor;
  constructor(
    private gistService: GistService,
  ) { }

  ngOnInit(): void {
    ensureMonacoEnvironment()
    this.loadGistContent(this.file.raw_url);
  }

  ngAfterViewInit(): void {
    this.defineCustomTheme();
    this.initMonacoEditor();
  }

  defineCustomTheme() {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.foreground': this.editorForeground,
        'editor.background': this.editorBackground,
      },
    });
  }

  initMonacoEditor() {
    if (!this.editorContainer?.nativeElement) {
      console.error('Editor container not found!');
      return;
    }

    const options = {
      value: this.codeContent,
      language: 'javascript',
      theme: 'customTheme',
      ...this.editorOptions
    }

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, options);

    this.editor.onDidChangeModelContent(() => {
      this.codeContent = this.editor.getValue();
      this.codeChanged.emit(this.codeContent);
    });

    setTimeout(() => {
      this.editor.layout();
    }, 100);
  }


  loadGistContent(rawUrl: string) {
    this.gistService.getGistContent(rawUrl).subscribe({
      next: (data) => {
        this.codeContent = data;
        if (this.editor) {
          this.editor.setValue(this.codeContent);
        }
      },
      error: (err) => console.error('Error fetching gist content:', err)
    });
  }

}
