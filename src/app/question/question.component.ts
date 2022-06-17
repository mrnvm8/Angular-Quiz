import { Component, OnInit } from '@angular/core';
import { count, interval } from 'rxjs';
import { QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string =""; // string property name that will be assigned a localStorage name
  public questionList: any = [];  //empty list that will hold all questions
  public currentQuestion:number = 0; //the user is current attempting
  public points : number = 0; //the points for each questions
  public counter = 60; //the counter for each questions
  public correctAnswer : number = 0; //count correct answers
  public incorrectAnswer : number = 0; //count Incorrect answers
  public interval$ :any; //for the timer in the form, using the dollar sign to indicate that it is observable
  public progress:string ="0"; //the progress
  public isQuizCompleted : boolean = false; // tracking id the quiz is completed or not

  constructor(private question: QuestionsService) { }




  ngOnInit(): void {
    //include ! to tell typescript that the will be not undefined
    //and this property will be receiving value
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions(); //get all questions
    this.startCounter();//Start the counter


  }

  getAllQuestions(){
    this.question.getQuestionJson()
    .subscribe(res =>{
      this.questionList = res.questions;
    });
  }

  //Method for the next question
  nextQuestion() {
    this.currentQuestion++;
  }
  //Method for the previous question
  previousQuestion() {
    this.currentQuestion--;
  }

  //method for answer
  //will be checking if the answer is correct or not
  answerQuestion(currentQNo : number, option: any) {
    if (currentQNo === this.questionList.length){
      this.isQuizCompleted =true; // the quiz is completed
      this.stopCounter(); // Stop the counter
    }
    //option will be passing true or false
    if(option.correct){

      this.points += 10;  //increase points by 10
      this.correctAnswer ++; //add 1 to increment
      //for delay of 1 sec to see the changes
      setTimeout(() => {
        this.currentQuestion++;  //if the answer is correct want to send them into the next question
        this.resetCounter(); // reset the counter
        this.getProcessPercentage(); //return progress
      }, 1000);

    }else{
      //for delay of 1 sec to see the changes
      setTimeout(() => {
        this.points -= 10;
        this.incorrectAnswer ++;
        this.currentQuestion++;  //if the answer is incorrect want to send them into the next question
        this.resetCounter(); // reset the counter
        this.getProcessPercentage(); //return progress
      }, 1000);
    }
  }

  //Creating three methods for the interval start, stop, reset counter
  startCounter(){
    //using the RXJS time interval
    this.interval$ = interval(1000)  //run every 1 second
                    .subscribe(val =>{
                      this.counter--;  //decrease the counter from 60 seconds
                      //if the counter is 0 go to the next question and reset the counter
                      if(this.counter ===0){
                        this.currentQuestion++;
                        this.counter= 60; //resetting the counter
                        this.points-=10; //decrease the points by 10;
                      }
                    });
      //Need to unsubscribe from the RXJS time interval
      //After 10 minutes stop the interval
      setTimeout(() =>{
        this.interval$.unsubscribe();
      },600000);


  }
  //Method will stop the interval
  stopCounter(){
    this.interval$.unsubscribe(); //To stop the interval, unsubscribe it
    this.counter = 0; //set counter to zero
  }

  //Method will stop and start the interval
  resetCounter(){
    this.stopCounter(); //To reset the counter, first stop the counter
    this.counter = 60; //Then initialize the counter
    this.startCounter(); // Start the counter
  }

  //Method for resetting the quiz
  resetQuiz(){
    this.resetCounter(); //
    this.getAllQuestions(); // Get all questions
    this.points=0;
    this.counter=60;
    this.currentQuestion =0;
    this.progress ="0";
  }

  getProcessPercentage(){
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString()
    return this.progress;
  }
}
