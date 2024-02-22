import {
  Component,
  signal,
  OnInit,
  Output,
  EventEmitter,
  WritableSignal,
  Signal,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QUESTION_TYPES } from 'src/app/constants/dialog';
import { TQuestion, TQuestionTypes } from 'src/app/types/dialog.types';
@Component({
  selector: 'myngapp-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  ngOnInit(): void {}
  @Output() questionSubmitted = new EventEmitter<TQuestion>();
  questionTypeSelected: string = '';
  question: WritableSignal<string> = signal('');
  answers: WritableSignal<string[]> = signal([]);
  questionTypes: Signal<TQuestionTypes[]> = signal(QUESTION_TYPES);

  resetForm() {
    this.question.set('');
    this.answers.set([]);
  }

  addAnswer() {
    if (
      this.questionTypeSelected === 'checkbox' &&
      this.answers().length >= 5
    ) {
      alert('Maximum 5 answer options allowed.');
      return;
    }
    this.answers.update((arr: string[]) => {
      arr.push('');
      return arr;
    });
  }
  removeAnswer(index: number) {
    this.answers.update((arr: string[]) => {
      arr.splice(index, 1);
      return arr;
    });
  }
  submitQuestion() {
    const answer = this.answers();
    const questionStorage = JSON.parse(
      localStorage.getItem('my_questions') ?? '[]'
    );
    const question = {
      id: nanoid(),
      question: this.question(),
      answer,
      answerType: this.questionTypeSelected,
    };
    questionStorage.push(question);
    localStorage.setItem('my_questions', JSON.stringify(questionStorage));
    this.questionSubmitted.emit(question);
  }
}
