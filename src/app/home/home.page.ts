import { Component, OnInit, Input } from '@angular/core';
import { questionItem } from '../models/question.model';
import { Dialogs } from '@ionic-native/dialogs/ngx'; 
import { AlertController} from '@ionic/angular';


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
  
  message:string;

  question:questionItem = {
    firstNumber:0,
    secondNumber:0,
    answer: 0
  };

  constructor(private dialogs:Dialogs,private alertController:AlertController) {}

  ngOnInit(){
    
  }

  startGame(){
    this.time = 60;

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
        this.started = false;
        //some bugs here
        this.stopGame();
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
        this.stop = true;
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

  async showDialog(){
    let dialogs = await this.alertController.create({
      header:"Congratulations",
      subHeader:"",
      message:"Please Enter Your Name",
      buttons:[
        {
          text:'Skip',
          role:'skip',
          handler:data =>{
            console.log('skiped');
          }
        },
        {
          text:'OK',
          handler:data =>{
            if(data != null)
              console.log(JSON.stringify(data));
              
              console.log("name:" + data.username + " score:" + this.score);
            }
        }
      ],
      inputs:[
        {
          name:'username',
          placeholder:"username"
        }
      ]     
    });
    await dialogs.present();
  }

}
