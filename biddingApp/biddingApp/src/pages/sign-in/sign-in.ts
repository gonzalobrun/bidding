import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.model';

import { SignInService } from './sign-in.service';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public user: User;
  public signInForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public signInService: SignInService) {
  }

  ngOnInit(){
      this.user = User.BuildEmpty();
      this.buildForm();
  };

  buildForm() {
    this.signInForm = new FormGroup({
      'name': new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'username': new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(3)
      ]),  
      'password': new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6)
      ]),  
      'city': new FormControl(this.user.city, [
        Validators.required
      ]),  
      'province': new FormControl(this.user.province, [
        Validators.required
      ]),  
      'country': new FormControl(this.user.country, [
        Validators.required
      ]),    
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  public register() {
    this.signInService.signIn(this.signInForm.value).subscribe(
      (response: any) => { console.log(response) },
      err => console.warn(err),
      () => console.log('DONE')
    );
  }
}