import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Added
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import{ AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    
    //Added
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    //AngularFireDatabaseModule,
    AngularFirestoreModule
    ],
    
  
  providers: [
    StatusBar,
    SplashScreen,
    Dialogs, 
    AngularFirestore,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
