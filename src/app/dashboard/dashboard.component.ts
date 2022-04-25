import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;

  public response: any;
  public responseError: any;
  public methods = ['GET', 'POST', 'PUT', 'DELETE'];
  public fields: any[] = [];
  public bodyJson = {};

  constructor(private apiSVC: ApiService, private FB: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.form.controls['method'].setValue('GET');
  }

  get(url: string, token?: any, tokenApim?: any) {
    return this.apiSVC.get(url, token, tokenApim).subscribe(
      (data) => {
        this.response = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        this.responseError = error;
      }
    );
  }

  post(url: string, body?: any, token?: any, tokenApim?: any) {
    return this.apiSVC.post(url, body, token, tokenApim).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  put(url: string, body?: any, token?: any, tokenApim?: any) {
    return this.apiSVC.put(url, body, token, tokenApim).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  delete(url: string, token?: any, tokenApim?: any) {
    return this.apiSVC.delete(url, token, tokenApim).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  changeMethod(e) {
    this.form.controls['method'].setValue(e.target.value);
  }

  processRequest() {


    this.response = '';
    this.responseError = '';

    let url = this.form.get('url').value;
    let token = this.form.get('tokenRc').value;
    let tokenApim = this.form.get('tokenApim').value;
    let body = this.form.get('body').value;

    let method = this.form.get('method').value;

    switch (method) {
      case 'GET':
        this.get(url, token, tokenApim);
        break;
      case 'POST':
        this.post(url, body, token, tokenApim);
        break;
      case 'PUT':
        this.put(url, body, token, tokenApim);
        break;
      case 'DELETE':
        this.delete(url, token, tokenApim);
        break;
    }
  }

  addField() {
    if (this.form.get('key').value == null) return;
    this.fields.push(this.form.get('key').value);
  }

  formatJsonRequest() {
    this.bodyJson = {};

    let value = this.form.get('value').value;
    console.log(value);

    this.fields.forEach((key) => {
      this.bodyJson += ` ${key}: '' ,`;
    });
    console.log(this.bodyJson);
  }

  removeField(field) {
    this.fields.splice(this.fields.indexOf(field), 1);
  }

  inicializarForm() {
    this.form = this.FB.group({
      url: new FormControl('', [Validators.required]),
      tokenRc: new FormControl(),
      tokenApim: new FormControl(),
      method: new FormControl('', [Validators.required]),
      body: new FormControl(),
      key: new FormControl(),
      value: new FormControl()
    });
  }
}
