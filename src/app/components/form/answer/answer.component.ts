import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DialogComponent } from '../dialog/dialog.component';
import { TMyAnswer } from 'src/app/types/dialog.types';
import { Router } from '@angular/router';
@Component({
  selector: 'myngapp-answer',
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
  ],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css',
})
export class AnswerComponent {
  answers: TMyAnswer[] = [];
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.answers = JSON.parse(localStorage.getItem('my_answers') ?? '[]');
  }

  checkNullAnswer(answer: TMyAnswer): Boolean {
    if (!answer.my_answer.text && answer.answerType === 'paragraph') {
      return true;
    }
    if (answer.answerType === 'checkbox' && answer.my_answer.checkboxes) {
      const hasCheckedObject = answer.my_answer.checkboxes.some(
        (obj) => obj.checked === true
      );
      return !hasCheckedObject;
    }
    return false;
  }

  navigateToBuilderForm(): void {
    localStorage.removeItem('my_answers');
    this.router.navigate(['/form/builder']);
  }
}
