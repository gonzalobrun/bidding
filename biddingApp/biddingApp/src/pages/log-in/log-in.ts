import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  public userLoginModel: Object;
  public newUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.userLoginModel = {name: null, password: null}
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  public login() {
    console.log(this.userLoginModel);
  }

  public goToSignin() {
		this.navCtrl.push(SignInPage);
	}
}
