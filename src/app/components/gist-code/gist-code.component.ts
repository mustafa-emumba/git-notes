import { AfterViewInit, Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GistService } from '../../services/gist.service';
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
  @Input() files!: GistFile;
  codeContent: string = '';

  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;
  editor!: monaco.editor.IStandaloneCodeEditor;
  constructor(
    private gistService: GistService,
  ) { }

  ngOnInit(): void {
    if (this.files) {
      this.loadGistContent(Object.values(this.files)[0].raw_url);
    }
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
        'editor.foreground': '#000000',
        'editor.background': '#FAFAFA',
      },
    });
  }

  initMonacoEditor() {
    if (!this.editorContainer?.nativeElement) {
      console.error('Editor container not found!');
      return;
    }

    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.codeContent,
      language: 'javascript',
      theme: 'customTheme',
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
