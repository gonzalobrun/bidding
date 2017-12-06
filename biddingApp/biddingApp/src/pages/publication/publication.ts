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
  public pubId: any;
  public pub: Publication;
  public countDown: any;  
  public imgView: any;
  public expDate: any;
  public offerAmount: any = null;
  public commentText: string = '';
  public higestOffer: any;

  public countryView: any
  public provinceView: any;
  public cityView: any;
  public statusView: any;
  
  private future: Date;
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
    this.getById(this.pub._id);    
    this.imgView = this.pub.imgURL[0];
    this.offerAmount = this.pub.minimunPrice;
    this.findHighestoffer();
    this.matchTaxonomyData();
    this.future = new Date(this.pub.expirationDate);

    if(!this.pub.isExpired) {
      this.$counter = Observable.interval(1000).map((x) => {
        this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
        //-----------Try To Move it to the get
        if(this.diff < 0 && this.diff != undefined){
          this.pub.expired = true; 
          this.subscription.unsubscribe();
          this.publicationService.setExpired(this.pub._id).subscribe(
            (res) => {
              this.pub.expired = res.update.expired;
              this.getById(this.pub._id);
            },
            (err) => console.log(err),
            () => console.log('PUB EXPIRED')
          );
        }
        
        //-------------
        return x;
      });  
      this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
    }     
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
    if(!this.pub.isExpired){
      this.subscription.unsubscribe();
    }
      
  }

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
        this.offerAmount = null;
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

  public goToUser() {
		this.navCtrl.push(UserPage);
  };

  public getById(pubId: any) {
		this.publicationService.getById(pubId).subscribe(
			(res) => {
        this.pub = new Publication(res.pub);  
        this.findHighestoffer();      				
			},
			(err) => console.log(err),
			() => console.log('GET RANDOM')
		)
  };
  
  private matchTaxonomyData(){
    this.countryView = 'Argentina';
    let _provinceView = this.taxonomyService.getLocations.find((p: any) => {
      return p.id == this.pub.location.province;
    });
    this.provinceView = _provinceView.nombre;
    let _cityView = _provinceView.ciudades.find((c: any) => {
      return c.id == this.pub.location.city;
    });
    this.cityView = _cityView ? _cityView.nombre : '';
    let _status = this.taxonomyService.getStatus.find((s: any) => {
      return s.id == this.pub.status;
    })
    this.statusView = _status.description;
  }
  
  public disabledOffer(){
    //if(this.pub.isAuction){
      if(this.user.isLogged && !this.pub.isExpired && (this.offerAmount != null)){
        return false;
      }
      else{
        return true;
      }
    //}
  }

  public disabledApply(){
    //if(this.pub.isAuction){
      if(this.user.isLogged && !this.pub.isExpired){
        return false;
      }
      else{
        return true;
      }
    //}
  }


}