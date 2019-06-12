import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore ) { }

  addPlayerScore(playerName:string, score:number, date:string){
    return new Promise((resolve, reject) =>{
      this.firestore.collection('scoreList').add({playerName, score, date})
      .then( (response) => { resolve(response) })
      .catch( (error) => {reject(error) })
    });
  }

  }

  

