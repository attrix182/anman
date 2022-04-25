import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string, tokenRC?: any, tokenAPIM?: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${tokenRC}`);
    headers = headers.set('Ocp-Apim-Subscription-Key', `${tokenAPIM}`);
    return this.http.get(url, { headers: headers });
  }

  public post(url: string, data: any, tokenRC?: any, tokenAPIM?: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${tokenRC}`);
    headers = headers.set('Ocp-Apim-Subscription-Key', `${tokenAPIM}`);
    data = JSON.parse(data);
    return this.http.post(url, data, { headers: headers });
  }

  public put(url: string, data: any, tokenRC?: any, tokenAPIM?: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${tokenRC}`);
    headers = headers.set('Ocp-Apim-Subscription-Key', `${tokenAPIM}`);
    data = JSON.parse(data);
    return this.http.put(url, data, { headers: headers });
  }

  public delete(url: string, tokenRC?: any, tokenAPIM?: any) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${tokenRC}`);
    headers = headers.set('Ocp-Apim-Subscription-Key', `${tokenAPIM}`);

    return this.http.delete(url, { headers: headers });
  }
}
