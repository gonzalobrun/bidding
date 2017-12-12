import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { PopoverModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { NotificationsComponent } from '../widgets/notifications.component';
import { DonutChartComponent } from '../widgets/donut-chart/donut-chat.component';
import { PriceChartComponent } from '../widgets/price-chart/price-chart.component';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LogInPage } from '../pages/log-in/log-in';
import { SignInPage } from '../pages/sign-in/sign-in';
import { MainPage } from '../pages/main/main';
import { LoadPage } from '../pages/load/load';
import { PublicationPage } from '../pages/publication/publication';
import { UserPage } from '../pages/user/user';
import { EditPubPage } from '../pages/edit-pub/edit-pub';

import { LogInService } from '../pages/log-in/log-in.service'; 
import { SignInService } from '../pages/sign-in/sign-in.service';
import { HomeService } from '../pages/home/home.service';
import { MainService } from '../pages/main/main.service';
import { TaxonomyService } from "../commons/taxonomy.service";
import { WebStorageService } from "../commons/webStorage.service";
import { LoadService } from '../pages/load/load.service';
import { PublicationService } from '../pages/publication/publication.service';
import { UserService } from '../pages/user/user.service';
import { NotificationsService } from '../widgets/notifications.service';

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
    UserPage,
    EditPubPage,
    NotificationsComponent,
    DonutChartComponent,
    PriceChartComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot()
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
    UserPage,
    EditPubPage
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
    PublicationService,
    UserService,
    NotificationsService
  ]
})
export class AppModule {}
