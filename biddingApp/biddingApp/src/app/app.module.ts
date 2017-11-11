import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LogInPage } from '../pages/log-in/log-in';
import { SignInPage } from '../pages/sign-in/sign-in';
import { MainPage } from '../pages/main/main';
import { LoadPage } from '../pages/load/load';
import { PublicationPage } from '../pages/publication/publication';
import { UserPage } from '../pages/user/user';

import { LogInService } from '../pages/log-in/log-in.service'; 
import { SignInService } from '../pages/sign-in/sign-in.service';
import { HomeService } from '../pages/home/home.service';
import { MainService } from '../pages/main/main.service';
import { TaxonomyService } from "../commons/taxonomy.service";
import { WebStorageService } from "../commons/webStorage.service";
import { LoadService } from '../pages/load/load.service';
import { PublicationService } from '../pages/publication/publication.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LogInPage,
    SignInPage,
    MainPage,
    LoadPage,
    PublicationPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LogInPage,
    SignInPage,
    MainPage,
    LoadPage,
    PublicationPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SignInService,
    LogInService,
    HomeService,
    MainService,
    TaxonomyService,
    WebStorageService,
    LoadService,
    PublicationService
  ]
})
export class AppModule {}
