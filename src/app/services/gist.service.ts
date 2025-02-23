import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, expand, map, Observable, of, reduce, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private baseUrl = 'https://api.github.com/gists';
  private token = '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';
  private headers = new HttpHeaders({
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${this.token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  });

  constructor(private http: HttpClient) {}

  getPublicGists(): Observable<any> {
    return this.http.get(`${this.baseUrl}/public`, { headers: this.headers });
  }

  getUserGists(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.headers });
  }

  getGistContent(rawUrl: string): Observable<any> {
    return this.http.get(rawUrl, { responseType: 'text' });
  }

  getForkCount(gistId: string): Observable<number> {
    return this.http.get<any[]>(`${this.baseUrl}/${gistId}/forks?per_page=1&page=1`, {
      headers: this.headers,
      observe: 'response'
    }).pipe(
      map(response => {
        const linkHeader = response.headers.get('Link');
        if (linkHeader) {
          const lastPageMatch = linkHeader.match(/page=(\d+)>;\s*rel="last"/);
          if (lastPageMatch) {
            return parseInt(lastPageMatch[1], 10); // Extract last page number (total fork count)
          }
        }
        return response.body?.length || 0; // If no Link header, return current page count
      }),
      catchError(error => {
        console.error('Error fetching fork count:', error);
        return of(0); // Return 0 in case of an error
      })
    );
  }
  
}
