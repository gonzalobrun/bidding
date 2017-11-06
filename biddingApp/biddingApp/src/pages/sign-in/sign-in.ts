import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user.model';

import { SignInService } from './sign-in.service';
import { LogInService } from '../log-in/log-in.service';
import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service';

import { MainPage } from '../main/main';
import { LogInPage } from '../log-in/log-in';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public user: User;
  public signInForm: any;
  public countries: any = [];
  public provinces: any = [];
  public cities: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public signInService: SignInService, 
    public logInService: LogInService,
    public taxonomyService: TaxonomyService,
    private webStorageService: WebStorageService
  ) {
  }

  ngOnInit(){
      this.countries = [{ id: 1, name: 'Argentina'}];
      this.provinces = this.taxonomyService.getLocations;      
      this.user = User.BuildEmpty();
      this.buildForm();
  };

  ionViewDidLoad() {
      //console.log('ionViewDidLoad SignInPage');
    }

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
        Validators.minLength(4)
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
    
    this.onChanges();
  }  

  //TODO: Take the services to variables, it should be unsubscribe on ngOnDestroy()
  public register() {
    this.signInService.signIn(this.signInForm.value).subscribe(
      (res: any) => {        
        let logInObj: any = {
          username: this.signInForm.get('username').value, 
          password: this.signInForm.get('password').value
        };        
        this.logInService.logIn(logInObj).subscribe(
          (res) => {
            this.webStorageService.create('currentUser', res.user[0]);
          },
          (err) => {
            console.log(err);
            this.navCtrl.push(LogInPage, err);
          },
          () => {
            this.navCtrl.push(MainPage);
          }
        );
      },
      (err) => {
        //TODO: Here should promt the error to the user in the UI.
        console.warn(err)
      },
      () => console.log('USER CREATED')
    );
  }

  public onChanges(): void {
    this.signInForm.get('province').valueChanges.subscribe(val => {
      let province = this.taxonomyService.getLocations.filter((p: any) => p.id === val);
      this.cities = province[0].ciudades;
    });
  }

}