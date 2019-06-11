import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore ) { }

  savePlayerScore(
    playerName:string,
    playerScore:number,
    date:string
    
    ):Promise<void>{
      const id = this.firestore.createId();

      return this.firestore.doc('scoreList/${id}').set({
        id,
        playerName,
        playerScore,
        date
        
      });
      

    }
  }

  

