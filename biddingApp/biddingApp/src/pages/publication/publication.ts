import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
//import * as moment from 'moment';

import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';
import{ UserPage } from '../../pages/user/user';

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

  //------------
  private future: Date;
  private futureString: string;
  private diff: number;
  private $counter: Observable<number>;
  private subscription: Subscription;
  private message: string;

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
    this.imgView = this.pub.imgURL[0];
    this.offerAmount = this.pub.minimunPrice;
    this.findHighestoffer();
    //----------------------------------------------------------------------------------------------
    this.future = new Date(this.pub.expirationDate);
    this.$counter = Observable.interval(1000).map((x) => {
        this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        return x;
    });

    this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
  }

  ionViewDidLoad() {
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
        days + 'd',
        hours + 'h',
        minutes + 'm',
        seconds + 's'
    ].join(' ');
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }


  // public setCountdown() {
  //   this.countDown = Observable.timer(0,1000)
  //   .take(this.expDate)
  //   .map(()=> --this.expDate);
  // }

  public showImg(img) {
    this.imgView = img;
  }

  public apply() {
    let offerer = {
      pubId: this.pub._id,
      userId : this.user._id,
      username : this.user.username,
      offerAmount : 0
    }
    this.publicationService.addOfferer(offerer).subscribe(
      (res: any) => console.log(res),
      (err) => console.log(err),
      () => {
        this.pub.offerers.push(offerer); 
        this.findHighestoffer();
        this.offerAmount = undefined;
        console.log('OFFERER ADDED')
      }
    )
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
        this.offerAmount = undefined;
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

  public goToUser() {
		this.navCtrl.push(UserPage);
  };

}