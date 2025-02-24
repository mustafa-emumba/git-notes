import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  setUser(userData: any) {
    this.userSubject.next(userData);
  }

  logout() {
    this.userSubject.next(null);
  }
}