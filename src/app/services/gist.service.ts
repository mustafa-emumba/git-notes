import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private apiUrl = 'https://api.github.com/gists/public';
  private token = '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';

  constructor(private http: HttpClient) {}

  getPublicGists(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${this.token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    });

    return this.http.get(this.apiUrl, { headers });
  }

}
