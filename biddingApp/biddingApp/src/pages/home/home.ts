import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { SignInPage } from '../sign-in/sign-in';

import { MainPage } from '../main/main';
import { LoadPage } from '../load/load';
import { PublicationPage } from '../publication/publication';

import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	pubsArr: any[]; 

	constructor(public navCtrl: NavController, public navParams: NavParams, public homeService: HomeService) {	
	}

	ngOnInit() {
		this.getRandomPubs();  	
	}

	public goToLogin() {
		this.navCtrl.push(LogInPage);
	};
	
	public goToSignin() {
		this.navCtrl.push(SignInPage);
	};

	public goToPub() {
		this.navCtrl.push(PublicationPage);
	};
	
	public goToMain() {
		this.navCtrl.push(MainPage);
	};

	public goToLoad() {
		this.navCtrl.push(LoadPage);
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