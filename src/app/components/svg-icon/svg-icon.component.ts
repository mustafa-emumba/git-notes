import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-svg-icon',
  standalone: false,
  template: ''
})
export class SvgIconComponent implements OnInit {
  @Input() src!: string;
  @Input() width: string = '100%';
  @Input() height: string = '100%';

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngOnInit() {
    if (this.src) {
      this.http.get(this.src, { responseType: 'text' }).subscribe({
        next: (svgContent) => {
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
          const svgElement = svgDocument.querySelector('svg');

          if (svgElement) {
            svgElement.removeAttribute('width');
            svgElement.removeAttribute('height');

            svgElement.style.width = this.width;
            svgElement.style.height = this.height;

            this.el.nativeElement.appendChild(svgElement);
          }

        },
        error: (err) => {
          console.error(`Failed to load SVG: ${this.src}`, err);
        },
      });
    } else {
      console.error('No source provided for app-svg-icon component.');
    }
  }
}
