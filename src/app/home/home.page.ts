import { Component, OnInit } from '@angular/core';
import { questionItem } from '../models/question.model';




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
  started:boolean = false;
  userInput:string;
  //for stop time
  stop:boolean = false;
  //for check box
  correct:boolean = false;

  question:questionItem = {
    firstNumber:0,
    secondNumber:0,
    answer: 0
  };

  constructor() {
    
  }

  ngOnInit(){
    
  }

  startGame(){
    this.startTimer();

    this.started = true;

    this.generateQuestion();
  }

  startTimer(){
    this.interval = setInterval(()=> {
      if(this.time > 0){
        this.time--;
      }
      else{
        this.time = 0;
        this.stop = true;
        this.started = false;
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
        //set 2 sec delay
        setTimeout(()=>{ 
          this.generateQuestion();
          this.questionNumber++;
         }, 2000)
        
      }
      else{
        //end game
        this.stop = true;
        this.started = false;


      }
    }
  
  }

}
