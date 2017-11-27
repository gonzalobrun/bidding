import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup } from '@angular/forms';

import { MainService } from './main.service';
import { TaxonomyService } from '../../commons/taxonomy.service';
import { WebStorageService } from '../../commons/webStorage.service';
import { NotificationsComponent } from '../../widgets/notifications.component';

import { User } from '../../models/user.model';
import{ UserPage } from '../../pages/user/user';

import { LoadPage } from '../load/load';
import { PublicationPage } from '../publication/publication';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public user: User;
  public pubsArr: any;
  public storedUser: any;
  public filtersForm: FormGroup;
  public categories: any;
  public status: any;
  public types: any;
  public countries: any;
  public provinces: any;
  public cities: any;
  public sortByArr: any = [
    {id: 1, description: 'Date', valueAccessor: 'creationDate'},
    {id: 2, description:'Price',  valueAccessor: 'minimunPrice'},
    {id: 4, description:'Expiration Date', valueAccessor: 'expirationDate'}
  ];

  //Filters Varables
  public typeForm: any = [1, 2, 3];
  public statusForm: any = [1, 2];
  public sortByForm: any = 'creationDate';
  public sortByAscForm: boolean = false;
  public categoriesForm: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  public countryForm: any;
  public provinceForm: any;
  public cityForm: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public mainService: MainService,
    public taxonomyService: TaxonomyService,
    public webStorageService: WebStorageService
  ) {}

  ionViewDidLoad() {
  }

  ngOnInit(){
    this.user = new User(this.webStorageService.retrieve('currentUser'));
    this.initializeFilters();     
    this.buildForm();
    this.getWithFilters();
  };

  public getTaxonomyData(){
    this.categories = this.taxonomyService.getCategories;
    this.status = this.taxonomyService.getStatus;
    this.types = this.taxonomyService.getTypes;
    this.countries = [{ id: 1, name: 'Argentina'}];
    this.provinces = this.taxonomyService.getLocations;    
  }

  public initializeFilters() {
    this.getTaxonomyData();
    this.countryForm = this.user.country;
    this.provinceForm = this.user.province;    
    let province = this.taxonomyService.getLocations.filter((p: any) => p.id == this.provinceForm);
    this.cities = province[0].ciudades;
    this.cityForm = this.user.city;
  }

  public getWithFilters() {
		this.mainService.getWithFilters(this.filtersForm.value).subscribe(
			(res) => {
        this.pubsArr = res.pubs;
        			
			},
			(err) => console.log(err),
			() => this.sortValue(this.filtersForm.get('sortBy').value)	
		)
  };

  public buildForm() {
    this.filtersForm = new FormGroup({
      'type': new FormControl(this.typeForm, [
      ]),
      'status': new FormControl(this.statusForm, [
      ]),
      'sortBy': new FormControl(this.sortByForm, [
      ]),
      'sortByAsc': new FormControl(this.sortByAscForm, [
      ]), 
      'categories': new FormControl(this.categoriesForm, [
      ]),  
      'city': new FormControl(this.cityForm, [
      ]),  
      'province': new FormControl(this.provinceForm, [
      ]),  
      'country': new FormControl(this.countryForm, [
      ]),

    });
    
    this.onChanges();
  }

  public onChanges(){
    this.filtersForm.get('province').valueChanges.subscribe(val => {
      let province = this.taxonomyService.getLocations.filter((p: any) => p.id === val);
      this.cities = province[0].ciudades;
      this.filtersForm.get('city').setValue(null);
      this.sortValue(this.filtersForm.get('sortBy').value); 
    });
    
    this.filtersForm.valueChanges.subscribe(val => {
      this.getWithFilters();
      this.sortValue(this.filtersForm.get('sortBy').value);      
    });

    this.filtersForm.get('sortBy').valueChanges.subscribe(val => {
      this.sortValue(this.filtersForm.get('sortBy').value);
    });
  };

  public toggleSort() {    
    return this.pubsArr.reverse();
  };
  
  public openPub(pub: any) {
		this.navCtrl.push(PublicationPage, { pub });
	};
  
  public goToLoad() {
		this.navCtrl.push(LoadPage);
  };  
  
  public goToUser() {
		this.navCtrl.push(UserPage);
  };

  public sortValue(description: any){    
    this.pubsArr = this.pubsArr.sort(function(a: any, b: any){
      return a[description] - b[description]
    });
  }
}
