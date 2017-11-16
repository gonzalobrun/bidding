import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  public userCountry: any;
  public userProvince: any;
  public userCity: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public taxonomyService: TaxonomyService,
    private webStorageService: WebStorageService,
    private userService: UserService) {
  }

  ngOnInit(){    
    this.user = this.user = new User(this.webStorageService.retrieve('currentUser'));

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
      () => console.log('tu vieja')
    )
  }
}
