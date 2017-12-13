import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import * as moment from 'moment';

import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service';
import { LoadService } from './load.service';

import{ UserPage } from '../../pages/user/user';
import { MainPage } from '../../pages/main/main';

import { Publication } from '../../models/publication.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  public publication: Publication;
  public user: User;
  public loadPubForm: any;
  public categories: any;
  public status: any;
  public types: any;
  public countries: any = [];
  public provinces: any = [];
  public cities: any = [];
  public mainImg: string; 
  public sanitizedUrls: any = [];
  public showMinimunPrice: any = true;
  public fileForLoad: File;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadService: LoadService,
    public taxonomyService: TaxonomyService, 
    public webStorageService: WebStorageService,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(){
    this.user = new User(this.webStorageService.retrieve('currentUser'));
    this.publication = Publication.BuildEmpty();
    this.getTaxonomyData();
    this.setUserData();
    this.buildForm();    
  };

  public getTaxonomyData(){
    this.categories = this.taxonomyService.getCategories;
    this.status = this.taxonomyService.getStatus;
    this.types = this.taxonomyService.getTypes;
    this.countries = [{ id: 1, name: 'Argentina'}];
    this.provinces = this.taxonomyService.getLocations;    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoadPage');
  }

  public buildForm() {   

    this.loadPubForm = new FormGroup({
      'title': new FormControl(this.publication.title, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'description': new FormControl(this.publication.description, [
        Validators.required
      ]),  
      'minimunPrice': new FormControl(this.publication.minimunPrice, [
        Validators.required
      ]),  
      'categories': new FormControl(this.publication.categories, [
        Validators.required
      ]),  
      'type': new FormControl(this.publication.type, [
        Validators.required
      ]),  
      'status': new FormControl(this.publication.status, [
        Validators.required
      ]), 
      'city': new FormControl(this.publication.location.city, [
        Validators.required
      ]),  
      'province': new FormControl(this.publication.location.province, [
        Validators.required
      ]),  
      'country': new FormControl(this.publication.location.country, [
        Validators.required
      ])
    });
    this.onChanges();
  }

  private setUserData(){
    this.publication.location.country = this.user.country;
    this.publication.location.province = this.user.province;
    let province = this.taxonomyService.getLocations.filter((p: any) => p.id == this.publication.location.province);
    this.cities = province[0].ciudades;
    this.publication.location.city = this.user.city;
  }

  public publish(){

    this.publication.categories = this.loadPubForm.get('categories').value;
    this.publication.location.city = this.loadPubForm.get('city').value;
    this.publication.location.country = this.loadPubForm.get('country').value;
    this.publication.description = this.loadPubForm.get('description').value;
    this.publication.creationDate = moment().format();
    //this.publication.imgURL = this.loadPubForm.get('imgURL').value;
    this.publication.location.province = this.loadPubForm.get('province').value;
    this.publication.minimunPrice = this.loadPubForm.get('minimunPrice').value;
    this.publication.owner.id = this.user._id;
    this.publication.owner.username = this.user.username;
    this.publication.owner.phone = this.user.phone;
    this.publication.owner.email = this.user.email;
    this.publication.status = this.loadPubForm.get('status').value;
    this.publication.expirationDate = moment().add(1, 'minutes').format();
    this.publication.title = this.loadPubForm.get('title').value;
    this.publication.type = this.loadPubForm.get('type').value;
    
    this.loadService.createPub(this.publication, this.fileForLoad).subscribe(
      (res: any) => {
        this.loadService.saveImg(this.fileForLoad, res._id);
      },
      (err) => console.log(err),
      () => {
        this.navCtrl.push(MainPage);
      }
    );
  }

  public onChanges(): void {
    this.loadPubForm.get('province').valueChanges.subscribe(val => {
      this.loadPubForm.get('city').setValue(null);
      let province = this.taxonomyService.getLocations.filter((p: any) => p.id === val);
      this.cities = province[0].ciudades;
    });

    this.loadPubForm.get('type').valueChanges.subscribe(val => {
      if(val != 2) {
        this.showMinimunPrice = true;
      }
      else {
        this.loadPubForm.get('minimunPrice').setValue(0);
        this.showMinimunPrice = false;
      }
    });
  }

  public fileAdd(event) {

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.fileForLoad = fileList[0];
    }

  }

  public showImg(imgUrl){
    this.mainImg = imgUrl;
  }

  public goToUser() {
		this.navCtrl.push(UserPage);
  };
}