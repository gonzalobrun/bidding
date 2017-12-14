import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LogInPage } from '../pages/log-in/log-in';
import { SignInPage } from '../pages/sign-in/sign-in';
import { MainPage } from '../pages/main/main';
import { LoadPage } from '../pages/load/load';
import { PublicationPage } from '../pages/publication/publication';
import { UserPage } from '../pages/user/user';
import { EditPubPage } from '../pages/edit-pub/edit-pub';
import { AdminPage } from '../pages/admin/admin';

import { TaxonomyService } from "../commons/taxonomy.service";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  public taxonomy: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public taxonomyService: TaxonomyService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'LogIn', component: LogInPage},
      { title: 'SignIn', component: SignInPage},
      { title: 'Load', component: LoadPage},
      { title: 'Publicaton', component: PublicationPage },
      { title: 'MainPage', component: MainPage },
      { title: 'UerPage', component: UserPage},
      { title: 'EditPubPage', component: EditPubPage },
      { title: 'AdminPage', component: AdminPage }

    ];

  }

  initializeApp() {
    this.getTaxonomy();
    this.platform.ready().then(() => {      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public getTaxonomy() {
		this.taxonomyService.getTaxonomyData().subscribe(
			(res) => {
				this.taxonomy = res.data;				
			},
			(err) => console.log(err),
			() => console.log('GET TAXONOMY')
		)
  };
  
}
