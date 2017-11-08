import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import * as moment from 'moment';

import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service';
import { LoadService } from './load.service';

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
  public currentDate: any;
  public sanitizedUrls: any = [];

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
    console.log(this.publication)
    this.currentDate = moment().add(10, 'days').format().split("T")[0];
    this.getTaxonomyData();
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
      // 'expirationDate': new FormControl(this.currentDate, [
      //   Validators.required
      // ]),
      // 'imgURL': new FormControl(this.publication.imgURL, [
      //   Validators.required
      // ]),  
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

  public publish(){
    debugger;

    // let _user: any = { id: this.user._id, username: this.user.username  }

    this.publication.categories = this.loadPubForm.get('categories').value;
    this.publication.location.city = this.loadPubForm.get('city').value;
    this.publication.location.country = this.loadPubForm.get('country').value;
    this.publication.description = this.loadPubForm.get('description').value;
    //this.publication.imgURL = this.loadPubForm.get('imgURL').value;
    this.publication.location.province = this.loadPubForm.get('province').value;
    this.publication.minimunPrice = this.loadPubForm.get('minimunPrice').value;
    this.publication.owner.id = this.user._id;
    this.publication.owner.username = this.user.username;
    this.publication.status = this.loadPubForm.get('status').value;
    this.publication.expirationDate = this.currentDate;
    this.publication.title = this.loadPubForm.get('title').value;
    this.publication.type = this.loadPubForm.get('type').value;
    
    console.log(this.publication);
    this.loadService.createPub(this.publication).subscribe(
      (res: any) => console.log(res),
      (err) => console.log(err),
      () => console.log('Publicated')
    );
  }

  public onChanges(): void {
    this.loadPubForm.get('province').valueChanges.subscribe(val => {
      let province = this.taxonomyService.getLocations.filter((p: any) => p.id === val);
      this.cities = province[0].ciudades;
    });
  }

  public fileAdd(event) {
    const url = "C:/Users/Development/Desktop/storage/pub_pictures/";
    let fileList: FileList = event.target.files;
    Array.from(fileList).forEach(file => {
      let imgUrl = url + file.name;
      this.publication.imgURL.push(imgUrl);
    });
  }

  public showImg(imgUrl){
    this.mainImg = imgUrl;
  }
}