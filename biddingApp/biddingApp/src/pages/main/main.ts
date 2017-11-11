import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MainService } from './main.service';
import { WebStorageService } from '../../commons/webStorage.service';

import { User } from '../../models/user.model';
import{ UserPage } from '../../pages/user/user';

import { LoadPage } from '../load/load';
import { PublicationPage } from '../publication/publication';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public user: User;
  public sortby: any; 
  public pubsArr: any;
  public storedUser: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public mainService: MainService,
    public webStorageService: WebStorageService
  ) {}

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.user = new User(this.webStorageService.retrieve('currentUser'));
    this.initializeFilters();    
    if(this.user.isLogged){
      console.log('IS LOGGED');      
    }
    this.getRandomPubs();
  };

  public initializeFilters() {
    this.sortby = 'date';
  }

  public getRandomPubs() {
		this.mainService.getRandomPubs().subscribe(
			(res) => {
				this.pubsArr = res.pubs;				
			},
			(err) => console.log(err),
			() => console.log('GET RANDOM')
		)
  };
  
  public openPub(pub: any) {
		this.navCtrl.push(PublicationPage, { pub });
	}
  
  public goToLoad() {
		this.navCtrl.push(LoadPage);
  };
  
  
  public goToUser() {
		this.navCtrl.push(UserPage);
  };

}
