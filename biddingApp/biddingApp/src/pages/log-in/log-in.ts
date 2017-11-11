import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';

import { LogInService } from './log-in.service';
import { WebStorageService } from '../../commons/webStorage.service';

@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  public userLoginModel: Object;
  public newUser: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public logInService: LogInService,
    private webStorageService: WebStorageService
  ) {}

  ngOnInit(){
    this.userLoginModel = {username: 'testing', password: 'testing'}
  };

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LogInPage');
  }

  public login() {
    this.logInService.logIn(this.userLoginModel).subscribe(
      (res: any) => {        
        if(res.success){
          this.webStorageService.create('currentUser', res.user[0]);
          this.goToSignin();
        }          
      },
      (err) => {
        //TODO: Here should promt the error to the user in the UI.
        console.warn(err)
      },
      () => console.log('LOGGED')
    );
  }

  public goToSignin() {
		this.navCtrl.push(MainPage);
  }
}
