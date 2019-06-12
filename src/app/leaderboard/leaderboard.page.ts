import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

export interface ScoreItem{
  date:string;
  playerName:string;
  score:number;
}

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  private scoreItemCollection:AngularFirestoreCollection<ScoreItem>;
  scoreItems:any;

  constructor(private firestoreService:AngularFirestore ) {
 }

  ngOnInit() {
    //loads all the collection from firestore
    //sort this list by score
    //only show the first 10 results
    this.scoreItemCollection = this.firestoreService.collection('scoreList', ref => ref.orderBy('score','desc').limit(10)); 
    this.scoreItemCollection.valueChanges().subscribe(res => {
    this.scoreItems = res;
    });
  
  }
    
}

