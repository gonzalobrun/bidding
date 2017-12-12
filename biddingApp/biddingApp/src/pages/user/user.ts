import { Component, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditPubPage } from '../edit-pub/edit-pub';

import { User } from '../../models/user.model';

import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service'; 
import { UserService } from './user.service';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public user: User;
  public editUserForm: any;
  public countries: any = [];
  public provinces: any = [];
  public cities: any = [];
  public pubsArr: any = [];

  public userCountry: any;
  public userProvince: any;
  public userCity: any;
  public typesData: any = [];
  public priceData = [{name: 'a', value: 1},{name: 'B', value: 2}]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public taxonomyService: TaxonomyService,
    private webStorageService: WebStorageService,
    private userService: UserService) {
  }

  ngOnInit(){    
    this.user = this.user = new User(this.webStorageService.retrieve('currentUser'));
    this.getbyUser();
    this.matchLocations();
    this.buildForm();
};

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserPage');
  }

  buildForm() {    

    this.editUserForm = new FormGroup({
      '_id': new FormControl(this.user._id, [
      ]),
      'name': new FormControl(this.user.name, [
      ]), 
      'username': new FormControl({ value: this.user.username, disabled: true }, [
      ]),
      'password': new FormControl(this.user.password, [
      ]),  
      'country': new FormControl(this.user.country, [
        Validators.required
      ]),  
      'province': new FormControl(this.user.province, [
        Validators.required
      ]),
      'city': new FormControl(this.user.city, [
        Validators.required
      ])  
    });
    this.onChanges();
  }
  
  public onChanges(): void {
    this.editUserForm.get('province').valueChanges.subscribe(val => {
      let province = this.taxonomyService.getLocations.filter((p: any) => p.id === val);
      this.cities = province[0].ciudades;
    });
  }

  public matchCountry() {
    this.userCountry = 1;
  }

  public matchProvince(){
    this.userProvince = this.taxonomyService.getLocations.find((p: any) => {
      return p.id === this.user.province;
    });
  }

  public matchCity() {
    this.userCity = this.userProvince.ciudades.find((c: any) => {
      return c.id === this.user.city;
    });
  }

  public matchLocations() {
    this.countries = [{ id: 1, name: 'Argentina'}];
    this.provinces = this.taxonomyService.getLocations;
    let userProvince = this.taxonomyService.getLocations.find((p: any) => { 
      return p.id == this.user.province;
    });
    this.cities = userProvince.ciudades;      
  }

  public save() {
    this.userService.update(this.editUserForm.value).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => console.log('USER UPDATED')
    )
  }

  private getbyUser() {
    this.userService.getByUser(this.user).subscribe(
      (res) => {
        this.pubsArr = res;
        this.countTypes();
      },
      (err) => console.log(err),
      () => console.log('GET USER\'S PUB')
    )
  }

  public goToDetails(pub: any) {
    this.navCtrl.push(EditPubPage, { pub });
  }

  public openPub(pub){
    console.log(pub);
  }

  private countTypes(){

    let auctionCount: number = 0;
    let serviceAuctionCount: number = 0;
    let giftCount: number = 0;

    this.pubsArr.forEach(element => {
      switch(element.type) { 
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

    this.typesData = [
      {
        name: 'Auction',
        value: auctionCount
      },{
        name: 'Gift',
        value: giftCount
      },{
        name: 'Service Auction',
        value: serviceAuctionCount
      }
    ]

  }

}
