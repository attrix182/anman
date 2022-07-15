import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string, tokenRC?: any, tokenAPIM?: any) {
    let headers = this.setHeaders(tokenRC, tokenAPIM);
    return this.http.get(url, { headers: headers });
  }

  public post(url: string, data: any, tokenRC?: any, tokenAPIM?: any, formData?: any) {
    let headers = this.setHeaders(tokenRC, tokenAPIM);
    data = JSON.parse(data);
    formData ? data = formData : data = data;
    return this.http.post(url, data, { headers: headers });
  }

  public put(url: string, data: any, tokenRC?: any, tokenAPIM?: any) {
    let headers = this.setHeaders(tokenRC, tokenAPIM);
    data = JSON.parse(data);
    return this.http.put(url, data, { headers: headers });
  }

  public delete(url: string, data: any, tokenRC?: any, tokenAPIM?: any) {
    let headers = this.setHeaders(tokenRC, tokenAPIM);
    data = JSON.parse(data);
    return this.http.request('DELETE', url, { headers: headers, body: data });
  }

  setHeaders(tokenRC: string, tokenAPIM: string) {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${tokenRC}`);
    headers = headers.set('Ocp-Apim-Subscription-Key', `${tokenAPIM}`);
    return headers;
  }
}
