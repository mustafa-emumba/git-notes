import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, expand, map, Observable, of, reduce, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private baseUrl = 'https://api.github.com/gists';
  private headers = new HttpHeaders({
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${environment.github.token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  });

  constructor(private http: HttpClient) { }

  getGithubUser(): Observable<any> {
    return this.http.get(`https://api.github.com/user`, { headers: this.headers });
  }

  getPublicGists(): Observable<any> {
    return this.http.get(`${this.baseUrl}/public`, { headers: this.headers });
  }

  getUserGists(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.headers });
  }

  getStarredGists(): Observable<any> {
    return this.http.get(`${this.baseUrl}/starred`, { headers: this.headers });
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
            return parseInt(lastPageMatch[1], 10);
          }
        }
        return response.body?.length || 0;
      }),
      catchError(error => {
        console.error('Error fetching fork count:', error);
        return of(0);
      })
    );
  }

  createGist(gist: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, gist, { headers: this.headers });
  }
}
