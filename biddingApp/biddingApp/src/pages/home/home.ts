import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	pubsArr: any[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	
  }

  ngOnInit() {
  	this.pubsArr = [{
		  _id: "59d2739e45723104a816ac11",
		  likesCount: 0,
		  minimunPrice: 123,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "dvldmf",
		  description: "sdfksjndfkvd",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:13:02.348Z",
		  owner: {
		    username: "gonzalo",
		    id: "5463454"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		},{
		  _id: "59d274f445723104a816ac12",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "BBBBBBBBBB",
		  description: "AAAAAAAAAA",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:18:44.259Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		},{
		  _id: "59d2750045723104a816ac13",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "BBBBBBBBBB",
		  description: "CCCCCCCCCC",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:18:56.468Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}, {
		  _id: "59d2752145723104a816ac14",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "DDDDDDDDD",
		  description: "CCCCCCCCCC",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:19:29.699Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}, {
		  _id: "59d2752c45723104a816ac15",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "DDDDDDDDD",
		  description: "EEEEEEEEEEE",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:19:40.477Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}, {
		  _id: "59d2752c45723104a816ac15",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "DDDDDDDDD",
		  description: "EEEEEEEEEEE",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:19:40.477Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}, {
		  _id: "59d2752c45723104a816ac15",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "DDDDDDDDD",
		  description: "EEEEEEEEEEE",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:19:40.477Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}, {
		  _id: "59d2752c45723104a816ac15",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "DDDDDDDDD",
		  description: "EEEEEEEEEEE",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:19:40.477Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}, {
		  _id: "59d2752c45723104a816ac15",
		  likesCount: 0,
		  minimunPrice: 5634,
		  expired: false,
		  expirationDate: "2017-04-10T03:00:00.000Z",
		  title: "DDDDDDDDD",
		  description: "EEEEEEEEEEE",
		  status: 4,
		  type: 1,
		  location: {
		    province: "cba",
		    country: "Arg",
		    city: "cba"
		  },
		  countdownStarted: false,
		  creationDate: "2017-10-02T17:19:40.477Z",
		  owner: {
		    username: "gonzalo",
		    id: "1234"
		  },
		  categories: [],
		  comments: [],
		  imgURL: [],
		  offerers: [],
		  __v: 0
		}
  	];
  }

  public goToLogin() {
  	this.navCtrl.push(LogInPage);
	}
	
	public goToSignin() {
		this.navCtrl.push(SignInPage);
	}
}