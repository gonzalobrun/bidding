import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';

import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service';

@Component({
  selector: 'page-publication',
  templateUrl: 'publication.html',
})
export class PublicationPage {
  
  public user: User;
  public pub: Publication;
  public countDown: any;
  public expDate: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public taxonomyService: TaxonomyService, 
    public webStorageService: WebStorageService
  ) {}

  ngOnInit(){
    this.user = this.webStorageService.retrieve('currentUser') ? new User(this.webStorageService.retrieve('currentUser')) : User.BuildEmpty();
    this.pub = new Publication(this.navParams.get("pub"));
    this.expDate = new Date(this.pub.expirationDate);
    this.setCountdown();
  }

  ionViewDidLoad() {
  }

  public setCountdown() {
    this.countDown = Observable.timer(0,1000)
    .take(this.expDate)
    .map(()=> --this.expDate);
  }
}
