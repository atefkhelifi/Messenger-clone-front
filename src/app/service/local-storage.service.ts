import { Injectable } from '@angular/core';

const TOKEN = 'jwToken';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setToken(data: any) {
    localStorage.setItem(TOKEN, data);
  }
  getToken(): any {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
    localStorage.removeItem(TOKEN);
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        console.log(tokenDecode);
        return tokenDecode.userId;
      } else {
        console.log("Token doesn't have userId");
        return null;
      }
    } else {
      return null;
    }
  }
}
