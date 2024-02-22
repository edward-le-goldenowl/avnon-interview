import { Component, signal, computed, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DialogComponent } from '../dialog/dialog.component';
import { TQuestion, TMyAnswer } from 'src/app/types/dialog.types';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'builder-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    TextFieldModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css',
})
export class BuilderComponent {
  myAnswerText: WritableSignal<any> = signal('');
  test: WritableSignal<any> = signal('');
  a: WritableSignal<any> = signal('');
  questions: TQuestion[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}
  myAnswers: TMyAnswer[] = [];
  ngOnInit() {
    this.questions = JSON.parse(localStorage.getItem('my_questions') ?? '[]');
  }

  openPopUp(): void {
    const dialogRef = this.dialog.open(DialogComponent, { width: '60%' });
    const submit = dialogRef.componentInstance.questionSubmitted.subscribe(
      (question: TQuestion) => {
        if (!question.question || !question.answer) {
          alert('Please fill in all fields.');
          return;
        }

        this.questions.push(question);
        this.dialog.closeAll();
      }
    );
  }

  navigateToReviewAnswerForm(): void {
    localStorage.setItem('my_answers', JSON.stringify(this.myAnswers));
    this.router.navigate(['/form/answers']);
  }

  onCheckboxChange(
    event: any,
    question: TQuestion,
    answer: string,
    answerIdx: number
  ) {
    const index = this.myAnswers.findIndex((q) => q.id === question.id);
    if (index === -1) {
      const checkboxes = question.answer.map((item, id) => {
        return {
          id,
          label: item,
          checked: id === answerIdx && event.checked,
        };
      });
      this.myAnswers.push({
        id: question.id,
        question: question.question,
        answerType: question.answerType,
        my_answer: {
          checkboxes: checkboxes,
        },
      });
    } else {
      const myAnswer = this.myAnswers[index].my_answer || null;
      if (myAnswer) {
        const checkboxes = myAnswer.checkboxes;
        if (checkboxes) checkboxes[answerIdx].checked = event.checked;
        this.myAnswers[index].my_answer.checkboxes = checkboxes;
      }
    }
  }
  onTextChange(event: string, question: TQuestion) {
    const index = this.myAnswers.findIndex((q) => q.id === question.id);
    if (index === -1) {
      this.myAnswers.push({
        id: question.id,
        question: question.question,
        answerType: question.answerType,
        my_answer: {
          text: event,
        },
      });
    } else {
      const myAnswer = this.myAnswers[index].my_answer || {};
      myAnswer.text = event;
      this.myAnswers[index].my_answer = myAnswer;
    }
  }
}
