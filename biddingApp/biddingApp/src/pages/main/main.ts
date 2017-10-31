import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MainService } from './main.service';

import { User } from '../../models/user.model';

import { HomePage } from '../home/home';
import { LoadPage } from '../load/load';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public user: User;
  public sortby: any; 
  public pubsArr: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mainService: MainService) {
  }

  ionViewDidLoad() {    
  }

  ngOnInit(){
    this.user = new User(this.navParams.data);
    this.initializeFilters();    
    if(this.user.isLogged){
      console.log('IS LOGGED');
      
    }
    else {
      console.log('NOT LOGGED');
      //this.navCtrl.push(HomePage);
    }
    this.getRandomPubs();
    console.warn(this.user);
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
		console.log(pub);
  }
  
  public goToLoad() {
		this.navCtrl.push(LoadPage);
	};

}
