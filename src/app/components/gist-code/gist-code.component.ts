import { Component, Input, OnInit } from '@angular/core';
import { GistService } from '../../services/gist.service';

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
export class GistCodeComponent implements OnInit {
  @Input() files!: GistFile;
  fileContent: string = '';

  constructor(
    private gistService: GistService,
  ) { }

  ngOnInit(): void {
    if(this.files) {
      this.loadGistContent(Object.values(this.files)[0].raw_url);
    }
  }

  loadGistContent(rawUrl: string) {
    this.gistService.getGistContent(rawUrl).subscribe({
      next: (data) => {
        this.fileContent = data
      },
      error: (err) => console.error('Error fetching gist content:', err)
    });
  }
}
