import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';


interface profilePictureUrl{
  url1?:string;
  url2?:string;
} 


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail:string;
  ref:AngularFireStorageReference;
  task:AngularFireUploadTask;
  profilePictureStream: AngularFireObject<profilePictureUrl>;
  uid:string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private afStorage:AngularFireStorage,
    private afDatabase: AngularFireDatabase,
    private firestoreService:AngularFirestore
    
) {
    this.profilePictureStream = this.afDatabase.object('/userProfile');
}

  ngOnInit() {
    //put user
    this.userEmail= this.authService.getUserEmail();
}

  signOut(){
    this.authService.signOut()
    .then(() => this.router.navigate(['../signin']))
    .catch();
  }

  upload(event:any){
  //  // this.ref = this.afStorage.storage("gs://ionic-mathgame.appspot.com/");
  //   const id = Math.random().toString(36).substring(2);
  //   this.ref = this.afStorage.ref(id);
  //   this.task = this.ref.put(event.target.files[0]);
  this.uid = this.authService.getUser().uid;
  const file:File = event.target.files[0];
  const metaData = {'contentType':file.type};
  const storageRef = '/userProfile/'+ this.uid;
  const uploadTask = this.afStorage.upload(storageRef, file, metaData);

  //this.afStorage.ref(storageRef).getDownloadURL().subscribe(url => {
    this.afStorage.ref(storageRef).getDownloadURL().subscribe(url => {
    this.firestoreService.firestore.collection('userProfile').doc(this.uid).set({
    });
    
  });

  console.log("uploading:" + file.name);
  }

}
