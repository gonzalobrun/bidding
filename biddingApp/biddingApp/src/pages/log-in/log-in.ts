import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';

import { LogInService } from './log-in.service';

@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  public userLoginModel: Object;
  public newUser: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public logInService: LogInService) {
  }

  ngOnInit(){
    this.userLoginModel = {username: null, password: null}
  };

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LogInPage');
  }

  public login() {
    this.logInService.logIn(this.userLoginModel).subscribe(
      (res: any) => {        
        this.goToSignin();        
      },
      (err) => {
        //TODO: Here should promt the error to the user in the UI.
        console.warn(err)
      },
      () => console.log('LOGGED')
    );
  }

  public goToSignin() {
		this.navCtrl.push(SignInPage);
	}
}
