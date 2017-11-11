import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';

import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service';
import { PublicationService } from './publication.service';

@Component({
  selector: 'page-publication',
  templateUrl: 'publication.html',
})
export class PublicationPage {
  
  public user: User;
  public pub: Publication;
  public countDown: any;  
  public imgView: any;
  public expDate: any;
  public offerAmount: any;
  public commentText: string = '';
  public higestOffer: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public taxonomyService: TaxonomyService, 
    public webStorageService: WebStorageService,
    public publicationService: PublicationService
  ) {}

  ngOnInit(){
    this.user = this.webStorageService.retrieve('currentUser') ? new User(this.webStorageService.retrieve('currentUser')) : User.BuildEmpty();
    this.pub = new Publication(this.navParams.get("pub"));
    this.expDate = new Date(this.pub.expirationDate);
    this.imgView = this.pub.imgURL[0];
    this.offerAmount = this.pub.minimunPrice;
    this.setCountdown();
    console.log(this.pub);
    this.findHighestoffer()
  }

  ionViewDidLoad() {
  }

  public setCountdown() {
    this.countDown = Observable.timer(0,1000)
    .take(this.expDate)
    .map(()=> --this.expDate);
  }

  public showImg(img) {
    this.imgView = img;
  }

  public apply() {
    let offerer = {
      id : this.user._id,
      username : this.user.username,
      offer : this.offerAmount
    }
    
    this.pub.offerers.push(offerer);
  }
  
  //TODO: I know, this two functions above and under are very similar. Refactor it!

  public offer() {
    let offerer = {
      pubId: this.pub._id,
      userId : this.user._id,
      username : this.user.username,
      offerAmount : this.offerAmount
    }
    this.publicationService.addOfferer(offerer).subscribe(
      (res: any) => console.log(res),
      (err) => console.log(err),
      () => {
        this.pub.offerers.push(offerer); 
        this.findHighestoffer();
        this.offerAmount = null;
        console.log('OFFERER ADDED')
      }
    )  
  }

  public addComment() {
    let comment = {
      pubId: this.pub._id,
      username: this.user.username || 'Anonymous',
      commentText: this.commentText
    }
    this.publicationService.addComment(comment).subscribe(
      (res: any) => console.log(res),
      (err) => console.log(err),
      () => {
        this.pub.comments.push(comment);
        this.commentText = '';
        console.log('COMMENT ADDED')
      }
    )    
  }
  
  public findHighestoffer() {
    this.higestOffer = Math.max.apply(Math,this.pub.offerers.map(function(o){return o.offerAmount;}))    
  }
}