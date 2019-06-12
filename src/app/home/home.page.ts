import { Component, OnInit, Input } from '@angular/core';
import { questionItem } from '../models/question.model';
import { Dialogs } from '@ionic-native/dialogs/ngx'; 
import { FirestoreService } from '../services/data/firestore.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
})
export class HomePage implements OnInit{

  score:number = 0;
  time:number = 60;
  questionNumber:number = 1;
  interval;
  //flag to control if still playing game
  started:boolean = false;
  userInput:string;
  //for stop timer
  stop:boolean = false;
  //for check box
  correct:boolean = false;
  
  playerName:string;

  message:string;

  myDate:string;

  question:questionItem = {
    firstNumber:0,
    secondNumber:0,
    answer: 0
  };

  constructor(
    private dialogs:Dialogs, 
    private firestoreService:FirestoreService, 
    private loadingCtrl:LoadingController,

    private datePipe:DatePipe) {
      let tempDate = new Date();
      this.myDate = this.datePipe.transform(tempDate, 'yyyy-MM-dd');
    }

  ngOnInit(){
    //setting up for game
    this.score = 0;
    this.time = 60;
    this.questionNumber = 1;
    this.userInput =""; 

  }

  startGame(){
    this.ngOnInit();

    this.startTimer();

    this.generateQuestion();
    this.started = true;
  }

  startTimer(){
    this.interval = setInterval(()=> {
      if(this.time > 0){
        this.time--;
      }
      else{
        this.time = 0;
        this.started = false;
        //some bugs here
        clearInterval(this.interval);
        this.stop = false;
        //show dialog when game finish
        this.showDialog();
      }
    } ,1000)
    
  }

  stopGame(){
    clearInterval(this.interval);
    this.stop = true;
    
  }

  continueGame(){
    this.stop = false;
    this.startTimer();
    
  }

  generateQuestion(){
    this.question.firstNumber = Math.floor(Math.random() * 100) + 1;
    this.question.secondNumber = Math.floor(Math.random() * 100) + 1;
    this.question.answer = this.question.firstNumber + this.question.secondNumber;
    this.correct = false;
    console.log(this.question.answer);

  }

  checkAnswer(){
    if(parseInt(this.userInput) == this.question.answer)
    {
      this.score += 5;

      this.correct = true;

      //clear input area
      this.userInput = "";

      if(this.time > 0){
        //set 1 sec delay
        setTimeout(()=>{ 
          this.generateQuestion();
          this.questionNumber++;
         }, 1000)
      }
      else{
        //end game
        this.started = false;
      }
    }
    else{
      //incorrect answer
      this.message = "Incorrect!  Try Again";
      setTimeout(()=>{ 
        this.message = ""
       }, 1000)
      //clear input area
      this.userInput = "";
    }
  }

  async addPlayerScore(){
    const loading = await this.loadingCtrl.create();

    //new added
    this.firestoreService.addPlayerScore(this.playerName, this.score, this.myDate)
    .then( (response) => {
      console.log(response);
      loading.dismiss();
      
    })
    .catch( (error) => {
      console.log(error);
      
    });
    
    return await loading.present();
  }

  showDialog(){
    this.dialogs.prompt(
      'Please enter your name',  // message
      'Congratulation',            // title
      ['Ok','Skip'],             // buttonLabels
      ''                 // defaultText
  ).then(res => {
    console.log(res);
    this.playerName = res.input1;
    if(this.playerName != null && res.buttonIndex == 1)
    {
      //store these data into firebase
      this.addPlayerScore();
    }
  })
  }
}
