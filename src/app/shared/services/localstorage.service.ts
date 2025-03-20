import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private tokenKey = 'authToken';

  setUserToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getUserToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeUserToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  exitedToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}