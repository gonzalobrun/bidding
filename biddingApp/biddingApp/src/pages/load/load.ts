import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import * as moment from 'moment';

import { TaxonomyService } from '../../commons/taxonomy.service';

import { Publication } from '../../models/publication.model';

@Component({
  selector: 'page-load',
  templateUrl: 'load.html',
})
export class LoadPage {

  public publication: Publication;
  public loadPubForm: any;
  public categories: any;
  public status: any;
  public types: any;
  public mainImg: string;  
  public currentDate: any;
  public sanitizedUrls: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public taxonomyService: TaxonomyService, 
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(){
    this.publication = Publication.BuildEmpty();
    console.log(this.publication);
    this.getTaxonomyData();
    this.buildForm();    
  };

  public getTaxonomyData(){
    this.categories = this.taxonomyService.getCategories;
    this.status = this.taxonomyService.getStatus;
    this.types = this.taxonomyService.getTypes;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoadPage');
  }

  public buildForm() {
    this.currentDate = moment().add(10, 'days').format().split("T")[0];
    console.log(this.currentDate);

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
      'expirationDate': new FormControl({ value: this.currentDate, disabled: true } , [
        Validators.required
      ]),
      'imgURL': new FormControl(this.publication.imgURL, [
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
      ]),
    });
  } 

  public publish(){
    console.log(this.loadPubForm.value);
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