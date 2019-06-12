import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private afAuth:AngularFireAuth,
    // private router:Router,
    // private afStore:AngularFirestore,
    // private afCollection:AngularFirestoreCollection,
    // private datePipe:DatePipe

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
