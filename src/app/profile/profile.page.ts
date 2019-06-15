import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userEmail:string;
  uid:string;
  imgSource:string;

  constructor(
    private authService:AuthService,
    private router:Router,
    private afStorage:AngularFireStorage,
    private firestoreService:AngularFirestore
    
) {}

  ngOnInit() {  
    this.uid = this.authService.getUser().uid;
    this.loadProfileImage();
    this.userEmail= this.authService.getUser().email;
}

  signOut(){
    this.authService.signOut()
    .then(() => this.router.navigate(['../signin']))
    .catch();
  }

  upload(event:any){

  this.uid = this.authService.getUser().uid;
  const file:File = event.target.files[0];
  const metaData = {'contentType':file.type};
  const storageRef = '/userProfile/'+ this.uid;
  this.afStorage.upload(storageRef, file, metaData);

    this.afStorage.ref(storageRef).getDownloadURL().subscribe(url => {
    this.firestoreService.firestore.collection('userProfile').doc(this.uid).set({
      downloadURL: url
    });
  
  });
 
  console.log("Upload Successful:" + file.name);
  
  }

  loadProfileImage(){
    const ref = '/userProfile/'+ this.uid;
    this.afStorage.ref(ref).getDownloadURL().subscribe(url => {
    this.imgSource = url;
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadProfileImage();
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

}
