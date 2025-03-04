import { Component, Input, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-svg-icon',
  standalone: false,
  template: ''
})
export class SvgIconComponent implements OnChanges, OnDestroy {
  @Input() src!: string;
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient, private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src'] && this.src) {
      this.loadSvg();
    }
  }

  private loadSvg() {
    this.http.get(this.src, { responseType: 'text' }).pipe(takeUntil(this.destroy$)).subscribe({
      next: (svgContent) => {
        const parser = new DOMParser();
        const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
        const svgElement = svgDocument.querySelector('svg');

        if (svgElement) {
          svgElement.removeAttribute('width');
          svgElement.removeAttribute('height');
          svgElement.style.width = this.width;
          svgElement.style.height = this.height;

          this.el.nativeElement.innerHTML = '';
          this.el.nativeElement.appendChild(svgElement);
        }
      },
      error: (err) => {
        console.error(`Failed to load SVG: ${this.src}`, err);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
