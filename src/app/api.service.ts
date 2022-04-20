import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string, token?: any) {
    let headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    return this.http.get(url, { headers: headers });
  }

  public post(url: string, data: any, token?: any) {
    let headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    data = JSON.parse(data);
    return this.http.post(url, data, { headers: headers });
  }

  public put(url: string, data: any, token?: any) {
    let headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    data = JSON.parse(data);
    return this.http.put(url, data, { headers: headers });
  }

  public delete(url: string, token?: any) {
    let headers = new HttpHeaders().set('authorization', `Bearer ${token}`);

    return this.http.delete(url, { headers: headers });
  }
}
