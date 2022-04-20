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

  constructor(private apiSVC: ApiService, private FB: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.form.controls['method'].setValue("GET");
  }

  get(url: string, token?: any) {
    return this.apiSVC.get(url, token).subscribe((data) => {
      this.response = data;
      console.log(data);

    },
    (error) => {
      console.log(error);
      this.responseError = error;
    });

  }

  post(url: string, body?: any, token?: any) {
    return this.apiSVC.post(url, body, token).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  put(url: string, body?: any, token?: any) {
    return this.apiSVC.put(url, body, token).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  delete(url: string, token?: any) {
    return this.apiSVC.delete(url, token).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  changeMethod(e) {
    this.form.controls['method'].setValue(e.target.value);
  }

  processRequest() {
    this.response = "";
    this.responseError = "";
    console.log(this.form.value);

    let url = this.form.get('url').value;
    let token = this.form.get('token').value;
    let body = this.form.get('body').value;
    let method = this.form.get('method').value;

    switch (method) {
      case 'GET':
        this.get(url, token);
        break;
      case 'POST':
        this.post(url, body, token);
        break;
      case 'PUT':
        this.put(url, body, token);
        break;
      case 'DELETE':
        this.delete(url, token);
        break;
    }


  }

  inicializarForm() {
    this.form = this.FB.group({
      url: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
      method: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required])
    });
  }
}
