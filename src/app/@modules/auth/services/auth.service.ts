/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    const url = `${environment.apiLogin}`;
    const headers = new HttpHeaders().set('Authorization', environment.token);
    return this.httpClient.post(url, data, { headers });
  }
}
