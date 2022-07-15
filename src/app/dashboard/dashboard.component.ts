import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

export interface Profile {
  url: string;
  method: string;
  body: string;
  tokenRc: string;
  tokenApim: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean = false;
  public response: any;
  public responseError: any;
  public methods = ['GET', 'POST', 'PUT', 'DELETE'];
  public fields: any[] = [];

  public bodyJson = {};
  public profiles: Profile;
  public showProfiles: boolean = false;
  public img: any;

  constructor(private apiSVC: ApiService, private FB: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.form.controls['method'].setValue('GET'); //cambiar por GET
    this.getProfile();
  }

  resetForm() {
    this.form.reset();
    this.form.controls['method'].setValue('GET');
    this.response = '';
    this.responseError = '';
    this.showProfiles = false;
  }

  toggleProfiles() {
    this.showProfiles = !this.showProfiles;
  }

  loadProfile() {
    this.form.controls['url'].setValue(this.profiles.url);
    this.form.controls['tokenRc'].setValue(this.profiles.tokenRc);
    this.form.controls['tokenApim'].setValue(this.profiles.tokenApim);
  }

  changeMethod(e) {
    this.form.controls['method'].setValue(e.target.value);
  }

  onFileChanged($event) {
    this.img = $event.target.files[0];
    console.log($event.target.files[0]);
  }

  get(url: string, token?: any, tokenApim?: any) {
    return this.apiSVC.get(url, token, tokenApim).subscribe(
      (data) => {
        this.response = data;
        console.log(data);
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.responseError = error;
        this.isLoading = false;
      }
    );
  }

  post(url: string, body?: any, token?: any, tokenApim?: any) {
    if (this.img) {
      let formData = new FormData();
      formData.append('adjunto', this.img);
      formData.append('tag', 'DAÑOS_EN_VEHICULO_ASEGURADO');
      return this.apiSVC.post(url, body, token, tokenApim, formData).subscribe(
        (data) => {
          this.response = data;
          this.isLoading = false;
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.responseError = error;
          this.isLoading = false;
        }
      );
    } else {
      return (
        this.apiSVC.post(url, body, token, tokenApim).subscribe(
        (data) => {
          this.response = data;
          this.isLoading = false;
          console.log(data);
        },
        (error) => {
          console.log(error);
          this.responseError = error;
          this.isLoading = false;
        }
      ));
    }
  }

  put(url: string, body?: any, token?: any, tokenApim?: any) {
    return this.apiSVC.put(url, body, token, tokenApim).subscribe((data) => {
      this.response = data;
      console.log(data);
      this.isLoading = false;
    },
    (error) => {
      console.log(error);
      this.responseError = error;
      this.isLoading = false;
    });
  }

  delete(url: string, body: any, token?: any, tokenApim?: any) {
    return this.apiSVC.delete(url, body, token, tokenApim).subscribe((data) => {
      this.response = data;
      console.log(data);
      this.isLoading = false;
    },
    (error) => {
      console.log(error);
      this.responseError = error;
      this.isLoading = false;
    });
  }
  removeImg() {
    let imgInput = document.getElementById('imgInput') as HTMLInputElement;
    imgInput.value = '';
    this.img = null;
  }

  processRequest() {
    this.isLoading = true;
    this.showProfiles = false;
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
        this.delete(url, body, token, tokenApim);
        break;
    }
  }

  saveProfile() {
    this.profiles = {
      url: this.form.get('url').value,
      tokenRc: this.form.get('tokenRc').value,
      tokenApim: this.form.get('tokenApim').value,
      body: this.form.get('body').value,
      method: this.form.get('method').value
    };

    localStorage.setItem('profile', JSON.stringify(this.profiles));
  }

  getProfile() {
    this.profiles = JSON.parse(localStorage.getItem('profile'));
  }

  inicializarForm() {
    this.form = this.FB.group({
      url: new FormControl('', [Validators.required]),
      tokenRc: new FormControl(),
      tokenApim: new FormControl(),
      method: new FormControl('', [Validators.required]),
      body: new FormControl(),
      image: new FormControl(),
      key: new FormControl(),
      value: new FormControl(),
      nameProfile: new FormControl()
    });
  }
}
