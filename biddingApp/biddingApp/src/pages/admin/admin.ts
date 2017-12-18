import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminService } from './admin.service';

import { WebStorageService } from '../../commons/webStorage.service';
import { TaxonomyService } from '../../commons/taxonomy.service';

//import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';
import { elementAt } from 'rxjs/operator/elementAt';
import { _do } from 'rxjs/operator/do';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})

export class AdminPage {

	public user: User;
	public usersArr: Array<User> = [];
	public usersCount: any;
	public provinces: any = [];
	public barchartData: any = [];
	public fullBarchartData: any = [];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public webStorageService: WebStorageService,
		public adminService: AdminService,
		public taxonomyService: TaxonomyService
	) {}

	ngOnInit() {
		this.user = this.webStorageService.retrieve('currentUser') ? new User(this.webStorageService.retrieve('currentUser')) : User.BuildEmpty();
		this.getAllUsers();
		this.getProvinces();		
	}

	public getAllUsers() {
		this.adminService.getAllUsers().subscribe(
			(res) => {				
				this.usersArr = [];
				res.users.forEach(element => {
					let u = new User(element);
					this.usersArr.push(u);
				});
				this.usersCount = this.usersArr.length;
				this.findUsersPerProvince();
			},
			(err) => console.log(err),
			() => console.log('ALL USERS')
		)
	}

	public getProvinces() {
		this.taxonomyService.getLocations.forEach((p: any) => {
			let _p: {id: any, nombre: any} = {id: null, nombre: null};
			_p.id = p.id;
			_p.nombre = p.nombre
			this.provinces.push(_p);
		});
	}

	public findUsersPerProvince() {
		let _barchartData: any
				
		this.provinces.forEach(province => {

			let dataObj: any;

			_barchartData = this.usersArr.filter((user: User) => {
				return user.province == province.id;
			})

			// if(_donutData.length){
			// 	this.donutData.push(_donutData);
			// }

			dataObj = {
				name : province.nombre,
				value: _barchartData.length
			}

			this.barchartData.push(dataObj);
			this.fullBarchartData = this.barchartData;

		});

		debugger;
	}
	
}