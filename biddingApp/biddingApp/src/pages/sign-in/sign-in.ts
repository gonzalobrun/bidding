import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.model';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public user: User;
  public signInForm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
      this.user = User.BuildEmpty();
      this.buildForm();
  };

  buildForm() {
    this.signInForm = new FormGroup({
      'name': new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'username': new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(6)
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

  public register() {;
    console.log(this.signInForm.value);
  }

}
