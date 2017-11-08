import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { SignInPage } from '../sign-in/sign-in';

import { MainPage } from '../main/main';
import { LoadPage } from '../load/load';
import { PublicationPage } from '../publication/publication';

import { HomeService } from './home.service';
import { WebStorageService } from '../../commons/webStorage.service';

//import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	public user: User;
	public pubsArr: any[];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public homeService: HomeService, 
		public webStorageService: WebStorageService
	) {}

	ngOnInit() {
		this.user = this.webStorageService.retrieve('currentUser') ? new User(this.webStorageService.retrieve('currentUser')) : User.BuildEmpty();
		this.getRandomPubs();  	
	}

	public goToLogin() {
		this.navCtrl.push(LogInPage);
	};
	
	public goToSignin() {
		this.navCtrl.push(SignInPage);
	};

	public goToMain() {
		this.navCtrl.push(MainPage);
	};

	public getRandomPubs() {
		this.homeService.getRandomPubs().subscribe(
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
}