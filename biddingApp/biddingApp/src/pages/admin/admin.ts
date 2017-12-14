import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WebStorageService } from '../../commons/webStorage.service';

import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})

export class AdminPage {

	public user: User;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public webStorageService: WebStorageService
	) {}

	ngOnInit() {
		this.user = this.webStorageService.retrieve('currentUser') ? new User(this.webStorageService.retrieve('currentUser')) : User.BuildEmpty();	  	
    }
	
}