import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdminService } from './admin.service';

import { WebStorageService } from '../../commons/webStorage.service';
import { TaxonomyService } from '../../commons/taxonomy.service';

//import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';
import { Publication } from '../../models/publication.model';
import { elementAt } from 'rxjs/operator/elementAt';
import { _do } from 'rxjs/operator/do';

@Component({
	selector: 'page-admin',
	templateUrl: 'admin.html'
})

export class AdminPage {

	public user: User;
	public usersArr: Array<User> = [];
	public pubsArr: Array<Publication> = [];
	public usersCount: any;
	public pubsCount: any;
	public provinces: any = [];
	public barchartData: any = [];
	public fullBarchartData: any = [];
	public donutTypesData: any = [];
	public auctionBarchartData: any = [];
	public serviceAuctionBarchartData: any = [];
	public donationsBarchartData: any = [];

	public totalPubs: any = 0;
	public totalAuction: any = 4;
	public totalServiceAuction: any = 2;
	public totalDonations: any = 3;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public webStorageService: WebStorageService,
		public adminService: AdminService,
		public taxonomyService: TaxonomyService
	) { }

	ngOnInit() {
		this.user = this.webStorageService.retrieve('currentUser') ? new User(this.webStorageService.retrieve('currentUser')) : User.BuildEmpty();
		this.getAllUsers();
		this.getAllPubs();
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

	public getAllPubs() {
		this.adminService.getAllPubs().subscribe(
			(res) => {
				this.pubsArr = [];
				res.pubs.forEach(element => {
					let u = new Publication(element);
					this.pubsArr.push(u);
					this.countTypes();
					this.findAuctionPerProvince();
					this.findServiceAuctionPerProvince();
					this.findDonationsPerProvince();
				});
				this.pubsCount = this.pubsArr.length;
				//this.findUsersPerProvince();
			},
			(err) => console.log(err),
			() => console.log('ALL PUBS')
		)
	}

	public getProvinces() {
		this.taxonomyService.getLocations.forEach((p: any) => {
			let _p: { id: any, nombre: any } = { id: null, nombre: null };
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

			dataObj = {
				name: province.nombre,
				value: _barchartData.length
			}

			this.barchartData.push(dataObj);
			this.fullBarchartData = this.barchartData;

		});
	}

	private countTypes() {

		let auctionCount: number = 0;
		let serviceAuctionCount: number = 0;
		let giftCount: number = 0;

		this.pubsArr.forEach(element => {
			switch (element.type) {
				case 1: {
					auctionCount = auctionCount + 1;
					break;
				}
				case 2: {
					giftCount = giftCount + 1;
					break;
				}
				case 3: {
					serviceAuctionCount = serviceAuctionCount + 1;
					break;
				}
			}

		});

		let _donutData = [
			{
				name: 'Service Auction',
				value: serviceAuctionCount
			},
			{
				name: 'Auction',
				value: auctionCount
			}, {
				name: 'Gift',
				value: giftCount
			}
		]

		let data = _donutData.filter((d: any) => {
			return d.value != 0;
		})
		this.donutTypesData = data;
	}

	public findAuctionPerProvince() {
		let _auctionData: any
		let auctionDataArr: any = [];
				
		this.provinces.forEach(province => {

			let dataObj: any;

			_auctionData = this.pubsArr.filter((pub: Publication) => {
				return (pub.location.province == province.id && pub.type == 1);
			})

			dataObj = {
				name : province.nombre,
				value: _auctionData.length
			}

			auctionDataArr.push(dataObj);
		});
		this.auctionBarchartData = auctionDataArr;
	}

	public findServiceAuctionPerProvince() {
		let _serviceAuctionData: any
		let serviceAuctionDataArr: any = [];
		let _serviceAuctionCounter: any = [];
		this.provinces.forEach(province => {

			let dataObj: any;

			_serviceAuctionData = this.pubsArr.filter((pub: Publication) => {
				return (pub.location.province == province.id && pub.type == 3);
			})

			dataObj = {
				name : province.nombre,
				value: _serviceAuctionData.length
			}

			serviceAuctionDataArr.push(dataObj);		

		});

		_serviceAuctionCounter = serviceAuctionDataArr.filter((data: any) => {
			return data.value != 0
		})
		//this.totalServiceAuction = _serviceAuctionCounter.length;
		this.serviceAuctionBarchartData = serviceAuctionDataArr;
	}

	public findDonationsPerProvince() {
		let _donationData: any
		let donationDataArr: any = [];
		let _donationCounter: any = [];
				
		this.provinces.forEach(province => {

			let dataObj: any;

			_donationData = this.pubsArr.filter((pub: Publication) => {				
				return (pub.location.province == province.id && pub.type == 2);
			})

			dataObj = {
				name : province.nombre,
				value: _donationData.length
			}

			donationDataArr.push(dataObj);
			

		});

		_donationCounter = donationDataArr.filter((data: any) => {
			return data.value != 0
		})
		//this.totalServiceAuction = _donationCounter.length;
		this.donationsBarchartData = donationDataArr;
	}

}