import { Component } from '@angular/core';
import { timer, of, delay } from 'rxjs';
import { data } from './data';

type CorrectAnswer = 0 | 1 | 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isReady = false;
  listOfQuestionsOrigin: any[] = [];
  listOfQuestions: any[] = [];
  questionSelectedIndex = 0;
  isCompleteAnswer = false;
  score = 0;
  choiceSelected: any;
  voice: HTMLAudioElement | any;
  isCorrectAnswer: CorrectAnswer = 0;
  isHoneycombHive = false; // check tổ ong có mật để sưitch hình ảnh tổ ong
  constructor() {
    
  }
  
  ngOnInit() {
    this.start();
  }

  replay() {
    this.voice.currentTime = 0;
    this.voice.play();
  }

  answer(choice: any, question: any) {
    this.choiceSelected = choice;
    const nextQuestions = this.listOfQuestionsOrigin.filter((i, index) => index === this.questionSelectedIndex + 1);
    if (choice?.id === question.correct.idChoice) {
      this.isCorrectAnswer = 1;
      this.score += 20;
      const correctAudio = new Audio('../assets/audio/correct-answer-audio.mp3');
      correctAudio.play();
    } else {
      this.isCorrectAnswer = 2;
      const correctAudio = new Audio('../assets/audio/wrong-answer-audio.mp3');
      correctAudio.play();
    }
    
    timer(5000).subscribe(() => {
      if (this.isCorrectAnswer === 1) {
        this.isHoneycombHive = true;
      }
      if (nextQuestions.length) {
        this.isCorrectAnswer = 0;
        this.choiceSelected = null;
        this.questionSelectedIndex = this.questionSelectedIndex + 1;
        this.listOfQuestions = nextQuestions;
        //  gen text
        //  getAudio

      } else {
        timer(5000).subscribe(() => {
          this.isCorrectAnswer = 0;
          this.isCompleteAnswer = true;
        })
      }
    })
  }

  getQuestions() {
    of(data).pipe(
      delay(0)
    ).subscribe(res => {
      this.listOfQuestionsOrigin = res;
      this.listOfQuestions = [this.listOfQuestionsOrigin[0]];
      // gen text
      // getAudio
    
    })
  }

  start() {
    this.isReady = true;
    // const startAudio = new Audio('../assets/audio/start.mp3');
    // startAudio.play();
    this.getQuestions();
  }

  private convertTextToSpeech() {
    const textToSpeech = this.listOfQuestions.map((item, index) => {
      const choiceToText = item.choices.map((c: any, i: number) => {
        return `Đáp án ${this.mapIndexToAlphabet(i)}, ${c.name}`
      }).join('. ')
      return `${item.name}. ${choiceToText}`
    }).join('')
    console.log('texttospeech: ', textToSpeech);
    return textToSpeech;
  }

  private mapIndexToAlphabet(index: number) {
    if (index === 0) {
      return 'A';
    } else if (index === 1) {
      return 'B';
    } else if (index === 2) {
      return 'C';
    } else if (index === 3) {
      return 'D';
    }
    return '';
  }
}
