import { Component } from '@angular/core';
import { timer, of, delay } from 'rxjs';
import { data } from './data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';

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
  html = '';
  result = '';
  speech: any;
  speechData: any;
  thinkingSound: HTMLAudioElement | any;
  listOfPreloadImages;
  constructor(private http: HttpClient) {
    this.listOfPreloadImages = ['/assets/img/bang.svg', '/assets/img/bang.svg', '/assets/img/bien.png','assets/img/btn.svg', 'assets/img/btn-sai.svg', 'assets/img/btn-dung.svg', '/assets/img/ngoi-sao-cuoi.svg', '/assets/img/ngoi-sao-buon.svg', '/assets/img/to-ong.svg', '/assets/img/to-ong-rong.svg', '/assets/img/bee-1.png', '/assets/img/bee-2.png', '/assets/img/bee-3.png', '/assets/img/bee-4.png', '/assets/img/bee-sad.png', '/assets/img/jars.png']
  }
  
  ngOnInit() {
  }

  replay() {
    this.voice.currentTime = 0;
    this.voice.play();
  }

  answer(choice: any, question: any) {
    this.choiceSelected = choice;
    this.voice?.pause();
    this.voice.currentTime = 0;
    if (this.thinkingSound) {
      this.thinkingSound?.pause();
      this.thinkingSound.currentTime = 0;
    }
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
        const nextQuestionAudio = new Audio('../assets/audio/bell.mp3');
        nextQuestionAudio.play();
        this.isCorrectAnswer = 0;
        this.choiceSelected = null;
        this.questionSelectedIndex = this.questionSelectedIndex + 1;
        this.listOfQuestions = nextQuestions;
        const textToSpeech = this.convertTextToSpeech();
         this.getAudio(textToSpeech);

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
      const textToSpeech = this.convertTextToSpeech();
      this.getAudio(textToSpeech);
      // getAudio
      
    })
  }

  start() {
    this.isReady = true;
    this.getQuestions();
  }

  getAudio(text: string) {
    this.http.post(`https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyDCP5_20c8li-BvfBSxOBpl6Q97ik8bzls`, {
      "audioConfig": {
        "audioEncoding": "LINEAR16",
        "pitch": 0,
        "speakingRate": 1
      },
      "input": {
        "text": text
      },
      "voice": {
        "languageCode": "vi-VN",
        "name": "vi-VN-Standard-A"
      }
    }, {
      headers: {
        // 'Authorization': 'Bearer AIzaSyDCP5_20c8li-BvfBSxOBpl6Q97ik8bzls'
      }
    }).pipe(
      catchError(err => {
        return of(err);
      })
    ).subscribe(res => {
      console.log('res: ', res);
      this.voice = new Audio("data:audio/wav;base64," + res.audioContent);
      this.voice.play().then((r: any) => {
        console.log('result: ', r);
        
      });
      this.voice.addEventListener("ended", () => {
        this.thinkingSound = new Audio('../assets/audio/audiothinking.mp3');
        this.thinkingSound.play();
      });
    })
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
