import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrlUsers = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {}
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrlUsers, user);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrlUsers + '/login', {
      email,
      password,
    });
  }
  getUserById(idUser: any): Observable<any> {
    return this.http.get<any>(this.apiUrlUsers + '/' + idUser);
  }
}