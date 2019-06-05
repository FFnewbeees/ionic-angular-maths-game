import { Component, OnInit } from '@angular/core';
import { questionItem } from '../models/question.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  apiUrl = 'https://math.ly/api/v1/algebra/linear-equations.json';

  question:questionItem = {
    firstNumber:0,
    secondNumber:0,
    answer: 0
  };

  constructor(private http:HttpClient) {
  }

  ngOnInit(){
    this.question = {
      firstNumber:1,
      secondNumber:2,
      answer: this.question.firstNumber + this.question.secondNumber
    }

    this.loadQuestion();
  }

  loadQuestion(){
    return this.http.get(this.apiUrl);
    
    
  }


 

}
